const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const dossier=path.resolve(__dirname,'..');
const THREE_LOCAL=process.env.THREE_JS||path.join(dossier,'outils/node_modules/three/build/three.min.js');
const ZONES=[
  {n:'débattement porte d’entrée',r:[163.8,415,218.8,470]},
  {n:'débattement porte WC',r:[175,521.6,215,561.6]},
  {n:'débattement porte SDB',r:[245,518.6,290,561.6]},
  {n:'débattement porte chambre 2',r:[525,196.6,580,251.6]},
  {n:'débattement porte chambre 1',r:[445,500.4,490,542]},
  {n:'débattement porte-fenêtre chambre 2',r:[659,160,713.2,220]},
  {n:'débattement porte-fenêtre chambre 1',r:[659,515,713.2,575]},
  {n:'accès placard couloir (50 cm)',r:[303.4,486.8,433.6,520.8]},
  {n:'accès placard d’entrée (45 cm)',r:[172,412,297,442.6]},
  {n:'ouverture lave-vaisselle',r:[456,72,515,122]}
];
const capture=!process.argv.includes('--sans-captures');
const liste=process.argv.slice(2).filter(a=>!a.startsWith('--'));
const nums=liste.length?liste:fs.readdirSync(dossier).filter(f=>/^proposition-\d+\.html$/.test(f)).map(f=>f.match(/\d+/)[0]);
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const rapport={};let ok=true;
  for(const n of nums){
    const meta=JSON.parse(fs.readFileSync(path.join(dossier,'sources/p'+n+'.json'),'utf8'));
    const p=await b.newPage({viewport:{width:1280,height:1180},deviceScaleFactor:capture?2:1});
    const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:THREE_LOCAL,contentType:'application/javascript'}));
    await p.goto('file://'+path.join(dossier,'proposition-'+n+'.html'));await p.waitForTimeout(1200);
    const res=await p.evaluate(cfg=>{
      setWalls(1);scene.updateMatrixWorld(true);
      const PX=v=>Math.round((v*S+ox)*10)/10,PZ=v=>Math.round((v*S+oz)*10)/10;
      const bb=m=>new THREE.Box3().setFromObject(m);
      const meshes=o=>{const a=[];o.traverse(c=>{if(c.isMesh)a.push(c);});return a;};
      const ov=(a,c,t)=>a.min.x<c.max.x-t&&a.max.x>c.min.x+t&&a.min.y<c.max.y-t&&a.max.y>c.min.y+t&&a.min.z<c.max.z-t&&a.max.z>c.min.z+t;
      const obst=[];
      meshes(wallGroup).forEach(m=>{const c=bb(m);if(Math.min(c.max.x-c.min.x,c.max.z-c.min.z)>=0.015)obst.push({n:'mur / porte / placard',b:c});});
      meshes(fixGroup).forEach(m=>obst.push({n:'équipement fixe (cuisine, SDB, radiateur, garde-corps)',b:bb(m)}));
      meshes(tallGroup).forEach(m=>obst.push({n:'rideau ou meuble haut de cuisine',b:bb(m)}));
      const zones=cfg.zones.map(z=>({n:z.n,b:new THREE.Box3(new THREE.Vector3(X(z.r[0]),0,Z(z.r[1])),new THREE.Vector3(X(z.r[2]),2.0,Z(z.r[3])))}));
      const sols=meshes(floorGroup).map(bb);
      const pieces=[],orphelins=[];
      [furnGroup,furnWall,furnTall].forEach(G=>G.children.forEach(c=>{if(c.isGroup&&c.name)pieces.push({n:c.name,tapis:c.name[0]==='~',m:meshes(c).map(bb)});else orphelins.push(c.type);}));
      const R={pieces:pieces.length,orphelins,murs:[],zones:[],meubles:[],hors:[],passages:[]};
      const t=0.003;
      pieces.forEach(P=>{
        const vus=new Set();
        P.m.forEach(m=>{
          obst.forEach(o=>{if(ov(m,o.b,t)&&!vus.has(o.n)){vus.add(o.n);R.murs.push(P.n+' ↔ '+o.n+' ('+PX(o.b.min.x)+','+PZ(o.b.min.z)+' → '+PX(o.b.max.x)+','+PZ(o.b.max.z)+')');}});
          if(!P.tapis)zones.forEach(z=>{if(ov(m,z.b,t)&&!vus.has(z.n)){vus.add(z.n);R.zones.push(P.n+' ↔ '+z.n);}});
          const cx=(m.min.x+m.max.x)/2,cz=(m.min.z+m.max.z)/2;
          if(!sols.some(s=>cx>=s.min.x-0.01&&cx<=s.max.x+0.01&&cz>=s.min.z-0.01&&cz<=s.max.z+0.01)&&!vus.has('hors')){vus.add('hors');R.hors.push(P.n);}
        });
      });
      for(let i=0;i<pieces.length;i++)for(let j=i+1;j<pieces.length;j++){
        const A=pieces[i],B=pieces[j];if(A.tapis||B.tapis)continue;
        if(A.m.some(a=>B.m.some(c=>ov(a,c,t))))R.meubles.push(A.n+' ↔ '+B.n);
      }
      const bas=[...obst.map(o=>o.b),...pieces.filter(P=>!P.tapis).flatMap(P=>P.m)].filter(c=>c.min.y<1.2&&c.max.y>0.05);
      cfg.passages.forEach(q=>{
        const x=X(q.x),z=Z(q.z);let a=1e9,c=1e9,dedans=false;
        bas.forEach(o=>{
          if(q.axe==='x'){if(z<o.min.z||z>o.max.z)return;if(x>o.min.x&&x<o.max.x)dedans=true;if(o.min.x>=x)c=Math.min(c,o.min.x-x);if(o.max.x<=x)a=Math.min(a,x-o.max.x);}
          else{if(x<o.min.x||x>o.max.x)return;if(z>o.min.z&&z<o.max.z)dedans=true;if(o.min.z>=z)c=Math.min(c,o.min.z-z);if(o.max.z<=z)a=Math.min(a,z-o.max.z);}
        });
        const w=dedans?0:Math.round((a+c)*100);
        R.passages.push({nom:q.nom,cm:w,min:q.min||80,ok:w>=(q.min||80)});
      });
      return R;
    },{zones:ZONES,passages:meta.passages||[]});
    res.erreursJS=errs;
    const bon=!errs.length&&!res.murs.length&&!res.zones.length&&!res.meubles.length&&!res.hors.length&&!res.orphelins.length&&res.passages.every(q=>q.ok);
    res.ok=bon;ok=ok&&bon;rapport['proposition-'+n]=res;
    console.log('\n=== Proposition '+n+' · '+meta.nom+' : '+(bon?'OK':'À CORRIGER')+' ('+res.pieces+' meubles)');
    ['erreursJS','orphelins','murs','zones','meubles','hors'].forEach(k=>res[k].length&&console.log(' '+k+':\n  - '+res[k].join('\n  - ')));
    res.passages.forEach(q=>console.log('  '+(q.ok?'✓':'✗')+' '+q.nom+' : '+q.cm+' cm (min '+q.min+')'));
    if(capture){
      await p.evaluate(()=>{setWalls(1.1/H);const c=document.getElementById('lab');c.checked=true;c.dispatchEvent(new Event('change'));goTo('all',true);});
      await p.waitForTimeout(2500);await p.screenshot({path:path.join(dossier,'captures/p'+n+'-dessus.png')});
      await p.evaluate(()=>{const c=document.getElementById('lab');c.checked=false;c.dispatchEvent(new Event('change'));goTo('all',false);});
      await p.waitForTimeout(2500);await p.screenshot({path:path.join(dossier,'captures/p'+n+'-perspective.png')});
    }
    await p.close();
  }
  fs.writeFileSync(path.join(dossier,'captures/verification.json'),JSON.stringify(rapport,null,1));
  await b.close();
  console.log(ok?'\nTout est conforme.':'\nDes points sont à corriger.');
  process.exit(ok?0:1);
})();
