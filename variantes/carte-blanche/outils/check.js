const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const three=process.env.THREE||require.resolve('three/build/three.min.js',{paths:[process.cwd(),root]});
const only=process.argv.slice(2).filter(a=>/^\d+$/.test(a)).map(Number);
const shots=!process.argv.includes('--sans-captures');
const EPS=0.012;
function analyse(EPS){
  setWalls(1);setMode('projet');
  scene.updateMatrixWorld(true);
  const tagOf=o=>{let p=o;while(p&&p.userData.it===undefined&&p.parent&&p.parent!==scene)p=p.parent;return p&&p.userData.it;};
  const quad=m=>{const g=m.geometry;if(!g.boundingBox)g.computeBoundingBox();const b=g.boundingBox,e=m.matrixWorld,pts=[[b.min.x,b.min.z],[b.max.x,b.min.z],[b.max.x,b.max.z],[b.min.x,b.max.z]].map(p=>new THREE.Vector3(p[0],b.min.y,p[1]).applyMatrix4(e));const ys=[b.min.y,b.max.y].map(y=>new THREE.Vector3(0,y,0).applyMatrix4(e).y);return {p:pts.map(v=>[v.x,v.z]),y0:Math.min(...ys),y1:Math.max(...ys)};};
  const aabb=q=>{const xs=q.p.map(p=>p[0]),zs=q.p.map(p=>p[1]);q.x0=Math.min(...xs);q.x1=Math.max(...xs);q.z0=Math.min(...zs);q.z1=Math.max(...zs);return q;};
  const rect=(r,y0,y1)=>aabb({p:[[X(r.x0),Z(r.z0)],[X(r.x1),Z(r.z0)],[X(r.x1),Z(r.z1)],[X(r.x0),Z(r.z1)]],y0,y1});
  const proj=(q,ax)=>{let a=1e9,b=-1e9;q.p.forEach(p=>{const d=p[0]*ax[0]+p[1]*ax[1];a=Math.min(a,d);b=Math.max(b,d);});return [a,b];};
  const hit=(A,B)=>{
    if(Math.min(A.y1,B.y1)-Math.max(A.y0,B.y0)<=EPS)return 0;
    if(A.x1-B.x0<=EPS||B.x1-A.x0<=EPS||A.z1-B.z0<=EPS||B.z1-A.z0<=EPS)return 0;
    let mn=1e9;
    for(const q of [A,B])for(let i=0;i<4;i++){const p0=q.p[i],p1=q.p[(i+1)%4],dx=p1[0]-p0[0],dz=p1[1]-p0[1],l=Math.hypot(dx,dz);if(l<1e-9)continue;const ax=[-dz/l,dx/l],a=proj(A,ax),b=proj(B,ax),o=Math.min(a[1],b[1])-Math.max(a[0],b[0]);if(o<=EPS)return 0;mn=Math.min(mn,o);}
    return mn;
  };
  const meshes=(g,f)=>{const out=[];g.traverse(o=>{if(o.isMesh)out.push(f(o));});return out;};
  const obst=[];
  [[wallGroup,'mur/porte/menuiserie'],[fixGroup,'équipement fixe'],[tallGroup,'équipement fixe haut']].forEach(([g,n])=>g.traverse(o=>{if(o.isMesh){const q=aabb(quad(o));if(Math.min(q.x1-q.x0,q.z1-q.z0)<0.0125)return;q.n=n;obst.push(q);}}));
  ZONES.forEach(z=>{const q=rect(z,0,2.0);q.n='zone libre : '+z.n;obst.push(q);});
  const furn=[],untagged=[];
  [furnGroup,furnWall,furnTall].forEach(g=>g.traverse(o=>{if(!o.isMesh)return;const t=tagOf(o);if(t===undefined){untagged.push(1);return;}if(String(t).startsWith('~'))return;const q=aabb(quad(o));q.t=t;furn.push(q);}));
  const res={meubles:new Set(furn.map(f=>f.t)).size,maillages:furn.length,sansNom:untagged.length,murs:{},meubles2:{},passages:[]};
  furn.forEach(f=>obst.forEach(o=>{const h=hit(f,o);if(h){const k=f.t+' ↔ '+o.n;res.murs[k]=Math.max(res.murs[k]||0,Math.round(h*1000)/10);}}));
  for(let i=0;i<furn.length;i++)for(let j=i+1;j<furn.length;j++){const a=furn[i],b=furn[j];if(a.t===b.t)continue;const h=hit(a,b);if(h){const k=[a.t,b.t].sort().join(' ↔ ');res.meubles2[k]=Math.max(res.meubles2[k]||0,Math.round(h*1000)/10);}}
  const all=obst.filter(o=>!o.n.startsWith('zone')).concat(furn);
  PASS.forEach(p=>{const q=rect(p,0.05,1.9),w=Math.round(Math.min(Math.abs(p.x1-p.x0),Math.abs(p.z1-p.z0))/S*100),bl=[];all.forEach(o=>{if(hit(q,o))bl.push(o.t||o.n);});res.passages.push({n:p.n,cm:w,min:p.min,ok:w>=p.min&&!bl.length,obstacles:[...new Set(bl)]});});
  return res;
}
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const files=fs.readdirSync(root).filter(f=>/^proposition-\d+\.html$/.test(f)).sort((a,b)=>parseInt(a.match(/\d+/))-parseInt(b.match(/\d+/)));
  const rapport={};let bad=0;
  for(const f of files){
    const n=parseInt(f.match(/\d+/)[0]);if(only.length&&!only.includes(n))continue;
    const p=await b.newPage({viewport:{width:1500,height:1000}});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:three,contentType:'application/javascript'}));
    await p.goto('file://'+path.join(root,f));await p.waitForTimeout(600);
    const r=await p.evaluate(analyse,EPS);
    r.palettes=await p.evaluate(()=>{const out=[];document.querySelectorAll('#paintRow button').forEach(b=>{b.click();out.push(b.dataset.p);});setMode('avant');setMode('projet');document.querySelector('#paintRow button').click();return out;});
    await p.waitForTimeout(200);
    r.erreursJS=errs.slice();
    const ko=Object.keys(r.murs).length+Object.keys(r.meubles2).length+r.passages.filter(x=>!x.ok).length+r.sansNom+errs.length;
    bad+=ko;rapport[f]=r;
    console.log('\n== '+f+' : '+r.meubles+' meubles, palettes '+r.palettes.join('/')+' + Avant testées, '+(ko?ko+' problème(s)':'OK'));
    errs.forEach(e=>console.log('  JS  ',e));
    if(r.sansNom)console.log('  maillages sans nom :',r.sansNom);
    Object.entries(r.murs).forEach(([k,v])=>console.log('  MUR ',k,v+' cm'));
    Object.entries(r.meubles2).forEach(([k,v])=>console.log('  MEUB',k,v+' cm'));
    r.passages.forEach(x=>console.log('  '+(x.ok?'ok  ':'PASS')+' '+x.n+' : '+x.cm+' cm (min '+x.min+')'+(x.obstacles.length?' bloqué par '+x.obstacles.join(', '):'')));
    if(shots){
      const cap=path.join(root,'captures');fs.mkdirSync(cap,{recursive:true});
      await p.evaluate(t=>{document.querySelector('.ui').style.display='none';document.querySelector('.side').style.display='none';const d=document.createElement('div');d.style.cssText='position:fixed;top:14px;left:16px;z-index:9;font:600 18px system-ui;color:var(--text-primary);background:var(--panel);padding:8px 14px;border-radius:10px;border:1px solid var(--border)';d.textContent=t;document.body.appendChild(d);resize();},(await p.title()).replace('Carte blanche ','Proposition '));
      const shot=async(room,top,name,full)=>{
        await p.evaluate(([room,top,full])=>{setWalls(full?1:1.1/H);goTo(room,top);Object.assign(st,{az:goal.az,el:goal.el,dist:goal.dist*(room==='all'?(top?1.08:1.0):0.95)});tgt.set(goal.x,0,goal.z);goal=null;dirty=true;},[room,top,full]);
        await p.waitForTimeout(500);
        await p.screenshot({path:path.join(cap,'p'+n+'-'+name+'.jpg'),type:'jpeg',quality:82});
      };
      await shot('all',true,'dessus');await shot('all',false,'perspective');
      for(const room of ['sejour','ch1','ch2','entree','balcon'])await shot(room,false,room);
    }
    await p.close();
  }
  fs.writeFileSync(path.join(root,'outils','rapport.json'),JSON.stringify(rapport,null,1));
  await b.close();
  console.log(bad?'\nÉCHEC : '+bad+' problème(s)':'\nTout est vérifié.');
  process.exit(bad?1:0);
})();
