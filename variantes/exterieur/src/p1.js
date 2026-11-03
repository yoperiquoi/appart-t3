const paints={
  actuelle:{n:'Murs actuels',w:{},f:{sofa:0xd9cfbd,sofaC:0xe8e0d0,bz:0x5f6368,bzC:0x737880,plaid:0x9db8aa,out:0xe6dcc6,arm:0x8fae9f}},
  serre:{n:'Vert serre',w:{sej:[0x86a08a,'Séjour mur de la ch. 1 · vert serre'],ch1:[0xb5c4a1,'Ch. 1 tête de lit · vert amande'],ch2:[0xd8b26e,'Ch. 2 mur du BZ · ocre']},f:{sofa:0xd9cfbd,sofaC:0xe8e0d0,bz:0xcfc4b2,bzC:0x86a08a,plaid:0xc47a5e,out:0xe6dcc6,arm:0x86a08a}},
  agrume:{n:'Agrumes',w:{sej:[0xe6bf73,'Séjour mur de la ch. 1 · safran pâle'],sejN:[0xf0e2c4,'Séjour mur de la ch. 2 · crème'],ch1:[0xd98e6a,'Ch. 1 tête de lit · corail'],ch2:[0x9db8aa,'Ch. 2 mur du BZ · sauge']},f:{sofa:0x6f7f6a,sofaC:0x87977f,bz:0xd8cfc0,bzC:0xe6bf73,plaid:0xe6bf73,out:0xf0a020,arm:0xd98e6a}}
};
const paintWalls=pw2;
function orangerie(){
  const T=theme();
  P('Tabourets de bar × 3');
  [256,283,310].forEach(z=>tabouret(338,z,0.65,C.oak));
  P('Canapé 2,00 × 0,90 face à la baie');
  canape(place(502,320,563.2,456,'E',furnGroup),T.sofa,T.sofaC,{coussins:[T.plaid,0xe8e2d4,T.bzC]});
  P('Tapis jute 2,00 × 1,40');
  tapis(566,330,640,452,0xc9b48a,0xd8c7a2);
  P('Table basse ronde Ø 0,60');
  tableRonde(604,370,0.3,C.oak,C.walnut,0.42);
  P('Lampadaire');
  lampadaire(520,474,1.6,0xf3ead4);
  P('Table d\'orangerie Ø 0,90 + 3 chaises rotin');
  tableRonde(655,418,0.45,0xe9e2d4,C.metal,0.75);
  chaise(617.6,418,'E',C.rattan,furnGroup,C.metal);chaise(655,380.6,'S',C.rattan,furnGroup,C.metal);chaise(655,455.4,'N',C.rattan,furnGroup,C.metal);
  P('Gradins à plantes sur mesure 0,95 × 0,35');
  const gr=place(575,470,638,493.6,'N',furnGroup),g=gr.g,w=gr.w,d=gr.d;
  [[0,0.3,-d/2,d/2],[0.3,0.6,-d/2,0.02],[0.6,0.9,-d/2,-0.06]].forEach(s=>box(-w/2,s[2],w/2,s[3],s[0],s[1],L(C.oak),g));
  [[-0.35,0.3,0.1,'geranium'],[0.05,0.3,0.1,'lavande'],[0.35,0.3,0.1,'geranium'],[-0.2,0.6,-0.04,'fougere'],[0.2,0.6,-0.04,'agrume'],[0,0.9,-0.08,'geranium']].forEach(p=>{const pg=new THREE.Group();pg.position.set(p[0],p[1],p[2]);g.add(pg);const s=p[3]==='agrume'?0.4:0.55;const k=plante(0,0,p[3],s,pg);k.position.set(0,0,0);});
  P('Olivier en pot Ø 0,45');
  plante(690,470,'olivier',0.85,furnWall);
  P('Suspensions rotin');
  suspension(655,418,1.55,0.22,C.rattan);suspension(604,370,1.75,0.16,C.rattan);
  P('Voilages lin (baie)');
  voilage(259.5,275,0xefe8da,0.75);voilage(431,448,0xefe8da,0.75);
}
function chambre1(){
  const T=theme();
  P('Dressing ouvert 2,00 × 0,50 (existant)');
  dressingO(place(440.4,552,474.4,688,'E',furnWall));
  P('Armoire BRIMNES 117 × 50 (existante)');
  brimnes(place(679.2,582,713.2,661.6,'W',furnWall));
  P('Lit 160 × 200 (existant)');
  lit(place(522.4,556,631.2,698.2,'N',furnGroup),{tete:1.15,plaid:T.plaid,couette:0xf7f5ef});
  P('Chevets');
  chevet(503.8,686.3);chevet(649.8,686.3);
  P('Suspension végétale (pothos)');
  const sg=at(560,525,furnTall);cy(sg,0,0,0.004,2.15,2.5,L(C.dark));cy(sg,0,0,0.12,2.0,2.15,L(C.terra),0.1);sp(sg,0,2.02,0,0.22,0.08,0.22,L(C.leaf));
  P('Tapis laine');
  tapis(500,500,650,553,0xe8e2d4);
  P('Voilage lin (porte-fenêtre)');
  voilage(501,514,0xefe8da,0.75);
}
function chambre2(){
  const T=theme();
  P('Bureau 180 × 80 (existant)');
  bureau(place(557.1,21.8,679.5,76.2,'S',furnGroup));
  P('Siège gaming (existant)');
  gaming(618.3,102,'N');
  P('BZ 140 × 90 (existant)');
  bz(place(523.4,89.1,584.6,184.3,'E',furnGroup),T.bz,T.bzC);
  P('Étagère de semis 1,30 × 0,30 × 1,80 (LED horticoles)');
  const e=place(692.8,60,713.2,150,'W',furnWall);etagere(e,1.8,4,C.white,{livres:false,cols:2});
  [0.45,0.9,1.35].forEach(y=>{box(-e.w/2+0.03,-0.02,e.w/2-0.03,0.02,y-0.06,y-0.04,glow(0xf4d6ff),e.g);for(let i=0;i<5;i++){const x=-e.w/2+0.13+i*(e.w-0.26)/4;box(x-0.06,-0.1,x+0.06,0.1,y-0.43,y-0.36,L(C.terra),e.g);sp(e.g,x,y-0.33,0,0.05,0.05,0.05,L(i%2?C.leafL:C.leaf));}});
  P('Bibliothèque mur sud');
  etagere(place(590,231.2,708,251.6,'N',furnWall),1.8,5,C.white,{seed:5});
  P('Monstera');
  plante(660,140,'monstera',1);
  P('Voilage lin (porte-fenêtre)');
  voilage(222,248,0xefe8da,0.75);
}
function annexes(){
  entreeBanc(C.oak,0xc47a5e);
  P('Miroir d\'entrée');
  pbox(164,522,166,560,0.9,1.9,L(0xbfd3dc),furnTall);
  sdbDeco(C.oak,[0xffffff,0xe6e1d8,0x9db8aa]);
  wcDeco(C.oak);
  P('Pots d\'aromatiques sur le plan');
  [[380,185],[380,200],[380,215]].forEach((p,i)=>{const g=at(p[0],p[1],furnGroup);g.position.y=0.9;pot(g,0.06,0.1,C.terra);sp(g,0,0.16,0,0.06,0.06,0.06,L([C.leaf,C.leafL,0x5c8f43][i]));});
}
function balconOrangerie(){
  const T=theme();
  gardeCorps(0x4a4d50);
  P('Fauteuil œuf sur pied');
  const eg=at(775,70,furnGroup);cy(eg,0,0,0.42,0,0.05,L(C.metal));cy(eg,0.3,0,0.025,0.05,1.95,L(C.metal));box(-0.05,-0.02,0.32,0.02,1.9,1.95,L(C.metal),eg);
  cy(eg,0,0,0.005,1.35,1.92,L(C.metal));sp(eg,0,0.95,0,0.42,0.5,0.42,L(C.rattan));sp(eg,0,0.85,0.12,0.32,0.32,0.28,L(T.out));
  P('Desserte + lavande');
  tableRonde(740,130,0.17,C.terra,C.metal,0.5);
  P('Citronnier en pot');
  plante(746,248,'agrume',0.85);
  P('Table bistro Ø 0,50 + 2 chaises');
  tableRonde(746,412,0.25,0x2f5d62,C.metal,0.72);
  chaise(746,381,'S',0x2f5d62,furnGroup,C.metal);chaise(746,443,'N',0x2f5d62,furnGroup,C.metal);
  P('Oranger en pot');
  plante(746,485,'agrume',0.85);
  P('Coffre-banc 1,50 × 0,50');
  const cb=place(728,600,762,702,'E',furnGroup);box(-cb.w/2,-cb.d/2,cb.w/2,cb.d/2,0,0.45,L(0x8b6a4a),cb.g);box(-cb.w/2+0.02,-cb.d/2+0.02,cb.w/2-0.02,cb.d/2-0.02,0.45,0.52,L(T.out),cb.g);
  P('Jardinières de garde-corps (romarin, thym, lavande)');
  jardiniere(799,585,819,700,0.32,C.terra,['lavande','herbes','lavande'],furnGroup,0.5);
  P('Lavandes en pots');
  plante(745,586,'lavande',1);
  P('Voile d\'ombrage');
  voile(270,460,0xefe6d2);
  P('Guirlande');
  guirlande([[732,30],[732,690]],2.2);
}
const projet={
  build(){
    structureProjet();
    orangerie();chambre1();chambre2();annexes();cuisineMetod();balconOrangerie();
    sol(360,15,520,232,'pierre');sol(300,232,520,255,'pierre');sol(300,255,625,497,'pierre');sol(300,497,437,565,'pierre');
    sol(625,255,720,497,'hexa');sol(157,350,300,565,'hexa');sol(720,15,825,705,'hexa');
    sol(157,565,232,705,'zellige');sol(232,565,437,705,'zellige');
    sol(437,497,720,705,'sisal');sol(520,15,720,255,'sisal');
  },
  rooms:[['Séjour / cuisine','28,2 m²',420,380],['Orangerie','≈ 4,5 m²',668,330],['Chambre 2 · bureau-serre','9,0 m²',620,150],['Chambre 1','≈ 11,5 m²',577,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',368,545,2.55],['Balcon des agrumes','15,1 m²',780,360],['Gradins à plantes','',612,482,1.1,1],['Fauteuil œuf','',775,70,2.0,1],['Étagère de semis','',700,105,1.9,1]]
};
