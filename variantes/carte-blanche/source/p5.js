function cimentTex(bg,c1,c2,joint){return mk(g=>{g.fillStyle=joint;g.fillRect(0,0,256,256);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=i*64,y=j*64;g.save();g.beginPath();g.rect(x+1,y+1,62,62);g.clip();g.fillStyle=bg;g.fillRect(x,y,64,64);g.fillStyle=c1;[[0,0],[64,0],[0,64],[64,64]].forEach(p=>{g.beginPath();g.arc(x+p[0],y+p[1],26,0,6.283);g.fill();});g.fillStyle=bg;[[0,0],[64,0],[0,64],[64,64]].forEach(p=>{g.beginPath();g.arc(x+p[0],y+p[1],17,0,6.283);g.fill();});g.fillStyle=c2;g.beginPath();g.moveTo(x+32,y+20);g.quadraticCurveTo(x+44,y+32,x+32,y+44);g.quadraticCurveTo(x+20,y+32,x+32,y+20);g.fill();g.beginPath();g.moveTo(x+20,y+32);g.quadraticCurveTo(x+32,y+20,x+44,y+32);g.quadraticCurveTo(x+32,y+44,x+20,y+32);g.fill();g.restore();}});}
Object.assign(tex,{
  ciment:{t:cimentTex('#efe8d8','#5e8a66','#c9774f','#d8d0bf'),m:0.8},
  cimentD:{t:cimentTex('#2f4a3a','#e9e2cf','#9db8aa','#22362a'),m:0.8},
  fume:{t:plankTex(['#6e5038','#7a5a3f','#644830','#80603f'],'#3a2a1c',5,23,'rgba(30,20,10,0.25)'),m:1.1},
  dalle:{t:mk(g=>grid(g,['#c9b79a','#c2b092','#cfbea2','#c6b496'],'#9a8a70',4)),m:1.0}
});
const paints={
  jungle:{n:'Jungle',w:{ch1:[0x4f8a45,'Ch. 1 tête de lit · papier peint jungle'],sej:[0x2e5a3e,'Séjour mur du canapé · vert jungle'],ch2:[0x9db8aa,'Ch. 2 mur du BZ · sauge']},f:{sofa:0xd8c7a8,sofaC:0xe6d8bf,pil:[0xc9774f,0x2e5a3e],arm:0xc9a46b,chair:0xc9a46b,cu:0xc9774f,bz:0xd8c8ae,bzC:0x5e8a66,drape:0xf3efe4,plaid:0x5e8a66,out:0xc9774f,mural:true}},
  serre:{n:'Serre',w:{ch1:[0xc9774f,'Ch. 1 tête de lit · terracotta'],sej:[0xb9cbb8,'Séjour mur du canapé · céladon'],ch2:[0xe6d8bf,'Ch. 2 mur du BZ · lin']},f:{sofa:0x5e8a66,sofaC:0x6f9a76,pil:[0xe6d8bf,0xc9774f],arm:0xc9a46b,chair:0xc9a46b,cu:0x5e8a66,bz:0xc9774f,bzC:0xe6d8bf,drape:0xe9dcc6,plaid:0xc9774f,out:0x5e8a66}}
};
const paintWalls={ch1:c=>{if(theme().mural)texWall('ch1S',muralMat);else paintW('ch1S',c);},sej:c=>paintW('sejS',c),ch2:c=>paintW('ch2W',c)};
const ROOMS=[['Séjour-jardin d\'hiver','28,2 m²',560,300],['Serre d\'intérieur','',640,275,2.1,1],['Coin orangerie','',360,380,1.3,1],['Chambre 1 · baldaquin','≈ 11,5 m²',577,530],['Ch. 2 · bureau des plantes','9,0 m²',620,190],['Entrée · mur végétal','5,1 m²',240,480],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,630],['Placard','',235,390,2.55],['Placard couloir','',368,545,2.55],['Balcon potager','15,1 m²',772,360]];
const RAT=0xc9a46b,BK=0x2b2b2b,TC=0xb85b36,GR=0x4f7a43;
function hangPot(cx,cz,y,o){const f=AC(cx,cz,24,24,0,furnTall);f.c(12,12,0.3,y+0.2,H,0x8a6a40,6);f.c(12,12,9,y,y+0.16,(o&&o.pot)||TC,16);f.s(12,12,y,14,(o&&o.leaf)||GR,1.4);f.s(16,8,y-0.18,8,0x5d8a4a,1.6);}
function serre(F){const W=F.W,D=F.D,f=F.g,w=F.w,t=F.t,fr=BK;
  f.b(0,0,W,D,0,0.08,fr);
  [[0,0],[W-3,0],[0,D-3],[W-3,D-3]].forEach(p=>w.b(p[0],p[1],p[0]+3,p[1]+3,0.08,1.9,fr));
  w.b(0,0,W,D,1.88,1.92,fr);w.b(3,3,W-3,D-3,1.84,1.86,GL(0xf0e4ff));
  w.b(3,0,W-3,0.6,0.08,1.88,TR(0xcfe6e0,0.25));w.b(3,D-0.6,W-3,D,0.08,1.88,TR(0xcfe6e0,0.25));w.b(0,3,0.6,D-3,0.08,1.88,TR(0xcfe6e0,0.25));w.b(W-0.6,3,W,D-3,0.08,1.88,TR(0xcfe6e0,0.25));
  [0.08,0.7,1.3].forEach((y,k)=>{w.b(3,3,W-3,D-3,y,y+0.02,0x9a9a96);for(let i=0;i<4;i++){const u=12+i*(W-24)/3;w.c(u,D/2,6,y+0.02,y+0.14,i%2?TC:0xe8e2d4,14);w.s(u,D/2,y+0.22,9+((i+k)%3)*2,[GR,0x6f9a5a,0x8fae6a,0x3d6636][(i+k)%4],1.2);}});
}
function baldaquin(F){const T=theme(),W=F.W,D=F.D,w=F.w,t=F.t,wd=0x6e5038;
  [[-2,0],[W-2,0],[-2,D-4],[W-2,D-4]].forEach(p=>w.b(p[0],p[1],p[0]+4,p[1]+4,0,2.15,wd));
  t.b(-2,0,W+2,4,2.12,2.17,wd);t.b(-2,D-4,W+2,D,2.12,2.17,wd);t.b(-2,0,2,D,2.12,2.17,wd);t.b(W-2,0,W+2,D,2.12,2.17,wd);
  const dr=TR(T.drape,0.7);[[2,2,30,4],[W-30,2,W-2,4],[2,D-4,24,D-2],[W-24,D-4,W-2,D-2]].forEach(p=>w.b(p[0],p[1],p[2],p[3],0.25,2.12,dr));
  [[2,6],[W-4,W-2]].forEach(p=>w.b(p[0],6,p[1],60,0.25,2.12,dr));
  for(let i=0;i<4;i++)t.s(20+i*(W-40)/3,D/2,2.15,6,GR,0.8);
}
function amenagement(){
  zonesBase();
  const T=theme();
  it('Canapé 200 cm (lin)',()=>sofa(A(530,429,200,95,'N'),{col:T.sofa,cush:T.sofaC,pil:T.pil}));
  rug(560,340,666,425,0xd8c7a8,0xc9b89a);
  it('Table basse en rotin',()=>{const f=AC(615,397,80,45,0);f.b(0,0,80,45,0.36,0.4,RAT);f.b(4,4,76,41,0,0.36,0xb08a55);vase(f,20,22,0.4,TC,0.15);});
  it('Serre d\'intérieur (vitrine éclairée)',()=>serre(A3(600,258.4,120,50,'S')));
  it('Rail à plantes devant la baie',()=>{const f=A(688,300,140,6,'W',furnTall);f.b(0,2,140,4,2.42,2.45,BK);[0,138].forEach(u=>f.b(u,2,u+2,4,2.45,H,BK));});
  [310,345,380,415].forEach((z,i)=>it('Plante suspendue '+(i+1),()=>hangPot(690,z,2.22,{leaf:[GR,0x6f9a5a,0x3d6636,0x8fae6a][i],pot:i%2?TC:0xe8e2d4})));
  it('Strelitzia',()=>plant(686,462,{r:14,h:1.9,k:'tall',seed:17,pot:TC}));
  it('Table ronde Ø 110 (chêne)',()=>rtable(510,380,55,{top:0xc8a06a,leg:BK}));
  [[510,330,DIR.S],[460,380,DIR.E],[560,380,DIR.W],[510,430,DIR.N]].forEach((c,i)=>it('Chaise rotin '+(i+1),()=>chair(c[0],c[1],c[2],{col:T.chair,leg:0x8a6a40,cush:T.cu})));
  it('Suspension en rotin',()=>pend(510,380,{r:30,col:RAT,y:1.75}));
  it('Étagère à plantes en gradins',()=>{const f=A(306.8,250,120,40,'E',furnWall);[0,0.45,0.9,1.35].forEach((y,k)=>{f.b(0,0+k*0,120,40-k*8,y,y+0.03,0xc8a06a);for(let i=0;i<4;i++){const u=12+i*32;f.c(u,14,7,y+0.03,y+0.18,i%2?TC:0xe8e2d4,14);f.s(u,14,y+0.27,10,[GR,0x6f9a5a,0x8fae6a][(i+k)%3],1.2);}});[0,117].forEach(u=>f.b(u,0,u+3,40,0,1.4,0xc8a06a));});
  it('Fauteuil en rotin',()=>{const f=AC(360,375,75,75,DIR.E);f.s(37,40,0.55,38,RAT,1.0).scale.set(1,1,0.9);f.b(10,15,65,70,0.3,0.45,T.cu);f.c(37,37,30,0,0.05,0x8a6a40);});
  it('Ficus',()=>plant(332,420,{r:14,h:1.6,k:'tree',seed:23,pot:0xe8e2d4}));
  kitchenMetod();
  it('Herbes aromatiques (bar)',()=>{const f=AC(390,262,20,40,0);[6,20,34].forEach(v=>{f.c(10,v,6,0.9,1.02,TC,12);f.s(10,v,1.08,7,0x6f9a5a,1);});});
  it('Dressing ouvert (existant)',()=>dressingF(A(440.4,552,200,50,'E',furnWall)));
  it('Armoire BRIMNES (existante)',()=>brimnesF(A(679.2,604,117,50,'W',furnWall)));
  it('Lit 160 × 200 (existant) à baldaquin',()=>{bed(A(522.4,556.8,160,208,'N'),{head:0xa49d99,hh:1.15,plaid:T.plaid});baldaquin(A3(522.4,556.8,160,208,'N'));});
  it('Tables de nuit',()=>{[[480,674],[636,674]].forEach(p=>{const f=A(p[0],p[1],40,35,'N');f.c(20,17,16,0,0.5,RAT,20);f.c(20,17,5,0.5,0.62,0xe8e2d4,14);f.s(20,17,0.7,9,GR,1);});});
  rug(500,560,655,600,0xd8c7a8,0x5e8a66);
  it('Bureau 180 × 80 sous la fenêtre (existant)',()=>deskF(A(575,21.8,180,80,'S')));
  it('Siège gaming (existant)',()=>gamer(636,100,DIR.N));
  it('BZ 140 × 90 (existant)',()=>bzF(A(523.4,80,140,90,'E'),{col:T.bz,cush:T.bzC}));
  it('Étagère au-dessus du BZ',()=>{const f=A(523.4,80,140,25,'E',furnTall);[1.35,1.7].forEach((y,i)=>{f.b(0,0,140,25,y,y+0.025,0xc8a06a);books(f,3,70,2,22,y+0.025,0.26,90+i);[90,110,130].forEach(u=>{f.c(u,12,6,y+0.025,y+0.15,TC,12);f.s(u,12,y+0.22,9,GR,1.3);});});});
  [600,660].forEach((x,i)=>it('Plante suspendue fenêtre '+(i+1),()=>hangPot(x+20,35,1.95,{})));
  it('Plante ch. 2',()=>plant(548,50,{r:12,h:1.2,k:'tall',seed:31,pot:0xe8e2d4}));
  it('Banc à chaussures',()=>{const f=A(163.8,472,76,35,'E');f.b(0,0,76,35,0.06,0.1,0xc8a06a);f.b(0,0,76,35,0.4,0.45,0xc8a06a);[0,72].forEach(u=>f.b(u,0,u+4,35,0,0.45,0xc8a06a));f.b(4,4,72,33,0.45,0.5,T.cu);});
  it('Mur végétal (mousse stabilisée)',()=>{const f=A(163.8,472,76,5,'E',furnTall);f.b(0,0,76,2,0.95,2.05,0x6b4a30);f.b(3,2,73,5,0.98,2.02,0x4f7a43);for(let i=0;i<10;i++)f.s(8+(i%5)*15,6,1.15+Math.floor(i/5)*0.45+(i%2)*0.1,6,i%3?0x5d8a4a:0x3d6636,1);});
  rug(205,425,280,550,0x5e8a66,0xd8c7a8);
  it('Suspension d\'entrée',()=>pend(232,470,{r:18,col:RAT,y:1.95}));
  it('~Caillebotis teck',()=>{const f=A(300,600,60,40,'S');for(let i=0;i<8;i++)f.b(1+i*7.4,0,6+i*7.4,40,0,0.025,0x9a6f45);});
  it('Fougère SDB',()=>{const f=AC(378,672,16,16,0);f.c(8,8,7,0.84,0.98,TC,16);f.s(8,8,1.06,11,0x4f7a43,0.8);});
  [[405,600],[418,630]].forEach((p,i)=>it('Plante suspendue SDB '+(i+1),()=>hangPot(p[0],p[1],1.95,{leaf:i?0x6f9a5a:GR})));
  it('Étagère WC',()=>{const f=A(168,686,80,18,'N',furnTall);f.b(0,0,80,18,1.45,1.48,0xc8a06a);[12,32,52].forEach(u=>{f.c(u,9,6,1.48,1.62,TC,14);f.s(u,9,1.7,9,GR,1.3);});});
  it('Carrés potagers',()=>{const f=A(795,250,330,35,'W');f.b(0,0,330,35,0,0.7,0x9a6f45);f.b(2,2,328,33,0.68,0.7,0x4a3a2a);for(let i=0;i<12;i++)f.s(14+i*27,17,0.78,12,[0x6f9a5a,0x5d8a4a,0xc9774f,0x8fae6a][i%4],0.9);});
  it('Treillis et grimpantes',()=>{const f=A(727.6,230,40,4,'E',furnTall);f.b(0,0,40,2,0,2.2,0x9a6f45);for(let i=0;i<8;i++)f.s(5+(i%3)*15,6,0.3+i*0.25,5,i%2?0x5d8a4a:0x3d6636,1.2);});
  it('Mini-serre de balcon',()=>{const f=A(745,17,100,50,'S',furnWall);f.b(0,0,100,50,0,0.05,BK);[[0,0],[97,0],[0,47],[97,47]].forEach(p=>f.b(p[0],p[1],p[0]+3,p[1]+3,0.05,1.6,BK));f.b(0,0,100,50,1.58,1.62,BK);f.b(3,0,97,0.6,0.05,1.58,TR(0xcfe6e0,0.3));f.b(3,49.4,97,50,0.05,1.58,TR(0xcfe6e0,0.3));[0.5,1.0].forEach(y=>{f.b(3,3,97,47,y,y+0.02,0x9a9a96);[15,40,65,85].forEach(u=>f.s(u,25,y+0.12,9,0x6f9a5a,1));});});
  it('Table bistrot',()=>rtable(790,630,30,{top:0x5e8a66,leg:BK,h:0.72}));
  it('Chaise bistrot 1',()=>chair(790,595,DIR.S,{col:0x5e8a66,leg:BK}));
  it('Chaise bistrot 2',()=>chair(790,665,DIR.N,{col:0x5e8a66,leg:BK}));
  it('Olivier en bac',()=>plant(750,680,{r:18,h:1.7,k:'tree',seed:37,pot:TC,leaf:0x7f9670,leaf2:0x6a8560}));
  pass('Entrée → porte ch. 1',306.8,439.2,490,493.6);
  pass('Entrée : porte → séjour',190,446,300,516);
  pass('Devant le bar (cuisine ↔ séjour)',431,240,488,312.8);
  pass('Porte ch. 2 → séjour',431,258.4,585,312.8);
  pass('Accès à la baie',658.8,300,713.2,428);
  pass('Cuisine (plan de travail ↔ METOD)',421.5,75,488,232,90);
  pass('Ch. 2 : porte → porte-fenêtre',585,125,708,220);
  pass('Ch. 1 : porte → porte-fenêtre',490,500.4,658.8,556);
  pass('Ch. 1 : ruelle gauche du lit',474.4,560,519,670,60);
  pass('Ch. 1 : ruelle droite du lit',634.4,610,679.2,670,60);
  pass('SDB : porte → lavabo et baignoire',285,590,387,662);
  pass('Balcon : ch. 2 → ch. 1',736,160,795,575);
  sols({sejour:'ciment',entree:'ciment',sdb:'cimentD',wc:'cimentD',ch1:'fume',ch2:'fume',balcon:'dalle'});
}
