const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'..');
const three=process.env.THREE_JS||path.join(__dirname,'node_modules','three','build','three.min.js');
const shots=process.argv.indexOf('--shots')>=0;
const only=process.argv.slice(2).filter(a=>/^\d+$/.test(a));
function audit(){
  const V=THREE.Vector3,eps=0.004;
  setWalls(1);scene.updateMatrixWorld(true);
  const items=[];
  [furnGroup,furnWall,furnTall,tallGroup].forEach(G=>G.children.forEach(g=>{if(g.userData&&g.userData.n){const bx=[];g.updateMatrixWorld(true);g.traverse(o=>{if(o.isMesh)bx.push(new THREE.Box3().setFromObject(o));});items.push({n:g.userData.n,rug:!!g.userData.rug,bx});}}));
  const fixed=[];
  [[wallGroup,'mur'],[fixGroup,'équipement'],[tallGroup,'équipement haut']].forEach(([G,k])=>G.children.forEach(o=>{if(!o.isMesh)return;const bb=new THREE.Box3().setFromObject(o),s=bb.getSize(new V());if(Math.min(s.x,s.y,s.z)<0.013)return;fixed.push({n:k,bb});}));
  const ov=(a,b)=>a.min.x<b.max.x-eps&&b.min.x<a.max.x-eps&&a.min.y<b.max.y-eps&&b.min.y<a.max.y-eps&&a.min.z<b.max.z-eps&&b.min.z<a.max.z-eps;
  const out={items:items.length,coll:[],door:[],pass:[]};
  const seen={};
  items.forEach((it,i)=>{
    it.bx.forEach(a=>fixed.forEach(f=>{if(ov(a,f.bb)){const k=it.n+'|'+f.n;if(!seen[k]){seen[k]=1;out.coll.push(it.n+' ↔ '+f.n+' ('+[f.bb.min.x*S+ox,f.bb.min.z*S+oz,f.bb.max.x*S+ox,f.bb.max.z*S+oz].map(v=>v.toFixed(0)).join(',')+')');}}}));
    if(it.rug)return;
    for(let j=i+1;j<items.length;j++){const jt=items[j];if(jt.rug)continue;let hit=false;it.bx.forEach(a=>{if(!hit)jt.bx.forEach(c=>{if(!hit&&ov(a,c))hit=true;});});if(hit)out.coll.push(it.n+' ↔ '+jt.n);}
  });
  const doors=[['porte chambre 1',445,497,45,1,1],['porte chambre 2',525,255,55,1,-1],['porte WC',176,565,40,1,-1],['porte SDB',247,565,43,1,-1]];
  const zones=[['porte d’entrée (débattement)',157,415,212,470,0,2.1],['lave-vaisselle ouvert',456,72,515,113,0,0.9],['porte du réfrigérateur',421,88,460,132,0,1.9],['porte-fenêtre chambre 1',683,515,713.2,575,0,2.2],['porte-fenêtre chambre 2',683,160,713.2,220,0,2.2],['fenêtre chambre 2',640,21.8,690,45,0.92,2.1]];
  items.forEach(it=>{if(it.rug)return;it.bx.forEach(a=>{
    doors.forEach(d=>{if(a.min.y>2.0)return;const hx=X(d[1]),hz=Z(d[2]),r=d[3]/S,qx0=Math.min(hx,hx+d[4]*r),qx1=Math.max(hx,hx+d[4]*r),qz0=Math.min(hz,hz+d[5]*r),qz1=Math.max(hz,hz+d[5]*r);
      const x0=Math.max(a.min.x,qx0),x1=Math.min(a.max.x,qx1),z0=Math.max(a.min.z,qz0),z1=Math.min(a.max.z,qz1);if(x1-x0<eps||z1-z0<eps)return;
      const nx=Math.max(x0,Math.min(hx,x1)),nz=Math.max(z0,Math.min(hz,z1));if(Math.hypot(nx-hx,nz-hz)<r-eps){const k=it.n+'|'+d[0];if(!seen[k]){seen[k]=1;out.door.push(it.n+' dans le débattement : '+d[0]);}}});
    zones.forEach(zn=>{if(a.max.y<=zn[5]+eps||a.min.y>=zn[6])return;if(a.min.x<X(zn[3])-eps&&a.max.x>X(zn[1])+eps&&a.min.z<Z(zn[4])-eps&&a.max.z>Z(zn[2])+eps){const k=it.n+'|'+zn[0];if(!seen[k]){seen[k]=1;out.door.push(it.n+' dans la zone : '+zn[0]);}}});
  });});
  const obs=[];
  items.forEach(it=>{if(!it.rug)it.bx.forEach(a=>{if(a.min.y<1.0&&a.max.y>0.05)obs.push(a);});});
  [wallGroup,fixGroup,tallGroup].forEach(G=>G.children.forEach(o=>{if(!o.isMesh)return;const bb=new THREE.Box3().setFromObject(o);if(bb.min.y<1.0&&bb.max.y>0.05)obs.push(bb);}));
  function ray(px,pz,ax){let dp=1e9,dm=1e9;for(const bb of obs){if(ax==='x'){if(pz<=bb.min.z||pz>=bb.max.z)continue;if(px>bb.min.x&&px<bb.max.x)return 0;if(bb.min.x>=px)dp=Math.min(dp,bb.min.x-px);else dm=Math.min(dm,px-bb.max.x);}else{if(px<=bb.min.x||px>=bb.max.x)continue;if(pz>bb.min.z&&pz<bb.max.z)return 0;if(bb.min.z>=pz)dp=Math.min(dp,bb.min.z-pz);else dm=Math.min(dm,pz-bb.max.z);}}return dp+dm;}
  (typeof PASS!=='undefined'?PASS:[]).forEach(p=>{const px=X(p[1]),pz=Z(p[2]),off=p[5]===undefined?0.1:p[5];let w=1e9;[-off,0,off].forEach(o=>{w=Math.min(w,p[3]==='x'?ray(px,pz+o,'x'):ray(px+o,pz,'z'));});out.pass.push({n:p[0],w:Math.round(w*100),min:Math.round(p[4]*100),ok:w>=p[4]-0.005});});
  setWalls(1.1/H);return out;
}
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const files=fs.readdirSync(dir).filter(f=>/^proposition-\d+\.html$/.test(f)).filter(f=>!only.length||only.indexOf(f.match(/\d+/)[0])>=0).sort();
  let bad=0;const report={};
  for(const f of files){
    const n=f.match(/\d+/)[0];
    const p=await b.newPage({viewport:{width:1280,height:800},deviceScaleFactor:shots?2:1});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:three}));
    await p.goto('file://'+path.join(dir,f));await p.waitForTimeout(1200);
    const r=await p.evaluate('('+audit.toString()+')()');
    await p.click('#m-avant');await p.waitForTimeout(200);await p.click('#m-projet');await p.waitForTimeout(200);
    r.errors=errs;report[f]=r;
    const ko=r.coll.length+r.door.length+r.pass.filter(q=>!q.ok).length+errs.length;bad+=ko;
    console.log('\n== '+f+' : '+r.items+' meubles, '+(ko?ko+' problème(s)':'OK'));
    errs.forEach(e=>console.log('  ERREUR JS',e));r.coll.forEach(e=>console.log('  CHEVAUCHEMENT',e));r.door.forEach(e=>console.log('  DÉGAGEMENT',e));
    r.pass.forEach(q=>console.log('  '+(q.ok?'ok ':'KO ')+q.n+' : '+q.w+' cm (min '+q.min+')'));
    if(shots){
      const views=[['dessus','all',true,false],['perspective','all',false,false],['sejour','sejour',false,true],['chambre-1','ch1',false,false],['chambre-2','ch2',false,false],['balcon','balcon',false,false]];
      for(const v of views){
        await p.evaluate(v=>{setWalls(v[3]?1:1.1/H);goTo(v[1],v[2]);Object.assign(st,{az:goal.az,el:goal.el,dist:goal.dist});tgt.set(goal.x,0,goal.z);goal=null;dirty=true;},v);
        await p.waitForTimeout(500);
        await p.screenshot({path:path.join(dir,'captures','p'+n+'-'+v[0]+'.jpg'),type:'jpeg',quality:82});
      }
    }
    await p.close();
  }
  fs.writeFileSync(path.join(__dirname,'rapport.json'),JSON.stringify(report,null,1));
  await b.close();
  console.log(bad?'\n'+bad+' problème(s)':'\nTout est vérifié.');
  process.exit(bad?1:0);
})();
