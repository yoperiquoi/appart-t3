const PROP={num:3,name:'Groove 72',short:'Groove 72',desc:'Proposition 3, Groove 72 : années 70 assumées, fosse de conversation en U sur tapis shag, frise supergraphique, liège dans les chambres et cuisine chêne enfin à sa place.',
 legend:[[0xc98a4b,0x7a4a26,'Grès 20×20 caramel et crème'],[0xc8922f,0x6a4a20,'Pastilles moutarde'],[0x5a3e2b,0x2e2018,'Faïence chocolat'],[0xb88a5a,0x8a6038,'Liège'],[0x9a6a42,0x4a3020,'Caillebotis teck'],[0x3b82c4,0x1f4f7d,'Portes']]};
Object.assign(tex,{
 p3Tile:{t:mk(g=>{const r=rnd(41);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const cr=(i+j)%2;g.fillStyle=cr?['#efe1c4','#eadbbc'][Math.floor(r()*2)]:['#c98a4b','#c08043','#cf9254'][Math.floor(r()*3)];g.fillRect(i*64,j*64,64,64);g.fillStyle='rgba(255,255,255,0.12)';g.fillRect(i*64+6,j*64+6,20,8);}g.strokeStyle='#7a4a26';g.lineWidth=3;for(let k=0;k<=4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64,256);g.moveTo(0,k*64);g.lineTo(256,k*64);g.stroke();}}),m:0.8},
 p3Penny:{t:mk(g=>{g.fillStyle='#6a4a20';g.fillRect(0,0,256,256);const r=rnd(3);for(let i=0;i<8;i++)for(let j=0;j<8;j++){g.fillStyle=['#c8922f','#d19c39','#bf8828','#d6a443'][Math.floor(r()*4)];g.beginPath();g.arc(i*32+16+(j%2?0:0),j*32+16,13,0,6.283);g.fill();}}),m:0.2},
 p3Choc:{t:mk(g=>{const r=rnd(7);for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle=['#5a3e2b','#523825','#634430'][Math.floor(r()*3)];g.fillRect(i*64,j*64,64,64);g.fillStyle='rgba(255,255,255,0.1)';g.fillRect(i*64+5,j*64+5,30,6);}g.strokeStyle='#e8dcc4';g.lineWidth=3;for(let k=0;k<=4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64,256);g.moveTo(0,k*64);g.lineTo(256,k*64);g.stroke();}}),m:0.4},
 cork:{t:mk(g=>{g.fillStyle='#b88a5a';g.fillRect(0,0,256,256);const r=rnd(13);for(let i=0;i<3500;i++){g.fillStyle=['#a47746','#c99c6a','#8f6638','#d2a877'][Math.floor(r()*4)];g.beginPath();g.arc(r()*256,r()*256,0.8+r()*2,0,6.283);g.fill();}g.strokeStyle='rgba(90,60,30,0.35)';g.lineWidth=1.5;g.strokeRect(0,0,128,256);g.strokeRect(128,0,128,256);}),m:0.6},
 p3Teak:{t:mk(g=>{for(let k=0;k<8;k++){g.fillStyle=['#9a6a42','#a3714a','#91633d','#a06e46'][k%4];g.fillRect(0,k*32,256,29);g.fillStyle='#4a3020';g.fillRect(0,k*32+29,256,3);}g.fillStyle='#4a3020';g.fillRect(126,0,4,256);}),m:1.0},
 shag:{t:mk(g=>{g.fillStyle='#e9d9b8';g.fillRect(0,0,256,256);const r=rnd(19);for(let i=0;i<4000;i++){g.fillStyle=['#dcc9a2','#f3e6c9','#cdb88d'][Math.floor(r()*3)];g.fillRect(r()*256,r()*256,2,3);}}),m:0.5},
 p3Cane:{t:mk(g=>{g.fillStyle='#c9a46a';g.fillRect(0,0,256,256);g.strokeStyle='#8a6a3a';g.lineWidth=3;for(let k=-256;k<512;k+=16){g.beginPath();g.moveTo(k,0);g.lineTo(k+256,256);g.moveTo(k,256);g.lineTo(k+256,0);g.stroke();}}),m:0.3}
});
const CREAM=0xefe3c8,ORANGE=0xd2691e,MUST=0xc8922f,BROWN=0x4a3a30,AVOC=0x8a8a3c,RUST=0xb4562a,TEAK=0x9a6238,TEAKD=0x6a4024;
function band(wd,y0){const c=[BROWN,ORANGE,MUST];c.forEach((col,i)=>pw(wd,col,y0+i*0.14,y0+i*0.14+0.12,0.019));}
function rainbow(px,base){return (w,h,a)=>canvasMat(w,h,(g,pw,ph,k)=>{g.fillStyle='#efe3c8';g.fillRect(0,0,pw,ph);const cx=(px-a)/S*k,cy=ph-base*k;[['#4a3a30',1.35],['#d2691e',1.17],['#c8922f',0.99],['#8a8a3c',0.81],['#efe3c8',0.63]].forEach(q=>{g.fillStyle=q[0];g.beginPath();g.arc(cx,cy,q[1]*k,Math.PI,0);g.lineTo(cx+q[1]*k,ph);g.lineTo(cx-q[1]*k,ph);g.closePath();g.fill();});});}
const PAINTS={prop:{n:'Groove 72',w:{
 sej:[CREAM,'Séjour · Tallow (F&B 203) et frise brun-orange-moutarde'],
 ent:[BROWN,'Entrée · Tanner’s Brown (F&B 255)'],
 ch1:[ORANGE,'Chambre · arc-en-ciel 70s derrière le lit'],
 ch2:[AVOC,'Den · Olive Colour (Little Greene 72)'],
 sdb:[MUST,'SDB · faïence chocolat, India Yellow (F&B 66)']},f:{}}};
