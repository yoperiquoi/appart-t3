Object.assign(tex,{
  diag60:{t:diamondTex(4,['#e3dccf','#ddd5c6','#e8e1d5','#dfd8ca'],['#e1d9cb','#e6dfd2','#dbd3c4'],'#b9b0a0',1.2,1),m:3.39},
  batons:{t:herringTex(['#8fb3a6','#9cbdb1','#86a99c','#a6c6ba'],'#e9efe9',14),m:0.45},
  chevD:{t:stripeTex(16,['#c99a62','#bf8f58','#d3a874','#b98a55','#c4955d'],'#7a5634',16),m:1.8},
  deck45:{t:stripeTex(32,['#a77a4e','#9a6f45','#b0845a'],'#4c3826',17),m:2.5}
});
const paints={
  craie:{n:'Craie & cobalt',w:{sej:[0x2f5d9a,'Séjour mur côté ch. 2 · bleu cobalt'],ch2:[0xe9c46a,'Ch. 2 angle du bureau · jaune soleil'],ch1:[0xb9c7d6,'Ch. 1 tête de lit · bleu craie']},f:{sofa:0xe6dccb,sofaC:0xefe6d6,pil:[0x2f5d9a,0xe9c46a],chair:0x2f5d9a,cu:0x2f5d9a,bz:0xd8cfc0,bzC:0x2f5d9a,plaid:0x2f5d9a,out:0x2f5d9a}},
  corail:{n:'Corail & vert',w:{sej:[0xd9785f,'Séjour mur côté ch. 2 · corail'],ch2:[0x7f9a7a,'Ch. 2 angle du bureau · vert lichen'],ch1:[0xe8d5c0,'Ch. 1 tête de lit · rose sable']},f:{sofa:0x4f6f5a,sofaC:0x5d7e68,pil:[0xd9785f,0xe8d5c0],chair:0xd9785f,cu:0xd9785f,bz:0xd8c8ae,bzC:0x4f6f5a,plaid:0xd9785f,out:0xd9785f}}
};
const paintWalls={sej:c=>paintW('sejN',c),ch2:c=>{paintW('ch2N',c);paintW('ch2E',c);},ch1:c=>paintW('ch1S',c)};
const ROOMS=[['Séjour en diagonale','28,2 m²',560,300],['Salon à 45°','',575,390,1.0,1],['Coin repas','',376,400,1.2,1],['Ch. 2 · bureau d\'angle','9,0 m²',600,200],['Chambre 1','≈ 11,5 m²',594,530],['Entrée','5,1 m²',240,480],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,630],['Placard','',235,390,2.55],['Placard couloir','',368,545,2.55],['Balcon','15,1 m²',772,360]];
const Q=Math.PI/4,WD=0xc79a62,BK=0x2b2b2b;
function amenagement(){
  zonesBase();
  const T=theme();
  rugR(590,365,240,170,3*Q,0xe9e2d3,0xd9cdb6);
  it('Canapé 220 cm à 45°',()=>sofa(AC(550,400,220,95,3*Q),{col:T.sofa,cush:T.sofaC,pil:T.pil}));
  it('Table basse à 45°',()=>{const f=AC(599,351,100,50,3*Q);table(f,{h:0.38,top:WD,leg:BK,lw:3,t:0.04});vase(f,25,25,0.38,0xe8e2d4,0.2);f.b(55,12,85,38,0.38,0.42,T.cu);});
  it('TV 50" sur chevalet à 45°',()=>{const f=AC(660,290,70,45,-Q);f.b(5,15,65,30,0,0.03,BK);[10,58].forEach(u=>f.b(u,20,u+2.5,23,0.03,1.45,WD));f.b(-21,24,91,29,0.72,1.36,0x151617);f.b(-20,29,90,29.6,0.74,1.34,0x2a2f36);});
  it('Lampadaire arc',()=>{const f=AC(560,481,32,32,Math.PI/2);f.c(16,16,15,0,0.04,BK);f.c(16,16,1.2,0.04,1.95,0xb9bcbf);slant(f,16,1.95,96,1.98,15,17,0.025,0xb9bcbf);f.c(96,16,17,1.68,1.86,GL(0xf6ecd2),24);});
  it('Bibliothèque étroite',()=>shelf(A(494,473.2,70,30,'N',furnWall),{h:1.9,n:5,col:WD,cols:1,seed:71}));
  it('Monstera',()=>plant(655,462,{r:16,h:1.3,seed:13,pot:BK,leaf:0x3f6b3a,leaf2:0x2f5a2f}));
  it('Table ronde Ø 90',()=>rtable(376,400,45,{top:WD,leg:BK}));
  it('Chaise nord',()=>chair(376,354,DIR.S,{col:T.chair,leg:BK}));
  it('Chaise ouest',()=>chair(330,400,DIR.E,{col:T.chair,leg:BK}));
  it('Chaise est',()=>chair(422,400,DIR.W,{col:T.chair,leg:BK}));
  it('Suspension du coin repas',()=>pend(376,400,{r:24,col:T.cu,y:1.7}));
  it('BRIMNES (existante) : linge et vaisselle',()=>brimnesF(A(306.8,245,117,50,'E',furnWall)));
  kitchenMetod();
  it('Bureau 180 × 80 en angle (existant)',()=>deskF(AC(648.7,86.3,180,80,-Q)));
  it('Siège gaming (existant)',()=>gamer(614.5,120.5,3*Q));
  it('Plante d\'angle',()=>plant(685,35,{r:9,h:1.0,seed:3,pot:0xe8e2d4}));
  it('Lampe d\'architecte',()=>{const f=AC(668,46,14,14,0);f.c(7,7,6,0.75,0.77,BK);slant(f,7,0.77,0,1.2,6,8,0.015,BK);f.c(0,7,6,1.12,1.24,BK);});
  it('BZ 140 × 90 (existant)',()=>bzF(A(523.4,28,140,90,'E'),{col:T.bz,cush:T.bzC}));
  rugR(615,130,150,110,-Q,T.cu,0xe9e2d3);
  it('Étagère murale ch. 2',()=>{const f=A(523.4,140,80,25,'E',furnTall);[1.2,1.55].forEach((y,i)=>{f.b(0,0,80,25,y,y+0.025,WD);books(f,3,77,2,22,y+0.025,0.26,80+i);});});
  it('Dressing ouvert (existant)',()=>dressingF(A(440.4,552,200,50,'E',furnWall)));
  it('Lit 160 × 200 (existant)',()=>bed(A(539.4,556.8,160,208,'N'),{head:0xa49d99,hh:1.15,plaid:T.plaid}));
  it('Table de nuit gauche',()=>{const f=A(495,674,40,35,'N');cab(f,{h:0.5,col:WD,front:0xd3a874,n:1,drawers:2,plinth:0});lampT(f,20,17,0.5);});
  it('Table de nuit droite',()=>{const f=A(652.2,674,40,35,'N');cab(f,{h:0.5,col:WD,front:0xd3a874,n:1,drawers:2,plinth:0});lampT(f,20,17,0.5);});
  rugR(594,600,200,120,Q/2,0xe9e2d3,T.cu);
  it('Portemanteau',()=>{const f=AC(185,490,50,50,0);f.c(25,25,20,0,0.03,BK);f.c(25,25,1.5,0.03,1.8,WD);[0,1,2,3].forEach(k=>{const a=k*Math.PI/2+Q;f.b(25+Math.cos(a)*10-1,25+Math.sin(a)*10-1,25+Math.cos(a)*10+1,25+Math.sin(a)*10+1,1.62,1.75,WD);});f.b(12,20,38,30,1.0,1.6,T.cu);});
  rugR(240,480,160,70,Q/2,T.cu,0xe9e2d3);
  it('Suspension d\'entrée',()=>pend(232,470,{r:18,col:T.cu,y:1.95}));
  it('Échelle porte-serviettes',()=>{const f=A(300,568.4,50,14,'S');[[2,6],[44,48]].forEach(p=>slant(f,0,0,1,1.6,p[0],p[1],0.04,WD));for(let k=1;k<5;k++)f.b(0,k*2.2+1,50,k*2.2+3,k*0.32,k*0.32+0.03,WD);f.b(4,5,46,9,0.6,0.95,0xe9e2d3);f.b(4,7,46,11,1.0,1.25,0x8fb3a6);});
  it('Plante sur le lavabo',()=>{const f=AC(378,672,16,16,0);f.c(8,8,7,0.84,0.98,0xe8e2d4,16);f.s(8,8,1.06,10,0x4f7a43,0.8);});
  it('Étagère WC',()=>{const f=A(168,686,80,18,'N',furnTall);f.b(0,0,80,18,1.45,1.48,WD);f.c(20,9,6,1.48,1.62,0xe8e2d4,14);f.s(20,9,1.7,9,0x4f7a43,1);books(f,40,76,2,15,1.48,0.2,3);});
  it('Table de balcon Ø 60',()=>rtable(785,95,30,{top:WD,leg:BK,h:0.72}));
  it('Chaise balcon 1',()=>chair(785,62,DIR.S,{col:T.chair,leg:BK}));
  it('Chaise balcon 2',()=>chair(785,128,DIR.N,{col:T.chair,leg:BK}));
  it('Rangement de balcon',()=>{const f=A(730,17,60,45,'S',furnWall);cab(f,{h:1.4,col:0x5c6064,front:0x4a4d50,n:1,plinth:0.06});});
  it('Jardinière',()=>{const f=A(800,250,330,28,'W');f.b(0,0,330,28,0,0.45,BK);for(let i=0;i<12;i++)f.s(14+i*27,14,0.55,13,i%2?0x5d8a4a:0x7a9a52,0.9);});
  it('Fauteuil œuf sur pied',()=>{const f=AC(775,645,90,90,0);f.c(45,45,38,0,0.05,BK);f.c(45,12,2,0.05,1.95,BK);f.b(44,12,46,45,1.93,1.97,BK);f.c(45,45,0.6,1.35,1.95,BK,6);f.s(45,48,0.85,38,0xc9a46b,1.15);f.s(45,52,0.8,30,T.out,1);});
  it('Pots d\'agrumes',()=>plant(748,688,{r:13,h:1.0,k:'tree',seed:21,pot:0xb85b36,leaf:0x5d8a4a,leaf2:0x4a7a3a}));
  pass('Entrée → porte ch. 1',306.8,439.2,490,493.6);
  pass('Entrée : porte → séjour',203,446,300,516);
  pass('Devant le bar (cuisine ↔ séjour)',431,240,488,338);
  pass('Porte ch. 2 → séjour',445,258.4,585,318);
  pass('Accès à la baie',658.8,330,713.2,438);
  pass('Cuisine (plan de travail ↔ METOD)',421.5,75,488,232,90);
  pass('Ch. 2 : porte → porte-fenêtre',585,158,708,224);
  pass('Ch. 1 : porte → porte-fenêtre',490,500.4,658.8,556.8);
  pass('Ch. 1 : ruelle gauche du lit',474.4,560,539.4,670,60);
  pass('Ch. 1 : ruelle droite du lit',648.2,605,709,670,60);
  pass('SDB : porte → lavabo et baignoire',285,590,387,662);
  pass('Balcon : ch. 2 → ch. 1',726.8,160,800,575);
  sols({sejour:'diag60',entree:'diag60',sdb:'batons',wc:'batons',ch1:'chevD',ch2:'chevD',balcon:'deck45'});
}
