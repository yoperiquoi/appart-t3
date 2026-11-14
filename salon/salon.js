const scale=0.68;
const svg=document.getElementById('plan');
const furniture=document.getElementById('furniture');
const radiatorLayer=document.getElementById('radiators');
const byId=id=>document.getElementById(id);
const types=[
  ['sofa','Canapé',[['2 places',160,90],['3 places',210,95],['Compact',180,90],['Angle',240,155,'angle'],['Méridienne compacte',180,165,'angle'],['IKEA VIMLE 3 places noir',235,179,'angle','vimle']]],
  ['chair','Fauteuil',[['Compact',70,75],['Club',80,85],['Lounge',90,95]]],
  ['table','Table basse',[['Rectangle',100,55],['Ronde',75,75,'round'],['Carrée',70,70],['Ovale',110,55,'round']]],
  ['tv','Télévision',[['43 pouces',95,8],['55 pouces',122,8],['65 pouces',145,8],['75 pouces',167,8]]],
  ['console','Meuble TV',[['Compact',120,38],['Standard',160,40],['Long',200,42]]],
  ['dining','Table à manger',[['Ronde',110,110,'round'],['Rectangle',140,80],['Carrée',80,80]]],
  ['dining-chair','Chaise de table',[['Standard',45,45],['Large',50,50]]]
];
const colours={sofa:'#acb8a4',chair:'#b9a486',table:'#d7b78b',tv:'#424943',console:'#cbbdb0',dining:'#dec9a5','dining-chair':'#af8864'};
const heaters=[
  {id:'rad-south',bounds:[711-75*scale,487,711,493.6]},
  {id:'rad-north',bounds:[711-75*scale,258.4,711,265]}
];
const swing=[[713.2,455],...Array.from({length:33},(_,i)=>{
  const angle=Math.PI+i*Math.PI/64;
  return [713.2+61.2*Math.cos(angle),455+61.2*Math.sin(angle)];
})];
const barEnd=Array.from({length:25},(_,i)=>{
  const angle=Math.PI-i*Math.PI/24;
  return [390+35*Math.cos(angle),302.8+35*Math.sin(angle)];
});
let items=[],selected=null,drag=null,nextId=0;
const savedKey='appart-t3-salon-essais';
let saved=[];
try { saved=JSON.parse(localStorage.getItem(savedKey)||'[]'); } catch {}
function element(name,attrs={}){
  const node=document.createElementNS('http://www.w3.org/2000/svg',name);
  for(const [key,value] of Object.entries(attrs))node.setAttribute(key,value);
  return node;
}
function rectangle(x0,y0,x1,y1){return [[x0,y0],[x1,y0],[x1,y1],[x0,y1]];}
function shapes(item){
  const x=item.w*scale/2,y=item.d*scale/2;
  if(item.form==='round')return [Array.from({length:32},(_,i)=>{
    const a=i*Math.PI/16;
    return [x*Math.cos(a),y*Math.sin(a)];
  })];
  const vimle=item.model==='vimle';
  const sectionDepth=vimle?98:95;
  if(item.form==='angle'&&item.d>sectionDepth){
    const edge=y-sectionDepth*scale;
    const chaise=(vimle?Math.min(item.w,98):Math.min(item.w/2,85))*scale;
    const a=item.flip?-x:x-chaise,b=item.flip?-x+chaise:x;
    return [rectangle(-x,edge,x,y),rectangle(a,-y,b,edge)];
  }
  return [rectangle(-x,-y,x,y)];
}
function world(poly,item){
  const a=item.angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
  return poly.map(([x,y])=>[item.x+x*c-y*s,item.y+x*s+y*c]);
}
function overlaps(a,b){
  return [a,b].every(poly=>poly.every(([x,y],i)=>{
    const [u,v]=poly[(i+1)%poly.length],dx=y-v,dy=u-x;
    const project=points=>points.map(([px,py])=>px*dx+py*dy);
    const p=project(a),q=project(b);
    return Math.min(Math.max(...p),Math.max(...q))-Math.max(Math.min(...p),Math.min(...q))>0.015*Math.hypot(dx,dy);
  }));
}
function walkable(x,y){
  return (x>=160.4&&x<=300&&y>=353.4&&y<=561.6)
    ||(x>=300&&x<=436&&y>=235.4&&y<=520.8)
    ||(x>=436&&x<=716.6&&y>=258.4&&y<=493.6)
    ||(x>=436&&x<=516.6&&y>=225&&y<=258.4);
}
function conflicts(){
  const footprints=items.map(item=>shapes(item).map(poly=>world(poly,item)));
  const fixed=[
    [swing,'débattement de la porte-fenêtre'],
    [rectangle(355,224,425,302.8),'bar'],
    [rectangle(489,224,516.6,254),'meuble de cuisine'],
    [rectangle(300,522.7,437,565),'placard du couloir']
  ];
  if(!byId('square-bar').checked)fixed.push([barEnd,'arrondi du bar']);
  for(const heater of heaters){
    if(byId(heater.id).checked)fixed.push([rectangle(...heater.bounds),'radiateur']);
  }
  return items.map((item,i)=>{
    const polygons=footprints[i],reasons=new Set();
    for(const poly of polygons){
      if(poly.some(([x,y],j)=>{
        const [u,v]=poly[(j+1)%poly.length],samples=Math.ceil(Math.hypot(u-x,v-y)/4);
        return Array.from({length:samples+1},(_,k)=>k/Math.max(1,samples)).some(t=>!walkable(x+(u-x)*t,y+(v-y)*t));
      }))reasons.add('mur ou limite du plan');
      for(const [obstacle,name] of fixed)if(overlaps(poly,obstacle))reasons.add(name);
      for(let j=0;j<items.length;j++){
        const pair=[item.kind,items[j].kind].sort().join();
        if(j===i||pair==='console,tv'||pair==='dining,dining-chair')continue;
        if(footprints[j].some(other=>overlaps(poly,other)))reasons.add('autre meuble');
      }
    }
    return reasons;
  });
}
function syncEditor(){
  const item=items.find(p=>p.id===selected);
  byId('empty').hidden=Boolean(item);
  byId('editor').hidden=!item;
  if(!item)return;
  byId('item-name').textContent=item.name;
  byId('width').value=item.w;
  byId('depth').value=item.d;
  byId('mirror').hidden=item.form!=='angle';
}
function draw(){
  radiatorLayer.replaceChildren();
  for(const heater of heaters){
    if(!byId(heater.id).checked)continue;
    const [x,y,r,b]=heater.bounds;
    const rect=element('rect',{x,y,width:r-x,height:b-y,rx:1,fill:'#ab563c'});
    const title=element('title');
    title.textContent=heater.id==='rad-north'?'Radiateur chambre 2 · position estimée':'Radiateur chambre 1';
    rect.append(title);radiatorLayer.append(rect);
  }
  byId('bar-end').style.display=byId('square-bar').checked?'none':'';
  const issues=conflicts();
  const focused=document.activeElement?.dataset?.piece;
  furniture.replaceChildren();
  items.forEach((item,i)=>{
    const group=element('g',{transform:'translate('+item.x+' '+item.y+') rotate('+item.angle+')',tabindex:'0',role:'button',
      'aria-label':item.name+', '+item.w+' par '+item.d+' cm','data-piece':item.id,
      class:['piece',item.id===selected?'selected':'',issues[i].size?'blocked':''].join(' ')});
    for(const polygon of shapes(item)){
      group.append(element('polygon',{class:'shape',points:polygon.map(p=>p.join(',')).join(' '),fill:item.model==='vimle'?'#353735':colours[item.kind]}));
    }
    if(['sofa','chair','tv','dining-chair'].includes(item.kind)){
      const w=item.w*scale/2,d=item.d*scale/2;
      const y=item.kind==='tv'?-d:item.kind==='dining-chair'?-d+2:d-4;
      group.append(element('path',{d:'M'+(-w+4)+' '+y+'H'+(w-4),'class':'screen-mark'}));
    }
    const label=element('text',{fill:item.model==='vimle'?'#fff':'#222921',style:item.model==='vimle'?'fill:#fff':'',y:item.kind==='tv'?-7:item.form==='angle'?item.d*scale/2-9:3});
    label.textContent=item.model==='vimle'?'VIMLE':item.kind==='tv'?'TV':item.kind==='dining-chair'?'':types.find(type=>type[0]===item.kind)[1];
    group.append(label);
    furniture.append(group);
  });
  if(focused)furniture.querySelector('[data-piece="'+focused+'"]')?.focus({preventScroll:true});
  const index=items.findIndex(p=>p.id===selected);
  const total=issues.filter(x=>x.size).length;
  const detail=index>=0&&issues[index].size?' · '+[...issues[index]].join(', '):'';
  byId('status').textContent=total?total+' meuble(s) à vérifier'+detail:'Aucun chevauchement détecté sur le plan.';
}
function add(kind,option,x=550,y=371,angle=0){
  const [label,w,d,form,model]=option;
  const name=types.find(type=>type[0]===kind)[1]+' · '+label;
  const item={id:++nextId,kind,name,w,d,form,model,x,y,angle,flip:model==='vimle'};
  items.push(item);
  return item;
}
function choose(item){selected=item?.id??null;syncEditor();draw();}
for(const [kind,name,options] of types){
  const row=document.createElement('div'),select=document.createElement('select'),button=document.createElement('button');
  row.className='catalogue-row';select.setAttribute('aria-label',name);
  options.forEach(([label,w,d],i)=>select.add(new Option(name+' · '+label+' ('+w+' × '+d+')',i)));
  button.textContent='Ajouter';button.setAttribute('aria-label','Ajouter '+name.toLowerCase());
  button.onclick=()=>{
    const item=add(kind,options[Number(select.value)]);
    const candidates=[[535,367],[562,364],[466,398],[584,455],[485,330],[610,337],[632,405]];
    for(const [x,y] of candidates){
      item.x=x;item.y=y;
      if(!conflicts().at(-1).size)break;
    }
    choose(item);
  };
  row.append(select,button);byId('catalogue').append(row);
}
function point(event){
  return new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
}
svg.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  const group=event.target.closest('[data-piece]');
  const item=items.find(p=>p.id===Number(group?.dataset.piece));
  if(!item){choose(null);return;}
  const p=point(event);
  drag={item,dx:p.x-item.x,dy:p.y-item.y,pointer:event.pointerId};
  svg.setPointerCapture(event.pointerId);
  choose(item);
});
svg.addEventListener('pointermove',event=>{
  if(drag?.pointer!==event.pointerId)return;
  const p=point(event);
  drag.item.x=Math.round(p.x-drag.dx);
  drag.item.y=Math.round(p.y-drag.dy);
  draw();
});
for(const name of ['pointerup','pointercancel','lostpointercapture']){
  svg.addEventListener(name,event=>{if(drag?.pointer===event.pointerId)drag=null;});
}
svg.addEventListener('keydown',event=>{
  const id=Number(event.target.dataset.piece);
  const item=items.find(p=>p.id===id);
  if(!item)return;
  if(['Enter',' '].includes(event.key)){event.preventDefault();choose(item);return;}
  const offsets={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
  const offset=offsets[event.key];
  if(!offset)return;
  event.preventDefault();
  item.x+=offset[0]*(event.shiftKey?7:1);item.y+=offset[1]*(event.shiftKey?7:1);
  choose(item);
});
for(const [id,key] of [['width','w'],['depth','d']])byId(id).onchange=event=>{
  const item=items.find(p=>p.id===selected),input=event.target;
  if(!item)return;
  if(input.value&&input.checkValidity())item[key]=input.valueAsNumber;
  syncEditor();draw();
};
for(const [id,delta] of [['rotate-left',-15],['rotate-right',15]])byId(id).onclick=()=>{
  const item=items.find(p=>p.id===selected);if(item){item.angle=(item.angle+delta+360)%360;draw();}
};
byId('mirror').onclick=()=>{const item=items.find(p=>p.id===selected);if(item){item.flip=!item.flip;draw();}};
byId('delete').onclick=()=>{items=items.filter(p=>p.id!==selected);choose(null);};
for(const id of ['square-bar',...heaters.map(h=>h.id)])byId(id).onchange=draw;
function restore(){
  items=[];
  const sofa=add('sofa',types[0][2][4],652,315,180);sofa.flip=true;
  add('chair',['Club',80,80],559,350,163);
  add('table',['Rectangle',90,50],611,403);
  add('console',types[4][2][1],622,480);
  add('tv',types[3][2][1],622,490);
  const tableX=440,tableY=395,chairOffset=62*scale;
  const chair=types.find(([kind])=>kind==='dining-chair')[2][0];
  add('dining-chair',chair,tableX,tableY-chairOffset,0);
  add('dining-chair',chair,tableX,tableY+chairOffset,180);
  add('dining-chair',chair,tableX-chairOffset,tableY,270);
  add('dining-chair',chair,tableX+chairOffset,tableY,90);
  add('dining',types[5][2][0],tableX,tableY);
  byId('square-bar').checked=false;
  for(const heater of heaters)byId(heater.id).checked=true;
  choose(null);
}
byId('restore').onclick=restore;
byId('clear').onclick=()=>{items=[];choose(null);};
function renderSaved(){
  byId('saved').replaceChildren();
  saved.forEach((entry,i)=>{
    const row=document.createElement('div'),open=document.createElement('button'),remove=document.createElement('button');
    row.className='saved-row';
    open.textContent=entry.name;
    open.onclick=()=>{
      items=entry.items.map(p=>({...p,id:++nextId}));
      byId('square-bar').checked=entry.square;
      heaters.forEach((h,j)=>{byId(h.id).checked=entry.heaters[j];});
      choose(null);
    };
    remove.textContent='Effacer';remove.setAttribute('aria-label','Effacer '+entry.name);
    remove.onclick=()=>{saved.splice(i,1);storeSaved();renderSaved();};
    row.append(open,remove);byId('saved').append(row);
  });
}
function storeSaved(){
  try{localStorage.setItem(savedKey,JSON.stringify(saved));}
  catch{byId('status').textContent='Le navigateur n’a pas pu enregistrer cet essai.';}
}
byId('save').onclick=()=>{
  const name=window.prompt('Nom de cet agencement','Essai '+(saved.length+1));
  if(!name?.trim())return;
  saved.push({name:name.trim(),items:items.map(p=>({...p})),square:byId('square-bar').checked,
    heaters:heaters.map(h=>byId(h.id).checked)});
  storeSaved();renderSaved();
};
byId('show-3d').onclick=()=>{
  try {
    const layout={items,square:byId('square-bar').checked,heaters:heaters.map(h=>byId(h.id).checked)};
    sessionStorage.setItem('appart-t3-salon-preview',JSON.stringify(layout));
    location.href='../?salon=1';
  } catch {
    byId('status').textContent='Le navigateur ne permet pas de transmettre cet agencement.';
  }
};
restore();
if(new URLSearchParams(location.search).has('reprendre')){
  try{
    const layout=JSON.parse(sessionStorage.getItem('appart-t3-salon-preview'));
    if(Array.isArray(layout?.items)&&layout.heaters?.length===2){
      items=layout.items.map(item=>({...item,id:++nextId}));
      byId('square-bar').checked=layout.square;
      heaters.forEach((heater,index)=>{byId(heater.id).checked=layout.heaters[index];});
      choose(null);
    }
  }catch{}
}
renderSaved();
