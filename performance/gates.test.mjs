import test from 'node:test';
import { strict as a } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import { compare, validate } from './compare.mjs';
import { expectedScreens, expectedPath, animationPolicy, renderFlags, captureStyle } from './parity.mjs';
import { config, root, routes, hash, metrics, median } from './common.mjs';
import { externalEnvironment } from './validate-graph.mjs';
import { networkPolicy, failureEvidence } from './network.mjs';

fs.mkdirSync(path.join(root,'.performance'),{recursive:true});
const temp=fs.mkdtempSync(path.join(root,'.performance/gate-tests-'));
const bdir=path.join(temp,'baseline'),cdir=path.join(temp,'candidate');
for(const dir of [bdir,cdir])fs.mkdirSync(path.join(dir,'screenshots'),{recursive:true});
const images={};
for(const [name,size] of Object.entries(config.viewports)) {
  const png=new PNG({...size});png.data.fill(255);
  const bytes=PNG.sync.write(png),file=`screenshots/${hash(name).slice(0,24)}.png`;
  for(const dir of [bdir,cdir])fs.writeFileSync(path.join(dir,file),bytes);
  images[name]={file,sha256:hash(bytes)};
}
const publicAssets={'public/cover.webp':hash('original full-quality image')};
const sourceFiles={'app/page.tsx':hash('original source'),'instrumentation-client.ts':hash('analytics client'),'lib/posthog.ts':hash('analytics server'),...publicAssets};
const sourceHash=hash(JSON.stringify(sourceFiles));
const baseline={networkPolicy,base:'http://localhost',schema:1,complete:true,proofOnly:false,kind:'local-lab',fieldData:false,config,configHash:hash(JSON.stringify(config)),routes:routes(),samples:3,
  source:{revision:'a'.repeat(40),runtime:sourceFiles,runtimeHash:sourceHash,publicAssets},build:{schema:1,buildId:'test-production-build',runtimeHash:sourceHash,lockHash:hash('lock')},
  tools:{node:'v20.20.0',platform:'darwin',arch:'arm64',playwright:'1.58.2',browser:'test-chromium',executablePath:'/chrome'},timings:{},medians:{},parity:{complete:true,animationPolicy,captureStyle,renderFlags,browserVersion:'test-chromium',errors:[],shots:{}}};
