const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../../..'),dir=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(root,'index.html'),'utf8');
const lib=fs.readFileSync(path.join(__dirname,'lib.js'),'utf8');
const init=fs.readFileSync(path.join(__dirname,'init.js'),'utf8');
function rep(s,a,b){if(!s.includes(a))throw new Error('introuvable : '+a.slice(0,60));return s.split(a).join(b);}
function cut(s,a,b,by){const i=s.indexOf(a),j=s.indexOf(b,i);if(i<0||j<0)throw new Error('bornes : '+a.slice(0,40));return s.slice(0,i)+by+s.slice(j);}
const list=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(__dirname).filter(f=>/^p\d+\.js$/.test(f)).map(f=>f.match(/\d+/)[0]);
list.forEach(n=>{
  const prop=fs.readFileSync(path.join(__dirname,'p'+n+'.js'),'utf8');
  const titre=(prop.match(/titre:'([^']+)'/)||[])[1]||('Proposition '+n);
  let s=base;
  s=rep(s,'<title>Appartement T3</title>','<title>'+titre+' · T3</title>');
  s=s.replace(/<button data-p="[^"]+">[^<]*<\/button>\n?/g,'');
  s=cut(s,'function chair(cx,cz,back){','const modes={',lib+'\n'+prop+'\n'+init+'\n');
  s=rep(s,'furniture();\n    bedroom1();\n    bedroom2();\n    balcony();\n    bathShelf();\n','amenagement();\n');
  s=rep(s,"    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'beige'));\n    floor(157,565,232,705,'dark');floor(232,565,437,705,'dark');\n    floor(437,497,720,705,'wood');floor(520,15,720,255,'wood');\n",'    sols();\n');
  s=s.replace(/  rooms:\[\['Séjour \/ cuisine','28,2 m²',400,455\][^\n]*\n/,'  get rooms(){return ALT&&PROP.roomsAlt?PROP.roomsAlt:PROP.rooms;}\n');
  s=cut(s,'const paints={','let paintKey=','const paints=PAINTS;\n');
  s=rep(s,"let paintKey='actuelle';","let paintKey=Object.keys(PAINTS)[0];");
  s=cut(s,'const paintWalls={','const paintInfo=','const paintWalls=PWALLS;\n');
  s=rep(s,'document.querySelectorAll(\'#paintRow button\').forEach(b=>{','initPaints();\ndocument.querySelectorAll(\'#paintRow button\').forEach(b=>{');
  fs.writeFileSync(path.join(dir,'proposition-'+n+'.html'),s);
  console.log('proposition-'+n+'.html',s.length);
});
