import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { config, args, assert, newEvidenceDir, routes, runtime, assets, git, hash, write, metrics, median } from './common.mjs';
import { productionServer } from './server.mjs';
import { captureParity, renderFlags } from './parity.mjs';
import { acquireLease } from './lease.mjs';
import { Cancellation } from './cancellation.mjs';
import { collectNetwork, validateNetwork, networkPolicy } from './network.mjs';

const options=args(['out','base-url','samples','chrome','parity-only']);
assert(options.out,'--out required');
const samples=Number(options.samples ?? config.samples);
assert(Number.isInteger(samples) && samples>=3 && samples<=30,'Samples must be an integer in [3,30]');
const dir=newEvidenceDir(options.out);
const lease=acquireLease();
const cancellation=new Cancellation().install();
let service,browser;
try {
  const source=runtime();
  service=await productionServer(options['base-url'],dir,{signal:cancellation.signal,registerCleanup:cleanup=>cancellation.defer(cleanup)});
  const executablePath=options.chrome || process.env.PERFORMANCE_CHROME || (process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined);
  browser=await cancellation.own(chromium.launch({executablePath,headless:true}),b=>b.close());
  const allRoutes=routes();
  assert(config.timingRoutes.every(r=>allRoutes.includes(r)),'Unknown timing route');
  const report={schema:1,complete:false,proofOnly:Boolean(options['parity-only']),createdAt:new Date().toISOString(),kind:service.kind,fieldData:false,
    source:{revision:git('rev-parse','HEAD'),status:git('status','--porcelain'),runtime:source,runtimeHash:hash(JSON.stringify(source)),publicAssets:assets()},
    build:service.stamp,tools:{node:process.version,platform:process.platform,arch:process.arch,playwright:JSON.parse(fs.readFileSync(new URL('../node_modules/playwright/package.json',import.meta.url))).version, browser:browser.version(),executablePath:executablePath||'playwright-managed'},
    config,networkPolicy,configHash:hash(JSON.stringify(config)),base:service.base,routes:allRoutes,samples,timings:{},medians:{},parity:null};
  for(const route of config.timingRoutes) {
    report.timings[route]=[];
    for(let i=0;i<samples;i++) {
      // Fresh contexts and cache disabled; real production behavior, no interception or animation override.
      const context=await browser.newContext({viewport:config.viewports.desktop,deviceScaleFactor:1,locale:'en-US',timezoneId:'America/Los_Angeles',serviceWorkers:'block'});
      try {
        await context.addInitScript(()=>{
          window.__perf={lcp:0,cls:0,longTasks:0,tbt:0,supported:PerformanceObserver.supportedEntryTypes};
          new PerformanceObserver(list=>{for(const e of list.getEntries())window.__perf.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
          new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
          new PerformanceObserver(list=>{for(const e of list.getEntries()){window.__perf.longTasks+=e.duration;window.__perf.tbt+=Math.max(0,e.duration-50);}}).observe({type:'longtask',buffered:true});
        });
        const page=await context.newPage();
        const cdp=await context.newCDPSession(page);
        await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
        const tracker=collectNetwork(cdp),errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        const response=await page.goto(service.base+route,{waitUntil:'load',timeout:60000});
        assert(response?.status()===200,`Timing route failed: ${route}`);
        await page.waitForTimeout(config.measurementMs);
        const observed=await page.evaluate(()=>window.__perf);
        assert(['largest-contentful-paint','layout-shift','longtask'].every(t=>observed.supported.includes(t)),'Required browser observers unavailable');
        assert(errors.length===0,`Runtime errors: ${errors}`);
        const network=tracker.network,failures=tracker.failures();
        write(path.join(dir,'last-network.json'),{route,index:i,network,failures,errors});
        validateNetwork({network,failures},{...report,route});
        const sum=type=>network.filter(type).reduce((n,r)=>n+r.bytes,0);
        const sample={index:i,lcp:observed.lcp,cls:observed.cls,longTasks:observed.longTasks,tbt:observed.tbt,jsBytes:sum(r=>r.type==='Script'),cssBytes:sum(r=>r.type==='Stylesheet'),totalBytes:sum(()=>true),network,failures,errors};
        assert(sample.lcp>0 && sample.jsBytes>0 && sample.totalBytes>0 && metrics.every(k=>Number.isFinite(sample[k])&&sample[k]>=0),'Empty or invalid timing sample');
        report.timings[route].push(sample);
        write(path.join(dir,'audit.partial.json'),report);
      } finally {await context.close();}
    }
    report.medians[route]=Object.fromEntries(metrics.map(k=>[k,median(report.timings[route].map(s=>s[k]))]));
  }
  // Timing uses the normal browser. Only deterministic parity uses software rasterization.
  await browser.close();
  browser=await cancellation.own(chromium.launch({executablePath,headless:true,args:renderFlags}),b=>b.close());
  report.parity=await captureParity(browser,service.base,dir,allRoutes,{proofOnly:report.proofOnly});
  assert(hash(JSON.stringify(runtime()))===report.source.runtimeHash,'Source changed during audit');
  report.complete=true;
  write(path.join(dir,'audit.json'),report);
  console.log(JSON.stringify({out:dir,routes:allRoutes.length,samples,timingRoutes:config.timingRoutes,complete:true}));
 } catch(error) {
  console.error(error.stack ?? error.message);
  process.exitCode=cancellation.exitCode;
} finally {
  try { await cancellation.close(); lease.release(); if(cancellation.signalName)process.exitCode=cancellation.exitCode; }
  finally { cancellation.uninstall(); }
}
