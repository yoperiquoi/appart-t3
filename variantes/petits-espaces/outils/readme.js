const fs=require('fs'),path=require('path');
const dir=path.resolve(__dirname,'..');
const r=JSON.parse(fs.readFileSync(path.join(dir,'captures/verification.json'),'utf8'));
let s=fs.readFileSync(path.join(__dirname,'README.modele.md'),'utf8');
const w=v=>v>300?'> 3 m (dégagé)':v+' cm';
Object.keys(r).forEach(f=>{
  const n=f.match(/\d+/)[0],a=r[f].courant,b=r[f].deplie;
  const mins=a.passages.map((p,i)=>Math.min(p.largeur,b.passages[i].largeur));
  let t='| Passage mesuré | Position courante | Déplié | Minimum exigé |\n|---|---|---|---|\n';
  a.passages.forEach((p,i)=>{t+='| '+p.nom+' | '+w(p.largeur)+' | '+w(b.passages[i].largeur)+' | '+p.min+' cm |\n';});
  t+='\nPlus petit passage : **'+Math.min(...mins)+' cm**. Vérification : '+r[f].erreurs.length+' erreur JS, '+(a.collisions.length+b.collisions.length)+' chevauchement, '+(a.zones.length+b.zones.length)+' empiètement sur une porte ou un ouvrant ('+a.pieces+' meubles contrôlés).';
  s=s.split('{{P'+n+'}}').join(t);
});
fs.writeFileSync(path.join(dir,'README.md'),s);
console.log('README.md',s.length);
