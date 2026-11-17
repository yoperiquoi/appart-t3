const roomWalls = {
  'Séjour': [
    ['Mur TV','h',497,437,720,-1,10,[[445,490,'porte']]],
    ['Côté bureau','h',255,520,720,1,10,[[525,585,'porte']]],
    ['Porte-fenêtre','v',720,255,497,-1,20,[[275,455,'baie']]],
    ['Retour côté bar','v',300,232,350,1,20],
    ['Retour derrière le bar','h',232,300,360,1,20],
    ['Retour du placard d’entrée','v',300,350,412,1,10],
    ['Retour côté chambre','v',437,497,565,-1,10]
  ],
  'Cuisine': [
    ['Meubles peu profonds','v',520,15,255,-1,10],
    ['Plan de travail','v',360,15,232,1,20],
    ['Fenêtre','h',15,360,520,1,20,[[475,520,'fenêtre']]]
  ],
  'Entrée': [
    ['Porte d’entrée','v',157,350,565,1,20,[[415,470,'porte']]],
    ['Placard d’entrée','h',350,157,300,1,20],
    ['Côté salle de bains','h',565,157,300,-1,10,[[175,215,'porte'],[245,290,'porte']]],
    ['Retour du rangement','v',300,516,565,-1,10],
    ['Dos du placard','v',300,350,412,-1,10]
  ],
  'Chambre 1': [
    ['Tête de lit','h',705,437,720,-1,20],
    ['Porte de la chambre','h',497,437,720,1,10,[[445,490,'porte']]],
    ['Porte-fenêtre','v',720,497,705,-1,20,[[515,576.2,'baie']]],
    ['Côté dressing','v',437,497,705,1,10]
  ],
  'Bureau': [
    ['Mur du BZ','v',520,15,255,1,10],
    ['Fenêtre du bureau','h',15,520,720,1,20,[[640,690,'fenêtre']]],
    ['Porte-fenêtre','v',720,15,255,-1,20,[[158.8,220,'baie']]],
    ['Étagères et porte','h',255,520,720,-1,10,[[525,585,'porte']]]
  ],
  'Salle de bains': [
    ['Côté machine à laver','v',232,565,705,1,10],
    ['Étagère et porte','h',565,232,437,1,10,[[245,290,'porte']]],
    ['Au-dessus de la baignoire','v',437,565,705,-1,10,[],2],
    ['Mur vasque','h',705,232,387,-1,20,[[350,382,'miroir']]],
    ['Au-dessus de la faïence','h',705,387,437,-1,20,[],2]
  ],
  'Balcon': [
    ['Façade côté bureau','v',720,15,255,1,20,[[158.8,220,'baie']]],
    ['Façade côté séjour','v',720,255,497,1,20,[[275,455,'baie']]],
    ['Façade côté chambre','v',720,497,705,1,20,[[515,576.2,'baie']]]
  ]
};
const finishes = {
  Peinture: [
    ['Ivoire','#f5f1e8'],['Lin','#ede9df'],['Craie','#f5f4ef'],['Sable','#dfd1bc'],
    ['Ficelle','#bfb4a0'],['Taupe','#aa998b'],['Argile','#c89480'],['Rose poudré','#ddbbb6'],
    ['Ocre','#c9a461'],['Miel','#d8bd89'],['Sauge','#b2bea7'],['Eucalyptus','#90a99b'],
    ['Olive','#929372'],['Forêt','#526959'],['Vert d’eau','#c7dcd2'],['Brume','#bacad0'],
    ['Bleu ardoise','#748995'],['Encre','#435569'],['Lavande','#c7bfd0'],['Grège','#ccc7bc']
  ],
  'Papier peint': [
    ['Rayures lin','#eee5d5','stripe','#c2ad8c'],['Feuilles de sauge','#f0eee3','leaf','#8b9e83'],
    ['Arches argile','#f1e3d6','arch','#bb8e78'],['Pois brume','#e4ecea','dot','#8ca3a7']
  ],
  Tasseaux: [
    ['Chêne naturel','#c7a47b','wood','#82684f'],['Frêne blond','#dfc8a4','wood','#a99577'],
    ['Noyer','#947458','wood','#574638']
  ]
};
function motif(f){
  const canvas=document.createElement('canvas');
  canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle=f[1];ctx.fillRect(0,0,128,128);
  ctx.strokeStyle=ctx.fillStyle=f[3]||f[1];ctx.lineWidth=3;
  if(f[2]==='stripe')for(let x=0;x<128;x+=32)ctx.fillRect(x,0,8,128);
  if(f[2]==='wood')for(let x=0;x<128;x+=16){ctx.fillRect(x,0,5,128);ctx.fillRect(x+7,0,1,128);}
  if(f[2]==='dot')for(const [x,y] of [[32,32],[96,96]]){ctx.beginPath();ctx.arc(x,y,7,0,2*Math.PI);ctx.fill();}
  if(f[2]==='arch')for(const x of [0,64,128])for(const r of [14,23,32]){ctx.beginPath();ctx.arc(x,x===64?95:31,r,Math.PI,2*Math.PI);ctx.stroke();}
  if(f[2]==='leaf')for(const [x,y] of [[32,32],[96,96]]){ctx.beginPath();ctx.moveTo(x-14,y+25);ctx.quadraticCurveTo(x-20,y-10,x+15,y-25);ctx.quadraticCurveTo(x+21,y+12,x-14,y+25);ctx.stroke();}
  return canvas;
}
const decorKey='appart-t3-decoration-v1';
function readDecor(){
  try{return JSON.parse(localStorage.getItem(decorKey))||{};}catch{return {};}
}
function surfaceParts(w,position){
  const [,dir,c,a,b,side,t,openings=[],bottom=0]=w;
  const width=position==='bande'?Math.min(b-a,0.6*68):b-a;
  const left=(a+b-width)/2,right=left+width,parts=[];
  const add=(x,y,end,top)=>{
    x=Math.max(left,x);end=Math.min(right,end);y=Math.max(bottom,y);
    if(end>x&&top>y)parts.push([x,y,end,top]);
  };
  let start=a;
  for(const [x,end,type] of openings){
    add(start,0,x,2.5);
    if(type==='fenêtre'||type==='miroir')add(x,0,end,type==='miroir'?1.1:0.9);
    add(x,type==='miroir'?1.9:type==='baie'?2.2:2.1,end,2.5);
    start=end;
  }
  add(start,0,b,2.5);
  return parts;
}
function renderDecor(group){
  const saved=readDecor();
  for(const [room,walls] of Object.entries(roomWalls))walls.forEach((w,index)=>{
    const choice=saved[room+'-'+index];
    if(!choice)return;
    const [,dir,c,a,b,side,t]=w;
    const horizontal=dir==='h';
    function panel(x,y,end,top,depth,thickness,material){
      const center=(c-(horizontal?15:157))/68+side*(t/200+depth+thickness/2);
      const u=(x-(horizontal?157:15))/68,v=u+(end-x)/68;
      const geometry=new THREE.BoxGeometry(horizontal?v-u:thickness,top-y,horizontal?thickness:v-u);
      if(material.map){
        const uv=geometry.attributes.uv,pos=geometry.attributes.position;
        for(let i=0;i<uv.count;i++)uv.setXY(i,((horizontal?pos.getX(i):pos.getZ(i))+(x+end)/136)/0.48,(pos.getY(i)+(y+top)/2)/0.48);
      }
      const mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(horizontal?(u+v)/2:center,(y+top)/2,horizontal?center:(u+v)/2);
      group.add(mesh);
    }
    if(/^#[0-9a-f]{6}$/i.test(choice.paint)){
      const mat=new THREE.MeshLambertMaterial({color:choice.paint});
      for(const p of surfaceParts(w))panel(...p,0.022,0.002,mat);
    }
    const f=[...finishes['Papier peint'],...finishes.Tasseaux].find(f=>f[0]===choice.finish);
    if(!f)return;
    const wood=f[2]==='wood',tex=wood?null:new THREE.CanvasTexture(motif(f));
    if(tex)tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
    const mat=new THREE.MeshLambertMaterial(tex?{map:tex}:{color:f[1]});
    for(const [x,y,end,top] of surfaceParts(w,choice.position)){
      if(!wood){panel(x,y,end,top,0.025,0.002,mat);continue;}
      const pitch=0.05*68;
      for(let i=Math.floor((x-a)/pitch);a+i*pitch<end;i++){
        const start=Math.max(x,a+i*pitch),stop=Math.min(end,a+i*pitch+0.03*68);
        if(stop>start)panel(start,y,stop,top,0.025,0.018,mat);
      }
    }
  });
}
export {roomWalls,finishes,motif,readDecor,decorKey,surfaceParts,renderDecor};