for(const route of config.timingRoutes) {
  baseline.timings[route]=[0,1,2].map(index=>({index,lcp:600+index*5,cls:0.001,longTasks:100,tbt:40,jsBytes:100000,cssBytes:10000,totalBytes:200000,
    network:[{url:'http://localhost/main.js',type:'Script',status:200,bytes:100000,cached:false},{url:'http://localhost/main.css',type:'Stylesheet',status:200,bytes:10000,cached:false},{url:'http://localhost/',type:'Document',status:200,bytes:90000,cached:false}],errors:[],failures:[]}));
  baseline.medians[route]=Object.fromEntries(metrics.map(k=>[k,median(baseline.timings[route].map(s=>s[k]))]));
}
for(const list of Object.values(baseline.timings))for(const sample of list)sample.network.forEach((r,index)=>Object.assign(r,{id:`test-${index}:0`,requestId:`test-${index}`,hop:0,method:'GET',requestHeaders:{},mime:'application/octet-stream',headerBytes:100,dataBytes:r.bytes-100,decodedBytes:r.bytes-100,termination:'finished',canceled:false,error:'',blockedReason:''}));
for(const key of expectedScreens(baseline.routes))baseline.parity.shots[key]={...images[key.split(':')[0]],masks:[],scroll:{x:0,y:0,height:2000},content:{text:'Kevin Thomas\nOriginal content',title:'Kevin Thomas',path:expectedPath(key),lang:'en',headings:[{tag:'H1',text:'Kevin Thomas',id:''}],links:[{href:'/work',target:null}],images:[{src:'/cover.webp',alt:'Original'}],metadata:[{name:'description',content:'Original'}],controls:[],animations:[]}};
const candidate=()=>{
  const c=structuredClone(baseline);c.source.runtime['app/page.tsx']=hash('focused bundle change');c.source.runtimeHash=hash(JSON.stringify(c.source.runtime));c.build.runtimeHash=c.source.runtimeHash;return c;
};
function change(c,route,metric,value) {
  for(const s of c.timings[route]) {
    const delta=value-s[metric];s[metric]=value;
    if(metric==='jsBytes'){s.network[0].bytes+=delta;s.totalBytes+=delta;}
    if(metric==='cssBytes'){s.network[1].bytes+=delta;s.totalBytes+=delta;}
    if(metric==='totalBytes')s.network[2].bytes+=delta;
  }
  c.medians[route]=Object.fromEntries(metrics.map(k=>[k,median(c.timings[route].map(s=>s[k]))]));
}
const gate=c=>compare(baseline,c,bdir,cdir);
test.after(()=>fs.rmSync(temp,{recursive:true,force:true}));
test('unchanged source is plateau even when timing happens to improve',()=>{
  const c=structuredClone(baseline);for(const r of config.timingRoutes)change(c,r,'lcp',400);
  a.equal(gate(c).reason,'plateau');a.equal(gate(c).accepted,false);
});
test('parity-only passes unchanged screenshots but is never an optimization',()=>{
  const result=compare(baseline,baseline,bdir,cdir,{parityOnly:true});
  a.equal(result.parityPassed,true);a.equal(result.accepted,false);a.equal(result.optimizationEligible,false);
});
test('stable meaningful JS reduction can be accepted',()=>{
  const c=candidate();change(c,'/','jsBytes',97000);a.equal(gate(c).accepted,true);
});
test('2047 bytes saved and changes within noise are plateau',()=>{
  const c=candidate();change(c,'/','jsBytes',97953);a.equal(gate(c).reason,'plateau');
});
test('a regression on another route vetoes a real improvement',()=>{
  const c=candidate();change(c,'/','jsBytes',97000);change(c,'/work','lcp',1000);
  const result=gate(c);a.equal(result.reason,'regression');a.equal(result.accepted,false);a.ok(result.regressions.some(r=>r.route==='/work'&&r.metric==='lcp'));
});
test('CLS/long task/transfer regressions cannot hide behind faster LCP',()=>{
  for(const [metric,value] of [['cls',0.1],['longTasks',300],['tbt',150],['jsBytes',110000],['cssBytes',15000],['totalBytes',240000]]) {
    const c=candidate();change(c,'/','lcp',400);change(c,'/work',metric,value);a.equal(gate(c).accepted,false,metric);
  }
});
test('empty, partial, non-finite, missing and inconsistent raw samples fail closed',()=>{
  for(const mutate of [c=>{c.complete=false;},c=>{c.samples=2;},c=>{c.timings['/']=[];},c=>{delete c.timings['/work'];},c=>{c.timings['/'][0].lcp=NaN;},c=>{c.timings['/'][0].cls=null;},c=>{c.timings['/'][0].jsBytes=0;},c=>{c.timings['/'][0].network=[];},c=>{c.timings['/'][0].network[0].bytes--;},c=>{c.medians['/'].lcp++;},c=>{delete c.tools.browser;},c=>{delete c.build;},c=>{c.build.runtimeHash=hash('stale');}]) {
    const c=candidate();mutate(c);a.throws(()=>validate(c));
  }
});
test('routes, browser, config, sample count and absent screenshots must match',()=>{
  for(const mutate of [c=>{c.routes.pop();},c=>{c.tools.browser='other';},c=>{c.configHash=hash('other');},c=>{delete c.parity.shots[Object.keys(c.parity.shots)[0]];}]) {const c=candidate();mutate(c);a.throws(()=>gate(c));}
});
test('copy, external link targets, image alt/src, metadata and control changes fail',()=>{
  for(const mutate of [c=>{c.text+=' changed';},c=>{c.links[0].target='_blank';},c=>{c.images[0].alt='changed';},c=>{c.images[0].src='/lower-quality.webp';},c=>{c.metadata[0].content='changed';},c=>{c.controls.push({role:'dialog'});}]) {
    const c=candidate();mutate(Object.values(c.parity.shots)[0].content);a.throws(()=>gate(c),/Content\/interaction\/metadata changed/);
  }
});
test('asset replacement cannot be hidden by a GIF mask',()=>{
  const c=candidate();c.source.publicAssets['public/cover.webp']=hash('lossy replacement');c.source.runtime['public/cover.webp']=c.source.publicAssets['public/cover.webp'];c.source.runtimeHash=hash(JSON.stringify(c.source.runtime));c.build.runtimeHash=c.source.runtimeHash;
  a.throws(()=>gate(c),/Public assets changed/);
  const d=candidate();Object.values(d.parity.shots)[0].masks=[{url:'/cover.webp',sha256:publicAssets['public/cover.webp']}];a.throws(()=>gate(d),/masking/);
});
test('one changed pixel fails at zero tolerance even with a valid new digest',()=>{
  const c=candidate(),key=Object.keys(c.parity.shots)[0],old=c.parity.shots[key];
  const png=PNG.sync.read(fs.readFileSync(path.join(cdir,old.file)));png.data[0]=0;
  const bytes=PNG.sync.write(png),file=`screenshots/${hash('one-pixel').slice(0,24)}.png`;
  fs.writeFileSync(path.join(cdir,file),bytes);c.parity.shots[key]={...old,file,sha256:hash(bytes)};
  a.throws(()=>gate(c),/Screenshot changed/);
});
test('missing or corrupted PNGs fail before any approval',()=>{
  const c=candidate();Object.values(c.parity.shots)[0].file=`screenshots/${'f'.repeat(24)}.png`;a.throws(()=>gate(c),/ENOENT/);
});
test('repository and external state must not overlap, including symlink aliases',()=>{
  a.throws(()=>externalEnvironment(root),/disjoint/);a.throws(()=>externalEnvironment(path.dirname(root)),/disjoint/);
  const link=path.join(temp,'alias');fs.symlinkSync(root,link);a.throws(()=>externalEnvironment(link),/disjoint/);
});

