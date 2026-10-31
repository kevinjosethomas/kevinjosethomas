import test from 'node:test';
import { strict as a } from 'node:assert';
import { improvementTransfer } from './network.mjs';
const env={base:'http://localhost',kind:'local-lab',proofOnly:false,route:'/'};
const resource={id:'asset:0',requestId:'asset',hop:0,url:'http://localhost/old.png',type:'Image',method:'GET',requestHeaders:{},status:302,mime:'image/png',cached:false,headerBytes:100,dataBytes:100,decodedBytes:100,bytes:200,termination:'redirect',redirectTo:'asset:1',error:'',canceled:false,blockedReason:''};
test('complete required redirect hops count, missing and interrupted continuations reject',()=>{
  const final={...resource,id:'asset:1',hop:1,url:'http://localhost/new.png',status:200,bytes:3000,dataBytes:2900,termination:'finished'};
  const sample={network:[resource,final],failures:[],totalBytes:3200};
  a.deepEqual(improvementTransfer(sample,env),{rawBytes:3200,eligibleBytes:3200,excludedBytes:0,excluded:{speculativePrefetch:0,localPlatform:0}});
  a.throws(()=>improvementTransfer({...sample,network:[resource]},env),/redirect continuation/);
  a.throws(()=>improvementTransfer({...sample,network:[resource,{...final,termination:'pending'}]},env),/network request/);
});
