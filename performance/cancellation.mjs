// Cleanup is registered before awaiting acquisition. Signals never exit the process before
// pending acquisitions and owned processes have been joined.
export class Cancellation {
  controller = new AbortController();
  tasks = [];
  closing = false;
  signalName;
  get signal() { return this.controller.signal; }
  install() {
    this.handlers = Object.fromEntries(['SIGINT', 'SIGTERM'].map(name => [name, () => {
      this.signalName ??= name;
      this.controller.abort(new Error(`Cancelled by ${name}`));
      void this.close().catch(() => {}); // The owner awaits and reports cleanup errors in finally.
    }]));
    for (const [name, handler] of Object.entries(this.handlers)) process.on(name, handler);
    return this;
  }
  defer(cleanup) {
    const entry = { cleanup };
    this.tasks.push(entry);
    if (this.closing) this.start(entry);
  }
  start(entry) { entry.promise ??= Promise.resolve().then(entry.cleanup); entry.promise.catch(() => {}); }
  async own(acquisition, cleanup) {
    this.defer(async () => { const resource = await acquisition.catch(() => undefined); if (resource) await cleanup(resource); });
    const resource = await acquisition;
    this.signal.throwIfAborted();
    return resource;
  }
  async close() {
    this.closing = true;
    this.controller.abort(new Error('Owner closing'));
    let count;
    do {
      count = this.tasks.length;
      for (const entry of this.tasks) this.start(entry);
      const results = await Promise.allSettled(this.tasks.map(entry => entry.promise));
      const errors = results.filter(r => r.status === 'rejected').map(r => r.reason);
      if (errors.length) throw new AggregateError(errors, 'Owned resource cleanup failed');
    } while (count !== this.tasks.length);
  }
  uninstall() { for (const [name, handler] of Object.entries(this.handlers ?? {})) process.removeListener(name, handler); }
  get exitCode() { return this.signalName === 'SIGINT' ? 130 : this.signalName === 'SIGTERM' ? 143 : 1; }
}
