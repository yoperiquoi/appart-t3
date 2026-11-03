const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../../..'),out=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(root,'index.html'),'utf8');
const lib=fs.readFileSync(path.join(__dirname,'lib.js'),'utf8');
const texAdd=fs.readFileSync(path.join(__dirname,'tex.js'),'utf8');
const texFn=fs.readFileSync(path.join(__dirname,'texfn.js'),'utf8');
function rep(s,a,b){if(!s.includes(a))throw new Error('introuvable: '+a.slice(0,60));return s.replace(a,()=>b);}
function between(s,a,b,repl,keepB){const i=s.indexOf(a),j=s.indexOf(b,i+a.length);if(i<0||j<0)throw new Error('bloc introuvable: '+a.slice(0,40));return s.slice(0,i)+repl+(keepB?s.slice(j):s.slice(j+b.length));}
const structStart=base.indexOf('    common();\n    wall(\'h\',497,437');
const structEnd=base.indexOf('    furniture();');
const struct=base.slice(structStart,structEnd);
const files=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(__dirname).filter(f=>/^p\d+\.js$/.test(f));
files.forEach(f=>{
  const p=require(path.join(__dirname,path.basename(f)));
  let s=base;
  s=rep(s,'<title>Appartement T3</title>','<title>Proposition '+p.n+' · '+p.court+'</title>');
  s=rep(s,'<div class="brand"><b>Appartement T3</b><small>62,6 m² · 5e étage</small></div>','<div class="brand"><b>'+p.n+' · '+p.nom+'</b><small>L\'architecte d\'intérieur · T3 62,6 m²</small></div>');
  s=rep(s,'Vue 3D interactive de l\'appartement T3, avant et après rénovation, avec l\'ameublement et des propositions de peinture.','Proposition '+p.n+' « '+p.nom+' » : '+p.idee);
  s=between(s,'<span class="opts">','</span>\n    <span id="paintInfo">','<span class="opts">\n'+Object.keys(p.palettes).map(k=>'    <button data-p="'+k+'">'+p.palettes[k].b+'</button>\n').join('')+'    </span>\n    <span id="paintInfo">');
  s=between(s,'<div id="legP" style="display:flex">','</div>\n  <div id="legA"','<div id="legP" style="display:flex">'+p.legende.map(l=>'<span class="key"><i style="background:'+l[0]+';border-color:'+l[1]+'"></i>'+l[2]+'</span>').join('')+'<span class="key"><i style="background:#3b82c4"></i>Portes</span></div>\n  <div id="legA"');
  s=rep(s,'<div class="hint">Glisser pour tourner','<div class="hint">'+p.hint+'<br>Glisser pour tourner');
  s=rep(s,'const tex={',texFn+'const tex={');
  s=rep(s,'\n};\nconst muralTex',',\n'+texAdd.trim()+'\n};\nconst muralTex');
  s=rep(s,'t.repeat.set(w/tex[name].m,h/tex[name].m);','t.repeat.set(w/(tex[name].mx||tex[name].m),h/(tex[name].mz||tex[name].m));');
  s=between(s,'function furniture(){','const modes={',lib+p.code.trim()+'\n',true);
  s=between(s,' projet:{\n  build(){','\n};\nlet labels',' projet:{\n  build(){\n'+struct+p.build.trim()+'\n  },\n  rooms:'+JSON.stringify(p.pieces)+'\n }\n};\nlet labels');
  const pal=Object.keys(p.palettes).map(k=>{const q=p.palettes[k];return '  '+k+':{n:'+JSON.stringify(q.n)+',w:{'+Object.keys(q.w).map(w=>w+':[0x'+q.w[w][0].toString(16).padStart(6,'0')+','+JSON.stringify(q.w[w][1])+']').join(',')+'},f:{'+Object.keys(q.f).map(t=>t+':0x'+q.f[t].toString(16).padStart(6,'0')).join(',')+'}}';}).join(',\n');
  s=between(s,'const paints={','\nconst paintInfo','const paints={\n'+pal+'\n};\nlet paintKey='+JSON.stringify(Object.keys(p.palettes)[0])+';\nfunction theme(){return paints[paintKey].f;}\nfunction pface(hor,c,a,b,t,side,y0,y1,col){\n  const o=side*(t/2+0.017),m=L(col);\n  if(hor)box(X(a),Z(c)+o-0.004,X(b),Z(c)+o+0.004,y0,y1,m,paintGroup);\n  else box(X(c)+o-0.004,Z(a),X(c)+o+0.004,Z(b),y0,y1,m,paintGroup);\n}\nfunction paintWall(hor,c,a0,a1,t,side,ops,col){\n  let cur=a0;\n  ops.forEach(o=>{\n    if(o[0]>cur)pface(hor,c,cur,o[0],t,side,0,H,col);\n    if(o[2]===\'win\')pface(hor,c,o[0],o[1],t,side,0,0.9,col);\n    pface(hor,c,o[0],o[1],t,side,o[2]===\'pf\'?2.2:2.1,H,col);\n    cur=o[1];\n  });\n  if(a1>cur)pface(hor,c,cur,a1,t,side,0,H,col);\n}\nconst paintWalls={\n'+p.murs.trim()+'\n};\nconst passages='+JSON.stringify(p.passages)+';\n',true);
  s=rep(s,"||'<span>Ch. 1 tête de lit vert sauge, reste blanc</span>'","||'<span>Murs blancs</span>'");
  s=rep(s,'cols=Object.keys(p.w).length?Object.keys(p.w).map(k=>p.w[k][0]):[0x9db8aa,0xf4f1ea];','cols=Object.keys(p.w).map(k=>p.w[k][0]).slice(0,3);');
  if(/\/\/|\/\*/.test(s.replace(/https?:\/\//g,'')))console.warn('attention : commentaire détecté dans',f);
  fs.writeFileSync(path.join(out,'proposition-'+p.n+'.html'),s);
  console.log('proposition-'+p.n+'.html',s.length);
});
