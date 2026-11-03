const {chromium}=require('playwright');
(async()=>{
 const S=process.argv[2];
 const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:720,height:620}});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('file://'+S+'/test.html');await p.waitForTimeout(2000);
 await p.evaluate(()=>{const c=document.getElementById('lab');c.checked=false;c.dispatchEvent(new Event('change'));});
 await p.click('#m-projet');await p.waitForTimeout(700);await p.screenshot({path:S+'/y_projet.png'});
 await p.click('#b-full');await p.waitForTimeout(700);await p.screenshot({path:S+'/y_full.png'});
 console.log('errors:',JSON.stringify(errs));
 await b.close();
})();