test('threshold boundary and separated LCP improvement qualify, overlapping timing does not',()=>{
  const exact=candidate();change(exact,'/','jsBytes',97952);a.equal(gate(exact).accepted,true);
  const fast=candidate();change(fast,'/','lcp',500);a.equal(gate(fast).accepted,true);
  const noisy=candidate();[400,450,620].forEach((lcp,i)=>noisy.timings['/'][i].lcp=lcp);noisy.medians['/'].lcp=450;a.equal(gate(noisy).reason,'plateau');
});

test('analytics source cannot be deleted or changed behind visual parity',()=>{
  const c=candidate();c.source.runtime['instrumentation-client.ts']=hash('analytics removed');c.source.runtimeHash=hash(JSON.stringify(c.source.runtime));c.build.runtimeHash=c.source.runtimeHash;
  a.throws(()=>gate(c),/Analytics runtime changed/);
});

test('existing runtime errors block normal optimization; explicit proof retains and compares them without acceptance',()=>{
  const b=structuredClone(baseline),c=candidate();b.parity.errors=[{viewport:'desktop',path:'/work/intellect',message:'React hydration error'}];c.parity.errors=structuredClone(b.parity.errors);
  a.throws(()=>compare(b,c,bdir,cdir),/interaction evidence/);
  b.proofOnly=true;c.proofOnly=true;change(c,'/','jsBytes',97000);
  const result=compare(b,c,bdir,cdir,{parityOnly:true});a.equal(result.accepted,false);a.equal(result.optimizationEligible,false);a.equal(result.runtimeErrors.length,1);
  c.parity.errors.push({viewport:'mobile',path:'/work/intellect',message:'new error'});a.throws(()=>compare(b,c,bdir,cdir),/Runtime error behavior changed/);
});

test('raw count and channel bounds veto subtle differences below Pixelmatch threshold',()=>{
  for(const [name,count,delta] of [['channel-limit',1,13],['raw-count-limit',129,1]]) {
    const c=candidate(),key=Object.keys(c.parity.shots)[0],shot=c.parity.shots[key];
    const png=PNG.sync.read(fs.readFileSync(path.join(cdir,shot.file)));
    for(let i=0;i<count;i++)for(let channel=0;channel<3;channel++)png.data[i*4+channel]-=delta;
    const bytes=PNG.sync.write(png);shot.file=`screenshots/${hash(name).slice(0,24)}.png`;shot.sha256=hash(bytes);fs.writeFileSync(path.join(cdir,shot.file),bytes);
    a.throws(()=>gate(c),/Screenshot changed/);
  }
});

