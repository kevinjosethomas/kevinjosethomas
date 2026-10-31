import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const config = JSON.parse(fs.readFileSync(path.join(root, 'performance/config.json')));
export const hash = value => crypto.createHash('sha256').update(value).digest('hex');
export const json = file => JSON.parse(fs.readFileSync(file, 'utf8'));
export const write = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
export const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
export function assert(ok, message) { if (!ok) throw new Error(message); }
export function files(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name)).flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
}
export function runtimeFiles() {
  return [...['app','components','content','data','lib','public','types'].flatMap(files), ...['instrumentation-client.ts','mdx-components.tsx','next.config.ts','postcss.config.mjs','tsconfig.json','three.d.ts']];
}
export const manifest = list => Object.fromEntries(list.sort().map(file => [file, hash(fs.readFileSync(path.join(root, file)))]));
export const runtime = () => manifest(runtimeFiles());
export const assets = () => manifest(files('public'));
export const routes = () => ['/', '/work', ...files('content/experiences').filter(f => f.endsWith('.mdx')).map(f => `/work/${path.basename(f,'.mdx')}`).sort()];
export function args(allowed) {
  const out = {};
  for (let i = 2; i < process.argv.length; i++) {
    const key = process.argv[i].replace(/^--/, '');
    assert(process.argv[i].startsWith('--') && allowed.includes(key) && !(key in out), `Unknown/duplicate argument: ${process.argv[i]}`);
    out[key] = ['parity-only'].includes(key) ? true : process.argv[++i];
    assert(out[key] !== undefined, `Missing --${key} value`);
  }
  return out;
}
export function newEvidenceDir(dir) {
  const resolved = path.resolve(dir);
  assert(resolved.startsWith(path.join(root, '.performance') + path.sep), 'Evidence must be under ignored .performance/');
  fs.mkdirSync(resolved, { recursive: true });
  assert(fs.readdirSync(resolved).length === 0, 'Evidence directory must be empty; never overwrite a baseline');
  return resolved;
}
export async function run(command, argv, options = {}) {
  return new Promise((resolve,reject) => {
    const child = spawn(command, argv, { cwd: root, stdio: 'inherit', ...options });
    child.on('error',reject);
    child.on('exit', (code,signal) => code === 0 ? resolve() : reject(new Error(`${command} exited ${code ?? signal}`)));
  });
}
export function buildStamp() {
  const stamp = json(path.join(root,'.next/performance-build.json'));
  assert(stamp.schema === 1 && stamp.buildId === fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8').trim(), 'Missing/mismatched production build ID');
  assert(stamp.runtimeHash === hash(JSON.stringify(runtime())), 'Production build is stale for runtime source/assets; run npm run perf:build');
  assert(stamp.lockHash === hash(fs.readFileSync(path.join(root,'package-lock.json'))), 'Production build lockfile mismatch');
  return stamp;
}
export const metrics = ['lcp','cls','longTasks','tbt','jsBytes','cssBytes','totalBytes'];
export function median(values) {
  assert(values.length > 0 && values.every(n => Number.isFinite(n) && n >= 0), 'Invalid median samples');
  const a = [...values].sort((a,b)=>a-b), m=Math.floor(a.length/2);
  return a.length%2 ? a[m] : (a[m-1]+a[m])/2;
}

export function validateConfig(value) {
  assert(value?.schema===1,'Invalid performance configuration schema');
  assert(Number.isInteger(value.samples)&&value.samples>=3&&value.samples<=30,'Invalid configured sample count');
  assert(Number.isFinite(value.measurementMs)&&value.measurementMs>=5000,'Invalid measurement window');
  assert(value.viewports && JSON.stringify(Object.keys(value.viewports).sort())===JSON.stringify(['desktop','mobile']),'Desktop and mobile viewports required');
  for(const size of Object.values(value.viewports))assert(['width','height'].every(k=>Number.isInteger(size[k])&&size[k]>0),'Invalid viewport dimensions');
  assert(Array.isArray(value.timingRoutes)&&value.timingRoutes.length>0&&new Set(value.timingRoutes).size===value.timingRoutes.length&&value.timingRoutes.every(r=>typeof r==='string'&&r.startsWith('/')),'Invalid timing route configuration');
  for(const metric of metrics)assert(value.regression?.[metric]&&['absolute','relative'].every(k=>Number.isFinite(value.regression[metric][k])&&value.regression[metric][k]>=0),'Invalid regression threshold');
  for(const key of ['bytesRelative','bytesAbsolute','lcpRelative','lcpAbsolute'])assert(Number.isFinite(value.improvement?.[key])&&value.improvement[key]>0,'Invalid improvement threshold');
  assert(value.pixels?.threshold===0.05 && value.pixels.maxDifferentPixels===0 && value.pixels.includeAA===true && value.pixels.maxRawDifferentPixels===128 && value.pixels.maxChannelDelta===12,'Pixel parity must remain strict');
  assert(value.interactions&&['team','zoom','toc','hash'].every(k=>typeof value.interactions[k]==='string'&&value.interactions[k].startsWith('/work/')),'Missing interaction routes');
}
validateConfig(config);
