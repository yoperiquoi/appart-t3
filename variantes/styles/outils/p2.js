const PROP={num:2,name:'Riad',short:'Riad',desc:'Proposition 2, Riad : un méditerranéen marocain, tomettes, tadelakt sable, arches peintes, salon marocain maçonné et terrasse à l’ombre d’un store rayé.',
 legend:[[0xb5653f,0xe2cdb0,'Tomettes hexagonales'],[0x1f6f5c,0xd8d0c0,'Zellige émeraude'],[0xefe8da,0x1f2a2a,'Carreaux de ciment'],[0xc8b48a,0x9a8460,'Jonc de mer'],[0xb86a45,0xd9c2a3,'Terre cuite 30×30'],[0x3b82c4,0x1f4f7d,'Portes']]};
Object.assign(tex,{
 tomette:{t:mk((g,w,h)=>{const s=128,hh=Math.sqrt(3)*s,r=rnd(17),cols=['#b5653f','#a95b37','#bd6e47','#b0603b','#c27650','#a65836'];for(let i=-1;i<=2;i++)for(let j=-1;j<=1;j++){const cx=i*1.5*s,cy=j*hh+(i%2?hh/2:0);g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+s*Math.cos(a),cy+s*Math.sin(a));}g.closePath();g.fillStyle=cols[Math.floor(r()*6)];g.fill();g.strokeStyle='#e2cdb0';g.lineWidth=7;g.stroke();}},384,222),m:0.286,mh:0.165},
 p2Zel:{t:mk(g=>{const r=rnd(23),cols=['#1f6f5c','#237a64','#1a5f4f','#2a8670','#1d6857','#17574a'];for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle=cols[Math.floor(r()*6)];g.fillRect(i*64,j*64,64,64);const gr=g.createLinearGradient(i*64,j*64,i*64+64,j*64+64);gr.addColorStop(0,'rgba(255,255,255,0.18)');gr.addColorStop(1,'rgba(0,0,0,0.12)');g.fillStyle=gr;g.fillRect(i*64,j*64,64,64);}g.strokeStyle='#d8d0c0';g.lineWidth=3;for(let k=0;k<=4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64,256);g.moveTo(0,k*64);g.lineTo(256,k*64);g.stroke();}}),m:0.4},
 ciment:{t:mk(g=>{for(let i=0;i<2;i++)for(let j=0;j<2;j++){const x=i*128,y=j*128;g.fillStyle='#efe8da';g.fillRect(x,y,128,128);g.fillStyle='#1f2a2a';[[0,0],[128,0],[0,128],[128,128]].forEach(c=>{g.beginPath();g.arc(x+c[0],y+c[1],40,0,6.283);g.fill();});g.fillStyle='#1f6f5c';g.beginPath();g.moveTo(x+64,y+22);g.lineTo(x+106,y+64);g.lineTo(x+64,y+106);g.lineTo(x+22,y+64);g.closePath();g.fill();g.fillStyle='#efe8da';g.beginPath();g.arc(x+64,y+64,12,0,6.283);g.fill();g.strokeStyle='#b9b0a0';g.lineWidth=2;g.strokeRect(x,y,128,128);}}),m:0.4},
 sisal:{t:mk(g=>{g.fillStyle='#c8b48a';g.fillRect(0,0,256,256);for(let i=0;i<32;i++)for(let j=0;j<32;j++){g.fillStyle=(i+j)%2?'#b9a47a':'#d3c098';if((i+j)%2)g.fillRect(i*8,j*8+1,8,6);else g.fillRect(i*8+1,j*8,6,8);}}),m:0.3},
 terraOut:{t:mk(g=>{const cols=['#b86a45','#ad6240','#c0734d','#b26746'];for(let i=0;i<2;i++)for(let j=0;j<2;j++){g.fillStyle=cols[i*2+j];g.fillRect(i*128,j*128,128,128);}g.strokeStyle='#d9c2a3';g.lineWidth=6;for(let k=0;k<=2;k++){g.beginPath();g.moveTo(k*128,0);g.lineTo(k*128,256);g.moveTo(0,k*128);g.lineTo(256,k*128);g.stroke();}}),m:0.6},
 p2Cane:{t:mk(g=>{g.fillStyle='#8a7444';g.fillRect(0,0,256,256);for(let k=0;k<64;k++){g.fillStyle=k%3?'#cdb57c':'#c2a96e';g.fillRect(k*4,0,3,256);}g.fillStyle='#6d5a34';g.fillRect(0,120,256,4);}),m:0.5},
 p2Stripe:{t:mk(g=>{for(let k=0;k<8;k++){g.fillStyle=k%2?'#f3ead8':'#d9a441';g.fillRect(0,k*32,256,32);}}),m:0.5}
});
const SAND=0xe6d3b3,RED=0xb5654a,MAJ=0x3a4fa0,BAB=0xe2b54f,EMER=0x1f6f5c,CEDAR=0x8a5a3a,BRASS=0xc9a24a,PINK=0xe3b8a5,SAFF=0xd9a441;
const PAINTS={prop:{n:'Riad',w:{
 sej:[SAND,'Séjour · tadelakt sable, grande arche Red Earth (F&B 64)'],
 ent:[BAB,'Entrée · Babouche (F&B 223)'],
 ch1:[PINK,'Chambre · Setting Plaster (F&B 231), arche Red Earth'],
 ch2:[MAJ,'Bureau · soubassement bleu Majorelle'],
 sdb:[EMER,'SDB, WC, crédence · zellige émeraude']},f:{}}};