test('unmounted content/data cannot change while viewport and interaction fixtures look identical',()=>{
  const c=candidate();c.source.runtime['data/experiences.ts']=hash('changed hidden team link');c.source.runtimeHash=hash(JSON.stringify(c.source.runtime));c.build.runtimeHash=c.source.runtimeHash;
  a.throws(()=>gate(c),/Content\/data source changed/);
});

test('an interrupted HTTP-200 image cannot manufacture transferred-byte improvement',()=>{
  for(const type of ['Image','Script','Stylesheet','Font','Fetch'])for(const termination of ['aborted','failed','pending',undefined]) {
    const c=candidate();change(c,'/','totalBytes',150000);
    for(const s of c.timings['/']) {
      const r=s.network[2];r.type=type;r.url='http://localhost/kos-mujoco.gif';r.termination=termination;
      if(termination==='aborted'||termination==='failed') {
        r.canceled=termination==='aborted';r.error=termination==='aborted'?'net::ERR_ABORTED':'net::ERR_CONNECTION_RESET';
        r.headerBytes=100;r.dataBytes=r.bytes-100;s.failures=[failureEvidence(r)];
      }
    }
    a.throws(()=>gate(c),/network request/);
  }
});
test('failure records cannot be dropped or disconnected from their request',()=>{
  const c=candidate();c.timings['/'][0].failures=[{requestId:'orphan',url:'http://localhost/unseen.js',type:'Script',error:'net::ERR_FAILED'}];
  a.throws(()=>validate(c),/failure evidence/);
});
test('only identified speculative Next fetch cancellation is allowed, never a required asset',()=>{
  const c=candidate();
  const s=c.timings['/'][0],r=s.network[2];
  Object.assign(r,{url:'http://localhost/work?_rsc=abc',type:'Fetch',mime:'text/x-component',requestHeaders:{rsc:'1','next-router-prefetch':'1'},termination:'aborted',canceled:true,error:'net::ERR_ABORTED'});
  r.dataBytes=r.bytes-r.headerBytes;s.failures=[failureEvidence(r)];
  a.doesNotThrow(()=>validate(c));
  for(const mutate of [r=>{r.requestHeaders={};},r=>{r.type='Image';},r=>{r.url='http://other.test/work?_rsc=abc';},r=>{r.error='net::ERR_CONNECTION_RESET';},r=>{r.mime='image/gif';}]) {
    const d=structuredClone(c),sample=d.timings['/'][0];mutate(sample.network[2]);sample.failures=[failureEvidence(sample.network[2])];a.throws(()=>validate(d),/network request/);
  }
});
test('partial prefetch bytes are measured but cannot qualify as total-byte savings',()=>{
  const b=structuredClone(baseline),c=candidate();
  for(const report of [b,c])for(const sample of report.timings['/']) {
    const r=sample.network[2];Object.assign(r,{url:'http://localhost/work?_rsc=abc',type:'Fetch',mime:'text/x-component',requestHeaders:{rsc:'1','next-router-prefetch':'1'},termination:'aborted',canceled:true,error:'net::ERR_ABORTED'});
    if(report===c){r.bytes-=50000;sample.totalBytes-=50000;}r.dataBytes=r.bytes-r.headerBytes;sample.failures=[failureEvidence(r)];
  }
  c.medians['/'].totalBytes=150000;
  a.equal(compare(b,c,bdir,cdir).accepted,false);
});

test('Next16 second-stage cancellation needs an earlier successful matching tree prefetch',()=>{
  const c=candidate();
  for(const s of c.timings['/']) {
    const r=s.network[2];
    const headers={rsc:'1',referer:'http://localhost/','next-url':'/'};
    const prior={...structuredClone(r),id:'prefetch-tree:0',requestId:'prefetch-tree',url:'http://localhost/work?_rsc=tree',type:'Fetch',mime:'text/x-component',bytes:1000,headerBytes:100,dataBytes:900,decodedBytes:900,requestHeaders:{...headers,'next-router-prefetch':'1','next-router-segment-prefetch':'/_tree'}};
    s.network.splice(2,0,prior);s.totalBytes+=prior.bytes;
    Object.assign(r,{url:'http://localhost/work?_rsc=segments',type:'Fetch',mime:'text/x-component',requestHeaders:{...headers,'next-router-state-tree':encodeURIComponent(JSON.stringify(['',{},null,'refetch']))},termination:'aborted',canceled:true,error:'net::ERR_ABORTED'});
    s.failures=[failureEvidence(r)];
  }
  c.medians['/'].totalBytes+=1000;
  a.doesNotThrow(()=>validate(c));
  for(const mutate of [s=>{s.network[2].requestHeaders['next-router-segment-prefetch']='/wrong';},s=>{s.network[2].url='http://localhost/work/asl?_rsc=tree';},s=>{s.network[3].requestHeaders.referer='http://localhost/work/asl';},s=>{s.network[3].requestHeaders['next-url']='/work';},s=>{s.network[3].requestHeaders['next-router-state-tree']='invalid';}]) {
    const d=structuredClone(c);mutate(d.timings['/'][0]);a.throws(()=>validate(d),/network request/);
  }
});

