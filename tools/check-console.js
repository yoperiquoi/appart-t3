const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/three.min.js',r=>r.fulfill({path:'/tmp/claude-0/-home-claude/33ed5aad-2581-5e4c-ae0e-a985ab785e0a/scratchpad/t3/node_modules/three/build/three.min.js'}));
await p.goto('file:///home/claude/appart-t3/index.html');await p.waitForTimeout(1500);
console.log('errors',errs);await b.close();})();
