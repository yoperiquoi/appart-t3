const fs=require('fs'),path=require('path');
const racine=path.resolve(__dirname,'../../..'),dossier=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(racine,'index.html'),'utf8');
const lib=fs.readFileSync(path.join(dossier,'sources/lib.js'),'utf8');
function remplace(txt,av,ap){if(!txt.includes(av))throw new Error('Motif introuvable : '+av.slice(0,60));return txt.replace(av,()=>ap);}
const hex=c=>'#'+c.toString(16).padStart(6,'0');
const liste=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(path.join(dossier,'sources')).filter(f=>/^p\d+\.json$/.test(f)).map(f=>f.match(/\d+/)[0]);
liste.forEach(n=>{
  const meta=JSON.parse(fs.readFileSync(path.join(dossier,'sources/p'+n+'.json'),'utf8'));
  const code=fs.readFileSync(path.join(dossier,'sources/p'+n+'.js'),'utf8');
  let h=base;
  h=remplace(h,'<title>Appartement T3</title>','<title>'+meta.court+'</title>');
  h=remplace(h,'<small>62,6 m² · 5e étage</small>','<small>Proposition '+n+' · '+meta.nom+'</small>');
  const boutons=meta.palettes.map(k=>'    <button data-p="'+k+'">'+meta.nomsPalettes[k]+'</button>').join('\n');
  h=h.replace(/    <button data-p="actuelle">Actuelle<\/button>\n[\s\S]*?<button data-p="profond">Profond<\/button>/,()=>boutons);
  const leg=meta.legende.map(l=>'<span class="key"><i style="background:'+l[0]+';border-color:'+l[1]+'"></i>'+l[2]+'</span>').join('');
  h=h.replace(/<div id="legP" style="display:flex">.*?<\/div>/,()=>'<div id="legP" style="display:flex">'+leg+'</div>');
  h=remplace(h,'const modes={',lib+'\n'+code+'\nconst modes={');
  h=remplace(h,'    furniture();\n    bedroom1();\n    bedroom2();\n    balcony();\n    bathShelf();\n','    amenager();\n');
  h=remplace(h,"    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'beige'));\n    floor(157,565,232,705,'dark');floor(232,565,437,705,'dark');\n    floor(437,497,720,705,'wood');floor(520,15,720,255,'wood');\n",'');
  h=h.replace(/  rooms:\[\['Séjour \/ cuisine','28,2 m²',400,455\].*\n/,()=>'  rooms:PIECES\n');
  h=h.replace(/const paints=\{\n[\s\S]*?\n\};\n/,()=>'const paints=PALETTES;\n');
  h=remplace(h,"let paintKey='actuelle';","let paintKey='"+meta.palettes[0]+"';");
  h=remplace(h,"'<span>Ch. 1 tête de lit vert sauge, reste blanc</span>'","'<span>Murs blancs, carrelage et sols de la proposition</span>'");
  fs.writeFileSync(path.join(dossier,'proposition-'+n+'.html'),h);
  console.log('proposition-'+n+'.html',h.length);
});
