import test from 'node:test';
import {strict as a} from 'node:assert';
import {config,validateConfig} from './common.mjs';
test('invalid numeric configuration cannot turn comparisons into silent NaN passes',()=>{
  for(const bad of [null,NaN,Infinity,-1]) {
    const c=structuredClone(config);c.regression.lcp.absolute=bad;a.throws(()=>validateConfig(c));
    const d=structuredClone(config);d.improvement.bytesRelative=bad;a.throws(()=>validateConfig(d));
  }
});
test('empty route coverage, too few samples and screenshot tolerance weakening are rejected',()=>{
  for(const change of [c=>{c.timingRoutes=[];},c=>{c.samples=0;},c=>{c.pixels.maxDifferentPixels=1;},c=>{delete c.viewports.mobile;},c=>{delete c.regression.cls;}]) {
    const c=structuredClone(config);change(c);a.throws(()=>validateConfig(c));
  }
});