const PWALLS={
 sej:()=>{room('sej',CREAM);room('cui',CREAM);room('cui',MUST,0.9,1.45,['w','e']);['n','s','w1','w2'].forEach(k=>band(WL.sej[k],0.95));},
 ent:()=>{room('ent',BROWN,0,1.3);room('ent',MUST,1.3,H);},
 ch1:()=>{room('ch1',CREAM,0,H,['n','e','w']);pw(WL.ch1.s,rainbow(598,0.0));band(WL.ch1.w,0.95);band(WL.ch1.n,0.95);},
 ch2:()=>{room('ch2',AVOC,0,H,['n','s','w']);room('ch2',ORANGE,0,H,['e']);},
 sdb:()=>{room('sdb',wtex('p3Choc'),0,2.0);room('sdb',MUST,2.0,H);room('wc',wtex('p3Choc'),0,1.2);room('wc',ORANGE,1.2,H);frame(true,705,346,384,E,-1,1.1,1.8,MUST,0xcfdde4);}
};
const PASS=[
 ['Cuisine : plan de travail ↔ METOD',455,200,'x',0.9],
 ['Cuisine : bar ↔ METOD',455,250,'x',0.9],
 ['Séjour : entrée → séjour',380,480,'z',0.8],
 ['Séjour : meuble mural ↔ fosse (vers la baie)',690,315,'z',0.8],
 ['Séjour : accès à la chambre 2',555,300,'x',0.8],
 ['Séjour : table tulipe ↔ fosse',470,400,'x',0.8],
 ['Chambre : côté gauche du lit',505,630,'x',0.8],
 ['Chambre : côté droit du lit',685,630,'x',0.8],
 ['Chambre : porte → porte-fenêtre',600,528,'z',0.8],
 ['Den : bureau → porte-fenêtre',600,150,'z',0.8],
 ['Den : platines ↔ bulle',580,215,'x',0.8],
 ['Balcon : façade ↔ cactus',760,360,'x',0.8],
 ['Balcon : façade ↔ table',760,545,'x',0.8]
];
function tulipChair(n,cx,cz,dir,col){return loc(n,furnGroup,cx,cz,dir,(x,z)=>{cy(x,z,0.22,0,0.02,0xf4f4f2);cy(x,z,0.03,0.02,0.4,0xf4f4f2,0.06);cy(x,z,0.24,0.4,0.46,0xf4f4f2);cy(x,z+1,0.21,0.46,0.5,col);const m=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.24,0.38,24,1,true,Math.PI*0.5,Math.PI),mt(0xf4f4f2));m.material.side=THREE.DoubleSide;m.position.set(X(x),0.65,Z(z));IT.add(m);});}
function arcLamp(n,bx,bz,tx,tz,h){item(n,furnWall);cy(bx,bz,0.15,0,0.05,0xf1efe9,0.16);cy(bx,bz,0.012,0.05,h,0xc9ccd0);const dx=X(tx)-X(bx),dz=Z(tz)-Z(bz),L=Math.hypot(dx,dz),m=new THREE.Mesh(new THREE.BoxGeometry(L,0.02,0.02),mt(0xc9ccd0));m.position.set((X(tx)+X(bx))/2,h,(Z(tz)+Z(bz))/2);m.rotation.y=-Math.atan2(dz,dx);IT.add(m);cy(tx,tz,0.012,h-0.22,h,0xc9ccd0);const d=new THREE.Mesh(new THREE.SphereGeometry(0.2,22,12,0,6.2832,0,Math.PI/2),mt(0xc9ccd0));d.position.set(X(tx),h-0.32,Z(tz));IT.add(d);cy(tx,tz,0.19,h-0.325,h-0.32,glow(0xfff1d0,0.9));}
function p3Sejour(){
  rrug('Tapis shag rond Ø 2,40',616,390,1.2,0xe9d9b8,{ring:[[1.0,0xd9c49b]]});
  const fs={c:RUST,k:0xc0663a,seat:0.38,back:0.66,arm:0,leg:0,bk:0.24};
  sofa('Fosse : banquette sud',616.6,459,2.84,0.86,'S',Object.assign({pil:[MUST,ORANGE,BROWN,MUST]},fs));
  sofa('Fosse : banquette ouest',549,387.4,1.246,0.86,'W',Object.assign({pil:[ORANGE,MUST]},fs));
  sofa('Fosse : banquette est',684,387.4,1.246,0.86,'E',Object.assign({pil:[BROWN,ORANGE]},fs));
  rtable('Table basse tulipe Ø 0,70',616,387,0.35,0.38,0xf4f4f2,0xf4f4f2,{tulip:true});
  item('Coupe et bougies');cy(616,387,0.12,0.38,0.43,ORANGE,0.06);
  arcLamp('Lampadaire arc',540,330,616,387,2.05);
  shelf('Meuble mural teck (TV, hi-fi, vinyles)',furnWall,592,258.4,708,285.6,2.0,[0.02,0.45,0.75,1.5,1.98],TEAK,[ORANGE,MUST,BROWN,0xefe3c8,AVOC],{up:2,back:TEAKD,backSide:-1,skip:[1,2],seed:7});
  b(593.4,259.4,706.6,285.6,0.045,0.45,TEAKD);[[612,0x2a2a2a],[690,0x2a2a2a]].forEach(q=>b(q[0]-8,262,q[0]+8,280,0.47,0.74,q[1]));
  b(608,260,692,263,0.78,1.46,0x151617);b(609.5,263,690.5,263.5,0.8,1.44,0x2a2f36);
  rtable('Table tulipe Ø 1,00',365,382,0.5,0.73,0xf4f4f2,0xf4f4f2,{tulip:true});
  [[323,382,'W'],[407,382,'E'],[365,424,'S']].forEach((p,i)=>tulipChair('Chaise tulipe orange '+(i+1),p[0],p[1],p[2],ORANGE));
  stool('Tabouret de bar orange 1',372,352,0.18,0.66,ORANGE,0xc9ccd0);stool('Tabouret de bar orange 2',410,352,0.18,0.66,ORANGE,0xc9ccd0);
  pendant('Suspension Flowerpot orange',365,382,1.65,{k:'dome',r:0.25,c:ORANGE});
  pendant('Suspension globe cuisine',440,170,1.95,{k:'globe',r:0.16,c:0xfff1d0});
  item('Suspension macramé et pothos',furnTall);cy(330,290,0.004,1.55,H,0xe9d9b8);cy(330,290,0.12,1.45,1.6,0xf1efe9,0.09);[0,1,2,3,4,5,6].forEach(i=>{const a=i*0.9;sp(330+Math.cos(a)*8,1.35-i*0.03,290+Math.sin(a)*8,0.06,0x4f8a3f,2.2);});
  metod(ORANGE,0x3e4044);
  item('Étagères teck cuisine',furnWall);[1.5,1.85].forEach(y=>b(499.6,150,516.6,252,y,y+0.03,TEAK));[[165,ORANGE],[185,MUST],[205,BROWN],[230,0xefe3c8]].forEach((q,i)=>cy(508,q[0],0.05,1.53,1.62+(i%2)*0.06,q[1],0.05));
}
function p3Ch1(){
  item('Dressing existant');b(440.4,552,474.4,688,0,2.05,0x4a4644);
  item('Rideau orange devant le dressing',furnWall);for(let i=0;i<14;i++)b(475.5+(i%2),550+i*10,478.5,560+i*10,0.03,2.3,i%2?ORANGE:0xc95f19);b(475,548,479,692,2.3,2.33,0xc9ccd0);
  bed('Lit 160 × 200, tête de lit capitonnée velours',598,626.1,1.6,2.0,'S',{fh:0.26,leg:0.05,lc:0xc9ccd0,frame:BROWN,fr:0.03,hb:1.0,hbd:0.06,hbx:25,hbc:0x6a4a3a,duvet:0xefe3c8,plaid:ORANGE,pil:0xefe3c8,pil2:MUST});
  [[513,'gauche'],[656,'droit']].forEach(p=>{item('Tablette de chevet suspendue '+p[1]);b(p[0],672,p[0]+24,694,0.45,0.5,TEAK);tlamp('Lampe champignon '+p[1],p[0]+12,683,0.5,{k:'mush',r:0.12,h:0.3,c:ORANGE});});
  pendant('Suspension bubble',598,600,1.95,{k:'globe',r:0.28,sy:0.8,c:0xfbf4e4});
  rug('Tapis shag',540,505,656,553,0xd2691e);
  curtain('Rideaux orange',false,720,577,603,E,-1,ORANGE,0.92);
}
function p3Ch2(){
  desk180(558,21.8,TEAK,0x2a2a2a);
  item('Écran 27" et lampe à lave');b(590,48,634,50,0.86,1.22,0x1d1d1f);b(610,49,614,56,0.75,0.86,0x333333);cy(572,40,0.04,0.75,0.8,0xc9ccd0);cy(572,40,0.035,0.8,1.08,glow(0xe8572a,0.6),0.02);cy(572,40,0.02,1.08,1.12,0xc9ccd0);
  gaming(619,103,'S');
  shelf('Casiers à vinyles teck',furnWall,523.4,30,543.8,195,1.0,[0.02,0.34,0.66,0.98],TEAK,[0x1d1d1f,ORANGE,0x3a3a3a,MUST,0xefe3c8],{seed:9});
  item('Platine vinyle et enceintes');b(525,90,542,125,1.006,1.1,TEAKD);cy(533,107,0.12,1.1,1.115,0x1d1d1f);b(525,40,542,60,1.006,1.38,TEAKD);b(525,160,542,180,1.006,1.38,TEAKD);
  item('Fauteuil bulle suspendu',furnWall);cy(645,214,0.006,1.35,H,0xc9ccd0);sp(645,0.85,214,0.5,clear(0xe9f2f6,0.35));b(625,194,665,234,0.48,0.58,ORANGE);
  rug('Tapis shag moutarde',560,130,690,245,MUST);
  pendant('Suspension globe opaline',619,110,2.0,{k:'globe',r:0.17,c:0xfbf4e4});
  curtain('Rideaux moutarde',false,720,136,159,E,-1,MUST,0.92);
}
function p3Ent(){
  item('Banc teck et coussin');b(163.8,474,193,522,0,0.06,TEAKD);b(163.8,474,193,522,0.38,0.42,TEAK);[474,520].forEach(z=>b(163.8,z,193,z+2,0.06,0.38,TEAK));b(164,476,192,520,0.42,0.48,ORANGE);
  item('Portemanteau à boules',furnWall);b(163.8,478,165.4,518,1.5,1.8,TEAK);[[484,1.75,ORANGE],[492,1.58,MUST],[500,1.72,0x3b6ea5],[508,1.6,0xb3262d],[514,1.74,AVOC]].forEach(q=>{b(165.4,q[0]-0.4,169,q[0]+0.4,q[1]-0.01,q[1]+0.01,0x2a2a2a);sp(170,q[1],q[0],0.03,q[2]);});
  rug('Tapis shag orange',200,425,280,520,ORANGE);
  pendant('Suspension globe entrée',230,480,1.95,{k:'globe',r:0.18,c:0xfbf4e4});
}
function p3Sdb(){
  item('Étagères teck au-dessus du lave-linge',furnTall);[1.3,1.65].forEach(y=>{b(236.4,681.2,287,698.2,y,y+0.025,TEAK);[[ORANGE,0.18],[MUST,0.14],[0xefe3c8,0.2]].forEach((q,i)=>cy(246+i*14,689,0.04,y+0.025,y+0.025+q[1],q[0]));});
  item('Colonne de rangement orange',furnWall);b(296,568.4,322.4,588.8,0,1.6,ORANGE);b(296,588.8,322.4,589.4,0.05,1.55,0xc95f19);
  item('Tapis de bain moutarde');b(345,620,385,650,0,0.015,MUST);
}
function p3Balc(){
  item('Fauteuil œuf suspendu sur pied');cy(774,50,0.42,0,0.04,0x2a2a2a);cy(774,50,0.025,0.04,1.95,0x2a2a2a);b(774,49,794,51,1.93,1.97,0x2a2a2a);sp(790,1.0,52,0.42,tm('p3Cane',1,1),1.1,0.9);b(778,40,800,64,0.7,0.8,ORANGE);
  item('Fauteuil paon en rotin');b(742,105,770,133,0,0.42,0xc9a46a);sp(745,0.9,119,0.4,tm('p3Cane',1,1),0.9,0.15,1);
  rug('Tapis d’extérieur orange',730,280,792,450,ORANGE,{border:MUST});
  planter('Jardinière cactus et yuccas',800,300,820.6,420,0.4,0xefe3c8,{k:'grass',lc:0x5f7f4a,n:5});
  plant('Cactus cierge',808,250,{r:0.14,h:0.35,pc:ORANGE,H:1.4,k:'cactus',lc:0x5f7f4a});
  rtable('Table pliante teck Ø 0,55',802,545,0.275,0.72,TEAK,TEAKD,{pr:0.03,br:0.18});
  chair('Chaise teck nord',802,510,'N',{c:TEAK,s:MUST});chair('Chaise teck sud',802,580,'S',{c:TEAK,s:MUST});
  item('Rangement de jardin existant, repeint orange');b(726.8,614.6,774.4,703,0,1.8,ORANGE);b(774.4,658,775.2,659.6,0.05,1.75,0xc95f19);
  item('Guirlande guinguette',furnTall);for(let i=0;i<14;i++)sp(735+((i%2)*70),2.25,30+i*48,0.03,glow(0xffd99a,0.9));
}
const PROJET={
 build(){
  basePro({pl:[TEAK,0xa86e44,TEAKD],closet:TEAK,reed:tm('p3Cane',9.7,1.1),plh:0xc9ccd0});
  TZ.forEach(r=>fl(r[0],r[1],r[2],r[3],'p3Tile'));
  fl(232,565,437,705,'p3Penny');fl(157,565,232,705,'p3Penny');
  fl(437,497,720,705,'cork');fl(520,15,720,255,'cork');fl(720,15,821,705,'p3Teak');
  p3Sejour();p3Ch1();p3Ch2();p3Ent();p3Sdb();p3Balc();
  curtain('Voilages orange, baie',false,720,262,290,E,-1,0xe08a3a,0.8);
 },
 rooms:[['Séjour / cuisine','28,2 m²',420,455],['Den : jeux et vinyles','9,0 m²',620,140],['Chambre','≈ 11,5 m²',560,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',235,390,2.55],['Placard couloir teck','',368,545,2.55],['Patio 70s','15,1 m²',790,360],['Fosse de conversation','',616,390,0.9,1],['Meuble mural teck','',650,272,2.1,1],['Fauteuil bulle','',645,214,1.5,1]]
};
