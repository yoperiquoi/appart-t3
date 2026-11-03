const paints={
  actuelle:{n:'Murs actuels',w:{},f:{bz:0x5f6368,bzC:0x737880,plaid:0x9db8aa,out:0xe6dcc6}},
  potager:{n:'Potager',w:{sej:[0x7a8b4f,'Séjour mur de la TV · vert poireau'],ch1:[0xd8a48f,'Ch. 1 tête de lit · rose radis'],ch2S:[0xe2c46a,'Atelier mur des semis · jaune courge']},f:{bz:0x7a8b4f,bzC:0xe2c46a,plaid:0xd8a48f,out:0xe6dcc6}},
  grenier:{n:'Grenier',w:{sej:[0x8a5a44,'Séjour mur de la TV · brique'],ch1:[0xc9c2a6,'Ch. 1 tête de lit · lin grisé'],ch2S:[0x9db8aa,'Atelier mur des semis · vert de gris']},f:{bz:0xc9b48a,bzC:0x8a5a44,plaid:0x9db8aa,out:0xe6dcc6}}
};
const paintWalls=pw2;
function sejourRecolte(){
  const T=theme();
  P('Tabourets de bar × 3');
  [256,283,310].forEach(z=>tabouret(338,z,0.65,C.oak));
  P('BZ 140 × 90 (existant) en canapé');
  bz(place(545,318,640.2,379.2,'S',furnGroup),T.bz,T.bzC);
  const k=place(560,330,625,345,'S',furnGroup);box(-k.w/2,-k.d/2,k.w/2,k.d/2,0.5,0.75,L(T.plaid),k.g);
  P('Table basse caisse à pommes');
  const tb=place(560,392,620,426,'S',furnGroup);box(-tb.w/2,-tb.d/2,tb.w/2,tb.d/2,0,0.38,L(0xb98a5a),tb.g);
  P('Meuble TV 1,80 × 0,40 + TV 55" (existante)');
  armoire(place(518,466.4,640,493.6,'N',furnGroup),0.5,0xe9e2d4,{portes:3,face:0xb98a5a});
  tvMur(place(560,488,600,493.6,'N',furnTall));
  P('Table de récolte 1,40 × 0,80 + 2 chaises');
  table(place(655,370,709.4,465.2,'W',furnGroup),0xb98a5a,C.walnut,0.75);
  chaise(639.7,395,'E',0x7a8b4f);chaise(639.7,440,'E',0x7a8b4f);
  P('Corbeille de récolte sur la table');
  const cb=at(682,417,furnGroup);cy(cb,0,0,0.15,0.75,0.88,L(C.rattan),0.18);[[0.05,0.02],[-0.05,0.03],[0,-0.06]].forEach((p,i)=>sp(cb,p[0],0.9,p[1],0.05,0.05,0.05,L([0xd2343a,0xe2c46a,0x7a8b4f][i])));
  P('Suspension');
  suspension(682,417,1.6,0.2,0xe9e2d4);
  P('Voilage (baie)');
  voilage(455.5,470,0xefe8da,0.75);
}
function atelier(){
  const T=theme();
  P('Bureau 180 × 80 (existant)');
  bureau(place(557.1,21.8,679.5,76.2,'S',furnGroup));
  P('Siège gaming (existant)');
  gaming(618.3,102,'N');
  P('Établi de rempotage 1,20 × 0,60');
  const e=place(523.4,95,564.2,176.6,'E',furnGroup),g=e.g,w=e.w,d=e.d;
  table(e,0xb98a5a,0x5a4330,0.9,{t:0.04});box(-w/2,-d/2,w/2,-d/2+0.02,0.9,1.5,L(0xb98a5a),g);
  [-0.4,-0.1,0.2].forEach((x,i)=>{box(x-0.07,-0.1,x+0.07,0.04,0.9,1.02,L(C.terra),g);sp(g,x,1.06,-0.03,0.06,0.06,0.06,L([C.leaf,C.leafL,0x5c8f43][i]));});
  box(-w/2+0.05,-d/2+0.05,w/2-0.05,d/2-0.05,0.15,0.18,L(0x5a4330),g);
  P('Vitrine-serre 1,00 × 0,50 × 1,80 (LED)');
  const v=place(680,62,713.2,130,'W',furnWall),vg=v.g;
  box(-v.w/2,-v.d/2,v.w/2,v.d/2,0,0.1,L(C.metal),vg);
  const gl=new THREE.MeshLambertMaterial({color:0xcfe6ef,transparent:true,opacity:0.35});box(-v.w/2,-v.d/2,v.w/2,v.d/2,0.1,1.8,gl,vg);
  [0.5,0.95,1.4].forEach(y=>{box(-v.w/2+0.02,-v.d/2+0.02,v.w/2-0.02,v.d/2-0.02,y,y+0.02,L(C.metal),vg);box(-0.4,-0.02,0.4,0.02,y+0.4,y+0.42,glow(0xf4d6ff),vg);for(let i=0;i<4;i++)sp(vg,-0.33+i*0.22,y+0.1,0,0.07,0.07,0.07,L(i%2?C.leafL:C.leaf));});
  P('Étagères à semis et bocaux (mur sud)');
  etagere(place(590,231.2,708,251.6,'N',furnWall),1.8,5,0xb98a5a,{seed:9});
  P('Voilage (porte-fenêtre)');
  voilage(222,248,0xefe8da,0.75);
}
function annexes(){
  entreeBanc(0xb98a5a,0x7a8b4f);
  P('Miroir d\'entrée');
  pbox(164,522,166,560,0.9,1.9,L(0xbfd3dc),furnTall);
  sdbDeco(0xb98a5a,[0xffffff,0xe2c46a,0x7a8b4f]);
  wcDeco(0xb98a5a);
}
function potager(){
  const T=theme();
  gardeCorps(0x2f3033);
  P('Bacs potagers sur pieds (5 bacs, 52 cm × 0,35 de terre)');
  [[20,160,['salade','fraise','salade']],[170,270,['herbes','fleurs','herbes']],[290,450,['tomate','salade','tomate','herbes']],[465,560,['fraise','fleurs','fraise']],[580,700,['tomate','herbes','tomate']]].forEach(b=>jardiniere(783.5,b[0],819,b[1],0.35,0xa6865f,b[2],furnGroup,0.45));
  P('Serre à tomates 0,70 × 0,50 × 1,60');
  const s=place(728,20,762,68,'E',furnGroup),sg=s.g;
  const gl=new THREE.MeshLambertMaterial({color:0xdcefe8,transparent:true,opacity:0.4});box(-s.w/2,-s.d/2,s.w/2,s.d/2,0,1.6,gl,sg);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>box(q[0]*s.w/2-0.015*(q[0]>0),q[1]*s.d/2-0.015*(q[1]>0),q[0]*s.w/2+0.015*(q[0]<0),q[1]*s.d/2+0.015*(q[1]<0),0,1.6,L(0x3f6b2f),sg));
  for(let i=0;i<3;i++){cy(sg,-0.2+i*0.2,0,0.1,0,0.25,L(C.terra));sp(sg,-0.2+i*0.2,0.8,0,0.1,0.45,0.1,L(C.leaf));sp(sg,-0.2+i*0.2+0.04,0.7,0.07,0.035,0.035,0.035,L(0xd2343a));}
  P('Lombricomposteur');
  const c=at(743,92,furnGroup);for(let i=0;i<4;i++)box(-0.2,-0.2,0.2,0.2,i*0.2,i*0.2+0.19,L(0x4f5a3a),c);
  P('Récupérateur d\'eau 100 L');
  cy(at(745,135,furnGroup),0,0,0.24,0,0.8,L(0x3f6b2f));
  P('Espaliers sur la façade (poirier, vigne)');
  treille(727.8,224,729,272,0.3,2.1,furnWall);treille(727.8,458,729,512,0.3,2.1,furnWall);treille(727.8,580,729,700,0.3,2.1,furnWall);
  P('Étagère à outils (bout sud)');
  etagere(place(729.5,640,753.5,700,'E',furnWall),1.5,3,0x5a4330,{livres:false,cols:1});
  [0.45,0.95].forEach(y=>{const g=at(741.5,670,furnWall);cy(g,0,0.12,0.08,y+0.02,y+0.2,L(C.terra));cy(g,0,-0.12,0.07,y+0.02,y+0.18,L(C.zinc));});
}
const projet={
  build(){
    structureProjet();
    sejourRecolte();chambre1Base(theme(),{tapis:0xd8c7a2,couette:0xf3efe6});atelier();annexes();cuisineMetod();potager();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'chevronT'));
    sol(720,15,825,705,'dalle');
    sol(157,565,232,705,'zelligeB');sol(232,565,437,705,'zelligeB');
    sol(437,497,720,705,'chene');sol(520,15,720,255,'ciment');
  },
  rooms:[['Séjour / cuisine','28,2 m²',420,380],['Atelier-serre (ex-ch. 2)','9,0 m²',620,180],['Chambre 1','≈ 11,5 m²',577,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',368,545,2.55],['Potager perché','15,1 m²',800,360],['Table de récolte','',682,417,0.9,1],['Serre à tomates','',745,44,1.7,1],['Établi de rempotage','',544,136,1.0,1]]
};
