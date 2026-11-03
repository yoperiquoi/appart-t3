const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),src=path.join(root,'source');
const base=fs.readFileSync(path.resolve(root,'../../index.html'),'utf8');
const lib=fs.readFileSync(path.join(src,'lib.js'),'utf8');
const props=JSON.parse(fs.readFileSync(path.join(src,'propositions.json'),'utf8'));
function rep(s,a,b){if(!s.includes(a))throw new Error('introuvable : '+a.slice(0,60));return s.replace(a,b);}
function cut(s,start,end,b){const i=s.indexOf(start);if(i<0)throw new Error('début introuvable : '+start);const j=s.indexOf(end,i);if(j<0)throw new Error('fin introuvable : '+end);return s.slice(0,i)+b+s.slice(j+end.length);}
props.forEach((p,i)=>{
  const n=i+1,code=fs.readFileSync(path.join(src,'p'+n+'.js'),'utf8');
  let h=base;
  h=rep(h,'<title>Appartement T3</title>','<title>'+p.titre+'</title>');
  h=rep(h,'<b>Appartement T3</b><small>62,6 m² · 5e étage</small>','<b>'+n+' · '+p.nom+'</b><small>Carte blanche · 62,6 m²</small>');
  h=rep(h,'.chip{border-radius:999px;border-color:var(--border)}','.chip{border-radius:999px;border-color:var(--border)}\na.pn{font-size:13px;padding:6px 10px;border-radius:8px;color:var(--text-primary);text-decoration:none}\na.pn:hover{background:var(--hover)}\na.pn.on{background:var(--ink);color:var(--ink-text)}');
  h=rep(h,'<div class="bar" id="rooms"','<div class="bar" id="props" role="navigation" aria-label="Propositions"><span class="lbl">Propositions</span>'+props.map((q,k)=>'<a class="pn'+(k===i?' on':'')+'" href="proposition-'+(k+1)+'.html" title="'+q.nom+'">'+(k+1)+'</a>').join('')+'</div>\n  <div class="bar" id="rooms"');
  h=cut(h,'<span class="opts">','</span>\n    <span id="paintInfo">','<span class="opts">\n'+Object.keys(p.palettes).map(k=>'    <button data-p="'+k+'">'+p.palettes[k]+'</button>').join('\n')+'\n    </span>\n    <span id="paintInfo">');
  h=cut(h,'<div id="legP" style="display:flex">','</div>','<div id="legP" style="display:flex">'+p.legende.map(l=>'<span class="key"><i style="background:'+l[0]+';border-color:'+l[1]+'"></i>'+l[2]+'</span>').join('')+'</div>');
  h=cut(h,'    furniture();\n    bedroom1();',"floor(520,15,720,255,'wood');\n",'    amenagement();\n');
  h=cut(h,"  rooms:[['Séjour / cuisine','28,2 m²',400,455]",'\n',"  rooms:ROOMS\n");
  h=cut(h,'const paints={','\n};\n','');
  h=cut(h,'const paintWalls={','\n};\n','');
  h=rep(h,'const modes={','\n'+lib+'\n'+code+'\nconst modes={');
  h=rep(h,"let paintKey='actuelle';","let paintKey=Object.keys(paints)[0];");
  h=rep(h,"<span>Ch. 1 tête de lit vert sauge, reste blanc</span>","<span>Murs blancs</span>");
  fs.writeFileSync(path.join(root,'proposition-'+n+'.html'),h);
  console.log('proposition-'+n+'.html',Math.round(h.length/1024)+' Ko');
});
