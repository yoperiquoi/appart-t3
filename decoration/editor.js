import {roomWalls,finishes,motif,readDecor,decorKey,surfaceParts} from './materials.js';
const el=id=>document.getElementById(id);
const all=readDecor();
let room='Séjour',index=0,tab='Peinture';
const key=()=>room+'-'+index;
const wall=()=>roomWalls[room][index];
const current=()=>all[key()]||{};
const textures=new Map();
function texture(f){
  if(!textures.has(f[0]))textures.set(f[0],motif(f).toDataURL());
  return textures.get(f[0]);
}
function svg(tag,attrs,parent){
  const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
  for(const [k,v] of Object.entries(attrs))node.setAttribute(k,v);
  parent.appendChild(node);
  return node;
}
function selectWall(r,i){
  room=r;index=i;el('room').value=r;
  el('wall').replaceChildren(...roomWalls[r].map((w,j)=>new Option(w[0],j)));
  el('wall').value=i;
  el('status').textContent='';
  render();
}
function drawPlan(){
  const plan=el('plan');plan.replaceChildren();
  for(const [r,walls] of Object.entries(roomWalls))walls.forEach((w,i)=>{
    const [,dir,c,a,b,side,t,open=[]]=w;
    const axis=c+side*(t*0.34+2);
    const line=(lo,hi,color,width)=>{
      const coords=dir==='h'?{x1:lo,x2:hi,y1:axis,y2:axis}:{y1:lo,y2:hi,x1:axis,x2:axis};
      const n=svg('line',{...coords,stroke:color,'stroke-width':width},plan);
      n.style.cursor='pointer';n.onclick=()=>selectWall(r,i);
      svg('title',{},n).textContent=r+' · '+w[0];
    };
    const selected=r===room&&i===index,color=selected?'#28744e':all[r+'-'+i]?'#ae805a':'#818981';
    let left=a;
    for(const [lo,hi,type] of open){if(type==='miroir')continue;line(left,lo,color,selected?9:4);line(lo,hi,'#b4ced1',2);left=hi;}
    line(left,b,color,selected?9:4);line(a,b,'transparent',10);
  });
  for(const [label,x,y] of [['Cuisine',437,140],['Bureau',620,140],['Séjour',510,385],['Entrée',229,470],['Bains',335,644],['Ch. 1',580,605],['Balcon',783,380]]){
    const n=svg('text',{x,y,'text-anchor':'middle',fill:'#68756b','font-size':21,'pointer-events':'none'},plan);n.textContent=label;
  }
}
function elevation(){
  const w=wall(),a=w[3],b=w[4],width=(b-a)/0.68,view=el('elevation'),choice=current();
  view.replaceChildren();view.setAttribute('viewBox','0 0 '+width+' 250');
  const reverse=w[1]==='h'?w[5]<0:w[5]>0;
  function rect(x,y,end,top,fill){
    svg('rect',{x:(reverse?b-end:x-a)/0.68,y:250-top*100,width:(end-x)/0.68,height:(top-y)*100,fill},view);
  }
  rect(a,0,b,2.5,'#c6d3d5');
  const f=[...finishes['Papier peint'],...finishes.Tasseaux].find(f=>f[0]===choice.finish);
  for(const p of surfaceParts(w))rect(...p,choice.paint||'#f2efe6');
  if(w[8])rect(a,0,b,w[8],'#c3c7c3');
  if(f){
    const pattern=svg('pattern',{id:'sample',patternUnits:'userSpaceOnUse',width:48,height:48},svg('defs',{},view));
    svg('image',{width:48,height:48,href:texture(f)},pattern);
    for(const p of surfaceParts(w,choice.position))rect(...p,'url(#sample)');
  }
  el('size').textContent=(width/100).toLocaleString('fr-FR',{maximumFractionDigits:2})+' m de large · 2,50 m de haut';
}
function save(changes){
  const next={...current(),...changes};
  if(next.paint||next.finish)all[key()]=next;else delete all[key()];
  try{localStorage.setItem(decorKey,JSON.stringify(all));el('status').textContent='Enregistré sur cet appareil';}
  catch{el('status').textContent='Stockage local indisponible';}
  render();
}
function render(){
  const c=current();el('name').textContent=room+' · '+wall()[0];
  drawPlan();elevation();
  for(const b of document.querySelectorAll('.tabs button'))b.setAttribute('aria-pressed',b.textContent===tab);
  el('samples').replaceChildren();
  for(const f of finishes[tab]){
    const b=document.createElement('button'),sw=document.createElement('i');
    sw.style.background=f[2]?'url('+texture(f)+') center / 52px':f[1];
    b.append(sw,document.createTextNode(f[0]));b.setAttribute('aria-pressed',tab==='Peinture'?f[1]===c.paint:f[0]===c.finish);
    b.onclick=()=>tab==='Peinture'?save({paint:f[1]}):save({finish:f[0],position:el('coverage').querySelector('select').value});
    el('samples').appendChild(b);
  }
  el('custom').hidden=tab!=='Peinture';el('custom').querySelector('input').value=c.paint||'#f2efe6';
  el('coverage').hidden=tab==='Peinture';el('coverage').querySelector('select').value=c.position||'plein';
  el('remove').disabled=!c.finish;el('reset').disabled=!all[key()];
}
for(const r of Object.keys(roomWalls))el('room').add(new Option(r,r));
el('room').onchange=e=>selectWall(e.target.value,0);
el('wall').onchange=e=>selectWall(room,Number(e.target.value));
for(const b of document.querySelectorAll('.tabs button'))b.onclick=()=>{tab=b.textContent;render();};
el('custom').querySelector('input').oninput=e=>save({paint:e.target.value});
el('coverage').querySelector('select').onchange=e=>{if(current().finish)save({position:e.target.value});};
el('remove').onclick=()=>save({finish:null,position:null});
el('reset').onclick=()=>save({paint:null,finish:null,position:null});
selectWall(room,index);