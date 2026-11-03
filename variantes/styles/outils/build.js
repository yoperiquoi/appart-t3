const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..','..','..');
const src=fs.readFileSync(path.join(root,'index.html'),'utf8');
const lib=fs.readFileSync(path.join(__dirname,'lib.js'),'utf8');
const only=process.argv.slice(2);
function rep(s,a,b){const i=s.indexOf(a);if(i<0||s.indexOf(a,i+1)>=0)throw new Error('ancre introuvable ou multiple : '+a.slice(0,40));return s.replace(a,()=>b);}
function cut(s,a,z,b){const i=s.indexOf(a),j=s.indexOf(z,i);if(i<0||j<0)throw new Error('bloc introuvable : '+a);return s.slice(0,i)+b+s.slice(j+z.length);}
fs.readdirSync(__dirname).filter(f=>/^p\d+\.js$/.test(f)).sort().forEach(f=>{
  const n=f.match(/\d+/)[0];if(only.length&&only.indexOf(n)<0)return;
  const code=fs.readFileSync(path.join(__dirname,f),'utf8');
  const desc=(code.match(/desc:'([^']*)'/)||[])[1]||'';
  let h=src;
  h=cut(h,'<span class="opts">','</span>','<span class="opts"><button data-p="prop">Palette</button></span>');
  h=cut(h,'<h2 ','</h2>','<h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">'+desc+'</h2>');
  h=rep(h,'const modes={',lib+'\n'+code+'\nconst modes={');
  h=rep(h,"let labels=[],mode='projet';","modes.projet=PROJET;\nlet labels=[],mode='projet';");
  h=cut(h,'const paints={',"let paintKey='actuelle';","const paints=PAINTS;\nlet paintKey='prop';");
  h=cut(h,'const paintWalls={','\n};','const paintWalls=PWALLS;');
  h=rep(h,'const ro=new ResizeObserver','setUI(PROP);\nconst ro=new ResizeObserver');
  fs.writeFileSync(path.join(__dirname,'..','proposition-'+n+'.html'),h);
  console.log('proposition-'+n+'.html',h.length);
});
