import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { root, args, assert, git, json, write, runtime, hash, buildStamp } from './common.mjs';
import { cli, graphArguments, externalEnvironment, validateGraph } from './validate-graph.mjs';
import { compare } from './compare.mjs';
import { runStatus, succeeded } from './zeroshot-status.mjs';
import { RoundControl } from './round-control.mjs';

// Publication is deliberately a supervisor handoff. No commit/push/PR/comment/merge commands.
const options=args(['state','rounds','session','resume','minutes']);
const sessionDir=path.resolve(options.session || '.performance/rounds');
assert(sessionDir.startsWith(path.join(root,'.performance')+path.sep),'Session must be under .performance/');
fs.mkdirSync(sessionDir,{recursive:true});
const sessionFile=path.join(sessionDir,'session.json');
const lockFile=path.join(sessionDir,'runner.lock');
const lock=fs.openSync(lockFile,'wx');
fs.writeFileSync(lock,`${process.pid}\n`);
const control=new RoundControl({cli});
const run=(command,argv)=>control.execute(command,argv);
let session,env;
try {
  assert(options.state,'--state external state directory required');
  const state=path.resolve(options.state);fs.mkdirSync(state,{recursive:true});
  env=externalEnvironment(state);control.env=env;
  assert(git('branch','--show-current').length>0,'Attached source branch required');
  assert(git('status','--porcelain')==='','Clean committed checkout required; supervisor must save/commit pipeline first');
  if(options.resume) {
    assert(options.resume==='yes','Use --resume yes');session=json(sessionFile);
    assert(session.state==='awaiting-supervisor','Only accepted supervisor handoffs can start another round; failed/plateau sessions stop');
    assert(git('rev-parse','HEAD')!==session.previousRevision,'Supervisor must commit/integrate accepted result before resuming');
    git('merge-base','--is-ancestor',session.previousRevision,'HEAD');
    assert(hash(JSON.stringify(runtime()))===session.candidateRuntimeHash && hash(fs.readFileSync(path.join(root,'package-lock.json')))===session.candidateLockHash,'Supervisor-integrated source/lockfile differs from accepted evidence; start a new baseline/session');
  } else {
    assert(!fs.existsSync(sessionFile),'Session exists; use --resume yes after supervisor integration or choose a new session');
    const max=Number(options.rounds||3);
    assert(Number.isInteger(max)&&max>=1&&max<=10,'--rounds must be an integer in [1,10]');
    session={schema:1,id:new Date().toISOString().replace(/[^0-9]/g,''),round:0,maxRounds:max,state:'ready'};
  }
  assert(session.round<session.maxRounds,'Round budget exhausted; no more autonomous changes');
  const minutes=Number(options.minutes||90);assert(Number.isFinite(minutes)&&minutes>=1&&minutes<=180,'--minutes must be in [1,180]');
  session.round++;session.state='preparing';write(sessionFile,session);
  const roundDir=path.join(sessionDir,`round-${session.round}`);fs.mkdirSync(roundDir);
  const baselineDir=path.join(roundDir,'baseline');
  await run('npm',['ci','--no-audit','--no-fund']);
  await run('npm',['run','lint']);await run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit']);await run('npm',['run','perf:test']);
  await run('npm',['run','perf:build']);await run('npm',['run','perf:audit','--','--out',baselineDir]);
  assert(git('status','--porcelain')==='','Setup/checks changed tracked files; refusing a dirty feature branch');
  const before=git('rev-parse','HEAD');
  const branch=`performance/optimize-${session.id}-${session.round}`;
  execFileSync('git',['switch','-c',branch],{cwd:root,stdio:'inherit'});
  const input=path.join(roundDir,'input.json');
  write(input,{task:`Optimize exactly one measured bundle/startup/rendering/network cost. Baseline evidence is ${baselineDir}. Write immutable candidate attempts beneath ${roundDir}/candidate-attempt-N. Preserve pipeline gates/config and all behavior. Follow performance/README.md. The worker alone builds and audits serially. Both independent graph reviewers must accept. Write ${root}/.performance/round-result.json with absolute baselineDir, candidateDir, comparisonFile. A plateau, invalid evidence or regression must never be delivered. Do not commit/push/merge/post; supervisor owns delivery.`});
  fs.writeFileSync(path.join(roundDir,'admission.json'),validateGraph(input,'Optimize Website Performance',env));
  // Admission above is mandatory immediately before submission.
  session.state='running';session.branch=branch;session.previousRevision=before;write(sessionFile,session);
  const runId=await control.submit([...graphArguments(input,'Optimize Website Performance'),'--detach'],(receipt,id)=>{
    write(path.join(roundDir,'receipt.json'),receipt);
    session.runId=id;write(sessionFile,session);
  });
  const deadline=Date.now()+minutes*60000;
  let status;
  while(Date.now()<deadline) {
    const response=await control.status(runId);
    write(path.join(roundDir,'status.json'),response);status=runStatus(response,runId);
    if(status.phase==='finished')break;
    await delay(5000,undefined,{signal:control.signal});
  }
  if(!succeeded(status)) {
    throw new Error(`Graph did not succeed: ${status?.terminalResult?.reason ?? status?.phase}; no delivery`);
  }
  const result=json(path.join(root,'.performance/round-result.json'));
  assert(path.resolve(result.baselineDir)===baselineDir,'Worker substituted baseline');
  assert(path.resolve(result.candidateDir).startsWith(roundDir+path.sep),'Candidate evidence outside this round');
  const candidate=json(path.join(result.candidateDir,'audit.json'));
  assert(candidate.source.runtimeHash===hash(JSON.stringify(runtime())),'Candidate evidence stale for current checkout');
  const stamp=buildStamp();assert(stamp.buildId===candidate.build.buildId,'Candidate production build changed');
  const verdict=compare(json(path.join(baselineDir,'audit.json')),candidate,baselineDir,result.candidateDir);
  write(path.join(roundDir,'final-comparison.json'),verdict);
  assert(verdict.accepted && verdict.optimizationEligible,`Stopped: ${verdict.reason}`);
  session.candidateRuntimeHash=candidate.source.runtimeHash;session.candidateLockHash=candidate.build.lockHash;session.state='awaiting-supervisor';session.evidence=roundDir;write(sessionFile,session);
  console.log(JSON.stringify({state:session.state,branch,round:session.round,maxRounds:session.maxRounds,evidence:roundDir,next:'Supervisor verifies evidence, commits and publishes/merges; then resume yes from clean integrated checkout. Runner never publishes.'}));
  process.exitCode=3;
} catch(error) {
  if(session){session.state='stopped';session.error=error.message;write(sessionFile,session);}
  console.error(error.message);process.exitCode=control.cancellation.exitCode;
} finally {
  try {
    await control.close();
    fs.closeSync(lock);fs.unlinkSync(lockFile);
    if(control.cancellation.signalName){if(session){session.state='stopped';session.error=`Cancelled by ${control.cancellation.signalName}`;write(sessionFile,session);}process.exitCode=control.cancellation.exitCode;}
  } catch(error) {
    if(session){session.state='cleanup-unconfirmed';session.stopError=error.message;write(sessionFile,session);}
    console.error(error.message);process.exitCode=1;
    // A failed stop must not advertise a free checkout. Recover only after checking
    // external run status and all owned process PIDs; never silently remove this lock.
    fs.closeSync(lock);
  }
}
