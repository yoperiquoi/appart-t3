const PROP={num:4,name:'Atelier',short:'Atelier',desc:'Proposition 4, Atelier : un industriel chaleureux, béton grand format, mur de briquettes, acier noir, cuir cognac, lit à baldaquin en acier et chambre 2 transformée en atelier.',
 legend:[[0xa9a49b,0x7d786f,'Effet béton 120×120'],[0xe9e7e2,0x1c1c1c,'Hexagones noir et blanc'],[0x2a2a2a,0x777777,'Hexagones noirs'],[0x6e5038,0x3a2a1c,'Chêne de récupération'],[0x6f7275,0x4a4c4e,'Lames composites'],[0x3b82c4,0x1f4f7d,'Portes']]};
Object.assign(tex,{
 beton:{t:mk(g=>{const r=rnd(51);[[0,0,'#aaa59c'],[256,0,'#a39e95'],[0,256,'#a6a198'],[256,256,'#aea9a0']].forEach(q=>{g.fillStyle=q[2];g.fillRect(q[0],q[1],256,256);});for(let i=0;i<120;i++){const gr=g.createRadialGradient(0,0,0,0,0,30+r()*60);const x=r()*512,y=r()*512;g.save();g.translate(x,y);gr.addColorStop(0,r()<0.5?'rgba(120,115,105,0.12)':'rgba(200,196,188,0.12)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-90,-90,180,180);g.restore();}g.strokeStyle='#7d786f';g.lineWidth=2;[0,256,512].forEach(k=>{g.beginPath();g.moveTo(k,0);g.lineTo(k,512);g.moveTo(0,k);g.lineTo(512,k);g.stroke();});},512,512),m:2.4},
 hexBW:{t:mk(g=>{const s=32,hh=Math.sqrt(3)*s,r=rnd(5);g.fillStyle='#e9e7e2';g.fillRect(0,0,192,111);for(let i=-1;i<=4;i++)for(let j=-1;j<=2;j++){const cx=i*1.5*s,cy=j*hh+(i%2?hh/2:0);g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+s*Math.cos(a),cy+s*Math.sin(a));}g.closePath();g.fillStyle=((i+4)%4===0&&(j+2)%2===0)||r()<0.18?'#1c1c1c':'#e9e7e2';g.fill();g.strokeStyle='#9a9790';g.lineWidth=2;g.stroke();}},192,111),m:0.3,mh:0.1732},
 hexNoir:{t:mk(g=>{const s=32,hh=Math.sqrt(3)*s;for(let i=-1;i<=4;i++)for(let j=-1;j<=2;j++){const cx=i*1.5*s,cy=j*hh+(i%2?hh/2:0);g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+s*Math.cos(a),cy+s*Math.sin(a));}g.closePath();g.fillStyle=['#2a2a2a','#252525','#303030'][(i+j+6)%3];g.fill();g.strokeStyle='#777';g.lineWidth=2;g.stroke();}},192,111),m:0.24,mh:0.1386},
 metro:{t:mk(g=>{g.fillStyle='#2b2b2b';g.fillRect(0,0,256,256);for(let row=0;row<8;row++){const off=row%2?32:0;for(let k=-1;k<5;k++){g.fillStyle=(row+k)%3?'#f2f1ec':'#e9e8e2';g.fillRect(k*64+off+1.5,row*32+1.5,61,29);}}}),m:0.6},
 reclaim:{t:mk(g=>{const r=rnd(61),cols=['#6e5038','#5f4430','#7a5a3e','#64493a','#57402c','#80603f'];for(let k=0;k<8;k++){let x=-Math.floor(r()*200);while(x<256){const w=120+r()*160;g.fillStyle=cols[Math.floor(r()*6)];g.fillRect(x,k*32,w,32);g.strokeStyle='rgba(30,20,10,0.25)';g.lineWidth=1;for(let j=0;j<3;j++){g.beginPath();g.moveTo(x,k*32+6+j*9);g.lineTo(x+w,k*32+8+j*9);g.stroke();}g.fillStyle='#2a1e14';g.fillRect(x+4,k*32+8,2,2);g.fillRect(x+4,k*32+22,2,2);g.fillStyle='#2a1e14';g.fillRect(x+w-1,k*32,2,32);x+=w;}g.fillStyle='#2a1e14';g.fillRect(0,k*32,256,1.5);}}),m:1.6},
 brique:{t:mk(g=>{g.fillStyle='#cfc6b8';g.fillRect(0,0,256,256);const r=rnd(71),rh=256/14;for(let row=0;row<14;row++){const off=row%2?32:0;for(let k=-1;k<5;k++){g.fillStyle=['#9c4a32','#8a3f2b','#a8553a','#7e3a28','#b0603f'][Math.floor(r()*5)];g.fillRect(k*64+off+2,row*rh+1.5,60,rh-3);}}}),m:0.88},
 compo:{t:mk(g=>{for(let k=0;k<8;k++){g.fillStyle=['#6f7275','#686b6e','#74777a','#6b6e71'][k%4];g.fillRect(k*32,0,29,256);g.fillStyle='#3a3c3e';g.fillRect(k*32+29,0,3,256);for(let j=0;j<256;j+=6){g.fillStyle='rgba(255,255,255,0.05)';g.fillRect(k*32,j,29,2);}}}),m:1.0},
 peg:{t:mk(g=>{g.fillStyle='#b9a27e';g.fillRect(0,0,256,256);g.fillStyle='#5a4a35';for(let i=0;i<8;i++)for(let j=0;j<8;j++){g.beginPath();g.arc(i*32+16,j*32+16,3,0,6.283);g.fill();}}),m:0.2},
 grille:{t:mk(g=>{g.fillStyle='#5d6a6e';g.fillRect(0,0,256,256);g.fillStyle='#1c1c1c';for(let k=0;k<=4;k++){g.fillRect(k*64-3,0,6,256);g.fillRect(0,k*64-3,256,6);}}),m:0.5}
});
const AMMO=0xd9d6cd,RAIL=0x2f3438,DPIPE=0x5a5f60,STEEL=0x1c1c1c,COGN=0x8a4a24,ROUGE=0x9c3a2a,REC=0x6e5038,ZINC=0x9aa0a3;
const PAINTS={prop:{n:'Atelier',w:{
 sej:[AMMO,'Séjour · Ammonite (F&B 274) et mur de briquettes de parement'],
 ent:[RAIL,'Entrée · Railings (F&B 31)'],
 ch1:[DPIPE,'Chambre · tête de lit Down Pipe (F&B 26)'],
 ch2:[0xb9a27e,'Atelier · Ammonite et panneau perforé'],
 sdb:[0xf2f1ec,'SDB · métro blanc joints noirs, WC Railings']},f:{}}};
const PWALLS={
 sej:()=>{room('sej',AMMO,0,H,['n','e','s2','w1','w2','nk']);pw(WL.sej.s,wtex('brique'));room('cui',AMMO);room('cui',wtex('metro'),0.9,1.45,['w','e']);},
 ent:()=>{room('ent',RAIL);frame(false,157,480,516,E,1,1.1,1.7,STEEL,0xc9d3d6);},
 ch1:()=>{room('ch1',AMMO,0,H,['n','e','w']);pw(WL.ch1.s,DPIPE);},
 ch2:()=>{room('ch2',AMMO);panel(false,720,60,154,E,-1,0.9,2.0,wtex('peg'));},
 sdb:()=>{room('sdb',wtex('metro'),0,2.0);room('sdb',0xf2f1ec,2.0,H);room('wc',wtex('metro'),0,1.2);room('wc',RAIL,1.2,H);frame(true,705,346,384,E,-1,1.1,1.8,STEEL,0xc9d3d6);}
};
const PASS=[
 ['Cuisine : plan de travail ↔ METOD',455,200,'x',0.9],
 ['Cuisine : bar ↔ METOD',455,250,'x',0.9],
 ['Séjour : entrée → séjour',380,480,'z',0.8],
 ['Séjour : derrière le Chesterfield (vers la baie)',640,300,'z',0.8],
 ['Séjour : malle ↔ meuble TV',580,455,'z',0.8],
 ['Séjour : fauteuil club ↔ table',460,420,'x',0.8],
 ['Chambre : côté gauche du lit',505,630,'x',0.8],
 ['Chambre : côté droit du lit',685,630,'x',0.8],
 ['Chambre : porte → porte-fenêtre',600,528,'z',0.8],
 ['Atelier : siège ↔ BZ',650,160,'z',0.8],
 ['Atelier : rayonnage ↔ siège',570,110,'x',0.8],
 ['Balcon : barbecue ↔ garde-corps',780,250,'x',0.8],
 ['Balcon : façade ↔ tablette bar',760,360,'x',0.8],
 ['Balcon : façade ↔ jardinière',760,520,'x',0.8]
];
function tolix(n,cx,cz,dir,col){return loc(n,furnGroup,cx,cz,dir,(x,z)=>{const h=M(0.42)/2;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>b(x+q[0]*h,z+q[1]*h,x+q[0]*(h-1.4),z+q[1]*(h-1.4),0,0.45,col));b(x-h,z-h,x+h,z+h,0.43,0.46,col);b(x-h+1,z-h,x+h-1,z-h+1.2,0.46,0.82,col);});}
function chester(n,cx,cz,w,d,dir,col){return loc(n,furnGroup,cx,cz,dir,(x,z)=>{const W=M(w)/2,D=M(d)/2,ar=M(0.2);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>cy(x+q[0]*(W-4),z+q[1]*(D-4),0.03,0,0.1,0x2a1a10,0.025));b(x-W,z-D,x+W,z+D,0.1,0.36,col);b(x-W+ar,z-D+M(0.2),x+W-ar,z+D,0.36,0.46,0x9a5630);b(x-W,z-D,x+W,z-D+M(0.2),0.36,0.76,col);b(x-W,z-D,x-W+ar,z+D,0.36,0.76,col);b(x+W-ar,z-D,x+W,z+D,0.36,0.76,col);for(let i=0;i<9;i++)cy(x-W+ar+(i+0.5)*(2*W-2*ar)/9,z-D+M(0.2)+0.3,0.006,0.6,0.62,0x5a2e14);});}
function p4Sejour(){
  table('Table d’atelier 90 × 90, chêne de récupération et acier',334.4,354.4,395.6,415.6,0.75,REC,STEEL,{lw:2.4});
  [[319,385,'W'],[410,385,'E'],[365,431,'S']].forEach((p,i)=>tolix('Chaise Tolix zinc '+(i+1),p[0],p[1],p[2],ZINC));
  [[350,385],[380,385]].forEach((p,i)=>pendant('Suspension émaillée '+(i+1),p[0],p[1],1.7,{k:'cone',r:0.16,c:0x2a2f2a,hh:0.2}));
  cab('Vestiaire métallique 3 portes',furnWall,306.8,245,337.4,330,0,1.8,0x5f6b63,{f:'E',nd:3,fc:0x6a776e,hc:0xc9ccd0,hh:0.12,hy:1.0});
  rug('Kilim délavé',560,330,700,462,ROUGE,{border:0x6b2a20});
  chester('Chesterfield cuir cognac 2,20 m',630,355.6,2.2,0.9,'N',COGN);
  item('Malle de voyage acier riveté');b(596,400,664,441,0,0.45,0x3a3d40);b(596,400,664,441,0.45,0.47,0x2a2c2e);[400,441].forEach(z=>[600,660].forEach(x=>b(x-1.5,z-0.5,x+1.5,z+0.5,0.2,0.3,0xc9a24a)));
  cab('Meuble TV acier et bois',furnGroup,560,466,680,493.6,0.15,0.55,REC,{f:'N',nd:3,fc:0x5f4430,hc:STEEL});[[562,468],[676,468],[562,490],[676,490]].forEach(p=>b(p[0],p[1],p[0]+2,p[1]+2,0,0.15,STEEL));
  item('TV 55"',furnTall);b(588,490.6,672,493.6,1.0,1.72,0x151617);b(589.5,490.1,670.5,490.6,1.02,1.7,0x2a2f36);
  sofa('Fauteuil club cuir',518,430,0.8,0.8,'W',{c:COGN,k:0x9a5630,arm:0.16,armH:0.62,back:0.78,seat:0.42,leg:0.06,lc:0x2a1a10});
  item('Lampadaire projecteur trépied');[[0,-1],[0.87,0.5],[-0.87,0.5]].forEach(q=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,1.45,8),mt(STEEL));m.position.set(X(695+q[0]*8),0.72,Z(415+q[1]*8));m.rotation.set(q[1]*0.18,0,-q[0]*0.18);IT.add(m);});cy(695,415,0.13,1.38,1.62,0x2a2c2e);cy(695,415,0.1,1.45,1.55,glow(0xfff1d0,0.9));
  pendant('Suspension cage cuisine',440,170,1.95,{k:'globe',r:0.1,c:0xffd99a,e:0.9});
  metod(0x2a2c2e,0x3e4044);
  item('Étagères acier cuisine',furnWall);[1.5,1.85].forEach(y=>b(499.6,150,516.6,252,y,y+0.03,STEEL));[155,250].forEach(z=>b(515,z-1,516.6,z+1,1.45,1.9,STEEL));[[165,0xf2f1ec],[185,0x8a4a24],[210,0xf2f1ec],[235,0x5f6b63]].forEach((q,i)=>cy(508,q[0],0.05,1.53,1.62+(i%2)*0.06,q[1]));
}
function p4Ch1(){
  item('Dressing ouvert existant (gris foncé)',furnWall);b(440.4,552,474.4,688,0,0.06,0x4a4644);[552,688-1.7].forEach(z=>b(440.4,z,474.4,z+1.7,0,2.05,0x4a4644));b(440.4,552,474.4,688,2.02,2.05,0x4a4644);b(440.4,552,441.4,688,0.06,2.02,0x8a8580);[1.15,1.95].forEach(y=>b(456,555,458,685,y,y+0.02,0xb9bcbf));[[560,0x2b2b2b],[575,0x8a4a24],[590,0xd9d6cd],[610,0x3a4a5a],[628,0x2b2b2b],[648,0xb9a27e],[668,0x5a5f60]].forEach(q=>b(447,q[0],466,q[0]+9,1.15-0.85,1.15,q[1]));
  bed('Lit à baldaquin acier noir 160 × 200',598,627.5,1.6,2.0,'S',{fh:0.3,leg:0.08,lc:STEEL,frame:STEEL,fr:0.04,hb:1.0,hbd:0.04,hbc:STEEL,duvet:0xd9d6cd,plaid:ROUGE,pil:0xf2f1ec,pil2:0x5a5f60});
  item('Baldaquin acier',furnTall);[[537.9,553.8],[655.4,553.8],[537.9,695.4],[655.4,695.4]].forEach(p=>b(p[0],p[1],p[0]+2.7,p[1]+2.7,0,2.1,STEEL));b(537.9,553.8,658.1,556.5,2.08,2.11,STEEL);b(537.9,695.4,658.1,698.1,2.08,2.11,STEEL);b(537.9,553.8,540.6,698.1,2.08,2.11,STEEL);b(655.4,553.8,658.1,698.1,2.08,2.11,STEEL);
  [[513,'gauche'],[659,'droit']].forEach(p=>{item('Chevet tabouret acier '+p[1]);cy(p[0]+12,680,0.18,0.42,0.45,REC);cy(p[0]+12,680,0.15,0,0.42,STEEL,0.17);tlamp('Lampe baladeuse '+p[1],p[0]+12,680,0.45,{h:0.35,c:0x2a2f2a,bc:STEEL});});
  pendant('Ampoule cage',598,600,2.0,{k:'globe',r:0.08,c:0xffd99a,e:0.9});
  rug('Tapis berbère gris',545,505,651,553,0x8a8680);
  curtain('Rideaux lin lavé gris',false,720,577,603,E,-1,0x9a9690,0.92);
}
function p4Ch2(){
  desk180(558,21.8,REC,STEEL);
  item('Écran 27" et lampe d’architecte');b(590,48,634,50,0.86,1.22,0x1d1d1f);b(610,49,614,56,0.75,0.86,0x333333);cy(670,62,0.06,0.75,0.77,STEEL);b(669,61,671,63,0.77,1.15,STEEL);
  gaming(622,103,'S');
  shelf('Rayonnage acier sol-plafond',furnWall,523.4,25,543.8,195,2.4,[0.02,0.45,0.9,1.35,1.8,2.25],STEEL,[0x8a4a24,0x5f6b63,0xb9a27e,0xd9d6cd,0x2b2b2b],{up:3,seed:21,st:0.03});
  sofa('BZ 140 × 90 existant, housse toile kaki',633.5,221,1.4,0.9,'S',{c:0x5f6b4a,k:0x6f7b5a,arm:0,seat:0.42,back:0.88,leg:0.08,pil:[0x8a4a24,0xd9d6cd]});
  item('Vélo au mur',furnTall);[612,676].forEach(x=>{const m=new THREE.Mesh(new THREE.TorusGeometry(0.33,0.018,8,28),mt(STEEL));m.position.set(X(x),1.6,Z(244));IT.add(m);});b(612,243,676,245,1.6,1.62,0x9c3a2a);b(634,243,662,245,1.85,1.87,0x9c3a2a);b(623,246,625,251.6,1.55,1.9,STEEL);b(667,246,669,251.6,1.55,1.9,STEEL);
  pendant('Suspension émaillée',619,110,1.95,{k:'cone',r:0.17,c:0x2a2f2a});
  rug('Tapis jute',570,125,690,185,0xb9a17a);
  curtain('Rideaux lin lavé gris',false,720,136,159,E,-1,0x9a9690,0.92);
}
function p4Ent(){
  item('Banc acier et chêne');b(163.8,474,193,522,0.42,0.46,REC);[476,520].forEach(z=>b(164,z-2,193,z,0,0.42,STEEL));b(166,476,191,520,0.12,0.14,STEEL);[[478,0x2b2b2b],[488,0x8a4a24],[504,0x2b2b2b]].forEach(q=>b(168,q[0],186,q[0]+7,0.14,0.24,q[1]));
  item('Portemanteau tube de plomberie',furnWall);b(163.8,478,166,518,1.75,1.78,STEEL);[484,498,512].forEach(z=>b(166,z-1,171,z+1,1.7,1.76,STEEL));
  pendant('Suspension cage entrée',230,480,1.95,{k:'globe',r:0.1,c:0xffd99a,e:0.9});
}
function p4Sdb(){
  item('Étagères acier au-dessus du lave-linge',furnTall);[1.3,1.65].forEach(y=>{b(236.4,681.2,287,698.2,y,y+0.025,STEEL);[[0xf2f1ec,0.18],[0x2b2b2b,0.14],[0x9aa0a3,0.2]].forEach((q,i)=>cy(246+i*14,689,0.04,y+0.025,y+0.025+q[1],q[0]));});
  item('Échelle porte-serviettes acier',furnWall);[300,330].forEach(x=>b(x,568.4,x+1.5,573,0,1.7,STEEL));[0.4,0.75,1.1,1.45].forEach((y,i)=>{b(300,569,331.5,571,y,y+0.02,STEEL);b(302,569,330,573,y-0.2,y,[0xf2f1ec,0x5a5f60,0xf2f1ec,0x9c3a2a][i]);});
  item('Tabouret d’atelier');cy(364,600,0.15,0.43,0.46,REC);cy(364,600,0.13,0,0.43,STEEL,0.16);
}
function p4Balc(){
  item('Rangement de jardin existant (anthracite)');b(728,17,816.4,64.6,0,1.8,0x4a4d50);b(771.8,64.6,772.6,66,0.05,1.75,0x5c6064);b(727,16,817.4,65.6,1.8,1.86,0x5c6064);
  planter('Jardinière acier corten, graminées',797,80,820.6,200,0.6,0x8a4a24,{k:'grass',lc:0x9a9a5a,lc2:0x7d8a4a,n:5});
  item('Meuble barbecue existant');b(727,222,760.8,273,0,0.86,0x8a7a66);b(727,221.7,761.4,273.3,0.86,0.89,0x6d6f72);b(735,230,752,265,0.89,1.0,0x1e1f21);
  item('Tablette bar fixée au garde-corps');b(800,300,820.6,430,1.02,1.06,REC);[310,420].forEach(z=>b(816,z-1,820.6,z+1,0.7,1.02,STEEL));
  stool('Tabouret haut 1',805,335,0.17,0.72,REC,STEEL);stool('Tabouret haut 2',805,395,0.17,0.72,REC,STEEL);
  planter('Jardinière acier corten, olivier nain',797,470,820.6,600,0.6,0x8a4a24,{k:'tree',lc:0x7d8a5a,lc2:0x9a9a5a,H:1.4,n:5});
  rtable('Table bistrot acier Ø 0,60',775,655,0.3,0.72,0x3a3d40,STEEL,{pr:0.03,br:0.2});
  tolix('Tolix rouge nord',775,622,'N',0x9c3a2a);tolix('Tolix rouge sud',775,688,'S',0x9c3a2a);
  item('Guirlande guinguette',furnTall);for(let i=0;i<14;i++)sp(735+((i%2)*70),2.25,30+i*48,0.03,glow(0xffd99a,0.9));
}
const PROJET={
 build(){
  basePro({pl:[(w,h)=>tm('grille',w,h),0,STEEL],closet:0x3a3d40,reed:tm('compo',9.7,1.1),plh:STEEL});
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[300,497,437,565],[157,350,300,412],[240,412,300,500],[157,500,300,565]].forEach(r=>fl(r[0],r[1],r[2],r[3],'beton'));
  fl(157,412,240,500,'hexBW');
  fl(232,565,437,705,'hexNoir');fl(157,565,232,705,'hexNoir');
  fl(437,497,720,705,'reclaim');fl(520,15,720,255,'reclaim');fl(720,15,821,705,'compo');
  p4Sejour();p4Ch1();p4Ch2();p4Ent();p4Sdb();p4Balc();
  curtain('Voilages lin lavé, baie',false,720,440,468,E,-1,0xb9b5ad,0.8);
 },
 rooms:[['Séjour / cuisine','28,2 m²',420,455],['Atelier','9,0 m²',620,140],['Chambre','≈ 11,5 m²',560,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',235,390,2.55],['Placard couloir verrière','',368,545,2.55],['Rooftop','15,1 m²',790,360],['Chesterfield','',630,356,0.9,1],['Mur de briquettes','',600,490,1.9,1],['Rayonnage acier','',537,110,2.5,1],['Lit à baldaquin','',598,627,2.2,1]]
};
