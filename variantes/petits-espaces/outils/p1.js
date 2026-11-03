const PROP={
  titre:'1 · La cabine',sous:'on dort dans la petite chambre',
  alt:['Déplié','Table de carré relevée à 75 cm avec 2 chaises pliantes, BZ ouvert en lit, table de balcon dépliée'],
  legende:[['#b98a57','#1d1b19','Carrelage effet teck, joints noirs'],['#f4f2ec','#1f3550','Carreaux 10 × 10 joints marine'],['#c99a68','#a8774c','Liège'],['#2f4a5f','#263d4f','Linoléum marine'],['#d4b48a','#8a6a44','Menuiserie chêne sur mesure'],['#3b82c4','#1f4f7d','Portes']],
  rooms:[['Le carré (séjour)','',505,400],['Cuisine','',445,150],['La cabine (ch. 2)','≈ 9 m²',672,185],['L\'atelier (ch. 1)','≈ 11,5 m²',540,610],['Entrée','',240,500],['WC','',195,640],['SDB','',320,620],['Le pont (balcon)','',775,360],['Lit clos 160 × 200','',580,90,1.3,1],['Banquette-coffre en L','',640,282,0.9,1],['Table relevable','',674,330,0.9,1],['BZ 140 (lit d\'amis)','',607,530,0.95,1],['Dressing existant','',457,620,1.2,1],['Bureau 180 × 80','',651,670,0.9,1],['BRIMNES','',630,234,1.95,1],['Banc-coffre teck','',745,640,0.6,1]]
};
const PAINTS={
  marine:{b:'Marine',n:'Marine',w:{cab:[0x1f3550,'Intérieur du lit clos · bleu marine'],carre:[0xdfe6e8,'Mur du carré · gris écume'],atel:[0x6f8f8a,'Atelier mur du bureau · vert lichen']},f:{banq:0x24384f,banqC:0x2e4762,dos:0xe9e4d8,rideau:0x24384f,bz:0xcfc6b5,bzC:0xb3262d,plaid:0xb3262d,coussin:[0xb3262d,0xe9e4d8,0xd9a441]}},
  phare:{b:'Phare',n:'Phare',w:{cab:[0xa8452f,'Intérieur du lit clos · rouge phare'],carre:[0xf0e7d6,'Mur du carré · voile écru'],atel:[0x2f4a5f,'Atelier mur du bureau · bleu ardoise']},f:{banq:0xe7dccb,banqC:0xf1e9dc,dos:0xa8452f,rideau:0xe7dccb,bz:0x2f4a5f,bzC:0xe7dccb,plaid:0x2f4a5f,coussin:[0xa8452f,0x2f4a5f,0xd9a441]}}
};
const PWALLS={
  cab:col=>paintWall(false,520,15+E*S/2,159,I,1,[],col),
  carre:col=>paintWall(true,255,585,720-E*S/2,I,1,[],col),
  atel:col=>paintWall(true,705,585,720-E*S/2,E,-1,[],col)
};
const PASSAGES=[
  ['Cuisine : entre plan de travail et METOD',421,90,482.2,235,0.9],
  ['Séjour : devant la porte de la chambre 2',525,258.4,585,312.8],
  ['Séjour : devant la porte de la chambre 1',445,439.2,490,493.6],
  ['Séjour : vers la baie (côté sud)',650,400,705,454.4],
  ['Séjour : entre carré et bibliothèque',560,400,620,454.4],
  ['Entrée : porte → séjour',212,420,296.6,474.4],
  ['Entrée : devant WC et SDB',197.8,470,252.2,518],
  ['Cabine : le long du lit clos',640,60,694.4,150],
  ['Cabine : de la porte au lit',527,166,581.4,214],
  ['Atelier : porte → bureau',474.4,545,528.8,640],
  ['SDB : de la porte au lavabo',300,600,354.4,655],
  ['Balcon : ch. 2 ↔ séjour',740,170,794.4,270],
  ['Balcon : séjour ↔ ch. 1',740,455,794.4,515]
];
const BOIS=0xd4b48a,BOISF=0xc9a676,NAVY=0x1f3550,LAITON=0xc9a04a;
function amenagement(){const T=theme();sejour1(T);cuisine1(T);cabine1(T);atelier1(T);entree1(T);sdb1(T);balcon1(T);}
function sejour1(T){
  let g=item('Banquette-coffre en L (sur mesure)');
  caisson(g,592,258.4,690,299.2,0,0.4,{c:BOIS,f:BOISF,face:'S',n:3});
  caisson(g,592,299.2,633,380,0,0.4,{c:BOIS,f:BOISF,face:'E',n:2});
  bx(g,592,266,690,299.2,0.4,0.48,T.banq);bx(g,599.6,299.2,633,380,0.4,0.48,T.banq);
  bx(g,592,258.4,690,266,0.4,0.85,T.dos);bx(g,592,266,599.6,380,0.4,0.85,T.dos);
  T.coussin.forEach((c,i)=>bx(g,606+i*24,266,626+i*24,272,0.48,0.78,c));
  bx(g,599.6,330+0,606,352,0.48,0.75,T.coussin[1]);
  g=item('Équipets au-dessus de la banquette',furnWall);
  bx(g,592,258.4,690,275,1.6,1.62,BOIS);bx(g,592,274,690,275,1.62,1.68,LAITON);
  livres(g,594,640,true,258.4,272,1.62,0.2,5);
  plante(g,672,266,0.3,0xe9e4d8,0x4f8a45,1.62);
  g=item('Table de carré relevable 100 × 70');
  const ty=ALT?0.72:0.4;
  bx(g,640,306,708,353.6,ty,ty+0.03,0x9c6b3f);bx(g,641,307,707,352.6,ty+0.03,ty+0.032,0xb07a48);
  cy(g,674,330,0.05,0.02,ty,0x2b2c2e);cy(g,674,330,0.24,0,0.02,0x2b2c2e);
  if(ALT){const k=item('2 chaises pliantes (sorties du placard)');chaise(k,657,382,'S',0x2f4a5f,0x2b2c2e);chaise(k,690,382,'S',0x2f4a5f,0x2b2c2e);}
  else{const k=item('Plateau de jeu et tasses');bx(k,650,315,670,335,ty+0.032,ty+0.05,0xe9e4d8);cy(k,690,320,0.04,ty+0.032,ty+0.12,0xffffff);}
  suspension('Suspension laiton du carré',674,330,1.55,LAITON,0.16);
  g=item('Bibliothèque-secrétaire 125 × 35 (sur mesure)',furnWall);
  etag(g,495,469.8,580,493.6,0,2.2,[0.02,0.42,0.82,1.18,1.55,1.9,2.18],BOIS,{back:'S',books:true,skip:[2],seed:9,mid:2});
  bx(g,497,469.8,578,471,0.82,1.18,BOISF);
  g=item('Meuble TV suspendu et TV 50"');
  caisson(g,585,466.4,675,493.6,0.3,0.62,{c:BOIS,f:NAVY,face:'N',n:3});
  tele(g,592,490.2,668,493.6,1.0,1.63);
  g=item('Tabourets de bar');tabouret(g,437,256,0.65,BOIS);tabouret(g,437,288,0.65,BOIS);
  g=item('Grand tapis du pont');tapis(g,450,330,600,450,0xe9e4d8,0xd8cfbf);
  g=item('Lampadaire de lecture');lampadaire(g,580,372,1.6,0xf3ead4);
  g=item('Kentia');plante(g,325,300,1.1);
}
function cuisine1(T){
  cuisineMetod();
  let g=item('Rail inox et barre aimantée',furnTall);
  bx(g,367.6,180,369,238,1.2,1.22,0xb9bcbf);for(let i=0;i<6;i++)bx(g,369,186+i*8,371,188+i*8,1.0,1.2,i%2?0x2b2c2e:0xb9bcbf);
  g=item('Étagère au-dessus de la fenêtre',furnTall);bx(g,470,21.8,516,36,2.15,2.17,BOIS);[478,490,502].forEach((x,i)=>cy(g,x,29,0.05,2.17,2.3,[0xffffff,0xd9a441,0x9db8aa][i]));
}
function cabine1(T){
  let g=item('Lit clos — couchette et 3 tiroirs de 1,60 m');
  caisson(g,523.4,21.8,634.6,159,0,0.45,{c:BOIS,f:BOISF,face:'E',n:3,h:LAITON,hz:1});
  literie(g,524.2,22.6,633.8,158.2,0.45,'N',{duvet:0xf7f7f5,plaid:T.plaid});
  g=item('Lit clos — caisson, cloison à hublot, rideau',furnWall);
  bx(g,523.4,159,640,163.4,0,2.05,BOIS);
  disque(g,600,161.2,1.3,0.14,'z',0.075,0xbfd3dc);disque(g,600,161.2,1.3,0.17,'z',0.07,LAITON);
  bx(g,523.4,21.8,640,159,2.0,2.05,BOIS);
  bx(g,634.6,21.8,640,27,0,2.0,BOIS);bx(g,634.6,27,640,159,1.75,2.0,BOIS);bx(g,634.6,27,640,159,0.45,0.62,BOIS);
  bx(g,636,27,638.5,64,0.62,1.75,T.rideau);
  bx(g,523.4,21.8,634.6,32,1.05,1.07,BOIS);
  [548,610].forEach(x=>{cy(g,x,30,0.04,1.25,1.33,LAITON);});
  g=item('Coffres de pont au-dessus du lit clos',furnTall);
  caisson(g,523.4,21.8,640,163.4,2.05,2.48,{c:BOIS,f:BOISF,face:'E',n:3,h:LAITON});
  meuble('Armoire BRIMNES (existante)',furnWall,629.8,251.6,'N',brimnesL);
  g=item('Coffre de marin sous la fenêtre');
  caisson(g,645,21.8,700,52,0,0.42,{c:NAVY,f:NAVY,face:'S',n:1,h:LAITON,hz:1});bx(g,645,21.8,700,52,0.42,0.48,T.banqC);
  g=item('Équipet au-dessus du radiateur',furnWall);bx(g,703,60,713.2,130,1.4,1.42,BOIS);bx(g,703,60,704,130,1.42,1.47,LAITON);livres(g,62,100,false,703,712,1.42,0.18,4);
  g=item('Tapis rond');tapis(g,650,75,705,145,0xe9e4d8,0x24384f);
  g=item('Monstera');plante(g,660,198,0.9);
}
function atelier1(T){
  meuble('Dressing ouvert existant (rideau)',furnWall,440.4,620,'E',s=>dressingL(s));
  meuble('Bureau 180 × 80 (existant)',furnGroup,651,698.2,'N',bureauL);
  meuble('Siège gaming (existant)',furnGroup,ALT?688:651,615,'N',gamingL);
  meuble(ALT?'BZ 140 ouvert en lit':'BZ 140 × 90 (existant)',furnGroup,607.5,500.4,'S',s=>bzL(s,ALT,T.bz,T.bzC));
  let g=item('Bibliothèque basse-haute',furnWall);
  etag(g,478,677.8,585,698.2,0,2.0,[0.02,0.4,0.78,1.16,1.54,1.98],BOIS,{back:'S',books:true,seed:17,mid:2});
  g=item('Panneau perforé au-dessus du bureau',furnWall);
  bx(g,600,697,700,698.2,1.0,1.6,0xe9e4d8);[[610,1.3,0xb3262d],[640,1.45,0xd9a441],[675,1.2,0x2f4a5f]].forEach(q=>bx(g,q[0],695,q[0]+8,697,q[1],q[1]+0.12,q[2]));
  g=item('Écran et lampe de bureau');bx(g,630,684,672,690,0.75,1.12,0x151617);lampe(g,700,688,0.75,0x2b2c2e);
  g=item('Tapis de l\'atelier');tapis(g,500,570,590,650,0xb3a58c,0x8f826b);
  g=item('Ficus');plante(g,540,525,1);
}
function entree1(T){
  let g=item('Coffre de marin (banc à chaussures)');
  caisson(g,163.8,474,197.8,520,0,0.42,{c:BOIS,f:BOISF,face:'E',n:2,h:LAITON,hz:1});bx(g,163.8,474,197.8,520,0.42,0.48,T.banq);
  g=item('Patères et manteaux',furnWall);
  bx(g,163.8,474,165.6,520,1.58,1.66,BOIS);[480,492,504,514].forEach(z=>bx(g,165.6,z,168,z+1.5,1.6,1.63,LAITON));
  bx(g,166,478,172,492,0.95,1.6,0x2f4a5f);bx(g,166,496,171,510,1.05,1.6,0xb3262d);
  g=item('Placard en pont au-dessus de la porte d\'entrée',furnTall);
  caisson(g,163.8,414,197.8,486,2.1,2.48,{c:BOIS,f:BOISF,face:'E',n:2,h:LAITON});
  g=item('Miroir pleine hauteur sur le placard',furnWall);bx(g,232,412,268,413,0.35,1.95,0xbfd3dc);
  g=item('Tapis coco');tapis(g,170,420,228,466,0xb08a5e,0x9c7a50);
}
function sdb1(T){
  etagereSdb();etageresLinge();
  let g=item('Placard en pont au-dessus de la porte SDB',furnTall);
  caisson(g,236,568.4,294,590,2.1,2.48,{c:BOIS,f:BOISF,face:'S',n:2,h:LAITON});
  g=item('Miroir hublot',furnWall);disque(g,365,697.2,1.5,0.28,'z',0.02,0xbfd3dc);disque(g,365,697.6,1.5,0.31,'z',0.01,LAITON);
  g=item('Caillebotis teck');tapis(g,358,592,386,642,0xb98a57,0x9c7244);
  g=item('Étagère au-dessus des WC',furnWall);bx(g,163.8,672,228.6,698.2,1.4,1.42,BOIS);[172,190,208].forEach((x,i)=>bx(g,x,676,x+12,696,1.42,1.6,[0xe9e4d8,NAVY,0xe9e4d8][i]));
}
function balcon1(T){
  let g=item('Banc-coffre teck du pont');
  caisson(g,727.6,585,761.6,700,0,0.42,{c:0xa7794a,f:0x9c7244,face:'E',n:3});
  bx(g,727.6,585,761.6,700,0.42,0.48,T.banqC);bx(g,727.6,585,735,700,0.48,0.8,T.banq);
  g=item(ALT?'Table de garde-corps dépliée':'Table de garde-corps rabattue');
  if(ALT){bx(g,781,610,819,680,0.72,0.75,0xa7794a);bx(g,815,640,819,650,0.4,0.72,0x3a3d40);}
  else bx(g,815,610,819,680,0.35,1.05,0xa7794a);
  g=item('Armoire de pont 130 × 60 × 180');
  caisson(g,730,17,818,57.8,0,1.8,{c:0x4a4d50,f:0x5c6064,face:'S',n:2,h:0x2a2a2a});
  g=item('Jardinières de garde-corps (aromatiques)');
  [[290,440],[470,560]].forEach(r=>{bx(g,811,r[0],819,r[1],0.8,0.98,0x6d6f72);for(let z=r[0]+8;z<r[1]-4;z+=14)herbe(g,815,z,0.98,0.05);});
  g=item('Pots d\'agrumes');plante(g,745,80,1.1,0xb8603e);plante(g,745,110,0.9,0xb8603e);
  g=item('Cordage et bouée (déco)',furnWall);disque(g,728.3,240,1.5,0.2,'x',0.012,0xe9e4d8);
}
function sols(){
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'teck'));
  sol(157,565,232,705,'marine');sol(232,565,437,705,'marine');
  sol(437,497,720,705,'liege');sol(520,15,720,255,'lino');
}
