import test from 'node:test';
import { strict as a } from 'node:assert';
import {receiptId,runStatus,succeeded} from './zeroshot-status.mjs';
const id='01a18f57-732a-7353-b04a-dd4b62c59348';
test('real v10.23 status envelope keeps running/stopping runs ineligible',()=>{
  a.equal(receiptId({runId:id}),id);
  for(const phase of ['running','stopping'])a.equal(succeeded(runStatus({runId:id,status:{phase,activeExecutions:[{node:'worker',execution:'nv2-opaque'}]}},id)),false);
});
test('a finished graph succeeds only with the authoritative success result',()=>{
  a.equal(succeeded(runStatus({runId:id,status:{phase:'finished',terminalResult:{status:'succeeded',output:null}}},id)),true);
  a.equal(succeeded(runStatus({runId:id,status:{phase:'finished',terminalResult:{status:'failed',reason:'change_attempts_exhausted'}}},id)),false);
});
test('missing terminal proof, wrong runs and fabricated flat success never authorize delivery',()=>{
  for(const response of [{runId:id,phase:'succeeded'},{runId:id,status:{phase:'succeeded'}},{runId:id,status:{phase:'finished'}},{runId:id,status:{phase:'finished',terminalResult:{status:'succeeded'}}},{runId:'different',status:{phase:'finished',terminalResult:{status:'succeeded',output:null}}}])a.throws(()=>runStatus(response,id));
  a.throws(()=>receiptId({status:'submitted'}));
});
