const PROP={num:5,name:'Paquebot',short:'Paquebot',desc:'Proposition 5, Paquebot : un Art déco de transatlantique, damier de marbre posé à 45°, canapé en arc de cercle, banquette de brasserie, laiton, velours et pont en teck sur le balcon.',
 legend:[[0xeeeae2,0x151515,'Damier marbre 45°'],[0xf3f1ec,0x151515,'Mosaïque fleurie'],[0x2f6a52,0x1e3a2e,'Chevrons vert bouteille'],[0xb08656,0x6a4a2a,'Point de Hongrie'],[0xa87a4e,0x151515,'Pont teck'],[0x3b82c4,0x1f4f7d,'Portes']]};
Object.assign(tex,{
 damier45:{t:mk(g=>{g.fillStyle='#eeeae2';g.fillRect(0,0,256,256);const r=rnd(81);for(let i=0;i<260;i++){g.strokeStyle='rgba(150,150,150,0.25)';g.lineWidth=1;g.beginPath();const x=r()*256,y=r()*256;g.moveTo(x,y);g.bezierCurveTo(x+20,y+10,x+30,y+30,x+50,y+35);g.stroke();}g.fillStyle='#1a1a1a';g.beginPath();g.moveTo(128,0);g.lineTo(256,128);g.lineTo(128,256);g.lineTo(0,128);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,0.18)';for(let i=0;i<8;i++){g.beginPath();g.moveTo(60+i*14,120+i*3);g.bezierCurveTo(100,140,140,110,190,140-i*4);g.stroke();}g.strokeStyle='#8a8680';g.lineWidth=2;g.beginPath();g.moveTo(128,0);g.lineTo(256,128);g.lineTo(128,256);g.lineTo(0,128);g.closePath();g.stroke();}),m:0.849},
 hexFleur:{t:mk(g=>{const s=16,hh=Math.sqrt(3)*s;g.fillStyle='#bdb8ae';g.fillRect(0,0,336,194);for(let i=-1;i<=14;i++)for(let j=-1;j<=4;j++){const cx=i*1.5*s,cy=j*hh+(i%2?hh/2:0);g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+s*0.9*Math.cos(a),cy+s*0.9*Math.sin(a));}g.closePath();const ii=((i%7)+7)%7,jj=((j%4)+4)%4;g.fillStyle=(ii===3&&jj===1)||(ii===0&&jj===3)?'#151515':((Math.abs(ii-3)===1&&jj===1)||(ii===3&&(jj===0||jj===2))?'#151515':'#f3f1ec');g.fill();}},336,194),m:0.42,mh:0.2425},
 chevVert:{t:mk(g=>{g.fillStyle='#d8d4c8';g.fillRect(0,0,256,256);const r=rnd(83),cols=['#2f6a52','#2a604a','#35755b','#26573f'];for(let c=0;c<4;c++)for(let k=-2;k<10;k++){const x=c*64,y=k*32,d=c%2?-1:1;g.fillStyle=cols[Math.floor(r()*4)];g.beginPath();g.moveTo(x+1,y+(d>0?0:32)+1);g.lineTo(x+63,y+(d>0?32:0)+1);g.lineTo(x+63,y+(d>0?32:0)+31);g.lineTo(x+1,y+(d>0?0:32)+31);g.closePath();g.fill();}}),m:0.45},
 hongrie:{t:mk(g=>{const r=rnd(87),cols=['#b08656','#a87d4e','#ba915f','#a37748','#b48a59'];g.fillStyle='#6a4a2a';g.fillRect(0,0,256,256);for(let c=0;c<4;c++)for(let k=-2;k<10;k++){const x=c*64,y=k*32,d=c%2?-1:1;g.fillStyle=cols[Math.floor(r()*5)];g.beginPath();g.moveTo(x+0.8,y+(d>0?0:32)+1);g.lineTo(x+63.2,y+(d>0?32:0)+1);g.lineTo(x+63.2,y+(d>0?32:0)+31);g.lineTo(x+0.8,y+(d>0?0:32)+31);g.closePath();g.fill();}}),m:1.2},
 yacht:{t:mk(g=>{for(let k=0;k<16;k++){g.fillStyle=['#a87a4e','#b08354','#a07349','#ad7f51'][k%4];g.fillRect(k*16,0,14,256);g.fillStyle='#151515';g.fillRect(k*16+14,0,2,256);g.fillRect(k*16,(k*67)%256,14,2);}}),m:0.8},
 fluted:{t:mk(g=>{for(let k=0;k<16;k++){const gr=g.createLinearGradient(k*16,0,k*16+16,0);gr.addColorStop(0,'#1e3a2e');gr.addColorStop(0.5,'#3a7a5e');gr.addColorStop(1,'#1e3a2e');g.fillStyle=gr;g.fillRect(k*16,0,16,256);}}),m:0.32,mh:2.4},
 flutedR:{t:mk(g=>{for(let k=0;k<16;k++){const gr=g.createLinearGradient(k*16,0,k*16+16,0);gr.addColorStop(0,'#8a5f58');gr.addColorStop(0.5,'#d8aea6');gr.addColorStop(1,'#8a5f58');g.fillStyle=gr;g.fillRect(k*16,0,16,256);}}),m:0.32,mh:2.4},
 fan:{t:mk(g=>{g.fillStyle='#151515';g.fillRect(0,0,256,256);g.strokeStyle='#c9a24a';g.lineWidth=3;for(let i=0;i<=12;i++){const a=Math.PI+i*Math.PI/12;g.beginPath();g.moveTo(128,230);g.lineTo(128+200*Math.cos(a),230+200*Math.sin(a));g.stroke();}[60,110,160].forEach(rr=>{g.beginPath();g.arc(128,230,rr,Math.PI,2*Math.PI);g.stroke();});g.strokeRect(6,6,244,244);}),m:0.6},
 sun:{t:mk(g=>{g.fillStyle='#2f3c4a';g.fillRect(0,0,256,256);g.strokeStyle='#c9a24a';g.lineWidth=4;for(let i=0;i<32;i++){const a=i*Math.PI/16;g.beginPath();g.moveTo(128+50*Math.cos(a),128+50*Math.sin(a));g.lineTo(128+(i%2?100:124)*Math.cos(a),128+(i%2?100:124)*Math.sin(a));g.stroke();}g.fillStyle='#c9a24a';g.beginPath();g.arc(128,128,50,0,6.283);g.fill();g.fillStyle='#c9d3d6';g.beginPath();g.arc(128,128,44,0,6.283);g.fill();}),m:1}
});
const GREEN=0x2c3e30,IVORY=0xefe8dc,PINK=0xc49a93,BRIN=0x4b2f3a,HAGUE=0x2f3c4a,GOLD=0xc9a24a,BLK=0x151515,ROSE=0xc98f86,EMV=0x2f6a52;
const PAINTS={prop:{n:'Paquebot',w:{
 sej:[GREEN,'Séjour · soubassement Studio Green (F&B 93), haut Pointing (2003), filet laiton'],
 ent:[HAGUE,'Entrée · Hague Blue (F&B 30), miroir soleil'],
 ch1:[PINK,'Chambre · Sulking Room Pink (F&B 295)'],
 ch2:[BRIN,'Bibliothèque · Brinjal (F&B 222)'],
 sdb:[EMV,'SDB · chevrons vert bouteille, WC Studio Green']},f:{}}};
