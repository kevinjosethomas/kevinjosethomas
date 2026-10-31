import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { root, assert, write, args } from './common.mjs';

export const cli=path.join(root,'node_modules/@the-open-engine-company/zeroshot/bin/zeroshot.js');
export function externalEnvironment(statePath) {
  const state=fs.realpathSync.native(path.resolve(statePath));
  const repository=fs.realpathSync.native(root);
  const disjoint=(a,b)=>a!==b && !a.startsWith(b+path.sep) && !b.startsWith(a+path.sep);
  assert(disjoint(state,repository),'Zeroshot state must be disjoint from repository');
  const configDir=path.join(state,'configuration');
  fs.mkdirSync(configDir,{recursive:true});
  assert(disjoint(fs.realpathSync.native(configDir),repository),'Zeroshot configuration must be disjoint from repository');
  if(process.env.ZEROSHOT_TOOLS)assert(disjoint(fs.realpathSync.native(process.env.ZEROSHOT_TOOLS),repository),'Zeroshot tools must be disjoint from repository');
  return {...process.env,ZEROSHOT_STATE_DIR:state,ZEROSHOT_CONFIG_DIR:configDir};
}
export function checkVersion(env) {
  assert(execFileSync(process.execPath,[cli,'--version'],{env,encoding:'utf8'}).trim()==='zeroshot 10.23.0','Zeroshot must be exactly 10.23.0');
}
export function graphArguments(input,title) {
  return [cli,'run','--graph',path.join(root,'performance/optimization.graph.json'),'--uniform-runtime-config',path.join(root,'performance/runtime.example.json'),'--input',input,'--title',title,'--cwd',root];
}
export function validateGraph(input,title,env) {
  checkVersion(env);
  return execFileSync(process.execPath,[...graphArguments(input,title),'--validate-only'],{cwd:root,env,encoding:'utf8',maxBuffer:8*1024*1024});
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const options=args(['state','input','out']);
    const state=path.resolve(options.state || path.join(os.tmpdir(),'kevin-performance-zeroshot'));
    fs.mkdirSync(state,{recursive:true});
    const env=externalEnvironment(state);
    const input=options.input?path.resolve(options.input):path.join(state,'validation-input.json');
    if(!options.input)write(input,{task:'Validate the reusable performance optimization graph admission only. No agents are launched.'});
    const result=validateGraph(input,'Optimize Website Performance',env);
    if(options.out)fs.writeFileSync(options.out,result);
    console.log(result);
  } catch(error) {console.error(error.message);process.exitCode=1;}
}
