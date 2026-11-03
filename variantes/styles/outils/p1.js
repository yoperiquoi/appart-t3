const PROP={num:1,name:'Ryokan',short:'Ryokan',desc:'Proposition 1, Ryokan : un japandi d’auberge japonaise, genkan sombre, washitsu en tatamis, bois clair, papier et jardin zen sur le balcon.',
 legend:[[0xd7ccbb,0xb7ab98,'Calcaire 60×120'],[0x3d3c3a,0x222222,'Genkan ardoise'],[0x9aa58c,0xcfd2c4,'Grès 10×10 vert thé'],[0xdcc7a6,0xa98a62,'Chêne blanchi'],[0xc8c18c,0x2f3a2e,'Tatamis'],[0xcfccc4,0x9a968e,'Gravier ratissé'],[0x3b82c4,0x1f4f7d,'Portes']]};
Object.assign(tex,{
 p1Stone:{t:mk(g=>{const r=rnd(31),cols=['#d9cfc0','#d4c9b8','#ddd3c5','#d1c6b4','#d7ccbb'];for(let row=0;row<4;row++){const off=row%2?128:0;for(let k=-1;k<2;k++){g.fillStyle=cols[Math.floor(r()*5)];g.fillRect(k*256+off,row*128,256,128);}}for(let i=0;i<1600;i++){g.fillStyle=r()<0.5?'rgba(150,135,110,0.16)':'rgba(255,250,240,0.25)';g.fillRect(r()*512,r()*512,1+r()*2,1+r()*2);}g.strokeStyle='#b7ab98';g.lineWidth=2;for(let row=0;row<=4;row++){g.beginPath();g.moveTo(0,row*128);g.lineTo(512,row*128);g.stroke();}for(let row=0;row<4;row++){const off=row%2?128:0;for(let k=0;k<3;k++){g.beginPath();g.moveTo(k*256+off,row*128);g.lineTo(k*256+off,row*128+128);g.stroke();}}},512,512),m:2.4},
 p1Genkan:{t:mk(g=>{const cols=['#3d3c3a','#363533','#434240','#3a3937'];for(let row=0;row<4;row++){const off=row%2?64:0;for(let k=-1;k<2;k++){g.fillStyle=cols[(row+k+4)%4];g.fillRect(k*128+off,row*64,128,64);}}g.strokeStyle='#222';g.lineWidth=2;for(let row=0;row<=4;row++){g.beginPath();g.moveTo(0,row*64);g.lineTo(256,row*64);g.stroke();}for(let row=0;row<4;row++){const off=row%2?64:0;for(let k=0;k<3;k++){g.beginPath();g.moveTo(k*128+off,row*64);g.lineTo(k*128+off,row*64+64);g.stroke();}}}),m:1.2},
 p1Bath:{t:mk(g=>{const r=rnd(4),cols=['#9aa58c','#95a087','#a0aa92','#98a38a'];for(let i=0;i<8;i++)for(let j=0;j<8;j++){g.fillStyle=cols[Math.floor(r()*4)];g.fillRect(i*32,j*32,32,32);}g.strokeStyle='#cfd2c4';g.lineWidth=2;for(let k=0;k<=8;k++){g.beginPath();g.moveTo(k*32,0);g.lineTo(k*32,256);g.moveTo(0,k*32);g.lineTo(256,k*32);g.stroke();}}),m:0.8},
 p1Oak:{t:mk(g=>{const cols=['#dcc7a6','#d6bf9c','#e0ccad','#d3bb97','#d9c3a1'],rh=25.6,r=rnd(8);for(let k=0;k<10;k++){const off=Math.floor(r()*256);g.fillStyle=cols[k%5];g.fillRect(0,k*rh,256,rh);g.strokeStyle='rgba(140,105,65,0.2)';g.lineWidth=1;for(let j=0;j<3;j++){const y=k*rh+5+j*7;g.beginPath();g.moveTo(0,y);g.bezierCurveTo(80,y+2,170,y-2,256,y);g.stroke();}g.strokeStyle='#b39a74';g.lineWidth=1.5;g.beginPath();g.moveTo(off,k*rh);g.lineTo(off,k*rh+rh);g.moveTo(0,k*rh);g.lineTo(256,k*rh);g.stroke();}}),m:2.2},
 tatami:{t:mk(g=>{for(let row=0;row<2;row++){const off=row?128:0;for(let k=-1;k<2;k++){const x=k*256+off;g.fillStyle=['#c8c18c','#c2bb85','#cdc692'][(row+k+3)%3];g.fillRect(x,row*128,256,128);g.strokeStyle='rgba(120,110,60,0.22)';g.lineWidth=1;for(let i=0;i<256;i+=3){g.beginPath();g.moveTo(x+i,row*128+6);g.lineTo(x+i,row*128+122);g.stroke();}g.fillStyle='#2f3a2e';g.fillRect(x,row*128,256,6);g.fillRect(x,row*128+122,256,6);g.fillStyle='#8f8a60';g.fillRect(x,row*128,2,128);}}}),m:1.8},
 gravel:{t:mk(g=>{g.fillStyle='#cfccc4';g.fillRect(0,0,256,256);const r=rnd(9);for(let i=0;i<2600;i++){g.fillStyle=['#b9b5ab','#e2dfd8','#a7a399','#d8d4cb'][Math.floor(r()*4)];g.fillRect(r()*256,r()*256,1.5+r()*2,1.5+r()*2);}g.strokeStyle='rgba(120,115,105,0.35)';g.lineWidth=2;for(let k=0;k<16;k++){g.beginPath();for(let y=0;y<=256;y+=8){const x=k*16+4*Math.sin(y/256*Math.PI*4);y?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}}),m:1.0},
 p1Deck:{t:mk(g=>{for(let k=0;k<8;k++){g.fillStyle=['#8b6a4a','#93714f','#86664a','#8f6d4c'][k%4];g.fillRect(k*32,0,29,256);g.fillStyle='#3e2f22';g.fillRect(k*32+29,0,3,256);}}),m:1.0},
 p1Slat:{t:mk(g=>{g.fillStyle='#2b2622';g.fillRect(0,0,256,256);for(let k=0;k<8;k++){g.fillStyle=k%2?'#c7a77c':'#c1a074';g.fillRect(k*32+4,0,24,256);g.strokeStyle='rgba(110,80,45,0.25)';g.beginPath();g.moveTo(k*32+12,0);g.lineTo(k*32+13,256);g.stroke();}}),m:0.4,mh:2.5},
 p1Washi:{t:mk(g=>{g.fillStyle='#f3eee2';g.fillRect(0,0,256,256);g.fillStyle='#b9976a';for(let k=0;k<4;k++){g.fillRect(k*64,0,4,256);g.fillRect(0,k*64,256,4);}g.fillRect(0,0,10,256);}),m:0.6},
 p1Fusuma:{t:mk(g=>{g.fillStyle='#e7e2d5';g.fillRect(0,0,256,256);g.strokeStyle='#c8c0ad';g.lineWidth=3;for(let y=0;y<=256;y+=32)for(let x=(y/32)%2?0:32;x<=288;x+=64){for(let r=28;r>4;r-=8){g.beginPath();g.arc(x,y,r,Math.PI,2*Math.PI);g.stroke();}}}),m:0.5},
 p1Bamboo:{t:mk(g=>{g.fillStyle='#6d6238';g.fillRect(0,0,256,256);for(let k=0;k<32;k++){g.fillStyle=k%3?'#b8a46a':'#a8955c';g.fillRect(k*8,0,7,256);g.fillStyle='#7d6c3e';g.fillRect(k*8,(k*37)%64,7,3);g.fillRect(k*8,(k*37)%64+128,7,3);}}),m:0.6},
 p1Enso:{t:mk(g=>{g.fillStyle='#f1ece0';g.fillRect(0,0,256,256);g.strokeStyle='#1d1c1a';g.lineCap='round';for(let i=0;i<10;i++){g.lineWidth=18-i*1.4;g.beginPath();g.arc(128,128,78+i*0.6,0.4+i*0.02,0.4+5.6-i*0.05);g.stroke();}}),m:1},
 p1Scroll:{t:mk(g=>{g.fillStyle='#6d5a3e';g.fillRect(0,0,256,256);g.fillStyle='#efe8d8';g.fillRect(28,30,200,196);g.fillStyle='#2a2826';[[0.25,0.55,0.06],[0.4,0.35,0.05],[0.6,0.6,0.07]].forEach(p=>{g.beginPath();g.ellipse(128+(p[0]-0.4)*120,256*p[1],60*p[2]*4,30*p[2]*2,0.5,0,6.283);g.fill();});g.strokeStyle='#2a2826';g.lineWidth=5;g.beginPath();g.moveTo(90,200);g.bezierCurveTo(120,140,140,110,170,60);g.stroke();}),m:1}
});
const PAINTS={prop:{n:'Ryokan',w:{
 sej:[0xece6da,'Séjour, cuisine · School House White (F&B 291), mur du canapé Jitney (293), lattes chêne derrière la TV'],
 ent:[0x6f6a63,'Genkan · Mole’s Breath (F&B 276)'],
 ch1:[0x666b4f,'Chambre · Jitney (293), tête de lit Bancha (298)'],
 ch2:[0xc8a97e,'Washitsu · enduit terre crue ocre'],
 sdb:[0x9aa58c,'SDB · grès vert thé jusqu’à 2 m · WC Bancha']},f:{}}};
const PWALLS={
 sej:()=>{room('sej',0xece6da,0,H,['n','e','s2','w1','w2','nk']);pw(WL.sej.s,0xc9b89c);room('cui',0xece6da);panel(true,255,590,705,I,1,0,H,wtex('p1Slat'));},
 ent:()=>{room('ent',0x6f6a63);panel(false,300,522,556,I,-1,0.75,1.95,wtex('p1Scroll'));},
 ch1:()=>{room('ch1',0xc9b89c,0,H,['n','e','w']);pw(WL.ch1.s,0x666b4f);frame(true,497,555,625,I,1,1.0,1.9,0x2a2826,wtex('p1Enso'));},
 ch2:()=>{room('ch2',0xc8a97e,0.08,H);room('ch2',0x5a4330,0,0.08);panel(false,720,226,250,E,-1,0.55,1.95,wtex('p1Scroll'));},
 sdb:()=>{room('sdb',wtex('p1Bath'),0,2.0);room('sdb',0xece6da,2.0,H);room('wc',wtex('p1Bath'),0,1.2);room('wc',0x666b4f,1.2,H);frame(true,705,346,384,E,-1,1.1,1.8,0xcfb48c,0xcfdde4);}
};
const PASS=[
 ['Cuisine : plan de travail ↔ METOD',455,200,'x',0.9],
 ['Cuisine : bar ↔ METOD',455,250,'x',0.9],
 ['Séjour : entrée → séjour (chaise ↔ placard)',380,480,'z',0.8],
 ['Séjour : accès cuisine depuis le séjour',455,320,'x',0.8],
 ['Séjour : vers la baie (meuble TV ↔ zafu)',690,330,'z',0.8],
 ['Séjour : chabudai ↔ meuble TV',633,320,'z',0.8],
 ['Chambre : côté gauche du lit',510,640,'x',0.8],
 ['Chambre : côté droit du lit',685,640,'x',0.8],
 ['Chambre : porte → porte-fenêtre',600,530,'z',0.8],
 ['Washitsu : oshiire ↔ zabuton',590,155,'x',0.8],
 ['Washitsu : porte → tatamis',600,232,'x',0.8],
 ['Genkan : banc ↔ séjour',230,498,'x',0.8],
 ['Balcon : façade ↔ banc engawa',760,350,'x',0.8],
 ['Balcon : façade ↔ jardinière',760,500,'x',0.8]
];
const OAK=0xcfb48c,OAKD=0x8a6a48,LIN=0xd9d0c1,INDIGO=0x2e3a5c,BANCHA=0x666b4f;
function p1Sejour(){
  rtable('Table ronde chêne Ø 1,00',365,382,0.5,0.73,OAK,OAKD,{pr:0.06,br:0.24});
  [[323,382,'W'],[407,382,'E'],[365,424,'S']].forEach((p,i)=>chair('Chaise Wishbone '+(i+1),p[0],p[1],p[2],{c:OAK,s:0xd8c39a,back:0.74,round:true}));
  item('Tansu à degrés',furnWall);
  const tx0=306.8,tx1=tx0+M(0.45),tz0=242;
  for(let k=0;k<4;k++){const z1=tz0+M(1.0)*(1-0.25*k);b(tx0,tz0,tx1,z1,k*0.4,(k+1)*0.4,0x6b4a32);b(tx1,tz0+2,tx1+0.6,z1-2,k*0.4+0.03,(k+1)*0.4-0.03,0x5a3d29);b(tx1+0.6,(tz0+z1)/2-3,tx1+1.2,(tz0+z1)/2+3,k*0.4+0.18,k*0.4+0.22,0x1e1e1e);}
  cy(318,tz0+M(0.88),0.06,0.4,0.66,0xe9e3d6,0.04);cy(318,tz0+M(0.88),0.004,0.66,1.05,0x4a3a2a);sp(320,1.02,tz0+M(0.88),0.07,0x8a9a5a,0.5,1.6);
  cy(322,tz0+M(0.62),0.09,0.8,0.86,0x3a3836,0.06);cy(318,tz0+M(0.37),0.05,1.2,1.32,0x9aa58c,0.04);
  sofa('Canapé bas 2,20 m, lin',633,455.7,2.2,0.95,'S',{c:LIN,k:0xe6dfd2,seat:0.4,back:0.72,arm:0.14,armH:0.55,leg:0.1,lc:OAKD,pil:[BANCHA,0xc9b89c,INDIGO]});
  rug('Tapis jute 2,00 × 1,40',565,330,701,425,0xb9a17a,{border:0xa48a63});
  rtable('Chabudai chêne Ø 0,80',633,375,0.4,0.35,OAK,OAKD,{pr:0.05,br:0.2});
  item('Zafu indigo');cy(680,380,0.2,0,0.18,INDIGO);
  cab('Meuble TV chêne à lattes 1,60',furnGroup,593,258.4,701.8,285.6,0.12,0.44,OAK,{f:'S',nd:4,fc:0xbf9f72,hc:null});
  [[596,262],[697,262],[596,281],[697,281]].forEach(p=>b(p[0],p[1],p[0]+2,p[1]+2,0,0.12,OAKD));
  item('TV 55"',furnTall);b(598,259.4,682,262.4,1.0,1.72,0x151617);b(599.5,262.4,680.5,262.9,1.02,1.70,0x2a2f36);
  plant('Bonsaï pin',690,272,{r:0.07,h:0.08,pc:0x3a3836,H:0.38,y:0.44,k:'pine',lc:0x4c6b3c});
  flamp('Lampadaire Akari',545,470,1.5,{k:'lantern',r:0.18,c:0xf4efe2,br:0.12});
  pendant('Suspension Akari 75A',365,382,1.75,{k:'lantern',r:0.3,sy:0.9,rings:true,c:0xf6f1e4});
  pendant('Suspension Akari',633,375,1.95,{k:'lantern',r:0.2,rings:true,c:0xf6f1e4});
  pendant('Suspension cuisine papier',440,170,2.0,{k:'drum',r:0.16,hh:0.3,c:0xf6f1e4});
  metod(0xcfb48c,0x3e4044);
  item('Étagères ouvertes chêne',furnWall);[1.5,1.85].forEach(y=>b(499.6,150,516.6,252,y,y+0.03,OAK));
  [[160,0x3a3836],[175,0xe9e3d6],[190,0x9aa58c],[215,0xe9e3d6],[230,0x3a3836]].forEach((q,i)=>cy(508,q[0],0.05,1.53,1.53+0.08+(i%2)*0.06,q[1],0.045));
  [[165,0xd9c9ab],[185,0xd9c9ab],[205,0x8a6a48],[235,0xd9c9ab]].forEach(q=>cy(508,q[0],0.045,1.88,2.05,q[1]));
}
function p1Ch1(){
  cab('Mur de shoji coulissants (dressing existant derrière)',furnWall,440.4,545,482.6,698.2,0,2.4,0x6e5a40,{f:'E',nd:3,fc:tm('p1Washi',0.77,2.4),hc:null});
  bed('Lit 160 × 200 sur sommier chêne bas',598,627.5,1.6,2.0,'S',{fh:0.24,leg:0,frame:OAK,fr:0.04,hb:0.62,hbd:0.04,hbc:OAKD,duvet:0xece6da,plaid:BANCHA,pil:0xf4efe2,pil2:0xc9b89c});
  [[513,'gauche'],[659,'droit']].forEach(p=>{item('Chevet chêne '+p[1]);b(p[0],666,p[0]+24,692,0,0.32,OAK);b(p[0]+1,665.4,p[0]+23,666,0.04,0.28,OAKD);tlamp('Lampe Akari '+p[1],p[0]+12,679,0.32,{k:'globe',r:0.1,c:0xf6f1e4,bc:0x2a2a2a});});
  pendant('Suspension papier',598,600,2.0,{k:'lantern',r:0.24,rings:true,c:0xf6f1e4});
  curtain('Rideaux lin, porte-fenêtre',false,720,577,603,E,-1,0xe9e3d6,0.9);
  rug('Tapis laine bouclée',540,505,656,552,0xd9cfbf);
}
function p1Ch2(){
  item('Bureau 180 × 80 existant');b(558,21.8,680.4,76.2,0.725,0.75,0xdcc296);[566,672].forEach(x=>{b(x-2,25,x+2,73,0,0.03,0xf4f4f2);b(x-2.4,47,x+2.4,51.8,0.03,0.42,0xf4f4f2);b(x-1.7,47.7,x+1.7,51.1,0.42,0.7,0xf4f4f2);b(x-1.5,26,x+1.5,72,0.7,0.725,0xf4f4f2);});
  item('Écran 27"');b(590,48,634,50,0.86,1.22,0x1d1d1f);b(610,49,614,56,0.75,0.86,0x333333);b(604,54,620,62,0.75,0.76,0x333333);
  tlamp('Lampe de bureau papier',572,35,0.75,{h:0.42,c:0xf4efe2,bc:OAKD});
  item('Fauteuil de bureau tissu lin');cy(612,105,0.3,0,0.04,0x2a2a2a);cy(612,105,0.025,0.04,0.45,0x6b6e72);b(593,87,631,121,0.45,0.53,0xc9b89c);b(595,119,629,124,0.53,1.05,0xc9b89c);
  cab('Oshiire : fusuma devant l’armoire BRIMNES',furnWall,523.4,105,565.6,193.4,0,2.4,0xe5e1d6,{f:'E',nd:2,fc:tm('p1Fusuma',0.65,2.4),hc:0x2a2a2a,hh:0.06,hy:0.95});
  shelf('Étagère murale chêne',furnWall,692.8,58,713.2,130,1.8,[0.02,0.4,0.78,1.16,1.5,1.78],OAK,[0xe9e3d6,0x3a3836,0x9aa58c,0xc8a97e,0x2e3a5c],{seed:3});
  table('Chabudai 90 × 60',612,175,673,216,0.33,OAK,OAKD,{lw:2.5});
  item('Zabuton nord');b(624,138,662,171,0,0.07,INDIGO);
  item('Zabuton sud');b(624,220,662,250,0,0.07,INDIGO);
  item('Tokonoma : estrade et ikebana');b(684,225,713.2,251.6,0,0.1,0x5a4330);cy(698,238,0.06,0.1,0.32,0x3a3836,0.05);cy(698,238,0.004,0.32,0.75,0x4a3a2a);sp(701,0.72,236,0.05,0xb3262d);sp(695,0.62,240,0.06,0x6f8a4a,0.6,1.4);
  item('Andon (lampe de sol papier)');b(530,82,542,94,0,0.04,0x2a2a2a);b(531,83,541,93,0.05,0.62,glow(0xf4efe2,0.5));
  curtain('Rideaux lin, porte-fenêtre',false,720,135,159,E,-1,0xe9e3d6,0.9);
}
function p1Ent(){
  item('Getabako-banc chêne');b(163.8,474,189.6,522,0,0.04,OAKD);b(163.8,474,189.6,522,0.21,0.23,OAK);b(163.8,474,189.6,522,0.42,0.46,OAK);b(163.8,474,189.6,476,0.04,0.42,OAK);b(163.8,520,189.6,522,0.04,0.42,OAK);b(163.8,497,189.6,499,0.04,0.42,OAK);
  [[478,0x2a2a2a],[486,0x8a6a48],[502,0xe9e3d6],[510,0x2a2a2a]].forEach(q=>b(167,q[0],185,q[0]+6,0.04,0.14,q[1]));
  item('Patères chêne',furnWall);b(163.8,478,166.5,518,1.6,1.7,OAK);[484,498,512].forEach(z=>b(166.5,z-1,170,z+1,1.63,1.67,OAKD));
  item('Vase ikebana');cy(176,488,0.05,0.46,0.7,0x3a3836,0.04);cy(176,488,0.004,0.7,1.1,0x4a3a2a);sp(178,1.06,488,0.05,0xd9a441,0.6,1.6);
  item('Noren indigo',tallGroup);b(299.4,413,300.6,463.5,1.5,2.12,INDIGO);b(299.4,464.5,300.6,515,1.5,2.12,INDIGO);b(299,412.5,301,515.5,2.12,2.15,OAKD);b(299.2,431,300.8,446,1.72,1.9,0xf1ece0);b(299.2,482,300.8,497,1.72,1.9,0xf1ece0);
  pendant('Lanterne papier',230,490,2.05,{k:'lantern',r:0.2,rings:true,c:0xf6f1e4});
}
function p1Sdb(){
  item('Échelle porte-serviettes chêne',furnWall);[300,330].forEach(x=>b(x,568.4,x+2,575,0,1.7,OAK));[0.4,0.75,1.1,1.45].forEach((y,i)=>{b(300,570,332,572,y,y+0.025,OAK);b(302,569,330,574.5,y-0.22,y,[0xe9e3d6,0x9aa58c,0xffffff,0xc9b89c][i]);});
  item('Tabouret de bain hinoki');b(356,592,373,608,0,0.25,0xe3c79a);
  item('Étagères au-dessus du lave-linge',furnTall);[1.3,1.65].forEach((y,j)=>{b(236.4,681.2,287,698.2,y,y+0.025,OAK);[[0xe9e3d6,0.18],[0x3a3836,0.14],[0x9aa58c,0.2]].forEach((q,i)=>cy(246+i*14,689,0.04,y+0.025,y+0.025+q[1],q[0]));});cy(280,689,0.06,1.675,1.78,0xe9e3d6,0.05);sp(280,1.84,689,0.1,0x5f8a4a,0.7);
  item('Caillebotis hinoki');b(240,600,285,640,0,0.02,0xe3c79a);
}
function p1Balc(){
  item('Rangement de jardin existant habillé de bois brûlé');b(726.8,614.6,774.4,703,0,1.8,0x2b2725);for(let i=0;i<12;i++)b(774.4,616+i*7.2,775.2,620.6+i*7.2,0.05,1.75,0x1e1b19);
  item('Banc-coffre engawa frêne thermo');b(790,300,820,409,0.36,0.42,0x9a7650);b(791,302,819,407,0,0.36,0x7d5f40);
  planter('Jardinière bambous',797,25,820,150,0.45,0x4a4d50,{k:'bamboo',lc:0x5f8a3f,lc2:0x7a9a4f,H:1.5,n:6});
  planter('Jardinière érable du Japon et mousse',797,165,820,285,0.45,0x4a4d50,{k:'tree',lc:0xa5422e,lc2:0x6f8a4a,H:1.3,n:5});
  planter('Jardinière pin en nuage et fougères',797,430,820,600,0.45,0x4a4d50,{k:'tree',lc:0x3f5f35,lc2:0x6f8a4a,H:1.2,n:5});
  rtable('Table basse teck Ø 0,60',758,80,0.3,0.45,0xa07850,0x5a4330);
  chair('Fauteuil bas teck nord',758,40,'N',{c:0x8a6a48,s:0xd9d0c1,seat:0.38,back:0.7,w:0.5});
  chair('Fauteuil bas teck sud',758,120,'S',{c:0x8a6a48,s:0xd9d0c1,seat:0.38,back:0.7,w:0.5});
  item('Lanterne de pierre (tōrō)');cy(808,620,0.12,0,0.08,0x8d8a83);cy(808,620,0.04,0.08,0.38,0x8d8a83);b(800,612,816,628,0.38,0.5,0x9a968e);b(802,611.5,814,612,0.4,0.48,glow(0xffd99a,0.7));cy(808,620,0.02,0.5,0.64,0x7d7a73,0.17);
  item('Vasque de pierre (tsukubai)');cy(802,650,0.18,0,0.22,0x7d7a73,0.2);cy(802,650,0.14,0.22,0.225,0x4a6a7a);
}
const PROJET={
 build(){
  basePro({pl:[(w,h)=>tm('p1Washi',w,h),0,0x6e5a40],reed:tm('p1Bamboo',9.7,1.1),plh:0x6e5a40});
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[300,497,437,565],[157,350,300,412],[240,412,300,500],[157,500,300,565]].forEach(r=>fl(r[0],r[1],r[2],r[3],'p1Stone'));
  fl(157,412,240,500,'p1Genkan');
  fl(232,565,437,705,'p1Bath');fl(157,565,232,705,'p1Bath');
  fl(437,497,720,705,'p1Oak');fl(520,15,720,132,'p1Oak');fl(520,132,720,255,'tatami');
  fl(720,15,770,705,'p1Deck');fl(770,15,821,705,'gravel');
  p1Sejour();p1Ch1();p1Ch2();p1Ent();p1Sdb();p1Balc();
  curtain('Voilages lin, baie (côté sud)',false,720,440,468,E,-1,0xf1ece0,0.75);
  curtain('Voilages lin, baie (côté nord)',false,720,288,314,E,-1,0xf1ece0,0.75);
 },
 rooms:[['Séjour / cuisine','28,2 m²',400,455],['Washitsu','bureau, thé, invités',640,150],['Chambre','≈ 11,5 m²',560,535],['Genkan','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',235,390,2.55],['Placard couloir shoji','',368,545,2.55],['Jardin zen','15,1 m²',790,360],['Tansu à degrés','',322,280,1.7,1],['Oshiire (BRIMNES)','',545,150,2.5,1],['Mur de shoji (dressing)','',461,620,2.5,1],['Tokonoma','',698,238,0.8,1],['Banc-coffre engawa','',805,355,0.6,1]]
};
