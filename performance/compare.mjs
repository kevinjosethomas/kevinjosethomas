import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { networkPolicy, validateNetwork, improvementTransfer } from './network.mjs';
import { config, metrics, median, routes, hash, assert, json, args, write } from './common.mjs';
import { expectedScreens, expectedPath, animatedGifPaths, animationPolicy, renderFlags, captureStyle } from './parity.mjs';

const equal=(a,b,message)=>assert(JSON.stringify(a)===JSON.stringify(b),message);
const nonempty=value=>value && typeof value==='object' && !Array.isArray(value) && Object.keys(value).length>0;
const digest=value=>typeof value==='string' && /^[a-f0-9]{64}$/.test(value);
export function validate(report) {
  assert(report?.schema===1 && report.complete===true && typeof report.proofOnly==='boolean','Incomplete/missing audit evidence');
  assert(report.networkPolicy===networkPolicy,'Missing/mismatched network lifecycle policy; recapture evidence');
  assert(report.fieldData===false && ['local-lab','deployed-lab'].includes(report.kind),'Unknown measurement environment');
  equal(report.config,config,'Audit configuration mismatch');
  assert(report.configHash===hash(JSON.stringify(config)),'Configuration hash mismatch');
  equal(report.routes,routes(),'Missing/mismatched route coverage');
  assert(report.source && /^[a-f0-9]{40}$/.test(report.source.revision),'Missing source revision');
  assert(nonempty(report.source.runtime) && Object.values(report.source.runtime).every(digest),'Missing runtime manifest');
  assert(report.source.runtimeHash===hash(JSON.stringify(report.source.runtime)),'Runtime digest mismatch');
  assert(nonempty(report.source.publicAssets) && Object.values(report.source.publicAssets).every(digest),'Missing public asset manifest');
  equal(Object.fromEntries(Object.entries(report.source.runtime).filter(([p])=>p.startsWith('public/'))),report.source.publicAssets,'Asset/runtime manifest mismatch');
  assert(report.build?.schema===1 && typeof report.build.buildId==='string' && report.build.buildId.length>0 && digest(report.build.lockHash) && report.build.runtimeHash===report.source.runtimeHash,'Missing/mismatched production build provenance');
  assert(report.tools && ['node','platform','arch','playwright','browser','executablePath'].every(k=>typeof report.tools[k]==='string'&&report.tools[k].length>0),'Missing tool provenance');
  assert(Number.isInteger(report.samples) && report.samples>=3 && report.samples<=30,'Insufficient samples');
  equal(Object.keys(report.timings??{}).sort(),[...config.timingRoutes].sort(),'Missing/mismatched timing routes');
  equal(Object.keys(report.medians??{}).sort(),[...config.timingRoutes].sort(),'Missing timing summaries');
  for(const route of config.timingRoutes) {
    const list=report.timings[route];assert(Array.isArray(list)&&list.length===report.samples,`Missing samples: ${route}`);
    list.forEach((sample,index)=>{
      assert(sample.index===index && metrics.every(k=>Number.isFinite(sample[k])&&sample[k]>=0),`Invalid/non-finite sample: ${route}`);
      assert(sample.lcp>0 && sample.jsBytes>0 && sample.cssBytes>0 && sample.totalBytes>=sample.jsBytes+sample.cssBytes,`Empty sample: ${route}`);
      validateNetwork(sample,{...report,route});
      for(const [metric,type] of [['jsBytes','Script'],['cssBytes','Stylesheet'],['totalBytes',null]]) {
        const total=sample.network.filter(r=>type===null||r.type===type).reduce((n,r)=>n+r.bytes,0);
        assert(total===sample[metric],'Raw transfer totals do not match');
      }
      assert(Array.isArray(sample.errors)&&sample.errors.length===0 && Array.isArray(sample.failures),'Missing/errorful runtime evidence');
    });
    for(const k of metrics)assert(report.medians[route][k]===median(list.map(s=>s[k])),`Invalid median: ${route}/${k}`);
  }
  assert(report.parity?.complete===true && report.parity.animationPolicy===animationPolicy && Array.isArray(report.parity.errors)&&(report.proofOnly || report.parity.errors.length===0),'Missing/failed interaction evidence');
  equal(report.parity.captureStyle,captureStyle,'Parity capture style mismatch');
  equal(report.parity.renderFlags,renderFlags,'Parity renderer configuration mismatch');
  assert(report.parity.browserVersion===report.tools.browser,'Parity browser version mismatch');
  assert(report.parity.errors.every(e=>e && Object.keys(config.viewports).includes(e.viewport) && typeof e.path==='string' && report.routes.includes(e.path.split('#')[0]) && typeof e.message==='string' && e.message.length>0),'Invalid raw runtime error evidence');
  equal(Object.keys(report.parity.shots??{}).sort(),expectedScreens(report.routes),'Missing/mismatched screenshots or interaction states');
  for(const [key,shot] of Object.entries(report.parity.shots)) {
    assert(typeof shot.file==='string' && /^screenshots\/[a-f0-9]{24}\.png$/.test(shot.file) && digest(shot.sha256),`Invalid screenshot: ${key}`);
    const c=shot.content;
    assert(c && typeof c.text==='string' && c.text.trim().length>0 && typeof c.title==='string'&&c.title.length>0 && typeof c.path==='string'&&c.lang==='en','Empty content evidence');
    assert(c.path===expectedPath(key),`Route/state URL mismatch: ${key}`);
    for(const k of ['headings','links','images','metadata','controls','animations'])assert(Array.isArray(c[k]),`Missing content field: ${k}`);
    assert(c.links.length>0 && c.metadata.length>0,'Empty links/metadata');
    assert(shot.scroll && ['x','y','height'].every(k=>Number.isFinite(shot.scroll[k])&&shot.scroll[k]>=0),'Missing scroll evidence');
    assert(Array.isArray(shot.masks)&&shot.masks.every(m=>animatedGifPaths.includes(m.url)&&m.sha256===report.source.publicAssets[`public${m.url}`]),'Unapproved screenshot masking');
  }
}
export function compare(baseline,candidate,baselineDir,candidateDir,{parityOnly=false}={}) {
  validate(baseline);validate(candidate);
  equal(baseline.proofOnly,candidate.proofOnly,'Proof/optimization evidence mode mismatch');
  equal(baseline.parity.errors,candidate.parity.errors,'Runtime error behavior changed');
  equal(baseline.kind,candidate.kind,'Local/deployed measurement mismatch');
  equal(baseline.tools,candidate.tools,'Browser/tool/platform mismatch');
  equal(baseline.samples,candidate.samples,'Sample count mismatch');
  equal(baseline.source.publicAssets,candidate.source.publicAssets,'Public assets changed (image quality/content gate)');
  for(const file of ['instrumentation-client.ts','lib/posthog.ts']) {
    assert(digest(baseline.source.runtime[file]) && baseline.source.runtime[file]===candidate.source.runtime[file],`Analytics runtime changed: ${file}`);
  }
  const analyticPaths=report=>Object.fromEntries(config.timingRoutes.map(route=>[route,[...new Set(report.timings[route].flatMap(s=>s.network).filter(r=>/\/_vercel\/|\/relay-mgKa\/|\/ingest\/|posthog\.com|vercel-insights\.com/.test(r.url)).map(r=>new URL(r.url).pathname))].sort()]));
  equal(analyticPaths(baseline),analyticPaths(candidate),'Analytics request coverage changed');
  const contentSources=report=>Object.fromEntries(Object.entries(report.source.runtime).filter(([file])=>file.startsWith('content/')||file.startsWith('data/')));
  equal(contentSources(baseline),contentSources(candidate),'Content/data source changed, including unmounted interaction content');
  const pixelDeltas=[];
  for(const key of expectedScreens(baseline.routes)) {
    const b=baseline.parity.shots[key],c=candidate.parity.shots[key];
    equal(b.content,c.content,`Content/interaction/metadata changed: ${key}`);
    equal(b.masks,c.masks,`GIF mask changed: ${key}`);
    equal(b.scroll,c.scroll,`Layout/scroll changed: ${key}`);
    const load=(dir,shot)=>{const bytes=fs.readFileSync(path.join(dir,shot.file));assert(hash(bytes)===shot.sha256,`Screenshot digest mismatch: ${key}`);return PNG.sync.read(bytes);};
    const bp=load(baselineDir,b),cp=load(candidateDir,c);
    const viewport=config.viewports[key.split(':')[0]];
    assert(bp.width===viewport.width && bp.height===viewport.height && bp.width===cp.width && bp.height===cp.height,`Screenshot dimensions mismatch: ${key}`);
    let rawDifferent=0,maxChannelDelta=0;
    if(b.sha256!==c.sha256)for(let i=0;i<bp.data.length;i+=4) {
      if(bp.data[i]!==cp.data[i] || bp.data[i+1]!==cp.data[i+1] || bp.data[i+2]!==cp.data[i+2] || bp.data[i+3]!==cp.data[i+3]) {
        rawDifferent++;
        for(let channel=0;channel<4;channel++)maxChannelDelta=Math.max(maxChannelDelta,Math.abs(bp.data[i+channel]-cp.data[i+channel]));
      }
    }
    const different=rawDifferent===0?0:pixelmatch(bp.data,cp.data,null,bp.width,bp.height,{threshold:config.pixels.threshold,includeAA:config.pixels.includeAA});
    pixelDeltas.push({key,different,rawDifferent,maxChannelDelta});
    assert(different<=config.pixels.maxDifferentPixels && rawDifferent<=config.pixels.maxRawDifferentPixels && maxChannelDelta<=config.pixels.maxChannelDelta,`Screenshot changed: ${key} (${different} significant, ${rawDifferent} raw pixels, maximum channel delta ${maxChannelDelta})`);
  }
  const deltas=[],regressions=[],improvements=[],transferBasis=[];
  for(const route of config.timingRoutes) {
    for(const metric of metrics) {
      const b=baseline.medians[route][metric],c=candidate.medians[route][metric],delta=c-b,relative=b===0?(c===0?0:null):delta/b;
      const rule=config.regression[metric],allowed=Math.max(rule.absolute,b*rule.relative);
      deltas.push({route,metric,baseline:b,candidate:c,delta,relative,allowedRegression:allowed});
      if(delta>allowed)regressions.push({route,metric,delta,allowed});
    }
    const rule=config.improvement;
    for(const metric of ['jsBytes','totalBytes']) {
      const summarize = report => {
        const samples = report.timings[route].map(s => improvementTransfer(s, {...report, route}));
        return { samples, medians: Object.fromEntries(['rawBytes','eligibleBytes','excludedBytes'].map(k => [k, median(samples.map(s => s[k]))])),
          medianExcluded: Object.fromEntries(['speculativePrefetch','localPlatform'].map(k => [k, median(samples.map(s => s.excluded[k]))])) };
      };
      const basis = metric === 'totalBytes' ? { route, metric, basis: 'complete-required-resources', baseline: summarize(baseline), candidate: summarize(candidate), denominator: baseline.medians[route].totalBytes } : null;
      if (basis) transferBasis.push(basis);
      // All-sample separation; the raw baseline total is the conservative denominator.
      const values = report => basis ? (report === baseline ? basis.baseline : basis.candidate).samples.map(s => s.eligibleBytes) : report.timings[route].map(s => s[metric]);
      const saved=Math.min(...values(baseline))-Math.max(...values(candidate));
      if(saved>=rule.bytesAbsolute && saved/baseline.medians[route][metric]>=rule.bytesRelative)improvements.push({route,metric,saved,...(basis ? {basis:basis.basis,denominator:basis.denominator} : {})});
    }
    const b=baseline.medians[route].lcp,c=candidate.medians[route].lcp;
    const separated=Math.max(...candidate.timings[route].map(s=>s.lcp))<Math.min(...baseline.timings[route].map(s=>s.lcp));
    if(b-c>=rule.lcpAbsolute && (b-c)/b>=rule.lcpRelative && separated)improvements.push({route,metric:'lcp',saved:b-c});
  }
  const changed=baseline.source.runtimeHash!==candidate.source.runtimeHash || baseline.build.lockHash!==candidate.build.lockHash;
  const proofOnly=baseline.proofOnly || candidate.proofOnly;
  const accepted=!parityOnly && !proofOnly && regressions.length===0 && improvements.length>0 && changed;
  const reason=parityOnly?'parity-only':regressions.length?'regression':!changed||improvements.length===0?'plateau':proofOnly?'proof-only':'accepted';
  return {schema:1,accepted,parityPassed:true,performancePassed:regressions.length===0,reason,optimizationEligible:!parityOnly&&!proofOnly,runtimeErrors:baseline.parity.errors,proofOnly,thresholds:config,deltas,transferBasis,pixelDeltas,regressions,improvements:changed?improvements:[]};
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  let options;
  try {
    options=args(['baseline','candidate','out','parity-only']);
    assert(options.baseline&&options.candidate,'--baseline and --candidate audit directories required');
    const result=compare(json(path.join(options.baseline,'audit.json')),json(path.join(options.candidate,'audit.json')),options.baseline,options.candidate,{parityOnly:options['parity-only']});
    if(options.out) { assert(path.resolve(options.out).includes(`${path.sep}.performance${path.sep}`),'Comparison report must be under .performance/');write(options.out,result); }
    console.log(JSON.stringify(result,null,2));
    process.exitCode=options['parity-only']?0:result.accepted?0:result.reason==='plateau'?2:1;
  } catch(error) {console.error(JSON.stringify({accepted:false,reason:'invalid-evidence',error:error.message}));process.exitCode=1;}
}
