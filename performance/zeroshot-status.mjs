import { assert } from './common.mjs';
// v10.23 OECP public JSON, verified against real `zeroshot status` and the protocol schema:
// https://the-open-engine.github.io/zeroshot/current/reference/cluster/api/
export function receiptId(receipt) {
  assert(receipt && typeof receipt.runId==='string' && /^[A-Za-z0-9_-]{1,128}$/.test(receipt.runId),'Invalid Zeroshot submission receipt');
  return receipt.runId;
}
export function runStatus(response,expectedId) {
  assert(response?.runId===expectedId,'Zeroshot status run identity mismatch');
  const status=response.status;
  assert(status && ['admitted','running','stopping','finished'].includes(status.phase),'Unknown Zeroshot status phase');
  if(['running','stopping'].includes(status.phase))assert(Array.isArray(status.activeExecutions),'Missing active executions');
  if(status.phase==='finished') {
    const terminal=status.terminalResult;
    assert(terminal && ['succeeded','failed'].includes(terminal.status),'Missing/invalid authoritative terminal result');
    if(terminal.status==='succeeded')assert(Object.hasOwn(terminal,'output'),'Missing terminal output');
    else assert(typeof terminal.reason==='string'&&terminal.reason.length>0,'Missing failure reason');
  }
  return status;
}
export const succeeded=status=>status?.phase==='finished'&&status.terminalResult?.status==='succeeded';
