Object.assign(tex,{
  hexa:{t:hexTex(['#b85b36','#c4683f','#a9502f','#cf7448','#b9603a','#c56a43'],'#dccbb2',3),m:1.0,mz:148/256},
  zellige:{t:sqTex(8,['#245e4c','#2f6b55','#1f5444','#38765e','#2a634f'],'#dfe3dc',3,4,true),m:0.8},
  oakwide:{t:plankTex(['#c99a62','#bf8f58','#d1a46c','#c4955d'],'#7a5634',5,11),m:1.1},
  teck:{t:plankTex(['#9a6f45','#a77a4e','#8f673f'],'#4c3826',8,13,'rgba(60,40,20,0.25)'),m:1.0}
});
const paints={
  bois:{n:'Bois & ocre',w:{sej:[0xd9b26a,'Séjour mur TV · ocre doux'],ch1:[0xc98a6b,'Ch. 1 mur de la porte · terre rosée'],ch2:[0x9db8aa,'Ch. 2 mur du bureau · sauge']},f:{clos:0x2f4f46,cu:0xc47a5e,cu2:0xe6d8bf,bz:0xd8c8ae,bzC:0xc47a5e,arm:0x7f9a7a,out:0xc47a5e}},
  nuit:{n:'Nuit bretonne',w:{sej:[0x2f4a6b,'Séjour mur TV · bleu de Prusse'],ch1:[0xd8c7a8,'Ch. 1 mur de la porte · lin'],ch2:[0x6f7d5a,'Ch. 2 mur du bureau · olive']},f:{clos:0x1f3448,cu:0x2f4a6b,cu2:0xd9a441,bz:0x6b6d70,bzC:0xd9a441,arm:0xd9a441,out:0x2f4a6b}}
};
const paintWalls={sej:c=>paintW('sejN',c),ch1:c=>paintW('ch1N',c),ch2:c=>paintW('ch2W',c)};
const ROOMS=[['Séjour / cuisine','28,2 m²',560,330],['Coin repas-cabane','',335,355,1.6,1],['Alcôve-canapé','',579,466,2.35,1],['Chambre 1 · lit clos','≈ 11,5 m²',640,560],['Lit clos','',500,628,2.4,1],['Chambre 2 · bureau-cabane','9,0 m²',620,190],['Entrée','5,1 m²',240,480],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,630],['Placard','',235,390,2.55],['Placard couloir','',368,545,2.55],['Balcon · tonnelle','15,1 m²',772,640]];
const OAK=0xc8a06a,OAKD=0xa77f4d;
function litClos(F){
  const T=theme(),W=F.W,D=F.D,wd=OAK,in_=T.clos,f=F.g,w=F.w,t=F.t;
  w.b(0,0,W,2,0,2.2,in_);
  w.b(0,0,3,D,0,2.2,wd);w.b(W-3,0,W,D,0,2.2,wd);
  t.b(0,0,W,D,2.2,2.25,wd);
  f.b(3,2,W-3,D-6,0,0.4,OAKD);
  f.b(3,D-6,W-3,D,0,0.5,wd);
  for(let i=0;i<3;i++){const a=8+i*(W-16)/3+1,b=8+(i+1)*(W-16)/3-1;f.b(a,D,b,D+1,0.06,0.44,OAKD);f.b((a+b)/2-7,D+1,(a+b)/2+7,D+1.8,0.36,0.38,0x3a3a3a);}
  w.b(0,D-6,12,D,0.5,2.2,wd);w.b(W-12,D-6,W,D,0.5,2.2,wd);t.b(0,D-6,W,D,1.85,2.2,wd);
  w.b(12,D-5,64,D-2,0.5,1.85,wd);
  w.b(132,D,196,D+2,0.52,1.84,OAKD);w.b(126,D+2,190,D+4,0.52,1.84,wd);
  f.b(4,4,W-4,D-8,0.4,0.62,0xf4f2ec);
  f.b(4,4,W-48,D-7,0.62,0.66,T.cu2);
  f.b(W-44,10,W-8,D/2-4,0.62,0.74,0xffffff);f.b(W-44,D/2+2,W-8,D-14,0.62,0.74,0xffffff);
  f.b(30,4,90,D-8,0.66,0.69,T.cu);
  t.b(6,2,W-6,16,1.3,1.32,wd);books(t,10,W/2,3,14,1.32,0.24,4);
  [W-30,40].forEach(u=>{t.b(u-6,2,u+6,5,1.05,1.15,0x3a3a3a);t.b(u-5,5,u+5,6,1.06,1.14,GL(0xffe9b8));});
  t.b(8,2,W-8,3,2.17,2.19,GL(0xfff0d0));
}
function alcove(F){
  const T=theme(),W=F.W,D=F.D,f=F.g,w=F.w,t=F.t;
  w.b(0,0,W,1.5,0,2.2,0xead9bd);
  w.b(0,0,6,D,0,2.2,OAK);w.b(W-6,0,W,D,0,2.2,OAK);
  t.b(0,0,W,D,2.12,2.2,OAK);t.b(6,D-8,W-6,D,1.95,2.12,OAK);
  f.b(6,1.5,W-6,D-4,0,0.42,OAKD);
  for(let i=0;i<3;i++){const a=8+i*(W-16)/3+1,b=8+(i+1)*(W-16)/3-1;f.b(a,D-4,b,D-3,0.06,0.38,OAK);f.b((a+b)/2-8,D-3,(a+b)/2+8,D-2.2,0.3,0.32,0x3a3a3a);}
  f.b(6,1.5,W-6,D-4,0.42,0.52,T.cu2);
  for(let i=0;i<4;i++){const a=8+i*(W-16)/4+1,b=8+(i+1)*(W-16)/4-1;f.b(a,2,b,18,0.52,0.98,i%2?T.cu:T.cu2);}
  t.b(6,1.5,W-6,24,1.55,1.57,OAK);books(t,10,W-10,2,20,1.57,0.3,8);
  [[6,60],[W-60,W-6]].forEach(p=>w.b(p[0],1.5,p[1],22,1.15,1.17,OAK));
  t.b(10,1.5,W-10,6,2.08,2.1,GL(0xfff0d0));
  [40,W-40].forEach(u=>{w.b(u-5,1.5,u+5,6,1.25,1.35,0x2b2b2b);w.b(u-4,6,u+4,7,1.26,1.34,GL(0xffe9b8));});
}
function cabaneBooth(F){
  const T=theme(),W=F.W,D=F.D,f=F.g,w=F.w,t=F.t;
  f.b(0,0,W,4,0,0.9,OAK);
  f.b(2,4,W-2,D,0,0.4,OAKD);
  f.b(2,4,W-2,D-2,0.4,0.48,T.cu);
  for(let i=0;i<3;i++)f.b(4+i*(W-8)/3,5,4+(i+1)*(W-8)/3-2,16,0.48,0.88,i%2?T.cu2:T.cu);
  [[0,D-4],[W-4,D-4],[0,0],[W-4,0]].forEach(p=>w.b(p[0],p[1],p[0]+4,p[1]+4,0.9,1.95,OAK));
  [[0,D-4],[W-4,D-4]].forEach(p=>f.b(p[0],p[1],p[0]+4,p[1]+4,0,0.9,OAK));
  slant(t,0,1.95,W/2,2.36,0,4,0.06,OAK);slant(t,W/2,2.36,W,1.95,0,4,0.06,OAK);
  slant(t,0,1.95,W/2,2.36,D-4,D,0.06,OAK);slant(t,W/2,2.36,W,1.95,D-4,D,0.06,OAK);
  t.b(W/2-2,0,W/2+2,D,2.33,2.4,OAK);
  for(let k=1;k<4;k++){const y=1.95+k*0.1,du=k*0.1/0.41*W/2;t.b(du-1,4,du+1,D-4,y-0.03,y,OAKD);t.b(W-du-1,4,W-du+1,D-4,y-0.03,y,OAKD);}
}
function benchHouse(f){
  const T=theme(),W=f.W,D=f.D;
  f.b(0,0,W,D,0.06,0.1,OAK);f.b(0,0,W,D,0.36,0.44,OAK);[0,W-4].forEach(u=>f.b(u,0,u+4,D,0,0.44,OAK));
  f.b(4,4,W-4,D-2,0.44,0.5,T.cu);
  [[8,0x3a3a3a],[30,0x8b6a4a],[52,0xe8e2d4]].forEach(s=>{f.b(s[0],8,s[0]+10,30,0.1,0.18,s[1]);f.b(s[0]+11,8,s[0]+20,30,0.1,0.18,s[1]);});
}
function houseFrame(f){
  const W=f.W;
  f.b(0,0,3,4,0.5,1.85,OAK);f.b(W-3,0,W,4,0.5,1.85,OAK);
  slant(f,0,1.85,W/2,2.2,0,4,0.04,OAK);slant(f,W/2,2.2,W,1.85,0,4,0.04,OAK);
  f.b(3,0,W-3,3,1.45,1.53,OAK);
  [12,26,40,54,68].forEach((u,i)=>{f.b(u-1,3,u+1,9,1.47,1.51,0x3a3a3a);if(i%2===0)f.b(u-7,4,u+7,10,0.85,1.46,[0x2f4a6b,0xc47a5e,0x6b6d70][i/2]);});
}
function ladder(f){
  const W=f.W;[[2,6],[W-6,W-2]].forEach(p=>slant(f,0,0,1,1.6,p[0],p[1],0.04,OAK));
  f.b(0,2,W,6,0,0.02,OAK);
  for(let k=1;k<5;k++)f.b(0,k*2.2+1,W,k*2.2+3,k*0.32,k*0.32+0.03,OAK);
  f.b(4,5,W-4,9,0.6,0.95,0xe6e1d8);f.b(4,7,W-4,11,1.0,1.25,0x9db8aa);
}
function amenagement(){
  zonesBase();
  const T=theme();
  it('Alcôve-canapé sur mesure',()=>alcove(A3(494,439.2,250,80,'N')));
  rrug(579,380,100,0xd8c7a8,T.cu);
  it('Table basse ronde',()=>{const f=AC(579,395,70,70,0);f.c(35,35,35,0.36,0.4,OAK,40);f.c(35,35,30,0,0.36,OAKD,30);vase(f,30,30,0.4,0xe8e2d4);});
  it('Pouf ouest',()=>{const f=AC(515,400,44,44,0);f.c(22,22,22,0,0.42,T.cu,24);});
  it('Pouf est',()=>{const f=AC(643,400,44,44,0);f.c(22,22,22,0,0.42,0xe6d8bf,24);});
  it('Buffet TV chêne',()=>{const f=A(600,258.4,160,40,'S');cab(f,{h:0.55,col:OAK,front:OAKD,n:3,plinth:0.1,pc:OAKD});vase(f,140,20,0.55,0x2f4a6b,0.3);});
  it('TV 55"',()=>tvF(A(612,258.4,123,5,'S',furnTall),{y0:1.05}));
  it('Fauteuil suspendu (cocon rotin)',()=>{const f=AC(672,330,90,90,0);f.s(45,45,0.85,44,0xc9a46b,1.15).scale.set(1,1.15,0.9);f.s(45,52,0.8,36,T.cu2,1.0);f.c(45,45,1.2,1.35,1.6,0x8a6a40,6);});
  it('Suspente du cocon',()=>{const f=AC(672,330,10,10,0,furnTall);f.c(5,5,0.8,1.6,H,0x8a6a40,6);});
  it('Olivier en pot',()=>plant(681,461,{r:14,h:1.6,k:'tree',pot:0xb85b36,leaf:0x7f9670,leaf2:0x6a8560}));
  it('Banquette-cabane',()=>cabaneBooth(A3(306.8,300,160,50,'E')));
  it('Table du coin repas',()=>{const f=A(346,338,100,75,'E');table(f,{top:OAK,leg:OAKD,h:0.74});vase(f,50,37,0.74,0xe8e2d4,0.18);});
  it('Chaise repas 1',()=>chair(415,355,DIR.W,{col:OAKD,leg:0x5a4330,cush:T.cu}));
  it('Chaise repas 2',()=>chair(415,390,DIR.W,{col:OAKD,leg:0x5a4330,cush:T.cu}));
  it('Suspension coin repas',()=>pend(371,372,{r:20,col:0xe8dcc4,y:1.6}));
  it('Suspension alcôve',()=>pend(579,380,{r:28,col:0xc9a46b,y:1.9}));
  kitchenMetod();
  it('Lit clos chêne (couchage 160 × 200)',()=>litClos(A3(440.4,556.8,208,176,'E')));
  it('Dressing ouvert (existant)',()=>dressingF(A(563.6,664.2,200,50,'N',furnWall)));
  rug(575,560,660,650,0xe6d8bf,0xd8c7a8);
  it('Fauteuil de lecture',()=>{const f=AC(625,625,80,80,DIR.N);sofa(f,{arm:14,back:18,col:T.arm,cush:T.arm,top:0.86});});
  it('Lampadaire ch. 1',()=>lampF(670,640,{h:1.45}));
  it('Guéridon ch. 1',()=>{const f=AC(585,640,40,40,0);f.c(20,20,20,0.5,0.53,OAK,24);f.c(20,20,2,0,0.5,0x3a3a3a);});
  it('Bureau 180 × 80 (existant)',()=>deskF(A(523.4,30,180,80,'E')));
  it('Niche du bureau-cabane',()=>{const F=A3(523.4,24,197,30,'E'),w=F.w,t=F.t;w.b(0,0,3,30,0,2.3,OAK);w.b(194,0,197,30,0,2.3,OAK);[1.25,1.6,1.95].forEach((y,i)=>{t.b(3,0,194,28,y,y+0.025,OAK);books(t,8,180,2,24,y+0.025,0.28,20+i);});slant(t,0,2.05,98.5,2.42,0,30,0.05,OAK);slant(t,98.5,2.42,197,2.05,0,30,0.05,OAK);t.b(10,0,187,2,1.22,1.24,GL(0xfff0d0));});
  it('Siège gaming (existant)',()=>gamer(600,91,DIR.W));
  it('Canapé BZ 140 × 90 (existant)',()=>bzF(A(637,56,140,90,'W'),{col:T.bz,cush:T.bzC}));
  it('Bibliothèque basse sous fenêtre',()=>shelf(A(600,21.8,140,30,'S'),{h:0.6,n:2,col:OAK,seed:5}));
  rug(590,120,690,180,0xb85b36,0xc4683f);
  it('Plante ch. 2',()=>plant(545,175,{r:14,h:1.1,k:'tall',seed:2}));
  it('Banc-cabane d\'entrée',()=>benchHouse(A(163.8,472,76,38,'E')));
  it('Patères et toit de la cabane',()=>houseFrame(A(163.8,472,76,10,'E',furnTall)));
  rug(205,420,275,555,0xa9502f,0xd8c7a8);
  it('Lanterne d\'entrée',()=>pend(232,470,{r:18,col:0xf3ead4,y:1.95}));
  it('Échelle porte-serviettes',()=>ladder(A(300,568.4,50,14,'S')));
  rug(300,600,360,640,0xe6e1d8);
  it('Fougère sur le lavabo',()=>{const f=AC(378,672,16,16,0);f.c(8,8,7,0.84,0.98,0xb85b36,16);f.s(8,8,1.06,10,0x4f7a43,0.8);});
  it('Étagère WC',()=>{const f=A(168,686,80,18,'N',furnTall);f.b(0,0,80,18,1.45,1.48,OAK);f.c(20,9,6,1.48,1.62,0xb85b36,14);f.s(20,9,1.7,9,0x4f7a43,1);books(f,40,76,2,15,1.48,0.2,3);});
  it('Rangement de balcon',()=>{const f=A(744,17,110,55,'S',furnWall);cab(f,{h:1.6,col:0x8f673f,front:0xa77a4e,n:2,plinth:0.06});});
  it('Jardinière longue',()=>{const f=A(800,290,230,28,'W');f.b(0,0,230,28,0,0.45,0x8f673f);for(let i=0;i<9;i++)f.s(12+i*25.5,14,0.55,13,i%2?0x5d8a4a:0x7a9a52,0.9);});
  it('Tonnelle (poteaux et lattes)',()=>{const f=A(728,585,190,119,'E',furnTall);[[0,0],[182,0],[0,111],[182,111]].forEach(p=>f.b(p[0],p[1],p[0]+8,p[1]+8,0,2.28,OAKD));f.b(0,0,190,8,2.2,2.28,OAKD);f.b(0,111,190,119,2.2,2.28,OAKD);for(let k=0;k<9;k++)f.b(8+k*21,0,12+k*21,119,2.28,2.33,OAK);for(let k=0;k<8;k++)f.s(12+k*24,60,2.18,2.5,GL(0xffe9a8));});
  it('Banquette-coffre de balcon',()=>{const f=A(726.8,592,150,45,'E');f.b(0,0,150,45,0,0.42,0x8f673f);f.b(2,4,148,44,0.42,0.48,T.out);f.b(2,1,148,10,0.48,0.82,T.out);});
  it('Table étroite de balcon',()=>table(A(762,612,110,47,'E'),{top:0xa77a4e,leg:0x3a3a3a,h:0.72}));
  it('Tabouret balcon 1',()=>stool(808,632,{h:0.62,col:0xa77a4e}));
  it('Tabouret balcon 2',()=>stool(808,668,{h:0.62,col:0xa77a4e}));
  pass('Entrée → porte ch. 1',306.8,415,445,493.6);
  pass('Entrée : porte → séjour',190,446,296.6,516);
  pass('Devant le bar (cuisine ↔ séjour)',431,240,488,338);
  pass('Porte ch. 2 → séjour',525,258.4,600,330);
  pass('Accès à la baie',658.8,365,713.2,438);
  pass('Cuisine (plan de travail ↔ METOD)',421.5,75,488,232,90);
  pass('Ch. 1 : porte → lit clos',447,500.4,563,556.8);
  pass('Ch. 1 : vers la porte-fenêtre',563,515,713.2,575);
  pass('Ch. 2 : porte → porte-fenêtre',585,153,708,220);
  pass('SDB : porte → lavabo et baignoire',285,590,387,662);
  pass('Balcon : ch. 2 → ch. 1',726.8,160,800,575);
  sols({sejour:'hexa',entree:'hexa',sdb:'zellige',wc:'zellige',ch1:'oakwide',ch2:'oakwide',balcon:'teck'});
}