const PWALLS={
 sej:()=>{room('sej',GREEN,0,1.1);room('sej',IVORY,1.1,H);['n','e','s','w1','w2','nk','s2'].forEach(k=>pw(WL.sej[k],GOLD,1.09,1.12,0.019));room('cui',IVORY);room('cui',wtex('chevVert'),0.9,1.45,['w','e']);panel(true,255,605,695,I,1,1.45,2.2,wtex('fan'));},
 ent:()=>{room('ent',HAGUE);panel(false,157,476,520,E,1,1.15,1.8,wtex('sun'));},
 ch1:()=>{room('ch1',PINK);},
 ch2:()=>{room('ch2',BRIN);},
 sdb:()=>{room('sdb',wtex('chevVert'),0,2.0);room('sdb',IVORY,2.0,H);room('wc',wtex('chevVert'),0,1.2);room('wc',GREEN,1.2,H);panel(true,705,346,384,E,-1,1.1,1.75,wtex('sun'));}
};
const PASS=[
 ['Cuisine : plan de travail ↔ METOD',455,200,'x',0.9],
 ['Cuisine : bar ↔ METOD',455,250,'x',0.9],
 ['Séjour : entrée → séjour',380,480,'z',0.8],
 ['Séjour : meuble-bar ↔ table basse (vers la baie)',620,325,'z',0.8],
 ['Séjour : banquette de brasserie ↔ canapé',480,400,'x',0.8],
 ['Séjour : devant la chambre 1',467,470,'x',0.8],
 ['Chambre : côté gauche du lit',510,630,'x',0.8],
 ['Chambre : côté droit du lit',685,630,'x',0.8],
 ['Chambre : porte → porte-fenêtre',600,528,'z',0.8],
 ['Bibliothèque : fauteuil ↔ méridienne',600,160,'z',0.8],
 ['Bibliothèque : rayonnages ↔ fauteuil',570,110,'x',0.8],
 ['Balcon : bistrot ↔ garde-corps',790,485,'x',0.8],
 ['Balcon : façade ↔ buis',760,360,'x',0.8]
];
function arcSofa(n,cx,cz,R,d,a0,a1,col,kc){item(n);const N=12,Rm=M(R),dd=d,da=(a1-a0)/N;
  for(let i=0;i<N;i++){const th=a0+(i+0.5)*da,px=cx+Rm*Math.cos(th),pz=cz+Rm*Math.sin(th),len=R*da*1.04+0.01,phi=-(th+Math.PI/2);
    [[dd,0,0.06,0.36,col],[dd-0.18,-0.09,0.36,0.46,kc],[0.18,dd/2-0.09,0.36,0.84,col]].forEach(q=>{const m=new THREE.Mesh(new THREE.BoxGeometry(len,q[3]-q[2],q[0]),mt(q[4]));const off=q[1];m.position.set(X(px)+Math.cos(th)*off,(q[2]+q[3])/2,Z(pz)+Math.sin(th)*off);m.rotation.y=phi;IT.add(m);});}
  [a0,a1].forEach(th=>cy(cx+Rm*Math.cos(th),cz+Rm*Math.sin(th),0.03,0,0.06,GOLD));}
