const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const T=process.env.THREE_JS||path.resolve(__dirname,'../../../node_modules/three/build/three.min.js');
const dir=path.resolve(__dirname,'..'),cap=path.join(dir,'captures');
fs.mkdirSync(cap,{recursive:true});
const only=process.argv.slice(2);
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const files=fs.readdirSync(dir).filter(f=>/^proposition-\d+\.html$/.test(f)).filter(f=>!only.length||only.some(o=>f.includes('-'+o+'.')));
  const report={};let bad=0;
  for(const f of files){
    const p=await b.newPage({viewport:{width:1400,height:1000}});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:T}));
    await p.goto('file://'+path.join(dir,f));await p.waitForTimeout(800);
    const res=await p.evaluate(()=>{
      const out={collisions:[],zones:[],passages:[],items:0};
      for(const k of Object.keys(paints)){paintKey=k;setMode('avant');setMode('projet');}
      paintKey=Object.keys(paints)[0];setWalls(1);setMode('projet');
      [wallGroup,fixGroup,tallGroup,furnGroup,furnWall,furnTall].forEach(g=>g.updateMatrixWorld(true));
      const items=[];
      [furnGroup,furnWall,furnTall].forEach(G=>G.children.forEach(ch=>{const it=ch.userData.it||'(sans nom)';ch.traverse(m=>{if(m.isMesh)items.push({it,b:new THREE.Box3().setFromObject(m)});});}));
      out.items=new Set(items.map(i=>i.it)).size;
      const obs=[];
      [[wallGroup,'mur'],[fixGroup,'fixe'],[tallGroup,'fixe']].forEach(([G,t])=>G.traverse(m=>{if(!m.isMesh)return;const bb=new THREE.Box3().setFromObject(m),s=new THREE.Vector3();bb.getSize(s);if(Math.min(s.x,s.y,s.z)<0.013)return;obs.push({t,b:bb});}));
      const e=0.003,ov=(a,c)=>a.min.x<c.max.x-e&&a.max.x>c.min.x+e&&a.min.y<c.max.y-e&&a.max.y>c.min.y+e&&a.min.z<c.max.z-e&&a.max.z>c.min.z+e;
      const solid=items.filter(i=>i.it[0]!=='~');
      const seen=new Set();
      solid.forEach(a=>obs.forEach(o=>{if(ov(a.b,o.b)){const key=a.it+'|'+o.t;if(!seen.has(key)){seen.add(key);out.collisions.push(a.it+' ↔ '+o.t+' ('+[o.b.min.x*S+ox,o.b.min.z*S+oz,o.b.max.x*S+ox,o.b.max.z*S+oz].map(Math.round).join(',')+')');}}}));
      for(let i=0;i<solid.length;i++)for(let j=i+1;j<solid.length;j++){const a=solid[i],c=solid[j];if(a.it===c.it)continue;if(ov(a.b,c.b)){const key=[a.it,c.it].sort().join(' ↔ ');if(!seen.has(key)){seen.add(key);out.collisions.push(key+' ('+[Math.max(a.b.min.x,c.b.min.x)*S+ox,Math.max(a.b.min.z,c.b.min.z)*S+oz].map(Math.round).join(',')+')');}}}
      const zones=[['porte ch. 1',445,497,45,1,1],['porte ch. 2',525,255,55,1,-1],['porte WC',176,565,40,1,-1],['porte SDB',247,565,43,1,-1]];
      const rects=[['porte d\'entrée',157,415,212,470,0],['porte-fenêtre ch. 1',683,515,713.2,575,0],['porte-fenêtre ch. 2',683,160,713.2,220,0],['fenêtre cuisine',475,21.8,520,47,0.9],['fenêtre ch. 2',640,21.8,690,47,0.9],['façade du placard du couloir',300,497,437,520.8,0]];
      solid.forEach(a=>{const x0=a.b.min.x*S+ox,x1=a.b.max.x*S+ox,z0=a.b.min.z*S+oz,z1=a.b.max.z*S+oz;if(a.b.min.y>2.05)return;
        zones.forEach(zn=>{const [n,cx,cz,r,sx,sz]=zn;const qx0=sx>0?cx:cx-r,qx1=sx>0?cx+r:cx,qz0=sz>0?cz:cz-r,qz1=sz>0?cz+r:cz;const ix0=Math.max(x0,qx0)+0.3,ix1=Math.min(x1,qx1)-0.3,iz0=Math.max(z0,qz0)+0.3,iz1=Math.min(z1,qz1)-0.3;if(ix0>=ix1||iz0>=iz1)return;const nx=Math.min(Math.max(cx,ix0),ix1),nz=Math.min(Math.max(cz,iz0),iz1);if(Math.hypot(nx-cx,nz-cz)<r){const key=a.it+'|'+n;if(!seen.has(key)){seen.add(key);out.zones.push(a.it+' dans le débattement '+n);}}});
        rects.forEach(rc=>{const [n,a0,b0,a1,b1,ymin]=rc;if(a.b.max.y<=ymin+0.001)return;if(x0<a1-0.3&&x1>a0+0.3&&z0<b1-0.3&&z1>b0+0.3){const key=a.it+'|'+n;if(!seen.has(key)){seen.add(key);out.zones.push(a.it+' devant '+n);}}});
      });
      const pobs=[];
      solid.forEach(a=>{if(a.b.min.y<1.8&&a.b.max.y>0.05)pobs.push(a.b);});
      obs.forEach(o=>{if(o.b.min.y<1.8&&o.b.max.y>0.05)pobs.push(o.b);});
      passages.forEach(ps=>{const [n,a0,b0,a1,b1,ax,mn]=ps;const lo0=ax==='x'?X(a0):Z(b0),lo1=ax==='x'?X(a1):Z(b1),c=ax==='x'?(Z(b0)+Z(b1))/2:(X(a0)+X(a1))/2;
        let lo=-1e9,hi=1e9,blk=false;
        pobs.forEach(o=>{const s0=ax==='x'?o.min.x:o.min.z,s1=ax==='x'?o.max.x:o.max.z,p0=ax==='x'?o.min.z:o.min.x,p1=ax==='x'?o.max.z:o.max.x;if(s1<=lo0+0.003||s0>=lo1-0.003)return;if(p0>=c)hi=Math.min(hi,p0);else if(p1<=c)lo=Math.max(lo,p1);else blk=true;});
        const w=blk?0:Math.round((hi-lo)*100);out.passages.push({n,w,mn:mn||80,ok:w>=(mn||80)});});
      return out;
    });
    res.errors=errs;report[f]=res;
    const ko=res.collisions.length+res.zones.length+res.errors.length+res.passages.filter(x=>!x.ok).length;bad+=ko;
    console.log('\n== '+f+' : '+res.items+' meubles, '+(ko?ko+' PROBLÈME(S)':'OK'));
    res.errors.forEach(x=>console.log('  erreur JS : '+x));
    res.collisions.forEach(x=>console.log('  chevauchement : '+x));
    res.zones.forEach(x=>console.log('  gêne : '+x));
    res.passages.forEach(x=>console.log('  passage '+(x.ok?'ok ':'KO ')+x.w+' cm (min '+x.mn+') : '+x.n));
    if(!process.env.NOSHOT){
      const n=f.match(/\d+/)[0];
      await p.addStyleTag({content:'#rooms,#paintRow,.side{display:none!important}'});
      await p.evaluate(()=>{setWalls(1.1/H);setMode('projet');showLab=true;goTo('all',true);goal.dist*=1.07;goal.z+=0.18;Object.assign(st,{az:goal.az,el:goal.el,dist:goal.dist});tgt.set(goal.x,0,goal.z);goal=null;dirty=true;});
      await p.waitForTimeout(900);await p.screenshot({path:path.join(cap,'p'+n+'-dessus.png')});
      await p.evaluate(()=>{showLab=false;goTo('all',false);Object.assign(st,{az:goal.az,el:goal.el,dist:goal.dist*0.92});tgt.set(goal.x,0,goal.z);goal=null;dirty=true;});
      await p.waitForTimeout(900);await p.screenshot({path:path.join(cap,'p'+n+'-perspective.png')});
      const views=[['sejour',-0.55,0.62,0.95],['ch1',2.6,0.75,1.0],['ch2',2.3,0.8,1.05],['sejour-murs',-0.75,0.98,1.05,1]];
      for(const v of views){await p.evaluate(v=>{if(v[4])setWalls(1);goTo(v[0].split('-')[0],false);Object.assign(st,{az:v[1],el:v[2],dist:goal.dist*v[3]});tgt.set(goal.x,0,goal.z);goal=null;dirty=true;},v);await p.waitForTimeout(700);await p.screenshot({path:path.join(cap,'p'+n+'-'+v[0]+'.png')});}
    }
    await p.close();
  }
  fs.writeFileSync(path.join(dir,'captures','verification.json'),JSON.stringify(report,null,1));
  await b.close();
  console.log(bad?'\n'+bad+' problème(s)':'\nTout est vérifié : aucune erreur.');
  process.exit(bad?1:0);
})();
