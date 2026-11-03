const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'..');
const three=process.env.THREE_JS||path.join(__dirname,'three.min.js');
const portes=[
  ['Porte d\'entrée',163.8,415,218,470],
  ['Porte WC',175,524,216,561.6],
  ['Porte SDB',245,521,291,561.6],
  ['Porte chambre 1',440.4,500.4,491,546],
  ['Porte chambre 2',523.4,194,586,251.6],
  ['Porte-fenêtre ch. 2 (vantaux)',683,160,713.2,220],
  ['Porte-fenêtre ch. 1 (vantaux)',683,515,713.2,575],
  ['Lave-vaisselle ouvert',456,73,515,114],
  ['Bout du balcon nord',720,0,830,15.5],
  ['Bout du balcon sud',720,704.5,830,720]
];
const ids=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(dir).filter(f=>/^proposition-\d+\.html$/.test(f)).map(f=>f.match(/\d+/)[0]);
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files']});
  let ok=true;const rapport={};
  for(const id of ids){
    const meta=JSON.parse(fs.readFileSync(path.join(dir,'src','p'+id+'.json'),'utf8'));
    const p=await b.newPage({viewport:{width:1280,height:800},deviceScaleFactor:2});
    const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    await p.route('**/three.min.js',r=>r.fulfill({path:three,contentType:'application/javascript'}));
    await p.goto('file://'+path.join(dir,'proposition-'+id+'.html'));await p.waitForTimeout(1500);
    const res=await p.evaluate(({portes,passages})=>{
      setWalls(1);setMode('projet');scene.updateMatrixWorld(true);
      const toP=v=>[v.x*S+ox,v.z*S+oz];
      const boxesOf=o=>{const out=[];o.updateMatrixWorld(true);o.traverse(m=>{if(m.isMesh){const bb=new THREE.Box3().setFromObject(m);out.push(bb);}});return out;};
      const grps=[furnGroup,furnWall,furnTall],its=[];
      items.forEach((it,i)=>{const nx=items[i+1]||[null,furnGroup.children.length,furnWall.children.length,furnTall.children.length];const bx=[];grps.forEach((g,k)=>{for(let c=it[k+1];c<nx[k+1];c++)bx.push(...boxesOf(g.children[c]));});its.push({n:it[0],b:bx.filter(q=>q.max.y>0.02)});});
      let total=0;grps.forEach(g=>total+=g.children.length);
      const firsts=items.length?[items[0][1],items[0][2],items[0][3]]:[0,0,0];
      const orphelins=firsts[0]+firsts[1]+firsts[2];
      const obs=[];
      [[wallGroup,'mur/porte'],[fixGroup,'équipement fixe'],[tallGroup,'équipement haut']].forEach(([g,n])=>boxesOf(g).forEach(bb=>{if(bb.max.y>0.001){const sx=bb.max.x-bb.min.x,sz=bb.max.z-bb.min.z;if(Math.min(sx,sz)>0.0125||n!=='mur/porte')obs.push({n,b:bb});};}));
      const zb=(x0,z0,x1,z1,y0,y1)=>new THREE.Box3(new THREE.Vector3(X(x0),y0,Z(z0)),new THREE.Vector3(X(x1),y1,Z(z1)));
      const zones=portes.map(q=>({n:q[0],b:zb(q[1],q[2],q[3],q[4],0.03,2.0)}));
      const e=0.004,hit=(a,c)=>Math.min(a.max.x,c.max.x)-Math.max(a.min.x,c.min.x)>e&&Math.min(a.max.y,c.max.y)-Math.max(a.min.y,c.min.y)>e&&Math.min(a.max.z,c.max.z)-Math.max(a.min.z,c.min.z)>e;
      const conflits=[],seen=new Set();
      const add=(a,c,bb)=>{const k=a+' ↔ '+c;if(seen.has(k))return;seen.add(k);const p0=toP(bb.min),p1=toP(bb.max);conflits.push(k+' @ x'+p0[0].toFixed(0)+'-'+p1[0].toFixed(0)+' z'+p0[1].toFixed(0)+'-'+p1[1].toFixed(0)+' y'+bb.min.y.toFixed(2)+'-'+bb.max.y.toFixed(2));};
      its.forEach((a,i)=>{
        a.b.forEach(ba=>{
          obs.forEach(o=>{if(hit(ba,o.b))add(a.n,o.n,ba);});
          zones.forEach(o=>{if(hit(ba,o.b))add(a.n,o.n,ba);});
          for(let j=i+1;j<its.length;j++)its[j].b.forEach(bc=>{if(hit(ba,bc))add(a.n,its[j].n,ba);});
        });
      });
      const all=obs.map(o=>o.b).concat(...its.map(i=>i.b));
      const mes=passages.map(q=>{
        const [n,x0,z0,x1,z1,ax]=q,alongX=ax?ax==='x':(x1-x0)>=(z1-z0),y0=0.05,y1=1.9;
        const zone=zb(x0,z0,x1,z1,y0,y1),bl=all.find(bb=>hit(bb,zone)),bloque=!!bl;
        let lo=alongX?z0:x0,hi=alongX?z1:x1;
        const free=(a,c)=>{const z=alongX?zb(x0,a,x1,c,y0,y1):zb(a,z0,c,z1,y0,y1);return !all.some(bb=>hit(bb,z));};
        if(!bloque){while(lo>0&&free(lo-0.5,lo))lo-=0.5;while(hi<900&&free(hi,hi+0.5))hi+=0.5;}
        return {n,par:bl?(toP(bl.min).map(v=>v.toFixed(0)).join(',')+' → '+toP(bl.max).map(v=>v.toFixed(0)).join(',')+' y'+bl.min.y.toFixed(2)+'-'+bl.max.y.toFixed(2)):'',annonce:Math.round((alongX?z1-z0:x1-x0)/S*1000)/10,mesure:Math.round((hi-lo)/S*1000)/10,bloque};
      });
      setMode('avant');setMode('projet');return {conflits,mes,orphelins,items:its.map(i=>i.n)};
    },{portes,passages:meta.passages||[]});
    const bad=errs.length||res.conflits.length||res.orphelins||res.mes.some(m=>m.bloque||m.annonce<(m.n.startsWith('Allée de cuisine')?90:80));
    if(bad)ok=false;
    rapport[id]={erreursJS:errs,conflits:res.conflits,passages:res.mes,meublesHorsMarqueur:res.orphelins,elements:res.items.length};
    console.log('\n=== proposition '+id+' : '+(bad?'ÉCHEC':'OK')+' — '+res.items.length+' éléments');
    if(errs.length)console.log('Erreurs JS :',errs);
    if(res.orphelins)console.log('Meubles hors marqueur :',res.orphelins);
    res.conflits.forEach(c=>console.log('  conflit :',c));
    res.mes.forEach(m=>console.log('  passage '+(m.bloque?'BLOQUÉ ':'')+m.n+' : '+m.annonce+' cm garantis, '+m.mesure+' cm mesurés'+(m.bloque?' (par '+m.par+')':'')));
    if(process.env.CAPTURES!=='0'){
      await p.evaluate(()=>{document.querySelector('.ui').style.display='none';document.querySelector('.side').style.display='none';resize();setWalls(1.1/H);const c=document.getElementById('lab');c.checked=false;c.dispatchEvent(new Event('change'));});
      const shot=async(n,fn)=>{await p.evaluate(fn);await p.waitForTimeout(1600);await p.screenshot({path:path.join(dir,'captures','proposition-'+id+'-'+n+'.jpg'),type:'jpeg',quality:82});};
      await shot('dessus',()=>{goTo('all',true);goal.az=-Math.PI/2;goal.el=1.5;goal.dist=17;goal.x=X(478);goal.z=Z(365);});
      await shot('perspective',()=>{goTo('all',false);goal.dist=17;goal.x=X(500);goal.z=Z(390);});
      await shot('balcon',()=>{goTo('all',false);goal.az=1.2;goal.el=0.6;goal.x=X(690);goal.z=Z(370);goal.dist=13;});
    }
    await p.close();
  }
  fs.writeFileSync(path.join(__dirname,'rapport.json'),JSON.stringify(rapport,null,1));
  await b.close();
  console.log(ok?'\nTOUT EST OK':'\nDES PROBLÈMES RESTENT');process.exit(ok?0:1);
})();
