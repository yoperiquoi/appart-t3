const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage();
p.on('pageerror',e=>console.log('ERR',e.stack||e));p.on('console',m=>console.log('LOG',m.type(),m.text()));
await p.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'node_modules/three/build/three.min.js'),contentType:'application/javascript'}));
await p.goto('file://'+path.resolve(__dirname,'..','proposition-'+process.argv[2]+'.html'));await p.waitForTimeout(1000);await b.close();})();
