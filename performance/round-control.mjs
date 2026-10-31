import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { Cancellation } from './cancellation.mjs';
import { root, assert } from './common.mjs';
import { receiptId, runStatus } from './zeroshot-status.mjs';

// Shared by the real runner and subprocess tests. No test can submit an agent: tests
// supply a harmless CLI implementation, while rounds.mjs supplies the pinned CLI.
export class RoundControl {
  constructor({ cli, env, stopTimeoutMs = 30000, pollMs = 500, commandTimeoutMs = 45000, cleanupGraceMs = 35000 }) {
    Object.assign(this, { cli, env, stopTimeoutMs, pollMs, commandTimeoutMs, cleanupGraceMs });
    this.cancellation = new Cancellation().install();
  }
  get signal() { return this.cancellation.signal; }
  async execute(command, argv, { capture = false, cancellable = true, timeout = 0 } = {}) {
    if (cancellable) this.signal.throwIfAborted();
    const child = spawn(command, argv, { cwd: root, env: this.env ?? process.env, detached: process.platform !== 'win32', stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit' });
    let ended = false, failure, stdout = '', stderr = '', stopping;
    const endedPromise = new Promise(resolve => {
      child.once('error', error => { failure = error; });
      child.once('close', (code, signal) => { ended = true; resolve({ code, signal }); });
    });
    const send = signal => {
      if (!child.pid || (process.platform === 'win32' && ended)) return;
      try { if (process.platform === 'win32') child.kill(signal); else process.kill(-child.pid, signal); }
      catch (error) { if (error.code !== 'ESRCH') throw error; }
    };
    const groupAlive = () => {
      if (!child.pid) return false;
      try { process.kill(process.platform === 'win32' ? child.pid : -child.pid, 0); return true; }
      catch (error) { if (error.code === 'ESRCH') return false; throw error; }
    };
    const stop = () => stopping ??= (async () => {
      let escalated = false;
      if (groupAlive()) {
        send('SIGTERM');
        // npm may exit before the audit finishes its own browser/server cleanup.
        // Give the whole group (not just its leader) time to join acquisitions.
        const grace = Date.now() + this.cleanupGraceMs;
        while (groupAlive() && Date.now() < grace) await delay(25);
        if (groupAlive()) {
          escalated = true;
          try { process.kill(process.platform === 'win32' ? child.pid : -child.pid, 'SIGKILL'); }
          catch (error) { if (error.code !== 'ESRCH') throw error; }
        }
      }
      await endedPromise;
      const deadline = Date.now() + 5000;
      while (groupAlive() && Date.now() < deadline) await delay(25);
      assert(!groupAlive(), `Owned subprocess group ${child.pid} did not terminate; lease retained`);
      // A forced kill could preempt nested cleanup of a detached browser. Preserve
      // the runner lease for recovery instead of claiming that cleanup succeeded.
      assert(!escalated, `Owned subprocess group ${child.pid} required SIGKILL; descendant cleanup unconfirmed, lease retained`);
    })();
    const stopInBackground = () => { void stop().catch(error => { failure = error; }); };
    if (cancellable) this.cancellation.defer(stop);
    if (capture) for (const [stream, key] of [[child.stdout, 'stdout'], [child.stderr, 'stderr']]) stream.on('data', data => {
      if (key === 'stdout') stdout += data; else stderr += data;
      if (stdout.length + stderr.length > 16 * 1024 * 1024) { failure = new Error('Subprocess output limit exceeded'); stopInBackground(); }
    });
    const timer = timeout ? setTimeout(() => { failure = new Error(`${command} timed out`); stopInBackground(); }, timeout) : undefined;
    try {
      const result = await endedPromise;
      if (failure) throw failure;
      if (cancellable) this.signal.throwIfAborted();
      assert(result.code === 0, `${command} exited ${result.code ?? result.signal}: ${stderr}`);
      return stdout;
    } finally { clearTimeout(timer); if(cancellable || stopping)await stop(); }
  }
  async command(argv) {
    return JSON.parse(await this.execute(process.execPath, [this.cli, ...argv], { capture: true, cancellable: false, timeout: this.commandTimeoutMs }));
  }
  async stopVerified(runId) {
    let state = runStatus(await this.command(['status', runId]), runId);
    if (state.phase === 'finished') return;
    await this.command(['force-stop', runId]);
    const deadline = Date.now() + this.stopTimeoutMs;
    do {
      state = runStatus(await this.command(['status', runId]), runId);
      if (state.phase === 'finished') return;
      await delay(this.pollMs);
    } while (Date.now() < deadline);
    throw new Error(`Detached run ${runId} did not confirm termination; lease retained for recovery`);
  }
  async submit(argv, onReceipt) {
    this.signal.throwIfAborted();
    // Do not kill the admission client between server acceptance and its receipt. Even
    // during cancellation, await its bounded receipt, persist it, then stop and verify.
    const submission = this.execute(process.execPath, argv, { capture: true, cancellable: false, timeout: this.commandTimeoutMs }).then(text => {
      const receipt = JSON.parse(text), id = receiptId(receipt);
      this.admittedId = id;
      onReceipt(receipt, id);
      return id;
    });
    this.cancellation.defer(async () => {
      let id;
      try { id = await submission; }
      catch (error) {
        if(this.admittedId)id=this.admittedId;
        else throw new Error(`Submission termination is unconfirmed; lease retained. Inspect external state before recovery: ${error.message}`);
      }
      await this.stopVerified(id);
    });
    const id = await submission;
    this.signal.throwIfAborted();
    return id;
  }
  async status(runId) {
    this.signal.throwIfAborted();
    const response = await this.command(['status', runId]);
    this.signal.throwIfAborted();
    return response;
  }
  async close() { try { await this.cancellation.close(); } finally { this.cancellation.uninstall(); } }
}
