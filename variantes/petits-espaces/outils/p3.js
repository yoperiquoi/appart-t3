const PROP={
  titre:'3 · Engawa',sous:'l\'estrade japonaise et la pièce-réserve',
  alt:['Amis','Lit d\'amis 140 × 190 sorti de sous l\'estrade du séjour'],
  legende:[['#5b5f63','#2c2e30','Carrelage ardoise 30 × 60'],['#a6a8a2','#6d706b','Mosaïque galets (genkan, SDB, WC)'],['#e2c79c','#b89a6c','Plancher hinoki'],['#c8c086','#2f3b33','Tatami (estrade ch. 1)'],['#c99a68','#a8774c','Liège (ch. 2)'],['#3b82c4','#1f4f7d','Portes']],
  rooms:[['Séjour','',470,300],['Engawa (estrade 30 cm)','',658,320],['Cuisine','',445,150],['Le sanctuaire (ch. 1)','≈ 11,5 m²',575,525],['Le nando (ch. 2)','dressing · bureau · linge',640,160],['Genkan','',205,445],['WC','',195,640],['SDB','',320,620],['Jardin sec (balcon)','',775,360],['Estrade tatami 3,5 × 2,1 m','',560,620,0.5,1],['Lit d\'amis caché dessous','',560,405,0.25,1],['Dressing existant','',540,98,1.2,1],['BRIMNES','',630,234,1.95,1],['Étendoir au plafond','',640,150,2.3,1]],
  roomsAlt:[['Séjour','',470,300],['Lit d\'amis sorti','140 × 190',562,400,0.4,1],['Engawa (estrade 30 cm)','',658,320],['Le sanctuaire (ch. 1)','',575,525],['Le nando (ch. 2)','',640,160]]
};
const PAINTS={
  washi:{b:'Washi',n:'Washi',w:{ch1:[0xd9c7a8,'Ch. 1 mur de tête · enduit argile'],sej:[0x3b3f45,'Séjour mur TV · gris sumi'],ch2:[0xb7c3b0,'Ch. 2 · vert thé']},f:{fut:0xe9e4d8,futC:0xd9c7a8,zab:[0x3b5b78,0xb3412f,0xd9c7a8],duvet:0xf2efe6,plaid:0x3b5b78}},
  sumi:{b:'Sumi',n:'Sumi',w:{ch1:[0x2e3a4a,'Ch. 1 mur de tête · indigo'],sej:[0xb3412f,'Séjour mur TV · rouge torii'],ch2:[0x5f6b5a,'Ch. 2 · vert mousse']},f:{fut:0x3b3f45,futC:0x51565d,zab:[0xb3412f,0xe9e4d8,0x2e3a4a],duvet:0xe9e4d8,plaid:0x2e3a4a}}
};
const PWALLS={
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  sej:col=>paintWall(true,255,600,720-E*S/2,I,1,[],col),
  ch2:col=>paintWall(false,720,15+E*S/2,255-I*S/2,E,-1,[[160,220,'pf']],col)
};
const PASSAGES=[
  ['Cuisine : entre plan de travail et METOD',421,90,482.2,235,0.9],
  ['Séjour : devant la porte de la chambre 2',525,258.4,585,312.8],
  ['Séjour : devant la porte de la chambre 1',445,440,490,493.6],
  ['Séjour : entre table et tansu',420,430,494,470],
  ['Engawa : de la marche à la baie',620,290,700,344.4,0.8,0.3],
  ['Genkan : porte → séjour',212,422,296.6,476.4],
  ['Genkan : devant WC et SDB',201,470,255.4,518],
  ['Sanctuaire : porte → estrade',450,503,660,556],
  ['Nando : allée centrale',560,125,614.4,215],
  ['SDB : de la porte au lavabo',300,600,354.4,655],
  ['Balcon : ch. 2 ↔ séjour',760,170,814.4,270],
  ['Balcon : séjour ↔ ch. 1',740,455,794.4,515]
];
const HINO=0xe2c79c,HINOF=0xd6b886,SUMI=0x2b2c2e,WASHI=0xf3ecdc;
function amenagement(){const T=theme();sejour3(T);cuisine3(T);ch1_3(T);ch2_3(T);entree3(T);sdb3(T);balcon3(T);}
function sejour3(T){
  let g=item('Estrade engawa 1,45 × 3,30 m, h 30 cm (sur mesure)');
  bx(g,610,258.4,707,482,0,0.285,HINOF);bx(g,610,258.4,707,482,0.285,0.3,HINO);
  caisson(g,610,262,612,331,0.03,0.27,{c:HINOF,f:HINO,face:'W',n:2,h:SUMI,hz:1});
  caisson(g,610,472,612,481,0.03,0.27,{c:HINOF,f:HINO,face:'W',n:1});
  if(!ALT)bx(g,609.2,333,610,462.2,0.03,0.27,HINO);
  g=item('Marche-tiroir');caisson(g,590,292,610,331,0,0.15,{c:HINO,f:HINOF,face:'W',n:1,h:SUMI,hz:1});
  if(ALT){g=item('Lit d\'amis 140 × 190 sorti');bx(g,514.8,333,610,462.2,0.02,0.12,HINOF);literie(g,515.6,333.8,609.2,461.4,0.12,'N',{duvet:T.duvet,plaid:T.plaid});}
  g=item('Banquette basse sur l\'estrade');
  bx(g,615,440,705,482,0.3,0.48,HINOF);bx(g,615,446,705,482,0.48,0.56,T.fut);bx(g,615,474,705,482,0.56,0.88,T.futC);
  T.zab.forEach((c,i)=>bx(g,622+i*28,467,644+i*28,474,0.56,0.8,c));
  g=item('Chabudai 90 × 60 et zabutons');
  bx(g,635,360,696,401,0.6,0.63,0x8c6440);[[637,362],[691,362],[637,396],[691,396]].forEach(p=>bx(g,p[0],p[1],p[0]+3,p[1]+3,0.3,0.6,0x8c6440));
  [[620,370,634,394],[697,370,705,394],[648,345,684,358],[648,403,684,416]].forEach((r,i)=>bx(g,r[0],r[1],r[2],r[3],0.3,0.36,T.zab[i%3]));
  g=item('Meuble TV bas et TV 50"');caisson(g,615,258.4,700,285,0.3,0.62,{c:HINO,f:HINOF,face:'S',n:3});tele(g,622,258.4,693,261.8,1.0,1.58);
  g=item('Table ronde Ø 100 et 4 chaises');
  cy(g,440,375,0.5,0.72,0.75,0x8c6440);cy(g,440,375,0.04,0,0.72,SUMI);cy(g,440,375,0.2,0,0.02,SUMI);
  chaise(g,440,335,'N',0x8c6440,SUMI);chaise(g,440,415,'S',0x8c6440,SUMI);chaise(g,400,375,'W',0x8c6440,SUMI);chaise(g,480,375,'E',0x8c6440,SUMI);
  g=item('Tansu (commode japonaise) 105 × 45');caisson(g,495,463,600,493.6,0,0.85,{c:0x6e4b3a,f:0x7a5440,face:'N',n:3,r:3,h:SUMI});
  plante(g,580,478,0.35,0x3b3f45,0x4f8a45,0.85);
  suspension('Lanterne Akari (table)',440,375,1.5,WASHI,0.22);suspension('Lanterne Akari (estrade)',665,380,1.7,WASHI,0.26);
  g=item('Tabourets de bar');tabouret(g,437,256,0.65,HINO);tabouret(g,437,288,0.65,HINO);
  g=item('Andon (lampe de sol)');bx(g,592,262,606,276,0,0.6,WASHI);
}
function cuisine3(T){
  cuisineMetod();
  let g=item('Noren à l\'entrée de la cuisine',furnTall);[0,1,2].forEach(i=>bx(g,426+i*21,238,446+i*21,239,1.6,2.12,i===1?0x2e3a4a:0x3b5b78));bx(g,424,237.6,489,239.4,2.12,2.14,HINO);
  g=item('Étagère au-dessus de la fenêtre',furnTall);bx(g,470,21.8,516,36,2.15,2.17,HINO);[478,490,502].forEach((x,i)=>cy(g,x,29,0.05,2.17,2.3,[0xe9e4d8,0x3b5b78,0xe9e4d8][i]));
}
function ch1_3(T){
  let g=item('Estrade tatami 3,50 × 2,13 m, h 20 cm, 6 tiroirs');
  caisson(g,440.4,556,680,698.2,0,0.19,{c:HINOF,f:HINO,face:'N',n:6,h:SUMI,hz:1});
  bx(g,440.4,556.8,680,698.2,0.19,0.2,tm2('tatami',(680-440.4)/S,(698.2-556.8)/S));
  g=item('Futon 160 × 200 sur l\'estrade');literie(g,520,562,628.8,698,0.2,'S',{duvet:T.duvet,plaid:T.plaid});
  g=item('Andons de chevet');[[505,680],[644,680]].forEach(p=>{bx(g,p[0]-6,p[1]-6,p[0]+6,p[1]+6,0.2,0.62,WASHI);});
  g=item('Coin méditation : zabuton et table à thé');bx(g,450,590,490,630,0.2,0.26,T.zab[0]);bx(g,452,640,500,670,0.2,0.48,0x8c6440);cy(g,470,655,0.05,0.48,0.56,0xe9e4d8);
  g=item('Bonsaï');plante(g,665,580,0.45,0x3b3f45,0x3f7a3a,0.2);
  g=item('Kakemono (rouleau mural)',furnWall);bx(g,540,500.4,570,501.4,1.0,1.9,0xe9e4d8);
}
function ch2_3(T){
  meuble('Dressing ouvert existant',furnWall,523.4,98,'E',s=>dressingL(s));
  meuble('Armoire BRIMNES (existante)',furnWall,629.8,251.6,'N',brimnesL);
  meuble('Bureau 180 × 80 (existant)',furnGroup,623.3,21.8,'S',bureauL);
  meuble('Siège gaming (existant)',furnGroup,623,100,'S',gamingL);
  let g=item('Écran et lampe');bx(g,592,26,632,32,0.75,1.15,0x151617);lampe(g,575,32,0.75);
  g=item('Étendoir à poulie au plafond',furnTall);[125,140,155,170].forEach(z=>bx(g,590,z,690,z+1.2,2.3,2.33,HINO));[592,686].forEach(x=>bx(g,x,124,x+2,172,2.33,2.36,SUMI));
  [[600,0xffffff],[625,0x3b5b78],[650,0xd9c7a8],[670,0xffffff]].forEach(q=>bx(g,q[0],126,q[0]+14,128,2.0,2.3,q[1]));
  g=item('Planche à repasser murale escamotable',furnWall);caisson(g,707,60,713.2,132,0.3,1.6,{c:WASHI,f:WASHI,face:'W',n:1,h:SUMI});
  g=item('Paniers à linge');cy(g,695,90,0.18,0,0.5,0xc9b48f);
  g=item('Tapis');tapis(g,565,125,690,205,0x8c8a6a,0x7a7858);
}
function entree3(T){
  let g=item('Getabako (meuble à chaussures) 35 cm',furnWall);
  caisson(g,163.8,474,187.6,520,0,2.0,{c:HINO,f:[HINOF,HINO],face:'E',n:1,r:4,h:SUMI});
  g=item('Placard en pont au-dessus de la porte d\'entrée',furnTall);caisson(g,163.8,414,197.8,486,2.1,2.48,{c:HINO,f:HINOF,face:'E',n:2,h:SUMI});
  g=item('Porte-parapluies');cy(g,194,500,0.09,0,0.5,SUMI);
  g=item('Ikebana sur le placard',furnWall);bx(g,240,412,280,414,1.1,1.12,HINO);
}
function sdb3(T){
  etagereSdb();etageresLinge();
  let g=item('Planche de bain et seau en hinoki');bx(g,388,620,434,640,0.55,0.58,HINO);cy(g,411,630,0.1,0.58,0.78,HINOF);
  g=item('Caillebotis hinoki');tapis(g,358,592,386,642,HINO,HINOF);
  g=item('Ikebana au-dessus des WC',furnWall);bx(g,163.8,672,228.6,698.2,1.4,1.42,HINO);cy(g,180,690,0.05,1.42,1.6,0x3b3f45);
}
function balcon3(T){
  let g=item('Bacs à bambous (écran d\'intimité)');
  [[290,440],[470,700],[60,150]].forEach(r=>{bx(g,795,r[0],819,r[1],0,0.55,0x3b3f45);for(let z=r[0]+6;z<r[1]-4;z+=9){cy(g,805+(z%3)*3,z,0.012,0.55,2.0+((z*7)%5)*0.06,0x8aa84a);sp(g,805+(z%3)*3,z,1.75,0.12,0x5a8a3a,1.6);}});
  g=item('Jardin sec (gravier ratissé) et pierre');bx(g,727.6,575,790,705,0,0.05,tm2('gravier',62.4/S,130/S));sp(g,760,640,0.12,0.16,0x7c7f7a,0.6);
  g=item('Banc engawa');bx(g,727.6,225,757,272,0,0.45,HINO);
  g=item('Lanterne tōrō');bx(g,735,40,755,60,0,0.15,0x9a9a92);cy(g,745,50,0.05,0.15,0.6,0x9a9a92);bx(g,733,38,757,62,0.6,0.85,0x8a8a82);bx(g,730,35,760,65,0.85,0.92,0x7a7a72);
  g=item('Armoire de balcon');caisson(g,775,17,819,57.8,0,1.8,{c:0x3b3f45,f:0x4a4f55,face:'S',n:1,h:0x2a2a2a});
}
function sols(){
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[232,350,300,565],[157,350,232,400],[157,490,232,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'ardoise'));
  sol(157,400,232,490,'galets');
  sol(157,565,232,705,'galets');sol(232,565,437,705,'galets');
  sol(437,497,720,705,'hinoki');sol(520,15,720,255,'liege');
}
