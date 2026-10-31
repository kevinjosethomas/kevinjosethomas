import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { root, assert } from './common.mjs';
const bin=process.env.ZEROSHOT_TOOLS?path.join(process.env.ZEROSHOT_TOOLS,'bin'):path.join(os.homedir(),'.local/bin');
assert(!fs.realpathSync.native(path.dirname(bin)).startsWith(fs.realpathSync.native(os.tmpdir())), 'Standalone tools must use an executable user path, not /tmp');
fs.mkdirSync(bin,{recursive:true});
const target=path.join(root,'node_modules/@the-open-engine-company/zeroshot/bin/zeroshot.js');
assert(fs.existsSync(target),'Run npm ci first');
const link=path.join(bin,'kevin-performance-zeroshot');
try {const stat=fs.lstatSync(link);assert(stat.isSymbolicLink()&&fs.readlinkSync(link)===target,`Refusing to overwrite ${link}`);} catch(error) {if(error.code!=='ENOENT')throw error;fs.symlinkSync(target,link);}
console.log(link);
