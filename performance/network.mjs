import { assert, routes } from './common.mjs';

export const networkPolicy = 'terminal-requests-v2';
const lowerHeaders = headers => Object.fromEntries(Object.entries(headers ?? {}).map(([k, v]) => [k.toLowerCase(), String(v)]));
export const failureEvidence = r => ({ id: r.id, requestId: r.requestId, url: r.url, type: r.type, error: r.error, canceled: r.canceled, blockedReason: r.blockedReason });
export function collectNetwork(cdp) {
  const current = new Map(), network = [];
  const response = (r, res, type) => Object.assign(r, { url: res.url, type, status: res.status, mime: res.mimeType, cached: !!(res.fromDiskCache || res.fromServiceWorker), timing: res.timing, headerBytes: res.encodedDataLength });
  cdp.on('Network.requestWillBeSent', e => {
    const previous = current.get(e.requestId);
    if (e.redirectResponse && previous) {
      response(previous, e.redirectResponse, previous.type);
      previous.termination = 'redirect'; previous.bytes = e.redirectResponse.encodedDataLength;
    }
    const hop = previous ? previous.hop + 1 : 0;
    const r = { id: `${e.requestId}:${hop}`, requestId: e.requestId, hop, url: e.request.url, type: e.type, method: e.request.method,
      requestHeaders: lowerHeaders(e.request.headers), status: 0, mime: '', cached: false, headerBytes: 0, dataBytes: 0, decodedBytes: 0,
      bytes: 0, termination: 'pending', canceled: false, error: '', blockedReason: '' };
    if (e.redirectResponse && previous) previous.redirectTo = r.id;
    network.push(r); current.set(e.requestId, r);
  });
  cdp.on('Network.responseReceived', e => { const r = current.get(e.requestId); if (r) response(r, e.response, e.type); });
  cdp.on('Network.dataReceived', e => { const r = current.get(e.requestId); if (r) { r.dataBytes += e.encodedDataLength; r.decodedBytes += e.dataLength; } });
  cdp.on('Network.loadingFinished', e => { const r = current.get(e.requestId); if (r) { r.bytes = e.encodedDataLength; r.termination = 'finished'; } });
  cdp.on('Network.loadingFailed', e => {
    let r = current.get(e.requestId);
    // An unmatched protocol event is retained and will fail validation, never disappear.
    if (!r) { r = { id: `${e.requestId}:missing`, requestId: e.requestId, url: '', type: e.type }; network.push(r); }
    Object.assign(r, { termination: e.canceled ? 'aborted' : 'failed', error: e.errorText, canceled: !!e.canceled,
      blockedReason: e.blockedReason ?? '', bytes: (r.headerBytes ?? 0) + (r.dataBytes ?? 0) });
  });
  return { network, failures: () => network.filter(r => ['aborted', 'failed'].includes(r.termination)).map(failureEvidence) };
}
function pairedSegmentPrefetch(r, network, origin, route) {
  // Next 16's second-stage prefetch uses a refetch tree rather than the prefetch
  // flag. Require its earlier successfully completed /_tree request, same target,
  // and an unchanged document referer; arbitrary aborted RSC fetches do not qualify.
  try {
    const tree = JSON.parse(decodeURIComponent(r.requestHeaders['next-router-state-tree']));
    const url = new URL(r.url), referer = new URL(r.requestHeaders.referer);
    if (!Array.isArray(tree) || !JSON.stringify(tree).includes('"refetch"') || !route || url.pathname === route ||
        referer.origin !== origin.origin || referer.pathname !== route || r.requestHeaders['next-url'] !== route) return false;
    return network.slice(0, network.indexOf(r)).some(prior => {
      const target = new URL(prior.url);
      return target.origin === url.origin && target.pathname === url.pathname && target.searchParams.has('_rsc') && prior.type === 'Fetch' && prior.method === 'GET' &&
        prior.requestHeaders.rsc === '1' && prior.requestHeaders['next-router-prefetch'] === '1' && prior.requestHeaders['next-router-segment-prefetch'] === '/_tree' &&
        prior.requestHeaders['next-url'] === route && prior.requestHeaders.referer === r.requestHeaders.referer && prior.termination === 'finished' &&
        prior.status === 200 && prior.mime === 'text/x-component' && !prior.error && !prior.canceled;
    });
  } catch { return false; }
}
export function speculativePrefetch(r, { base, route }, network = []) {
  const url = new URL(r.url), origin = new URL(base);
  return r.type === 'Fetch' && r.method === 'GET' && url.origin === origin.origin && routes().includes(url.pathname) && url.searchParams.has('_rsc') &&
    r.requestHeaders.rsc === '1' && (r.requestHeaders['next-router-prefetch'] === '1' || typeof r.requestHeaders['next-router-segment-prefetch'] === 'string' || pairedSegmentPrefetch(r, network, origin, route));
}
export function requestClass(r, { base, kind, route }, network = []) {
  const url = new URL(r.url), origin = new URL(base);
  const successful = r.status >= 200 && r.status < 300;
  if (r.termination === 'finished' && successful && !r.error && !r.canceled && !r.blockedReason) return 'complete';
  if (r.termination === 'redirect' && r.status >= 300 && r.status < 400 && !r.error && !r.canceled) return 'redirect';
  // Chrome cancels speculative Next RSC fetches after enough segment data arrives. This
  // exception requires the actual request headers, known route, MIME and cancellation code.
  if (speculativePrefetch(r, { base, route }, network) &&
      (r.status === 0 || (successful && r.mime === 'text/x-component')) && r.termination === 'aborted' && r.canceled === true && r.error === 'net::ERR_ABORTED' && !r.blockedReason) return 'prefetch-cancel';
  // next start cannot serve Vercel's injected endpoint. Preserve raw evidence in
  // normal local audits too; deployed delivery remains strict and separately verified.
  if (kind === 'local-lab' && url.origin === origin.origin && ['127.0.0.1', 'localhost', '[::1]'].includes(origin.hostname) &&
      url.pathname === '/_vercel/insights/script.js' && !url.search && r.method === 'GET' && r.type === 'Script' && r.status === 404 &&
      (r.termination === 'finished' || (r.termination === 'aborted' && r.canceled && r.error === 'net::ERR_ABORTED')) && !r.blockedReason) return 'local-platform-analytics-404';
  throw new Error(`Unexpected incomplete/failed network request: ${r.type} ${r.url} (${r.status}, ${r.termination}, ${r.error})`);
}
export function validateNetwork(sample, environment) {
  assert(Array.isArray(sample.network) && sample.network.length > 0, 'Missing raw network evidence');
  const ids = new Set();
  for (const r of sample.network) {
    assert(typeof r.id === 'string' && r.id.length > 0 && !ids.has(r.id) && typeof r.requestId === 'string' && r.requestId.length > 0 && Number.isInteger(r.hop) && r.hop >= 0, 'Missing/duplicate request identity');
    ids.add(r.id);
    assert(typeof r.url === 'string' && ['http:', 'https:'].includes(new URL(r.url).protocol) && typeof r.type === 'string' && r.type.length > 0 && typeof r.method === 'string' && r.method.length > 0 &&
      r.requestHeaders && typeof r.requestHeaders === 'object' && !Array.isArray(r.requestHeaders) && Object.entries(r.requestHeaders).every(([k,v]) => k === k.toLowerCase() && typeof v === 'string'), 'Missing request URL/type/headers');
    assert(Number.isInteger(r.status) && r.status >= 0 && r.status <= 599 && typeof r.mime === 'string' && r.cached === false &&
      ['bytes', 'headerBytes', 'dataBytes', 'decodedBytes'].every(k => Number.isFinite(r[k]) && r[k] >= 0) &&
      typeof r.error === 'string' && typeof r.canceled === 'boolean' && typeof r.blockedReason === 'string', 'Missing/invalid raw terminal network evidence');
    requestClass(r, environment, sample.network);
    if (['aborted','failed'].includes(r.termination)) assert(r.bytes === r.headerBytes + r.dataBytes, 'Inconsistent partial transfer bytes');
    if (r.termination === 'redirect') assert(sample.network.some(next => next.id === r.redirectTo && next.requestId === r.requestId && next.hop === r.hop + 1), 'Missing redirect continuation');
  }
  assert(Array.isArray(sample.failures) && JSON.stringify(sample.failures) === JSON.stringify(sample.network.filter(r => ['aborted', 'failed'].includes(r.termination)).map(failureEvidence)), 'Missing/mismatched request failure evidence');
}

// Validate every request first. This basis excludes ALL identified speculative
// prefetches, regardless of completion, and only the allowed local platform 404.
// Raw wire totals remain authoritative for regression checks.
export function improvementTransfer(sample, environment) {
  validateNetwork(sample, environment);
  const excluded = { speculativePrefetch: 0, localPlatform: 0 };
  let eligibleBytes = 0;
  for (const r of sample.network) {
    const classification = requestClass(r, environment, sample.network);
    if (classification === 'local-platform-analytics-404') excluded.localPlatform += r.bytes;
    else if (speculativePrefetch(r, environment, sample.network)) excluded.speculativePrefetch += r.bytes;
    else eligibleBytes += r.bytes;
  }
  return { rawBytes: sample.totalBytes, eligibleBytes, excludedBytes: excluded.speculativePrefetch + excluded.localPlatform, excluded };
}
