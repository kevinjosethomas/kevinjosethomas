import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { root, assert, hash, buildStamp } from './common.mjs';

// Dependencies are injectable for lifecycle tests; the audit CLI always uses these defaults.
export function serverFactory({ readStamp = buildStamp, start = spawn, request = fetch,
  scriptHash = src => hash(fs.readFileSync(path.join(root, '.next', src.slice('/_next/'.length)))) } = {}) {
  return async function productionServer(base, dir, { signal = new AbortController().signal, registerCleanup = () => {} } = {}) {
    const stamp = readStamp();
    let child, log, stopped, exited = false, closing;
    const close = () => closing ??= (async () => {
      if (child && !exited) {
        child.kill('SIGTERM');
        await Promise.race([stopped, delay(5000, undefined, { ref: false })]);
        if (!exited) { child.kill('SIGKILL'); await stopped; }
      }
      if (child) await stopped;
      if (log) await new Promise((resolve, reject) => { log.once('error', reject); log.end(resolve); });
    })();
    // Ownership is visible before readiness or static verification can suspend initialization.
    registerCleanup(close);
    const abort = () => { void close().catch(() => {}); };
    signal.addEventListener('abort', abort, { once: true });
    try {
      signal.throwIfAborted();
      if (!base) {
        const server = net.createServer();
        await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
        const port = server.address().port;
        await new Promise(r => server.close(r));
        signal.throwIfAborted();
        base = `http://127.0.0.1:${port}`;
        log = fs.createWriteStream(path.join(dir, 'server.log'));
        child = start(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: root, env: { ...process.env, NODE_ENV: 'production' }, stdio: ['ignore', 'pipe', 'pipe'] });
        stopped = new Promise(resolve => child.once('close', resolve));
        child.stdout.pipe(log, { end: false }); child.stderr.pipe(log, { end: false });
        child.on('exit', () => { exited = true; });
        child.on('error', () => { exited = true; });
      }
      const url = new URL(base);
      assert(['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash, 'Base URL must be a credential-free origin');
      base = url.origin;
      let html;
      for (let i = 0; i < 120; i++) {
        signal.throwIfAborted();
        assert(!exited, 'Owned production server exited; inspect server.log');
        try {
          const res = await request(base, { signal: AbortSignal.any([signal, AbortSignal.timeout(2000)]) });
          if (res.ok) { html = await res.text(); break; }
        } catch { signal.throwIfAborted(); /* Readiness retries only; cancellation is never swallowed. */ }
        await delay(250, undefined, { signal });
      }
      signal.throwIfAborted();
      assert(html && !html.includes('/_next/webpack-hmr') && !html.includes('next-devtools'), 'Not a ready production server');
      const scripts = [...html.matchAll(/<script[^>]*src="([^"?]+\.js)[^"]*"/g)].map(m => m[1]).filter(s => s.startsWith('/_next/static/'));
      assert(scripts.length > 0, 'No production static scripts');
      for (const src of scripts) {
        const expected = scriptHash(src);
        const res = await request(new URL(src, base), { signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]) });
        assert(res.ok && hash(Buffer.from(await res.arrayBuffer())) === expected, 'URL static script hash differs from production build');
        signal.throwIfAborted();
      }
      return { base, stamp, close, kind: ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ? 'local-lab' : 'deployed-lab' };
    } catch (error) { await close(); throw error; }
    finally { signal.removeEventListener('abort', abort); }
  };
}
export const productionServer = serverFactory();
