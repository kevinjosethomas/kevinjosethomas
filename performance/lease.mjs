import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Deliberately do not use tmpdir(), TMPDIR or HOME: execution environments may override them.
// The kernel uid and fixed OS shared directory identify the same user across all checkouts.
export const browserLeasePath = path.join(process.platform === 'darwin' ? '/private/tmp' : '/tmp', `kevin-performance-${process.getuid()}`, 'browser.lock');
export function acquireLease(file = browserLeasePath) {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const owner = fs.statSync(path.dirname(file));
  if (owner.uid !== process.getuid() || (owner.mode & 0o077)) throw new Error('Lease directory must be private and owned by the current uid');
  let fd;
  try { fd = fs.openSync(file, 'wx', 0o600); }
  catch (error) {
    if (error.code !== 'EEXIST') throw error;
    let detail = 'unreadable lease';
    try {
      const held = JSON.parse(fs.readFileSync(file, 'utf8'));
      let alive = true;
      try { process.kill(held.pid, 0); } catch (e) { if (e.code === 'ESRCH') alive = false; }
      detail = `PID ${held.pid}, ${alive ? 'live or inaccessible' : 'stale; confirm the owner exited and remove this file manually'}`;
    } catch { /* Never steal an unrecognized lease. */ }
    throw new Error(`Browser lease held (${detail}): ${file}`, { cause: error });
  }
  const token = crypto.randomUUID();
  fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, token, createdAt: new Date().toISOString() }) + '\n');
  let released = false;
  return { file, release() {
    if (released) return;
    if (JSON.parse(fs.readFileSync(file, 'utf8')).token !== token) throw new Error('Lease ownership changed; refusing removal');
    fs.unlinkSync(file); fs.closeSync(fd); released = true;
  } };
}