function velvetChair(n,cx,cz,dir,col){return chair(n,cx,cz,dir,{c:col,l:GOLD,s:col,back:0.8,round:true,w:0.46});}
function p5Sejour(){
  item('Banquette de brasserie velours vert');b(303.4,352,347.6,412,0,0.42,EMV);b(303.4,352,312,412,0.42,0.95,EMV);b(303.4,352,313,412,0.95,0.97,GOLD);for(let i=0;i<4;i++)b(312,354+i*14.5,313,366+i*14.5,0.48,0.9,0x3a7a5e);
  rtable('Table bistrot marbre 70 × 70',373.8,380.8,0.36,0.75,0xeeeae2,BLK,{pr:0.05,br:0.22});
  velvetChair('Chaise velours vert est',410,381,'E',EMV);velvetChair('Chaise velours vert sud',374,428,'S',EMV);
  pendant('Suspension laiton à gradins',374,381,1.75,{k:'tiers',r:0.22,c:GOLD});
  rrug('Tapis rond Art déco',620,392,1.25,0x1e3a2e,{ring:[[1.15,IVORY],[1.05,0x1e3a2e],[0.5,GOLD]]});
  arcSofa('Canapé en arc velours vieux rose',620,385,1.15,0.85,Math.PI*0.23,Math.PI*0.77,ROSE,0xd8a59c);
  rtable('Table basse marbre noir Ø 0,80',620,385,0.4,0.4,BLK,GOLD,{pr:0.08,br:0.25});
  item('Plateau laiton et carafe');cy(620,385,0.18,0.4,0.41,GOLD);cy(626,388,0.04,0.41,0.62,clear(0xb7d3c8,0.6),0.05);
  cab('Meuble-bar laqué noir (TV derrière les portes)',furnWall,595,258.4,705,292,0.15,1.35,BLK,{f:'S',nd:3,fc:tm('fan',0.53,1.2),hc:GOLD,knob:true});[[597,261],[701,261],[597,288],[701,288]].forEach(p=>b(p[0],p[1],p[0]+2,p[1]+2,0,0.15,GOLD));
  item('Cocktail : shaker et coupes');cy(615,272,0.03,1.35,1.55,GOLD);[640,650,660].forEach(x=>{cy(x,274,0.04,1.42,1.45,clear(0xdfe8ea,0.6));cy(x,274,0.005,1.35,1.42,GOLD);});
  plant('Ficus en cache-pot laiton',331,295,{r:0.16,h:0.4,pc:GOLD,H:1.5,k:'round',lc:0x2f5a36,lc2:0x3f6f45});
  flamp('Lampadaire globe laiton',703,320,1.55,{k:'globe',r:0.15,c:0xfff1d6,lc:GOLD,br:0.13});
  pendant('Globe opaline cuisine',440,170,1.95,{k:'globe',r:0.16,c:0xfff1d6});
  metod(EMV,0x151515);
  item('Étagères laiton cuisine',furnWall);[1.5,1.85].forEach(y=>b(499.6,150,516.6,252,y,y+0.02,GOLD));[[165,IVORY],[185,BLK],[210,IVORY],[235,EMV]].forEach((q,i)=>cy(508,q[0],0.05,1.52,1.6+(i%2)*0.07,q[1]));
}
function p5Ch1(){
  cab('Façades cannelées laquées rose (dressing existant derrière)',furnWall,440.4,545,482.6,698.2,0,2.4,0x8a5f58,{f:'E',nd:3,fc:tm('flutedR',0.77,2.4),hc:GOLD,hh:0.3,hy:1.1});
  bed('Lit 160 × 200, tête de lit festonnée velours vert',598,626.1,1.6,2.0,'S',{fh:0.3,leg:0.06,lc:GOLD,frame:EMV,fr:0.03,hb:1.3,hbd:0.06,hbx:6,hbc:EMV,duvet:IVORY,plaid:ROSE,pil:0xf6f2ea,pil2:EMV});
  item('Festons de la tête de lit');[0,1,2,3].forEach(i=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.06,20,1,false,Math.PI/2,Math.PI),mt(EMV));m.rotation.x=Math.PI/2;m.position.set(X(541.6+(i+0.5)*29.7),1.3,Z(695.2));IT.add(m);});
  [[522,'gauche'],[674,'droit']].forEach(p=>{item('Guéridon miroir '+p[1]);cy(p[0],676,0.2,0.5,0.53,clear(0xc9d3d6,0.85));cy(p[0],676,0.03,0,0.5,GOLD);cy(p[0],676,0.15,0,0.02,GOLD);tlamp('Lampe globe '+p[1],p[0],676,0.53,{k:'globe',r:0.09,c:0xfff1d6,bc:GOLD});});
  pendant('Plafonnier à gradins',598,600,2.1,{k:'tiers',r:0.3,c:GOLD});
  rug('Tapis Art déco',540,505,656,553,0x1e3a2e,{border:GOLD,bw:0.05});
  curtain('Rideaux velours vert',false,720,577,603,E,-1,EMV,0.95);
}
function p5Ch2(){
  desk180(558,21.8,0x6a3a2a,GOLD);
  item('Écran 27" et lampe banquier');b(590,48,634,50,0.86,1.22,0x1d1d1f);b(610,49,614,56,0.75,0.86,0x333333);cy(570,40,0.05,0.75,0.77,GOLD);cy(570,40,0.008,0.77,1.05,GOLD);b(562,36,578,44,1.0,1.06,glow(0x2f8a5a,0.4));
  item('Fauteuil de bureau pivotant velours');cy(619,103,0.28,0,0.04,GOLD);cy(619,103,0.025,0.04,0.44,GOLD);cy(619,103,0.28,0.44,0.52,0x6b2a2a);const m=new THREE.Mesh(new THREE.CylinderGeometry(0.29,0.29,0.36,24,1,true,Math.PI*0.5,Math.PI),mt(0x6b2a2a));m.material.side=THREE.DoubleSide;m.position.set(X(619),0.72,Z(103));IT.add(m);
  shelf('Bibliothèque sol-plafond laquée',furnWall,523.4,25,543.8,195,2.4,[0.02,0.4,0.78,1.16,1.54,1.92,2.38],BRIN,[0x6b2a2a,EMV,IVORY,GOLD,BLK,0x2f3c4a],{up:4,seed:31});
  item('Méridienne velours');b(586,200.6,681,251.6,0.06,0.38,0x6b2a2a);b(588,202,681,250,0.38,0.46,0x8a3a34);b(586,200.6,600,251.6,0.38,0.85,0x6b2a2a);b(600,244,650,251.6,0.46,0.7,0x6b2a2a);[[590,203],[677,203],[590,248],[677,248]].forEach(p=>cy(p[0],p[1],0.015,0,0.06,GOLD));
  flamp('Liseuse laiton',697,238,1.4,{k:'cone',r:0.14,c:0x2f6a52,lc:GOLD,br:0.11});
  rug('Tapis vert',575,125,690,192,0x1e3a2e,{border:GOLD});
  pendant('Plafonnier opaline',619,140,2.1,{k:'globe',r:0.17,c:0xfff1d6});
  curtain('Rideaux velours prune',false,720,136,159,E,-1,0x6b2a2a,0.95);
}
function p5Ent(){
  item('Console demi-lune laquée');b(163.8,476,184.2,520,0.8,0.84,BLK);[480,516].forEach(z=>b(164,z-1,166,z+1,0,0.8,GOLD));b(180,496,183,500,0,0.8,GOLD);
  tlamp('Lampe globe console',174,505,0.84,{k:'globe',r:0.09,c:0xfff1d6,bc:GOLD});
  pendant('Suspension à gradins entrée',230,480,2.0,{k:'tiers',r:0.2,c:GOLD});
  rug('Tapis noir à frise',200,425,280,520,BLK,{border:GOLD,bw:0.04});
}
function p5Sdb(){
  item('Étagères laiton au-dessus du lave-linge',furnTall);[1.3,1.65].forEach(y=>{b(236.4,681.2,287,698.2,y,y+0.02,GOLD);[[IVORY,0.18],[BLK,0.14],[EMV,0.2]].forEach((q,i)=>cy(246+i*14,689,0.04,y+0.02,y+0.02+q[1],q[0]));});
  item('Porte-serviettes laiton sur pied');cy(310,580,0.1,0,0.02,GOLD);cy(310,580,0.01,0.02,1.4,GOLD);b(300,579,320,581,1.2,1.4,IVORY);
  plant('Fougère de Boston',360,598,{r:0.12,h:0.35,pc:BLK,H:0.7,k:'round',lc:0x4f8a4a});
}
function p5Balc(){
  [[735,'1'],[780,'2']].forEach(p=>{item('Transat rayé '+p[1]);b(p[0],20,p[0]+40,115,0.18,0.3,0xa87a4e);[[p[0],20],[p[0]+38,20],[p[0],113],[p[0]+38,113]].forEach(q=>b(q[0],q[1],q[0]+2,q[1]+2,0,0.18,0xa87a4e));b(p[0]+2,22,p[0]+38,90,0.3,0.36,tm('p2s',0.5,1));const m=new THREE.Mesh(new THREE.BoxGeometry(0.54,0.06,0.45),mt(tm('p2s',0.5,0.5)));m.position.set(X(p[0]+20),0.52,Z(102));m.rotation.x=-0.85;IT.add(m);});
  planter('Bacs à buis boules',795,150,818,255,0.45,IVORY,{k:'round',lc:0x2f5a36,n:3,H:0.55});
  planter('Bacs à buis boules et agapanthes',795,290,818,440,0.45,IVORY,{k:'flowers',lc:0x2f5a36,fc:[0x5a6ad0,0x6a7ae0],n:4});
  rtable('Guéridon marbre Ø 0,55',746,485,0.275,0.72,0xeeeae2,GOLD,{pr:0.03,br:0.18});
  chair('Chaise de pont nord',746,452,'N',{c:BLK,s:IVORY,back:0.82});chair('Chaise de pont sud',746,518,'S',{c:BLK,s:IVORY,back:0.82});
  item('Rangement de jardin existant, laqué bleu marine');b(726.8,614.6,774.4,703,0,1.8,HAGUE);b(774.4,658,775.2,659.6,0.05,1.75,GOLD);
  [[805,470],[805,600]].forEach((p,i)=>{item('Lanterne hublot '+(i+1));cy(p[0],p[1],0.1,0,0.04,GOLD);cy(p[0],p[1],0.08,0.04,0.36,glow(0xffe2a8,0.6));cy(p[0],p[1],0.1,0.36,0.4,GOLD);});
}
Object.assign(tex,{p2s:{t:mk(g=>{for(let k=0;k<8;k++){g.fillStyle=k%2?'#f3f1ec':'#2f3c4a';g.fillRect(k*32,0,32,256);}}),m:0.5}});
const PROJET={
 build(){
  basePro({pl:[(w,h)=>tm('fluted',w,h),0,BLK],closet:EMV,reed:tm('yacht',9.7,1.1),plh:GOLD});
  TZ.forEach(r=>fl(r[0],r[1],r[2],r[3],'damier45'));
  fl(232,565,437,705,'hexFleur');fl(157,565,232,705,'hexFleur');
  fl(437,497,720,705,'hongrie');fl(520,15,720,255,'hongrie');fl(720,15,821,705,'yacht');
  p5Sejour();p5Ch1();p5Ch2();p5Ent();p5Sdb();p5Balc();
  curtain('Rideaux velours vert, baie',false,720,262,290,E,-1,EMV,0.95);
 },
 rooms:[['Salon-paquebot','28,2 m²',470,455],['Bibliothèque','9,0 m²',620,140],['Chambre','≈ 11,5 m²',560,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',235,390,2.55],['Placard couloir cannelé','',368,545,2.55],['Pont','15,1 m²',790,360],['Canapé en arc','',620,440,0.9,1],['Banquette de brasserie','',325,382,1.0,1],['Meuble-bar','',650,275,1.5,1],['Méridienne','',633,226,0.9,1]]
};
