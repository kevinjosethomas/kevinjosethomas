import fs from 'node:fs';
import path from 'node:path';
import { root, run, runtime, hash, write } from './common.mjs';
import { acquireLease } from './lease.mjs';
// Next's native build lock protects against a supervisor/another Next build.
const lock = path.join(root,'.performance/build.lock');
const lease=acquireLease();
let fd;
try {
  fs.mkdirSync(path.dirname(lock), { recursive: true });
  fd=fs.openSync(lock,'wx');
  const sourceHash=hash(JSON.stringify(runtime()));
  const lockHash=hash(fs.readFileSync(path.join(root,'package-lock.json')));
  await run('npm',['run','build']);
  if(sourceHash!==hash(JSON.stringify(runtime())) || lockHash!==hash(fs.readFileSync(path.join(root,'package-lock.json'))))throw new Error('Source/lockfile changed during production build');
  write(path.join(root,'.next/performance-build.json'), {
    schema:1, buildId:fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8').trim(),
    runtimeHash:hash(JSON.stringify(runtime())), lockHash:hash(fs.readFileSync(path.join(root,'package-lock.json'))),
    node:process.version, builtAt:new Date().toISOString()
  });
} finally {
  try { if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);} }
  finally { lease.release(); }
}
