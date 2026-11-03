function terrazzo(base,cols,joint,seed){return mk(g=>{g.fillStyle=base;g.fillRect(0,0,256,256);const r=rnd(seed);for(let i=0;i<650;i++){g.fillStyle=cols[Math.floor(r()*cols.length)];const s=1.2+r()*3.2;g.beginPath();g.ellipse(r()*256,r()*256,s,s*(0.5+r()*0.5),r()*3,0,6.283);g.fill();}g.strokeStyle=joint;g.lineWidth=2;for(let k=0;k<=2;k++){g.beginPath();g.moveTo(k*128,0);g.lineTo(k*128,256);g.moveTo(0,k*128);g.lineTo(256,k*128);g.stroke();}});}
Object.assign(tex,{
  terraC:{t:terrazzo('#ece6da',['#c9a37a','#9aa29b','#d8c3a6','#7f8a86','#b8786a','#f7f3ea'],'#cfc6b6',4),m:1.2},
  terraD:{t:terrazzo('#3e4043',['#8d9296','#b9b3a8','#626669','#c97a5a','#1f2022'],'#2a2b2d',6),m:1.2},
  moquette:{t:noiseTex('#2f4a3a',['#365442','#29412f','#3b5b47','#263c2c'],2600,3,9),m:0.8},
  liege:{t:noiseTex('#b98d5c',['#a77b4b','#c79d6c','#94693e','#d1ab7d','#8a5f37'],3200,3.2,12),m:0.9},
  compo:{t:plankTex(['#7d7f80','#86888a','#737577'],'#4a4c4e',8,15,'rgba(40,40,40,0.18)'),m:1.0}
});
const paints={
  petrole:{n:'Tanière bleu pétrole',w:{ch2:[0x1f4550,'Tanière · bleu pétrole (4 murs)'],sej:[0xd9a441,'Séjour mur des disques · ocre'],ch1:[0xc47a5e,'Ch. 1 tête de lit · terracotta'],ent:[0xe8dcc4,'Entrée · lin']},f:{bz:0xd9a441,bzC:0xc47a5e,arm:0xc47a5e,arm2:0x2f4a3a,cu:0xd9a441,chair:0x2b2b2b,out:0xc47a5e,plaid:0x1f4550}},
  aubergine:{n:'Tanière aubergine',w:{ch2:[0x3f2a3a,'Tanière · aubergine (4 murs)'],sej:[0x9db8aa,'Séjour mur des disques · sauge'],ch1:[0xd8c7a8,'Ch. 1 tête de lit · lin'],ent:[0x9db8aa,'Entrée · sauge']},f:{bz:0xb9926a,bzC:0x9db8aa,arm:0x9db8aa,arm2:0xd9a441,cu:0x9db8aa,chair:0x8b6a4a,out:0x9db8aa,plaid:0x3f2a3a}}
};
const paintWalls={ch2:c=>['ch2N','ch2W','ch2S','ch2E'].forEach(k=>paintW(k,c)),sej:c=>paintW('sejN',c),ch1:c=>paintW('ch1S',c),ent:c=>{paintW('entW',c);paintW('entS',c);}};
const ROOMS=[['Salle commune','28,2 m²',560,300],['Table de 7','',511,366,0.9,1],['Coin lecture','',625,377,1.2,1],['La tanière','9,0 m²',640,190],['Chambre 1','≈ 11,5 m²',577,530],['Entrée','5,1 m²',240,480],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,630],['Placard','',235,390,2.55],['Placard couloir','',368,545,2.55],['Balcon','15,1 m²',772,360]];
const ASH=0xd9c4a0,BLK=0x2b2b2b;
function amenagement(){
  zonesBase();
  const T=theme();
  it('Table de ferme 180 × 85 (frêne)',()=>table(A(450,337.5,180,85,'S'),{top:ASH,leg:0xb59c76,lw:7,ins:6,t:0.045}));
  [475,511,547].forEach((x,i)=>{it('Chaise nord '+(i+1),()=>chair(x,328.6,DIR.S,{col:T.chair,leg:BLK}));it('Chaise sud '+(i+1),()=>chair(x,404.2,DIR.N,{col:T.chair,leg:BLK}));});
  it('Chaise ouest',()=>chair(434,366.4,DIR.E,{col:T.chair,leg:BLK}));
  it('Suspension linéaire',()=>pend(511,366.4,{k:'long',l:150,y:1.7,col:BLK}));
  it('Vases de table',()=>{const f=AC(511,366.4,30,10,0);vase(f,5,5,0.75,0xe8e2d4,0.25);vase(f,20,5,0.75,0xc47a5e,0.18);});
  it('Fauteuil lecture nord',()=>sofa(AC(625,330,75,75,DIR.E),{arm:13,back:18,col:T.arm,cush:T.arm,top:0.92}));
  it('Fauteuil lecture sud',()=>sofa(AC(625,425,75,75,DIR.E),{arm:13,back:18,col:T.arm2,cush:T.arm2,top:0.92}));
  it('Guéridon',()=>{const f=AC(628,377.5,40,40,0);f.c(20,20,20,0.5,0.53,ASH,24);f.c(20,20,2,0,0.5,BLK);vase(f,20,20,0.53,0xe8e2d4,0.2);});
  it('Lampadaire de lecture',()=>lampF(600,377.5,{h:1.45}));
  rug(590,300,665,455,0xd8c7a8,0xc9b89a);
  it('Meuble à disques + platine',()=>{const f=A(600,258.4,110,42,'S');cab(f,{h:0.62,col:ASH,front:0xc9b089,n:2,plinth:0.1,pc:BLK});f.b(30,8,75,36,0.62,0.7,BLK);f.c(52,22,15,0.7,0.71,0x151515,28);[[4,0.62],[96,0.62]].forEach(p=>f.b(p[0],6,p[0]+10,22,p[1],p[1]+0.3,0x3a3a3a));});
  it('Galerie basse (livres et disques)',()=>{const f=A(494,476.6,260,25,'N');shelf(f,{h:0.9,n:2,col:ASH,cols:4,seed:21});});
  it('Cadres de la galerie',()=>{const f=A(494,490.6,260,3,'N',furnTall);frameArt(f,20,80,1.2,1.75,0xd9a441,0x1f4550);frameArt(f,95,135,1.3,1.6,0xc47a5e);frameArt(f,150,230,1.15,1.8,0xe8dcc4,0x2f4a3a);});
  it('Grande bibliothèque',()=>shelf(A(306.8,245,150,35,'E',furnWall),{h:2.2,n:6,col:ASH,cols:2,seed:33}));
  it('Ficus lyrata',()=>plant(332,385,{r:16,h:1.7,k:'tree',seed:9,pot:0xe8e2d4}));
  kitchenMetod();
  it('Bureau 180 × 80 (existant)',()=>deskF(A(523.4,70,180,80,'E')));
  it('Siège gaming (existant)',()=>gamer(600,131,DIR.W));
  it('Étagères jeux et films',()=>shelf(A(523.4,21.8,65,30,'E',furnWall),{h:2.3,n:6,col:BLK,cols:1,seed:41}));
  it('Étagères au-dessus du bureau',()=>{const f=A(523.4,70,180,26,'E',furnTall);[1.3,1.65,2.0].forEach((y,i)=>{f.b(0,0,180,26,y,y+0.025,BLK);books(f,4,176,2,22,y+0.025,0.28,60+i);});});
  it('BZ 140 × 90 (existant, couchage d\'amis)',()=>bzF(A(595,21.8,140,90,'S'),{col:T.bz,cush:T.bzC}));
  it('Pouf-coffre',()=>{const f=A(625,90,80,40,'S');f.b(0,0,80,40,0,0.42,T.cu);f.b(2,2,78,38,0.42,0.44,0xe8e2d4);});
  it('Meuble TV',()=>{const f=A(600,224.4,160,40,'N');cab(f,{h:0.45,col:BLK,front:0x3a3a3a,n:3,plinth:0.05});f.b(10,30,150,32,0.45,0.47,GL(0x6aa8ff));});
  it('TV 65" murale',()=>tvF(A(605,248.2,145,5,'N',furnTall),{y0:0.95,h:0.83}));
  rug(600,95,700,215,0x8a5a44,0xb9926a);
  it('Applique néon',()=>{const f=A(523.4,30,40,3,'E',furnTall);f.b(5,0,35,2,2.15,2.2,GL(0xffb36b));});
  it('Dressing ouvert (existant)',()=>dressingF(A(440.4,552,200,50,'E',furnWall)));
  it('Armoire BRIMNES (existante)',()=>brimnesF(A(679.2,604,117,50,'W',furnWall)));
  it('Lit 160 × 200 (existant)',()=>bed(A(522.4,556.8,160,208,'N'),{head:0xa49d99,hh:1.15,plaid:T.plaid}));
  it('Panneau textile tête de lit',()=>{const f=A(500,694.2,220,4,'N',furnTall);f.b(0,0,220,4,1.2,1.9,T.cu);[30,190].forEach(u=>{f.b(u-1,4,u+1,20,1.55,1.95,BLK);f.c(u,20,9,1.38,1.55,GL(0xf3ead4),18);});});
  it('Table de nuit gauche',()=>{const f=A(480,674,40,35,'N');f.c(20,17,17,0,0.5,ASH,24);});
  it('Table de nuit droite',()=>{const f=A(636,674,40,35,'N');f.c(20,17,17,0,0.5,ASH,24);});
  it('Banc à chaussures',()=>{const f=A(163.8,472,76,35,'E');cab(f,{h:0.45,col:ASH,front:0xc9b089,n:2,plinth:0.05,pc:BLK});f.b(2,2,74,33,0.45,0.5,T.cu);});
  it('Patères',()=>{const f=A(163.8,472,76,6,'E',furnTall);f.b(0,0,76,2,1.6,1.7,ASH);[10,28,46,64].forEach((u,i)=>{f.b(u-1,2,u+1,8,1.62,1.66,BLK);if(i%2)f.b(u-8,3,u+8,9,0.95,1.62,[0x1f4550,0xc47a5e][i>>1]);});});
  rug(205,425,280,550,0xd9a441,0xc47a5e);
  it('Suspension d\'entrée',()=>pend(232,470,{r:18,col:0xe8e2d4,y:1.95}));
  it('Pont de baignoire en teck',()=>{const f=A(388,600,68,20,'S');f.b(0,0,68,20,0.55,0.57,0x9a6f45);f.c(15,10,4,0.57,0.62,0xe8e2d4,12);});
  it('Plante suspendue SDB',()=>{const f=AC(415,592,20,20,0,furnTall);f.c(10,10,0.3,1.95,H,BLK,6);f.c(10,10,9,1.75,1.95,0xe8e2d4,16);f.s(10,10,1.75,13,0x4f7a43,1.3);});
  it('Étagère WC',()=>{const f=A(168,686,80,18,'N',furnTall);f.b(0,0,80,18,1.45,1.48,ASH);f.c(20,9,6,1.48,1.62,0xe8e2d4,14);f.s(20,9,1.7,9,0x4f7a43,1);books(f,40,76,2,15,1.48,0.2,3);});
  it('Comptoir-belvédère (sur garde-corps)',()=>{const f=A(802,290,230,25,'W');f.b(0,0,230,25,1.02,1.06,0x9a6f45);[4,85,160,226].forEach(u=>f.b(u-2,0,u+2,6,0.6,1.02,BLK));});
  [320,372,420].forEach((z,i)=>it('Tabouret haut '+(i+1),()=>stool(797,z,{h:0.75,col:0x9a6f45})));
  it('Canapé d\'extérieur 2 places',()=>sofa(A(726.8,592,130,65,'E'),{arm:10,back:16,col:0x7d7f80,cush:T.out,seat:0.38,top:0.72}));
  it('Table basse d\'extérieur',()=>{const f=A(780,606,90,45,'E');table(f,{h:0.4,top:0x9a6f45,leg:BLK});});
  it('Rangement de balcon',()=>{const f=A(744,17,110,55,'S',furnWall);cab(f,{h:1.6,col:0x5c6064,front:0x4a4d50,n:2,plinth:0.06});});
  it('Jardinière nord',()=>{const f=A(800,70,120,28,'W');f.b(0,0,120,28,0,0.45,BLK);for(let i=0;i<5;i++)f.s(12+i*24,14,0.55,13,i%2?0x5d8a4a:0x7a9a52,0.9);});
  pass('Entrée → porte ch. 1',306.8,439.2,445,493.6);
  pass('Entrée : porte → séjour',190,446,296.6,516);
  pass('Devant le bar (cuisine ↔ séjour)',431,240,488,312.8);
  pass('Porte ch. 2 → séjour',431,258.4,585,312.8);
  pass('Accès à la baie',658.8,300,713.2,438);
  pass('Table ↔ galerie basse',445,419.8,600,476.6);
  pass('Cuisine (plan de travail ↔ METOD)',421.5,75,488,232,90);
  pass('Tanière : porte → porte-fenêtre',585,153,708,224);
  pass('Ch. 1 : porte → porte-fenêtre',490,500.4,658.8,556.8);
  pass('Ch. 1 : ruelle gauche du lit',474.4,560,522.4,670,60);
  pass('Ch. 1 : ruelle droite du lit',631.2,610,679.2,670,60);
  pass('SDB : porte → lavabo et baignoire',285,590,387,662);
  pass('Balcon : ch. 2 → ch. 1',726.8,160,785,575);
  sols({sejour:'terraC',entree:'terraC',sdb:'terraD',wc:'terraD',ch1:'liege',ch2:'moquette',balcon:'compo'});
}
