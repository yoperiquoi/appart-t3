const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const dir=path.resolve(__dirname,'..'),cap=path.join(dir,'captures');
const THREEJS=process.env.THREEJS||path.join(__dirname,'node_modules/three/build/three.min.js');
const analyse=()=>{
  const TP=0.005,TW=0.015,px=v=>(v-0)/S;
  [wallGroup,fixGroup,tallGroup,furnGroup,furnWall,furnTall].forEach(g=>g.updateMatrixWorld(true));
  const boxes=(o)=>{const out=[];o.traverse(m=>{if(m.isMesh){const b=new THREE.Box3().setFromObject(m);out.push(b);}});return out;};
  const pieces=[];
  [furnGroup,furnWall,furnTall].forEach(G=>G.children.forEach((c,i)=>pieces.push({n:c.name||('sans nom #'+i),b:boxes(c)})));
  const obst=[];
  wallGroup.traverse(m=>{if(m.isMesh)obst.push({n:m.material===doorMat?'vantail de porte':m.material===glassMat?'vitrage':m.material===frameMat?'encadrement':'mur / placard',b:new THREE.Box3().setFromObject(m)});});
  fixGroup.traverse(m=>{if(m.isMesh)obst.push({n:'équipement fixe',b:new THREE.Box3().setFromObject(m)});});
  tallGroup.traverse(m=>{if(m.isMesh)obst.push({n:'équipement haut / rideau',b:new THREE.Box3().setFromObject(m)});});
  const ov=(a,b)=>Math.min(Math.min(a.max.x,b.max.x)-Math.max(a.min.x,b.min.x),Math.min(a.max.y,b.max.y)-Math.max(a.min.y,b.min.y),Math.min(a.max.z,b.max.z)-Math.max(a.min.z,b.min.z));
  const col=[];
  for(let i=0;i<pieces.length;i++){
    const A=pieces[i];
    for(let j=i+1;j<pieces.length;j++){const B=pieces[j];let m=0;A.b.forEach(a=>B.b.forEach(b=>{const o=ov(a,b);if(o>m)m=o;}));if(m>TP)col.push([A.n,B.n,Math.round(m*1000)/10]);}
    const hit={};A.b.forEach(a=>obst.forEach(o=>{const v=ov(a,o.b);if(v>TW)hit[o.n]=Math.max(hit[o.n]||0,v);}));
    Object.keys(hit).forEach(k=>col.push([A.n,k,Math.round(hit[k]*1000)/10]));
  }
  const zon=[];
  ZONES.forEach(z=>{
    pieces.forEach(P=>{P.b.forEach(b=>{
      if(b.max.y<=0.012)return;
      if(z[1]==='q'){
        if(b.min.y>=2.04)return;
        const cx=X(z[2]),cz=Z(z[3]),r=z[4]/S,sx=z[5],sz=z[6];
        const qx0=Math.min(cx,cx+sx*r),qx1=Math.max(cx,cx+sx*r),qz0=Math.min(cz,cz+sz*r),qz1=Math.max(cz,cz+sz*r);
        const x0=Math.max(b.min.x,qx0),x1=Math.min(b.max.x,qx1),z0=Math.max(b.min.z,qz0),z1=Math.min(b.max.z,qz1);
        if(x1-x0<=TP||z1-z0<=TP)return;
        const nx=Math.max(x0,Math.min(cx,x1)),nz=Math.max(z0,Math.min(cz,z1));
        const d=Math.hypot(nx-cx,nz-cz);
        if(d<r-0.01)zon.push([P.n,z[0],Math.round((r-d)*1000)/10]);
      }else{
        const zb=new THREE.Box3(new THREE.Vector3(X(z[2]),z[6],Z(z[3])),new THREE.Vector3(X(z[4]),z[7],Z(z[5])));
        const o=ov(b,zb);if(o>TP)zon.push([P.n,z[0],Math.round(o*1000)/10]);
      }
    });});
  });
  const seen={};const zonU=zon.filter(z=>{const k=z[0]+'|'+z[1];if(seen[k])return false;seen[k]=1;return true;});
  const all=[];
  pieces.forEach(P=>P.b.forEach(b=>all.push({n:P.n,b})));obst.forEach(o=>all.push(o));
  let low=all;
  const blocked=(x0,z0,x1,z1,tol)=>{for(const o of low){const dx=Math.min(o.b.max.x,x1)-Math.max(o.b.min.x,x0),dz=Math.min(o.b.max.z,z1)-Math.max(o.b.min.z,z0);if(dx>tol&&dz>tol)return o.n;}return null;};
  const pas=(typeof PASSAGES!=='undefined'?PASSAGES:[]).map(p=>{
    let x0=X(p[1]),z0=Z(p[2]),x1=X(p[3]),z1=Z(p[4]);const min=p[5]||0.8,fy=p[6]||0;
    low=all.filter(o=>o.b.min.y<fy+1.95&&o.b.max.y>fy+0.012);
    const bl=blocked(x0,z0,x1,z1,0.01);
    const alongX=(x1-x0)<(z1-z0),st=0.005;
    if(alongX){let a=x0,b=x1;while(a>x0-4&&!blocked(a-st,z0,a,z1,0.003))a-=st;while(b<x1+4&&!blocked(b,z0,b+st,z1,0.003))b+=st;x0=a;x1=b;}
    else{let a=z0,b=z1;while(a>z0-4&&!blocked(x0,a-st,x1,a,0.003))a-=st;while(b<z1+4&&!blocked(x0,b,x1,b+st,0.003))b+=st;z0=a;z1=b;}
    const w=alongX?x1-x0:z1-z0;
    return {nom:p[0]+(fy?' (sur l\'estrade)':''),largeur:Math.round(w*100),min:Math.round(min*100),ok:!bl&&w>=min-0.004,bloque:bl};
  });
  return {pieces:pieces.length,meshes:pieces.reduce((a,p)=>a+p.b.length,0),collisions:col,zones:zonU,passages:pas};
};
(async()=>{
  const files=fs.readdirSync(dir).filter(f=>/^proposition-\d+\.html$/.test(f)).filter(f=>process.argv.length<3||process.argv.slice(2).includes(f.match(/\d+/)[0]));
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const rapport={};
  for(const f of files){
    const n=f.match(/\d+/)[0];
    const p=await b.newPage({viewport:{width:1400,height:1150},deviceScaleFactor:1});
    const errs=[];
    p.on('pageerror',e=>errs.push(String(e)));
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:THREEJS,contentType:'application/javascript'}));
    await p.goto('file://'+path.join(dir,f));await p.waitForTimeout(800);
    const res={erreurs:errs};
    for(const alt of [false,true]){
      await p.evaluate(a=>{ALT=a;setWalls(1);setMode('projet');},alt);
      res[alt?'deplie':'courant']=await p.evaluate(analyse);
    }
    const shot=async(nom,top,alt,walls,lab)=>{
      await p.evaluate(([t,a,w,l])=>{ALT=a;document.getElementById('b-alt').classList.toggle('on',a);setMode('projet');setWalls(w?1:1.1/H);showLab=l;document.getElementById('lab').checked=l;goTo('all',t);while(goal)step();st.dist*=t?1.25:1.1;tgt.z+=t?-0.25:0.2;dirty=true;},[top,alt,walls,lab]);
      await p.waitForTimeout(500);
      await p.screenshot({path:path.join(cap,'p'+n+'-'+nom+'.png')});
    };
    await shot('dessus',true,false,false,true);
    await shot('perspective',false,false,false,false);
    await shot('dessus-deplie',true,true,false,true);
    await shot('perspective-murs',false,false,true,false);
    res.erreurs=errs;
    rapport[f]=res;
    await p.close();
  }
  await b.close();
  const old=fs.existsSync(path.join(cap,'verification.json'))?JSON.parse(fs.readFileSync(path.join(cap,'verification.json'),'utf8')):{};
  Object.assign(old,rapport);
  fs.writeFileSync(path.join(cap,'verification.json'),JSON.stringify(old,null,1));
  for(const f in rapport){
    const r=rapport[f];
    console.log('==',f,'erreurs JS:',r.erreurs.length,r.erreurs.slice(0,3));
    ['courant','deplie'].forEach(k=>{const a=r[k];console.log(' ['+k+'] pièces',a.pieces,'collisions',a.collisions.length,'zones',a.zones.length);a.collisions.forEach(c=>console.log('   X',c.join(' | ')));a.zones.forEach(c=>console.log('   Z',c.join(' | ')));a.passages.forEach(q=>console.log('   '+(q.ok?'ok':'!!'),q.nom,q.largeur+' cm (min '+q.min+')',q.bloque||''));});
  }
})();