function summarizeTransfers(report) {
  for (const route of config.timingRoutes) {
    for (const s of report.timings[route]) {
      s.totalBytes=s.network.reduce((n,r)=>n+r.bytes,0);
      s.jsBytes=s.network.filter(r=>r.type==='Script').reduce((n,r)=>n+r.bytes,0);
      s.failures=s.network.filter(r=>['aborted','failed'].includes(r.termination)).map(failureEvidence);
    }
    report.medians[route]=Object.fromEntries(metrics.map(k=>[k,median(report.timings[route].map(s=>s[k]))]));
  }
}
function addPlatform(report) {
  for(const s of report.timings['/'])s.network.push({...structuredClone(s.network[0]),id:'platform:0',requestId:'platform',url:'http://localhost/_vercel/insights/script.js',status:404,bytes:300,headerBytes:100,dataBytes:200});
  summarizeTransfers(report);
}
test('normal local platform 404 is retained; deployed, non-loopback and other assets reject',()=>{
  const b=structuredClone(baseline),c=candidate();addPlatform(b);addPlatform(c);
  a.doesNotThrow(()=>validate(c));a.equal(compare(b,c,bdir,cdir).accepted,false);
  for(const mutate of [d=>{d.kind='deployed-lab';},d=>{d.base='https://example.com';},d=>{d.timings['/'][0].network.at(-1).url='http://localhost/other.js';},d=>{d.timings['/'][0].network.at(-1).url+='?other=1';},d=>{d.timings['/'][0].network.at(-1).type='Image';}]) {
    const d=structuredClone(c);mutate(d);a.throws(()=>validate(d),/network request/);
  }
});
test('completed to canceled prefetch cannot create gain; complete image/font savings still qualify',()=>{
  for(const resource of ['Image','Font']) {
    const b=structuredClone(baseline),c=candidate();
    for(const report of [b,c]) {
      addPlatform(report);
      for(const s of report.timings['/']) {
        const required=s.network[2];required.type=resource;required.url=`http://localhost/required.${resource}`;
        const prefetch={...structuredClone(required),id:'speculative:0',requestId:'speculative',url:'http://localhost/work?_rsc=abc',type:'Fetch',mime:'text/x-component',requestHeaders:{rsc:'1','next-router-prefetch':'1'},bytes:50000,headerBytes:100,dataBytes:49900};
        if(report===c)Object.assign(prefetch,{bytes:1000,dataBytes:900,termination:'aborted',canceled:true,error:'net::ERR_ABORTED'});
        s.network.push(prefetch);
      }
      summarizeTransfers(report);
    }
    const noGain=compare(b,c,bdir,cdir);a.equal(noGain.accepted,false);
    const basis=noGain.transferBasis.find(r=>r.route==='/');
    a.equal(basis.baseline.medians.eligibleBytes,basis.candidate.medians.eligibleBytes);
    a.equal(basis.baseline.medians.excludedBytes,50300);a.equal(basis.candidate.medians.excludedBytes,1300);
    for(const s of c.timings['/'])s.network[2].bytes-=6000;
    summarizeTransfers(c);
    const gain=compare(b,c,bdir,cdir);a.equal(gain.accepted,true);
    a.ok(gain.improvements.some(i=>i.metric==='totalBytes'&&i.saved===6000&&i.denominator===250300));
    // Overlap and the raw-total denominator both remain conservative.
    c.timings['/'][0].network[2].bytes+=6000;summarizeTransfers(c);
    a.equal(compare(b,c,bdir,cdir).accepted,false);
  }
});
