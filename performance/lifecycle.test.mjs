import test from 'node:test';
import { strict as a } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
import { root, hash } from './common.mjs';
import { acquireLease, browserLeasePath } from './lease.mjs';
import { serverFactory } from './server.mjs';
import { Cancellation } from './cancellation.mjs';
import { collectNetwork, validateNetwork } from './network.mjs';
import { EventEmitter } from 'node:events';

fs.mkdirSync(path.join(root,'.performance'),{recursive:true});
const dir=fs.mkdtempSync(path.join(root,'.performance/lifecycle-tests-'));
const moduleURL=name=>pathToFileURL(path.join(root,'performance',name)).href;
const alive=pid=>{try{process.kill(pid,0);return true;}catch(e){if(e.code==='ESRCH')return false;throw e;}};
async function until(predicate){for(let i=0;i<200;i++){if(predicate())return;await delay(25);}throw new Error('Fixture timed out');}
function launch(code,env={}) {
  const child=spawn(process.execPath,['--input-type=module','-e',code],{cwd:root,env:{...process.env,...env},stdio:['ignore','pipe','pipe']});
  let output='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
  const done=new Promise(resolve=>child.on('close',(code,signal)=>resolve({code,signal,output})));
  return {child,done};
}
test.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
test('production builds reject an active browser lease before mutating Next output',async()=>{
  const lease=acquireLease(),stamp=fs.existsSync(path.join(root,'.next/BUILD_ID'))?fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8'):null;
  try {
    const probe=launch(`await import('${moduleURL('build.mjs')}');`);
    const result=await probe.done;
    a.notEqual(result.code,0);a.match(result.output,/Browser lease held/);
    a.equal(fs.existsSync(path.join(root,'.performance/build.lock')),false);
    a.equal(fs.existsSync(path.join(root,'.next/BUILD_ID'))?fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8'):null,stamp);
  } finally {lease.release();}
});
test('actual audits contend across different TMPDIR values before starting a server',async()=>{
  const first=path.join(dir,'tmp-a'),second=path.join(dir,'tmp-b');fs.mkdirSync(first);fs.mkdirSync(second);
  const ready=path.join(dir,'lease-ready');
  const holder=launch(`import fs from 'node:fs';import {acquireLease} from '${moduleURL('lease.mjs')}';const lease=acquireLease();fs.writeFileSync(${JSON.stringify(ready)},lease.file);process.on('SIGTERM',()=>{lease.release();process.exit(0)});setInterval(()=>{},1000);`,{TMPDIR:first});
  try {
    await until(()=>fs.existsSync(ready));a.equal(fs.readFileSync(ready,'utf8'),browserLeasePath);
    for(const tmp of [first,second]) {
      const out=path.join(dir,`audit-${path.basename(tmp)}`);
      const probe=launch(`process.argv=[process.execPath,'audit','--out',${JSON.stringify(out)},'--base-url','invalid'];await import('${moduleURL('audit.mjs')}');`,{TMPDIR:tmp});
      const result=await probe.done;a.equal(result.code,1);a.match(result.output,/Browser lease held/);a.doesNotMatch(result.output,/Invalid URL/);
      a.equal(fs.existsSync(path.join(out,'server.log')),false);
    }
  } finally {holder.child.kill('SIGTERM');await holder.done;}
  a.equal(fs.existsSync(browserLeasePath),false);
});
test('stale leases fail closed with PID recovery guidance and releases preserve ownership',()=>{
  const home=path.join(dir,'private-lease');fs.mkdirSync(home,{mode:0o700});const file=path.join(home,'lock');
  const dead=Number(execFileSync(process.execPath,['-e','console.log(process.pid)'],{encoding:'utf8'}).trim());a.equal(alive(dead),false);
  fs.writeFileSync(file,JSON.stringify({pid:dead,token:'dead'}));a.throws(()=>acquireLease(file),/stale; confirm/);a.ok(fs.existsSync(file));fs.unlinkSync(file);
  const lease=acquireLease(file);lease.release();lease.release();a.equal(fs.existsSync(file),false);
  const replaced=acquireLease(file);fs.writeFileSync(file,JSON.stringify({pid:process.pid,token:'replacement'}));a.throws(()=>replaced.release(),/ownership changed/);
});
test('server cancellation during readiness and static verification joins the owned child',async()=>{
  for(const stage of ['readiness','static']) {
    const scope=new Cancellation(),controller=scope.controller;
    let child,entered=false;
    const service=serverFactory({readStamp:()=>({schema:1}),scriptHash:()=>hash('test'),start:()=>{
      child=spawn(process.execPath,['-e',"setInterval(()=>{},1000)"],{stdio:['ignore','pipe','pipe']});return child;
    },request:async(url,{signal})=>{
      if(stage==='static'&&new URL(url).pathname==='/')return new Response('<script src="/_next/static/main.js"></script>');
      entered=true;
      return new Promise((resolve,reject)=>{if(signal.aborted)reject(signal.reason);else signal.addEventListener('abort',()=>reject(signal.reason),{once:true});});
    }});
    const pending=service(undefined,dir,{signal:scope.signal,registerCleanup:fn=>scope.defer(fn)});
    const rejected=a.rejects(pending,/cancelled/);
    await until(()=>entered);a.ok(alive(child.pid));controller.abort(new Error('cancelled'));
    await scope.close();await rejected;a.equal(alive(child.pid),false);
  }
});
test('a browser acquired after cancellation is closed before cleanup resolves',async()=>{
  const scope=new Cancellation();let closed=false,resolve;
  const pending=scope.own(new Promise(r=>{resolve=r;}),async()=>{await delay(50);closed=true;});
  const rejected=a.rejects(pending,/Owner closing/),cleanup=scope.close();
  resolve({});await cleanup;await rejected;a.equal(closed,true);
});
test('network failures before response headers retain URL/type and are rejected',()=>{
  const cdp=new EventEmitter(),tracker=collectNetwork(cdp);
  cdp.emit('Network.requestWillBeSent',{requestId:'lost',type:'Image',request:{url:'http://localhost/quality.gif',method:'GET',headers:{}}});
  cdp.emit('Network.loadingFailed',{requestId:'lost',type:'Image',errorText:'net::ERR_CONNECTION_RESET',canceled:false});
  a.deepEqual(tracker.failures()[0],{id:'lost:0',requestId:'lost',url:'http://localhost/quality.gif',type:'Image',error:'net::ERR_CONNECTION_RESET',canceled:false,blockedReason:''});
  a.throws(()=>validateNetwork({network:tracker.network,failures:tracker.failures()},{base:'http://localhost',kind:'local-lab',proofOnly:false}),/quality.gif/);
});

// This stub spawns only a sleeping local child, never Zeroshot or an agent.
const stub=path.join(dir,'stub-cli.mjs');
fs.writeFileSync(stub,`import fs from 'node:fs';import {spawn} from 'node:child_process';
const file=process.env.ROUND_FIXTURE_STATE;const [command,id]=process.argv.slice(2);
if(command==='run'){
 const child=spawn(process.execPath,['-e','setInterval(()=>{},1000)'],{detached:true,stdio:'ignore'});child.unref();
 fs.writeFileSync(file,JSON.stringify({pid:child.pid,phase:'running',id:'fixture-run'}));
 setTimeout(()=>console.log(JSON.stringify({runId:'fixture-run'})),Number(process.env.RECEIPT_DELAY||0));
}else{
 const s=JSON.parse(fs.readFileSync(file));
 if(command==='force-stop'){process.kill(s.pid,'SIGTERM');s.phase='stopping';s.finishedAt=Date.now()+200;fs.writeFileSync(file,JSON.stringify(s));console.log('{}');}
 else if(command==='status'){
  if(s.finishedAt&&Date.now()>=s.finishedAt){s.phase='finished';fs.writeFileSync(file,JSON.stringify(s));}
  console.log(JSON.stringify({runId:id,status:s.phase==='finished'?{phase:'finished',terminalResult:{status:'failed',reason:'cancelled'}}:{phase:s.phase,activeExecutions:[{execution:'fixture',node:'worker'}]}}));
 }else throw new Error('Unexpected fixture command');
}
`);
for(const signal of ['SIGINT','SIGTERM'])test(`runner ${signal} joins local work and verifies a detached run stops, including pending receipt`,async()=>{
  for(const stage of ['local','poll','receipt']) {
    const state=path.join(dir,`${signal}-${stage}.json`),lock=state+'.lock',ready=state+'.ready';
    const fixture=launch(`import fs from 'node:fs';import {RoundControl} from '${moduleURL('round-control.mjs')}';
      const control=new RoundControl({cli:${JSON.stringify(stub)},env:process.env,pollMs:25,stopTimeoutMs:3000});
      fs.writeFileSync(${JSON.stringify(lock)},String(process.pid));
      try {
        if(${JSON.stringify(stage)}==='local')await control.execute(process.execPath,['-e',${JSON.stringify(`require('fs').writeFileSync(${JSON.stringify(ready)},String(process.pid));setInterval(()=>{},1000)`)}]);
        else {await control.submit([${JSON.stringify(stub)},'run'],()=>fs.writeFileSync(${JSON.stringify(ready)},'receipt'));await import('node:timers/promises').then(({setTimeout})=>setTimeout(60000,undefined,{signal:control.signal}));}
      } catch {process.exitCode=control.cancellation.exitCode;}
      finally {await control.close();fs.unlinkSync(${JSON.stringify(lock)});}
    `,{ROUND_FIXTURE_STATE:state,RECEIPT_DELAY:stage==='receipt'?'500':'0'});
    try {
      await until(()=>fs.existsSync(stage==='receipt'?state:ready));
      const pid=stage==='local'?Number(fs.readFileSync(ready,'utf8')):JSON.parse(fs.readFileSync(state)).pid;
      fixture.child.kill(signal);const result=await fixture.done;
      a.equal(result.code,signal==='SIGINT'?130:143,result.output);a.equal(fs.existsSync(lock),false);await until(()=>!alive(pid));
      if(stage!=='local')a.equal(JSON.parse(fs.readFileSync(state)).phase,'finished');
    } finally {
      if(fixture.child.exitCode===null)fixture.child.kill('SIGKILL');
      if(fs.existsSync(state)){const s=JSON.parse(fs.readFileSync(state));if(alive(s.pid))process.kill(s.pid,'SIGKILL');}
    }
  }
});

test('collector retains partial HTTP-200 transfer and rejects it before any byte comparison',()=>{
  const cdp=new EventEmitter(),tracker=collectNetwork(cdp);
  cdp.emit('Network.requestWillBeSent',{requestId:'partial',type:'Image',request:{url:'http://localhost/kos-mujoco.gif',method:'GET',headers:{}}});
  cdp.emit('Network.responseReceived',{requestId:'partial',type:'Image',response:{url:'http://localhost/kos-mujoco.gif',status:200,mimeType:'image/gif',encodedDataLength:200}});
  cdp.emit('Network.dataReceived',{requestId:'partial',encodedDataLength:1000,dataLength:1000});
  cdp.emit('Network.loadingFailed',{requestId:'partial',type:'Image',errorText:'net::ERR_CONNECTION_RESET',canceled:false});
  a.equal(tracker.network[0].bytes,1200);a.equal(tracker.network[0].status,200);
  a.throws(()=>validateNetwork({network:tracker.network,failures:tracker.failures()},{base:'http://localhost',kind:'local-lab',proofOnly:false}),/kos-mujoco.gif/);
});

test('an unconfirmed detached stop retains the runner lease for explicit recovery',async()=>{
  const failedCli=path.join(dir,'unconfirmed-cli.mjs'),lock=path.join(dir,'unconfirmed.lock');
  fs.writeFileSync(failedCli,`console.log(JSON.stringify(process.argv[2]==='run'?{runId:'fixture-run'}:process.argv[2]==='force-stop'?{}:{runId:'fixture-run',status:{phase:'running',activeExecutions:[{execution:'test',node:'worker'}]}}));`);
  const fixture=launch(`import fs from 'node:fs';import {RoundControl} from '${moduleURL('round-control.mjs')}';
    const control=new RoundControl({cli:${JSON.stringify(failedCli)},pollMs:10,stopTimeoutMs:50});
    fs.writeFileSync(${JSON.stringify(lock)},String(process.pid));
    await control.submit([${JSON.stringify(failedCli)},'run'],()=>{});
    try{await control.close();fs.unlinkSync(${JSON.stringify(lock)});}catch(e){console.error(e.errors?.[0]?.message??e.message);process.exitCode=1;}
  `);
  const result=await fixture.done;a.equal(result.code,1);a.match(result.output,/did not confirm termination/);a.ok(fs.existsSync(lock));
});

test('runner waits for descendant cleanup after the npm-like group leader exits',async()=>{
  const ready=path.join(dir,'descendant.ready'),cleaned=path.join(dir,'descendant.cleaned');
  const descendant=`const fs=require('fs');process.on('SIGTERM',()=>setTimeout(()=>{fs.writeFileSync(${JSON.stringify(cleaned)},'joined');process.exit(0);},200));fs.writeFileSync(${JSON.stringify(ready)},String(process.pid));setInterval(()=>{},1000);`;
  const leader=`require('child_process').spawn(process.execPath,['-e',${JSON.stringify(descendant)}],{stdio:'inherit'});setInterval(()=>{},1000);`;
  const fixture=launch(`import {RoundControl} from '${moduleURL('round-control.mjs')}';const control=new RoundControl({cli:${JSON.stringify(stub)}});try{await control.execute(process.execPath,['-e',${JSON.stringify(leader)}]);}catch{process.exitCode=control.cancellation.exitCode;}finally{await control.close();}`);
  try {
    await until(()=>fs.existsSync(ready));const pid=Number(fs.readFileSync(ready,'utf8'));
    fixture.child.kill('SIGTERM');const result=await fixture.done;
    a.equal(result.code,143,result.output);a.equal(fs.readFileSync(cleaned,'utf8'),'joined');a.equal(alive(pid),false);
  } finally {if(fixture.child.exitCode===null)fixture.child.kill('SIGKILL');}
});
test('forced local termination is reported as unconfirmed cleanup rather than releasing a lease',async()=>{
  const ready=path.join(dir,'forced.ready'),lock=path.join(dir,'forced.lock');
  const childCode=`require('fs').writeFileSync(${JSON.stringify(ready)},String(process.pid));process.on('SIGTERM',()=>{});setInterval(()=>{},1000);`;
  const fixture=launch(`import fs from 'node:fs';import {RoundControl} from '${moduleURL('round-control.mjs')}';const control=new RoundControl({cli:${JSON.stringify(stub)},cleanupGraceMs:50});fs.writeFileSync(${JSON.stringify(lock)},String(process.pid));try{await control.execute(process.execPath,['-e',${JSON.stringify(childCode)}]);}catch{process.exitCode=1;}finally{try{await control.close();fs.unlinkSync(${JSON.stringify(lock)});}catch(e){console.error(e.errors?.[0]?.message??e.message);process.exitCode=1;}}`);
  try {
    await until(()=>fs.existsSync(ready));const pid=Number(fs.readFileSync(ready,'utf8'));
    fixture.child.kill('SIGTERM');const result=await fixture.done;
    a.equal(result.code,1,result.output);a.match(result.output,/required SIGKILL/);a.ok(fs.existsSync(lock));a.equal(alive(pid),false);
  } finally {if(fixture.child.exitCode===null)fixture.child.kill('SIGKILL');}
});

test('a timed-out admission/status client is joined without an unhandled cleanup rejection',async()=>{
  const {RoundControl}=await import('./round-control.mjs');
  const ready=path.join(dir,'timed-out-client.ready'),control=new RoundControl({cli:stub,cleanupGraceMs:50});
  try {
    const command=control.execute(process.execPath,['-e',`process.on('SIGTERM',()=>{});require('fs').writeFileSync(${JSON.stringify(ready)},String(process.pid));setInterval(()=>{},1000);`],{cancellable:false,timeout:500});
    await a.rejects(command,/required SIGKILL/);
    a.equal(alive(Number(fs.readFileSync(ready,'utf8'))),false);
  } finally {await control.close();}
});
