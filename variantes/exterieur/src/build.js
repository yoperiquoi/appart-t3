const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..','..','..');
const base=fs.readFileSync(path.join(root,'index.html'),'utf8');
const lib=fs.readFileSync(path.join(__dirname,'lib.js'),'utf8');
function rep(s,a,b,what){if(!s.includes(a))throw new Error('ancre manquante : '+what);return s.replace(a,b);}
function cut(s,a,b,ins,what){const i=s.indexOf(a),j=s.indexOf(b,i);if(i<0||j<0)throw new Error('ancre manquante : '+what);return s.slice(0,i)+ins+s.slice(j);}
const ids=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(__dirname).filter(f=>/^p\d+\.json$/.test(f)).map(f=>f.slice(1,-5));
ids.forEach(id=>{
  const meta=JSON.parse(fs.readFileSync(path.join(__dirname,'p'+id+'.json'),'utf8'));
  const code=fs.readFileSync(path.join(__dirname,'p'+id+'.js'),'utf8');
  let s=base;
  s=rep(s,'<title>Appartement T3</title>','<title>'+meta.titre+'</title>','titre');
  s=rep(s,'<small>62,6 m² · 5e étage</small>','<small>'+meta.sous+'</small>','sous-titre');
  s=cut(s,'<span class="opts">','</span>\n    <span id="paintInfo">','<span class="opts">\n'+meta.peintures.map(p=>'    <button data-p="'+p[0]+'">'+p[1]+'</button>').join('\n')+'\n    ','peintures');
  s=cut(s,'<div id="legP" style="display:flex">','</div>\n  <div id="legA"','<div id="legP" style="display:flex">'+meta.legende.map(k=>'<span class="key"><i style="background:'+k[0]+';border-color:'+(k[1]||k[0])+'"></i>'+k[2]+'</span>').join(''),'légende');
  s=rep(s,"  curt(262,290,0xf3f1ea,0.8);curt(440,468,0xf3f1ea,0.8);\n  curt(136,160,0xd9a441,0.9);curt(578,602,0x6b6d70,0.9);\n  floor(720,15,760,705,'deck');\n  floor(760,15,825,705,'grass');\n  pbox(821,15,825,705,0,1.1,tm('reed',9.7,1.1),fixGroup);\n","",'common');
  s=rep(s,"    mural([[437,720]]);","    mural([[437,720]]);\n    curt(262,290,0xf3f1ea,0.8);curt(440,468,0xf3f1ea,0.8);curt(136,160,0xd9a441,0.9);curt(578,602,0x6b6d70,0.9);\n    floor(720,15,760,705,'deck');floor(760,15,825,705,'grass');\n    pbox(821,15,825,705,0,1.1,tm('reed',9.7,1.1),fixGroup);",'avant');
  s=cut(s,'const paints={','let paintKey=','','paints');
  s=cut(s,'const paintWalls={','const paintInfo=','','paintWalls');
  s=cut(s,'function chair(cx,cz,back){','const modes={',lib+code+'\n','meubles');
  s=cut(s,'\n projet:{','\nlet labels','\n projet:projet\n};','projet');
  s=rep(s,"let paintKey='actuelle';","let paintKey='"+meta.peintureDefaut+"';",'peinture défaut');
  s=rep(s,"||'<span>Ch. 1 tête de lit vert sauge, reste blanc</span>'","||'<span>"+meta.peintureInfo+"</span>'",'info peinture');
  fs.writeFileSync(path.join(__dirname,'..','proposition-'+id+'.html'),s);
  console.log('proposition-'+id+'.html',s.length);
});
