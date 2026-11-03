Object.assign(tex,{
  octo:{t:mk(g=>{g.fillStyle='#2a2a2a';g.fillRect(0,0,256,256);for(let i=0;i<2;i++)for(let j=0;j<2;j++){const x=i*128,y=j*128,c=38;g.fillStyle=(i+j)%2?'#f1eee6':'#ece8de';g.beginPath();g.moveTo(x+c,y+2);g.lineTo(x+128-c,y+2);g.lineTo(x+126,y+c);g.lineTo(x+126,y+128-c);g.lineTo(x+128-c,y+126);g.lineTo(x+c,y+126);g.lineTo(x+2,y+128-c);g.lineTo(x+2,y+c);g.closePath();g.fill();}}),m:0.5},
  damier:{t:diamondTex(4,['#1f1f1f'],['#efede6'],'#9a9a96',0.8,0),m:1.13},
  noyer:{t:herringTex(['#5e3f2a','#6b4831','#543826','#73503a'],'#2e1e14',6),m:1.0},
  chene:{t:herringTex(['#d2b083','#c8a473','#dbbc90','#c19c6a'],'#8a6a45',8),m:1.0},
  gres:{t:mk(g=>grid(g,['#b9b7b1','#b2b0aa','#bebcb6','#b5b3ad'],'#8b8984',4)),m:1.2}
});
const paints={
  club:{n:'Club anglais',w:{ch2:[0x2f4a3a,'Salle à manger · vert anglais (4 murs)'],sej:[0xc98a6b,'Séjour mur côté ch. 2 · terre rosée'],ch1:[0xd9bba3,'Ch. 1 tête de lit · rose poudré']},f:{lib:0x2f4a3a,sofa:0x8a5a44,sofaC:0x9c6a52,arm:0xd9a441,cu:0x2f4a3a,chair:0x3a2a20,cush:0x8a5a44,out:0x2f4a3a}},
  bordeaux:{n:'Lie-de-vin',w:{ch2:[0x5b2a33,'Salle à manger · lie-de-vin (4 murs)'],sej:[0xd8c7a8,'Séjour mur côté ch. 2 · sable'],ch1:[0x8fa3b0,'Ch. 1 tête de lit · bleu-gris']},f:{lib:0x5b2a33,sofa:0x4a5a52,sofaC:0x56685f,arm:0xc98a6b,cu:0xd9a441,chair:0x2b2b2b,cush:0x5b2a33,out:0x5b2a33}}
};
const paintWalls={ch2:c=>['ch2N','ch2W','ch2S','ch2E'].forEach(k=>paintW(k,c)),sej:c=>paintW('sejN',c),ch1:c=>paintW('ch1S',c)};
const ROOMS=[['Grand salon-bibliothèque','28,2 m²',600,300],['Atelier','',390,330,1.3,1],['Bibliothèque à échelle','',585,465,2.6,1],['Salle à manger','9,0 m²',622,200],['Chambre 1','≈ 11,5 m²',577,530],['Entrée','5,1 m²',240,480],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,630],['Placard','',235,390,2.55],['Placard couloir','',368,545,2.55],['Balcon','15,1 m²',772,360]];
const WAL=0x5e3f2a,BRASS=0xc9a46b;
function libraryWall(F){
  const T=theme(),W=F.W,D=F.D,f=F.g,w=F.w,t=F.t,c=T.lib,n0=72,n1=200;
  f.b(0,0,W,D,0,0.08,0x2b2b2b);
  w.b(0,0,W,1.5,0,2.4,c);
  [0,n0-2,n1,W-2].forEach(u=>w.b(u,0,u+2,D,0.08,2.4,c));
  [[2,n0-2],[n1+2,W-2]].forEach(([a,b],i)=>{[0.08,0.5,0.9,1.3,1.7,2.08].forEach((y,k)=>{w.b(a,0,b,D,y,y+0.025,c);if(k<5)books(w,a+1,b-1,2,D-4,y+0.025,0.32,50+i*9+k);});});
  f.b(n0,0,n1,D,0.08,0.5,c);[0,1].forEach(k=>{const a=n0+1+k*(n1-n0)/2,b=n0+(k+1)*(n1-n0)/2-1;f.b(a,D,b,D+1,0.12,0.46,c);f.b((a+b)/2-8,D+1,(a+b)/2+8,D+1.8,0.4,0.42,BRASS);});
  f.b(n0,0,n1,D,0.5,0.53,c);
  t.b(n0,0,n1,D,2.08,2.11,c);books(t,n0+2,n1-2,2,D-4,2.11,0.25,77);
  t.b(n0+3,0,n1-3,5,1.0,1.72,0x151617);t.b(n0+4,5,n1-4,5.6,1.02,1.7,0x2a2f36);
  t.b(0,D,W,D+3,2.22,2.25,BRASS);
  const lu=W-70;slantV(t,D+38,0,D+3,2.24,lu,lu+3,0.03,WAL);slantV(t,D+38,0,D+3,2.24,lu+40,lu+43,0.03,WAL);
  for(let k=1;k<8;k++){const s=k/8;t.b(lu,D+38-35*s-1,lu+43,D+38-35*s+1,2.24*s-0.015,2.24*s+0.015,WAL);}
}
function buffet(F){const T=theme();cab(F,{h:0.8,col:WAL,front:0x6b4831,n:3,plinth:0.12,pc:WAL,top:WAL});}
function amenagement(){
  zonesBase();
  const T=theme();
  it('Bibliothèque murale à échelle coulissante (TV intégrée)',()=>libraryWall(A3(494,473.2,268,30,'N')));
  it('Canapé convertible 200 cm (velours)',()=>sofa(A(520,320,200,95,'S'),{col:T.sofa,cush:T.sofaC,pil:[T.arm,T.cu]}));
  rug(540,385,650,460,0xe0d3bd,0xd2c3a8);
  it('Table basse laiton et noyer',()=>{const f=A(555,400,110,55,'S');table(f,{h:0.4,top:WAL,leg:BRASS,lw:2.5,t:0.04});f.b(20,15,45,40,0.4,0.45,0xe8e2d4);vase(f,80,27,0.4,0x2f4a3a,0.2);});
  it('Fauteuil de lecture',()=>sofa(AC(683,290,75,75,DIR.W),{arm:14,back:18,col:T.arm,cush:T.arm,top:0.9}));
  it('Lampadaire laiton',()=>lampF(640,275,{base:BRASS,h:1.5}));
  it('Grande plante (strelitzia)',()=>plant(690,455,{r:16,h:1.8,k:'tall',seed:11,pot:0x2b2b2b}));
  it('Atelier : bureau 180 × 80 (existant)',()=>deskF(A(330,340,180,80,'S')));
  it('Atelier : siège gaming (existant)',()=>gamer(391,418,DIR.N));
  it('Atelier : lampe d\'architecte',()=>{const f=AC(441,352,14,14,0);f.c(7,7,6,0.75,0.77,0x2b2b2b);slant(f,7,0.77,0,1.2,6,8,0.015,0x2b2b2b);f.c(0,7,6,1.12,1.24,0x2b2b2b);});
  it('Atelier : panneau perforé',()=>{const f=A(306.8,280,58,3,'E',furnTall);f.b(0,0,58,2,1.1,1.9,0xd8c7a8);[[8,1.3,0xb4522f],[22,1.5,0x2b2b2b],[40,1.25,0x3b82c4],[30,1.7,0xd9a441]].forEach(p=>f.b(p[0],2,p[0]+8,6,p[1],p[1]+0.18,p[2]));});
  it('Plante de l\'atelier',()=>plant(318,330,{r:10,h:1.0,seed:5,pot:0xe8e2d4}));
  it('Suspension de l\'atelier',()=>pend(391,367,{r:16,col:0x2b2b2b,y:1.75}));
  kitchenMetod();
  it('Bibliothèque de la salle à manger',()=>shelf(A(523.4,21.8,250,30,'E',furnWall),{h:2.3,n:6,col:T.lib,cols:4,seed:3,back:T.lib}));
  it('Buffet en noyer',()=>{const f=A(575,21.8,180,35,'S');buffet(f);lampT(f,25,17,0.92);vase(f,140,17,0.92,0xe8e2d4,0.25);});
  rrug(615,112,100,0x8a5a44,0xb9926a);
  it('Table ronde Ø 120 (noyer)',()=>rtable(615,112,60,{top:WAL,leg:WAL}));
  chairsAround(615,112,50,6,Math.PI/6,{col:T.chair,leg:0x2b2b2b,cush:T.cush,tag:'salle à manger'});
  it('Lustre de la salle à manger',()=>pend(615,112,{r:30,col:BRASS,y:1.7}));
  it('Miroir doré',()=>{const f=A(710.5,60,70,4,'W',furnTall);f.b(0,0,70,2,1.1,1.9,BRASS);f.b(4,2,66,2.5,1.15,1.85,0xbfd3dc);});
  it('Dressing ouvert (existant)',()=>dressingF(A(440.4,552,200,50,'E',furnWall)));
  it('Armoire BRIMNES (existante)',()=>brimnesF(A(679.2,604,117,50,'W',furnWall)));
  it('Lit 160 × 200 (existant)',()=>bed(A(522.4,556.8,160,208,'N'),{head:0xa49d99,hh:1.15,plaid:T.cu}));
  it('Table de nuit gauche',()=>{const f=A(480,674,40,35,'N');cab(f,{h:0.5,col:WAL,front:0x6b4831,n:1,drawers:2,plinth:0});lampT(f,20,17,0.5,{shade:GL(0xf3ead4)});});
  it('Table de nuit droite',()=>{const f=A(636,674,40,35,'N');cab(f,{h:0.5,col:WAL,front:0x6b4831,n:1,drawers:2,plinth:0});lampT(f,20,17,0.5,{shade:GL(0xf3ead4)});});
  rug(500,560,655,600,0xd8c7a8,0xc9b89a);
  it('Console d\'entrée',()=>{const f=A(163.8,474,70,25,'E');table(f,{h:0.85,top:WAL,leg:BRASS,lw:2,ins:2});vase(f,50,12,0.85,0x2f4a3a,0.25);});
  it('Miroir rond d\'entrée',()=>{const f=A(163.8,480,60,3,'E',furnTall);f.c(30,1.5,30,1.1,1.1,BRASS,32).rotation.x=Math.PI/2;});
  rug(205,425,280,550,0x2f4a3a,0x8a5a44);
  it('Suspension d\'entrée',()=>pend(232,470,{r:16,col:BRASS,y:1.95}));
  it('Colonne de salle de bains',()=>{const f=A(298,568.4,40,30,'S',furnWall);cab(f,{h:1.6,col:0xf4f2ec,front:0xf4f2ec,n:1,plinth:0.1,pc:0xd8d8d4,hc:BRASS});});
  rug(300,600,360,640,0xefede6,0x2f4a3a);
  it('Plante sur le lavabo',()=>{const f=AC(378,672,16,16,0);f.c(8,8,7,0.84,0.98,0x2b2b2b,16);f.s(8,8,1.06,10,0x4f7a43,0.8);});
  it('Cadre WC',()=>{const f=A(163.8,600,40,3,'E',furnTall);frameArt(f,0,40,1.3,1.8,0x2f4a3a,0xc98a6b);});
  it('Étagère WC',()=>{const f=A(168,686,80,18,'N',furnTall);f.b(0,0,80,18,1.45,1.48,WAL);f.c(20,9,6,1.48,1.62,0xe8e2d4,14);f.s(20,9,1.7,9,0x4f7a43,1);books(f,40,76,2,15,1.48,0.2,3);});
  it('Table bistrot de balcon',()=>{rtable(788,100,35,{top:0x2f4a3a,leg:0x2b2b2b,h:0.72});});
  it('Chaise bistrot 1',()=>chair(788,62,DIR.S,{col:0x2f4a3a,leg:0x2b2b2b}));
  it('Chaise bistrot 2',()=>chair(788,138,DIR.N,{col:0x2f4a3a,leg:0x2b2b2b}));
  it('Plante du bistrot',()=>plant(745,40,{r:16,h:1.2,seed:7,pot:0xb85b36}));
  it('Jardinières',()=>{const f=A(800,240,340,28,'W');f.b(0,0,340,28,0,0.45,0x3a3d40);for(let i=0;i<13;i++)f.s(13+i*26,14,0.55,13,i%3?0x5d8a4a:0xc98a6b,0.9);});
  it('Bain de soleil 1',()=>{const f=A(735,586,170,60,'E');f.b(4,0,166,60,0,0.3,0x2b2b2b);f.b(4,4,166,56,0.3,0.36,T.out);slant(f,120,0.36,166,0.8,4,56,0.06,T.out);});
  it('Bain de soleil 2',()=>{const f=A(778,586,170,60,'E');f.b(4,0,166,60,0,0.3,0x2b2b2b);f.b(4,4,166,56,0.3,0.36,0xe8e2d4);slant(f,120,0.36,166,0.8,4,56,0.06,0xe8e2d4);});
  pass('Entrée → porte ch. 1',306.8,439.2,445,493.6);
  pass('Entrée : porte → séjour',181,446,296.6,516);
  pass('Devant le bar (cuisine ↔ séjour)',431,240,488,338);
  pass('Porte ch. 2 → séjour',445,258.4,585,318);
  pass('Accès à la baie',658.8,320,713.2,440);
  pass('Cuisine (plan de travail ↔ METOD)',421.5,75,488,232,90);
  pass('Séjour : accès à la bibliothèque',494,384.6,555,440);
  pass('Salle à manger : porte → porte-fenêtre',585,186,708,251.6);
  pass('Ch. 1 : porte → porte-fenêtre',490,500.4,658.8,556.8);
  pass('Ch. 1 : ruelle gauche du lit',474.4,560,522.4,670,60);
  pass('Ch. 1 : ruelle droite du lit',631.2,610,679.2,670,60);
  pass('SDB : porte → lavabo et baignoire',285,590,387,662);
  pass('Balcon : ch. 2 → ch. 1',726.8,160,800,575);
  sols({sejour:'octo',entree:'octo',sdb:'damier',wc:'damier',ch1:'chene',ch2:'noyer',balcon:'gres'});
}