const PWALLS={
 sej:()=>{room('sej',SAND,0,H,['n','e','s2','w1','w2','nk']);pw(WL.sej.s,archTex('#e6d3b3','#b5654a',2.3,2.15,{px:589.5}));room('cui',SAND);room('cui',wtex('p2Zel'),0.9,1.45,['w','e']);panel(true,255,612,694,I,1,1.0,2.3,archTex('#e6d3b3','#c9d3d6',1.0,1.28,{rim:'#c9a24a'}));},
 ent:()=>{room('ent',BAB);panel(false,157,478,518,E,1,1.0,1.95,archTex('#e2b54f','#c9d3d6',0.5,0.92,{rim:'#c9a24a'}));},
 ch1:()=>{room('ch1',PINK,0,H,['n','e','w']);pw(WL.ch1.s,archTex('#e3b8a5','#b5654a',2.0,2.2,{px:598}));},
 ch2:()=>{room('ch2',MAJ,0,1.2);room('ch2',SAND,1.2,H);},
 sdb:()=>{room('sdb',wtex('p2Zel'),0,2.0);room('sdb',SAND,2.0,H);room('wc',wtex('p2Zel'),0,1.2);room('wc',BAB,1.2,H);panel(true,705,344,386,E,-1,1.05,1.95,archTex('#1f6f5c','#c9d3d6',0.55,0.88,{rim:'#c9a24a'}));}
};
const PASS=[
 ['Cuisine : plan de travail ↔ METOD',455,200,'x',0.9],
 ['Cuisine : bar ↔ METOD',455,250,'x',0.9],
 ['Séjour : entrée → séjour',380,480,'z',0.8],
 ['Séjour : buffet ↔ table du salon',600,320,'z',0.8],
 ['Séjour : vers la baie',695,380,'z',0.8],
 ['Séjour : tabouret ↔ banquette',470,380,'x',0.8],
 ['Chambre : côté gauche du lit',510,640,'x',0.8],
 ['Chambre : côté droit du lit',685,640,'x',0.8],
 ['Chambre : porte → porte-fenêtre',600,530,'z',0.8],
 ['Bureau : BZ ↔ meuble TV',600,150,'x',0.8],
 ['Bureau : porte → porte-fenêtre',620,225,'z',0.8],
 ['Balcon : façade ↔ banquette',760,350,'x',0.8],
 ['Balcon : façade ↔ olivier',760,240,'x',0.8],
 ['Balcon : façade ↔ citronnier',760,470,'x',0.8]
];
function p2Sejour(){
  item('Banquette maçonnée en L, enduit tadelakt');
  b(505,446,674,493.6,0,0.36,0xd9c3a0);b(505,446,674,486,0.36,0.46,SAFF);b(512,486,674,493.6,0.46,0.86,RED);
  b(505,340,552.6,446,0,0.36,0xd9c3a0);b(505,340,512,446,0.36,0.86,0xd9c3a0);b(512,340,552.6,446,0.36,0.46,SAFF);b(512,342,519,446,0.46,0.82,RED);
  [[530,0x1f6f5c],[560,0x3a4fa0],[600,0xe9dcc3],[640,0x1f6f5c]].forEach(q=>b(q[0],478,q[0]+20,486,0.46,0.74,q[1]));[[360,0xe9dcc3],[400,0x3a4fa0]].forEach(q=>b(519,q[0],527,q[0]+22,0.46,0.72,q[1]));
  rug('Tapis Beni Ouarain',518,330,700,440,0xeee5d3,{border:0x2a2a2a,bw:0.04});
  rtable('Table de salon laiton et zellige Ø 1,20',600,395,0.6,0.62,BRASS,0x6b4a2a,{pr:0.07,br:0.3});
  item('Pouf cuir');cy(660,395,0.25,0,0.4,0xa0643a,0.26);
  cab('Buffet en cèdre ajouré',furnGroup,600,258.4,706,289,0.12,0.86,CEDAR,{f:'S',nd:3,fc:0xa06a42,hc:BRASS,knob:true});[[602,261],[702,261],[602,285],[702,285]].forEach(p=>b(p[0],p[1],p[0]+2,p[1]+2,0,0.12,0x5a3a24));
  item('Tajine et plateau');cy(630,273,0.18,0.86,0.88,BRASS);cy(685,273,0.12,0.86,0.92,RED,0.13);cy(685,273,0.02,0.92,1.08,RED,0.1);
  plant('Plante grasse en pot zellige',662,273,{y:0.86,r:0.07,h:0.1,H:0.32,k:'round',pc:EMER,lc:0x5a8a45});
  item('Étagère cèdre de la niche',furnWall);b(306.8,242,337.4,310,0,0.04,CEDAR);[[306.8,242,337.4,244],[306.8,308,337.4,310]].forEach(q=>b(q[0],q[1],q[2],q[3],0,2.0,CEDAR));[0.5,0.95,1.4,1.85].forEach(y=>b(306.8,244,337.4,308,y,y+0.03,CEDAR));
  [[0.53,0x1f6f5c],[0.98,0xb5654a],[1.43,0xe9dcc3],[1.88,0x3a4fa0]].forEach((q,i)=>{cy(320,262+i*6,0.05,q[0],q[0]+0.16+(i%2)*0.08,q[1],0.035);cy(323,292-i*3,0.07,q[0],q[0]+0.05,0xe9dcc3,0.05);});
  stool('Tabouret de bar rotin 1',372,352,0.18,0.66,0xc49a5e,0x3a2a1a);stool('Tabouret de bar rotin 2',410,352,0.18,0.66,0xc49a5e,0x3a2a1a);
  [[580,380,1.6],[615,405,1.75],[598,366,1.9]].forEach((p,i)=>pendant('Lanterne marocaine laiton '+(i+1),p[0],p[1],p[2],{k:'lantern',r:0.13,sy:1.5,c:0xe8a948,cord:BRASS}));
  pendant('Lanterne cuisine',440,170,1.95,{k:'lantern',r:0.12,sy:1.5,c:0xe8a948,cord:BRASS});
  metod(RED,0x3e4044);
  item('Étagères cèdre et tajines',furnWall);[1.5,1.85].forEach(y=>b(499.6,150,516.6,252,y,y+0.03,CEDAR));[[165,RED],[190,EMER],[215,0xe9dcc3],[240,MAJ]].forEach((q,i)=>{cy(508,q[0],0.06,1.53,1.56,q[1]);cy(508,q[0],0.05,1.56,1.66,q[1],0.06);});[[170,0xe9dcc3],[200,EMER],[230,0xe9dcc3]].forEach(q=>cy(508,q[0],0.06,1.88,1.9+0.12,q[1]));
}
function p2Ch1(){
  item('Dressing existant');b(440.4,552,474.4,688,0,2.05,0x4a4644);
  item('Rideau lin devant le dressing',furnWall);for(let i=0;i<14;i++)b(475.5+(i%2),550+i*10,478.5,560+i*10,0.03,2.3,0xe8dcc6);b(475,548,479,692,2.3,2.33,BRASS);
  bed('Lit 160 × 200, cadre rotin',598,630.2,1.6,2.0,'S',{fh:0.3,frame:0xc49a5e,fr:0.04,duvet:0xf4efe2,plaid:RED,pil:0xf4efe2,pil2:SAFF});
  [[522,'gauche'],[674,'droit']].forEach(p=>{item('Chevet rond rotin '+p[1]);cy(p[0],672,0.2,0,0.5,0xc49a5e,0.17);tlamp('Lampe lanterne '+p[1],p[0],672,0.5,{k:'globe',r:0.08,c:0xe8a948,bc:BRASS});});
  pendant('Suspension rotin',598,600,2.05,{k:'dome',r:0.3,c:0xc49a5e});
  rug('Kilim',545,505,651,556,0xb5654a,{border:0x3a4fa0});
  curtain('Rideaux lin rayé',false,720,577,603,E,-1,0xf1e6d0,0.9);
}
function p2Ch2(){
  desk180(558,21.8,0xdcc296);
  item('Écran 27"');b(590,48,634,50,0.86,1.22,0x1d1d1f);b(610,49,614,56,0.75,0.86,0x333333);
  gaming(619,103,'S');
  sofa('BZ 140 × 90 existant, housse kilim',554,147.6,1.4,0.9,'W',{c:0xb5654a,k:0xd9a441,arm:0,seat:0.42,back:0.88,leg:0.08,pil:[EMER,SAFF,MAJ]});
  cab('Console cèdre basse',furnGroup,682.6,62,713.2,154,0.1,0.5,CEDAR,{f:'W',nd:2,fc:0xa06a42,hc:BRASS});b(684,64,686,66,0,0.1,0x5a3a24);b(684,150,686,152,0,0.1,0x5a3a24);
  item('TV 55" (jeux, films)',furnTall);b(710.2,66,713.2,150,0.95,1.67,0x151617);b(709.7,67.5,710.2,148.5,0.97,1.65,0x2a2f36);
  item('Étagères murales cèdre',furnWall);[1.4,1.75].forEach(y=>{b(523.4,102,540,193,y,y+0.03,CEDAR);books(525,106,538,190,y+0.03,0.24,[RED,EMER,SAFF,0xe9dcc3,MAJ],Math.round(y*10));});
  item('Pouf brodé');cy(655,195,0.22,0,0.38,0xe2b54f);
  rug('Kilim bleu',590,120,676,240,0x3a4fa0,{border:0xd9a441});
  pendant('Lanterne laiton',619,140,2.0,{k:'lantern',r:0.13,sy:1.5,c:0xe8a948,cord:BRASS});
  curtain('Rideaux lin, porte-fenêtre',false,720,222,246,E,-1,0xf1e6d0,0.9);
}
function p2Ent(){
  item('Banc cèdre et coussin kilim');b(163.8,474,193,522,0,0.06,0x5a3a24);b(163.8,474,193,522,0.38,0.42,CEDAR);[474,520].forEach(z=>b(163.8,z,193,z+2,0.06,0.38,CEDAR));b(164,476,192,520,0.42,0.48,RED);
  [[478,0xd9a441],[486,0xb5654a],[502,0x1f6f5c],[510,0xe9dcc3]].forEach(q=>b(168,q[0],186,q[0]+6,0.06,0.12,q[1]));
  item('Tablette murale laiton',furnWall);b(286.4,516,296.6,540,0.85,0.89,BRASS);b(292,520,295,523,0.89,1.05,0xe8a948);
  pendant('Lanterne entrée',230,490,1.95,{k:'lantern',r:0.14,sy:1.5,c:0xe8a948,cord:BRASS});
  rug('Tapis berbère',200,425,280,520,0xd9c3a0,{border:0xb5654a});
}
function p2Sdb(){
  item('Étagères cèdre au-dessus du lave-linge',furnTall);[1.3,1.65].forEach(y=>{b(236.4,681.2,287,698.2,y,y+0.025,CEDAR);[[0xe9dcc3,0.18],[RED,0.14],[EMER,0.2]].forEach((q,i)=>cy(246+i*14,689,0.04,y+0.025,y+0.025+q[1],q[0]));});
  item('Panier en osier');cy(305,580,0.17,0,0.45,0xc49a5e,0.14);
  item('Tabouret teck');b(356,592,373,608,0,0.42,0xa07850);
  item('Fouta roulées',furnWall);[0,1,2].forEach(i=>b(320+i*7,569,326+i*7,580,0.9,0.98,[SAFF,0xf4efe2,EMER][i]));b(318,568.4,342,581,0.86,0.9,CEDAR);
}
function p2Balc(){
  item('Rangement de jardin existant, repeint bleu Majorelle');b(728,17,816.4,64.6,0,1.8,MAJ);b(771.8,64.6,772.6,66,0.05,1.75,0x2a3a80);[[766,1.0],[777,1.0]].forEach(q=>b(q[0],64.6,q[0]+1.5,66,0.95,1.2,BRASS));b(727,16,817.4,65.6,1.8,1.85,0x2a3a80);
  item('Banquette de terrasse matelassée');b(786,290,820.6,412,0,0.32,0xe6d3b3);b(787,291,820,411,0.32,0.44,0xf3ead8);b(812,291,820,411,0.44,0.8,SAFF);[[300,EMER],[335,RED],[370,MAJ]].forEach(q=>b(806,q[0],812,q[0]+24,0.44,0.72,q[1]));
  plant('Olivier en jarre',803,240,{r:0.25,h:0.55,pc:0xb5654a,H:2.2,k:'olive',lc:0x7d8a5a,lc2:0x96a070,taper:0.7});
  plant('Citronnier en jarre',803,470,{r:0.25,h:0.55,pc:0xb5654a,H:2.2,k:'olive',lc:0x4f7a3a,lc2:0xe3c34a,taper:0.7});
  planter('Jardinière géraniums',800,520,820.6,600,0.35,0xb5654a,{k:'flowers',lc:0x4f7a3a,fc:[0xd9264a,0xe8536f,0xf2f2f2]});
  rtable('Table bistrot mosaïque Ø 0,70',775,655,0.35,0.72,EMER,0x222222,{pr:0.03,br:0.2});
  chair('Chaise fer forgé nord',775,621,'N',{c:0x222222,s:SAFF,back:0.85});
  chair('Chaise fer forgé sud',775,689,'S',{c:0x222222,s:SAFF,back:0.85});
  [[795,280],[795,422]].forEach((p,i)=>{item('Lanterne de sol '+(i+1));b(p[0]-4,p[1]-4,p[0]+4,p[1]+4,0,0.04,BRASS);b(p[0]-3.5,p[1]-3.5,p[0]+3.5,p[1]+3.5,0.04,0.36,glow(0xe8a948,0.6));cy(p[0],p[1],0.06,0.36,0.44,BRASS,0.01);});
  item('Store banne rayé',furnTall);b(726.8,270,794.8,460,2.3,2.33,tm('p2Stripe',1,2.8));b(792.8,270,794.8,460,2.14,2.3,tm('p2Stripe',0.1,2.8));[275,455].forEach(z=>b(726.8,z-1,794.8,z+1,2.26,2.3,0x6a6e73));
}
const PROJET={
 build(){
  basePro({pl:[0xa06a42,0xb07850,0x5a3a24],closet:0xa06a42,reed:tm('p2Cane',9.7,1.1),plh:BRASS});
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[300,497,437,565],[157,350,300,565]].forEach(r=>fl(r[0],r[1],r[2],r[3],'tomette'));
  fl(232,565,437,705,'ciment');fl(157,565,232,705,'ciment');
  fl(437,497,720,705,'sisal');fl(520,15,720,255,'sisal');fl(720,15,821,705,'terraOut');
  p2Sejour();p2Ch1();p2Ch2();p2Ent();p2Sdb();p2Balc();
  curtain('Voilages lin, baie',false,720,262,290,E,-1,0xf1e6d0,0.8);
 },
 rooms:[['Salon marocain','28,2 m²',560,420],['Bureau, jeux et invités','9,0 m²',620,140],['Chambre','≈ 11,5 m²',560,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',235,390,2.55],['Placard couloir cèdre','',368,545,2.55],['Terrasse de riad','15,1 m²',790,360],['Banquette maçonnée','',590,470,0.9,1],['Table du salon Ø 1,20','',600,395,0.9,1],['Buffet cèdre','',650,275,1.0,1],['BZ (couchage invités)','',554,148,1.0,1],['Rangement Majorelle','',772,40,1.9,1]]
};
