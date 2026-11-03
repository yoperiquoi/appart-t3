const PROP={
  titre:'2 · Jour / Nuit',sous:'les lits disparaissent le jour',
  alt:['Nuit','Lit plafond descendu dans la chambre 1, lit escamotable 140 ouvert dans la chambre 2'],
  legende:[['#bdbab3','#8f8b83','Grès effet béton 60 × 120'],['#3f7f6b','#d9d6cc','Zellige vert (SDB/WC)'],['#c69a62','#5a4128','Chêne point de Hongrie'],['#d7b77a','#a88a52','Bambou'],['#3b82c4','#1f4f7d','Portes']],
  rooms:[['La grande table (séjour)','',560,300],['Cuisine','',445,150],['Salon de jour (ch. 1)','≈ 11,5 m²',600,560],['Bureau-chambre d\'amis (ch. 2)','≈ 9 m²',640,160],['Entrée','',240,500],['WC','',195,640],['SDB','',320,620],['Balcon','',775,360],['Lit plafond remonté (2,08 m)','',500,630,2.3,1],['Lit escamotable 140 fermé','',635,236,2.0,1],['Table 200 × 90','',563,381,0.85,1],['Bibliothèque-secrétaire','',586,483,2.0,1],['BRIMNES','',696,645,1.95,1]],
  roomsAlt:[['La grande table (séjour)','',560,300],['Chambre (ch. 1)','nuit',600,560],['Chambre d\'amis (ch. 2)','nuit',640,160],['Lit plafond descendu','',500,630,0.7,1],['Lit escamotable ouvert','',635,170,0.7,1],['Siège poussé contre le mur','',565,100,1.4,1]]
};
const PAINTS={
  jour:{b:'Jour',n:'Jour',w:{ch1:[0xd9b77e,'Ch. 1 mur TV · ocre miel'],sej:[0x9db8aa,'Séjour mur bibliothèque · vert sauge'],ch2:[0xe4d4c0,'Ch. 2 mur du bureau · lin']},f:{sofa:0xcfc4b2,sofaC:0xe2d9ca,pc:[0x9db8aa,0xd9b77e,0xe2d9ca],pouf:0xd9b77e,plaid:0x9db8aa,duvet:0xf7f7f5,fau:0x9db8aa}},
  nuit:{b:'Nuit',n:'Nuit',w:{ch1:[0x2c3e50,'Ch. 1 mur TV · bleu nuit'],sej:[0x6e4b3a,'Séjour mur bibliothèque · cacao'],ch2:[0x48604f,'Ch. 2 mur du bureau · vert forêt']},f:{sofa:0x3b4250,sofaC:0x4a5262,pc:[0xc9a04a,0x6e4b3a,0x8fa3b0],pouf:0xc9a04a,plaid:0xc9a04a,duvet:0xdfe3e8,fau:0x6e4b3a}}
};
const PWALLS={
  ch1:col=>paintWall(true,497,437+I*S/2,720-E*S/2,I,1,[[445,490,'door']],col),
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch2:col=>paintWall(true,15,520+I*S/2,720-E*S/2,E,1,[[640,690,'win']],col)
};
const PASSAGES=[
  ['Cuisine : entre plan de travail et METOD',421,90,482.2,235,0.9],
  ['Séjour : entre table et mur de la ch. 2',525,258.4,585,312.8],
  ['Séjour : devant la porte de la chambre 1',445,450,490,493.6],
  ['Séjour : bout de table → baie',640,325,700,420],
  ['Entrée : porte → séjour',212,422,296.6,476.4],
  ['Entrée : devant WC et SDB',180,470,234.4,518],
  ['Ch. 1 : porte → canapé (lit descendu)',556,540,610.4,632],
  ['Ch. 1 : devant la porte',447,503,501.4,548],
  ['Ch. 2 : à côté du lit ouvert',527,125,581.4,198],
  ['SDB : de la porte au lavabo',300,600,354.4,655],
  ['Balcon : ch. 2 ↔ séjour',740,170,794.4,270],
  ['Balcon : séjour ↔ ch. 1',750,455,804.4,515]
];
const CHENE=0xc9a676,BLANC=0xf4f3ef,NOIR=0x2b2c2e;
function amenagement(){const T=theme();sejour2(T);cuisine2(T);ch1_2(T);ch2_2(T);entree2(T);sdb2(T);balcon2(T);}
function sejour2(T){
  let g=item('Table de ferme 200 × 90 (chêne massif)');
  bx(g,495,350,631,411.2,0.72,0.76,0xb88a5a);
  [[499,354],[623,354],[499,403],[623,403]].forEach(p=>bx(g,p[0],p[1],p[0]+4,p[1]+4,0,0.72,0x8c6440));
  g=item('6 chaises + 1 en bout');
  [517,563,609].forEach(x=>{chaise(g,x,333,'N',0x2b2c2e,NOIR);chaise(g,x,428,'S',0x2b2c2e,NOIR);});
  chaise(g,478,380.6,'W',0x2b2c2e,NOIR);
  suspension('Suspension 1',540,380,1.5,0xe9e4d8,0.2);suspension('Suspension 2',590,380,1.5,0xe9e4d8,0.2);
  g=item('Bibliothèque-secrétaire 2,70 m (sur mesure)',furnWall);
  etag(g,495,473.2,678,493.6,0,2.2,[0.02,0.42,0.75,1.15,1.52,1.88,2.18],CHENE,{back:'S',books:true,mid:4,skip:[2],seed:23});
  caisson(g,541,473.2,632,493.6,0.75,1.15,{c:CHENE,f:0xb88a5a,face:'N',n:1,h:NOIR,hz:1});
  g=item('Fauteuil de lecture et lampadaire');
  bx(g,645,265,700,320,0.1,0.42,T.fau);bx(g,645,265,700,276,0.42,0.85,T.fau);bx(g,645,276,655,320,0.42,0.62,T.fau);bx(g,690,276,700,320,0.42,0.62,T.fau);bx(g,655,276,690,320,0.42,0.48,T.sofaC);
  [[646,266],[696,266],[646,316],[696,316]].forEach(p=>bx(g,p[0],p[1],p[0]+3,p[1]+3,0,0.1,0x5a4330));
  lampadaire(g,630,275,1.6);
  g=item('Tabourets de bar');tabouret(g,437,256,0.65,CHENE);tabouret(g,437,288,0.65,CHENE);
  g=item('Olivier en pot');plante(g,693,455,1.0,0xd8cfc0,0x7a9a6a);
  g=item('Tapis sous la table');tapis(g,470,320,655,440,0xd8cfc0,0xc9bfae);
}
function cuisine2(T){
  cuisineMetod();
  let g=item('Étagère haute en pont au-dessus du passage',furnTall);
  bx(g,421,236,490,256,2.12,2.15,CHENE);[430,448,466,482].forEach((x,i)=>cy(g,x,246,0.06,2.15,2.32,[0xffffff,0xd9a441,0x9db8aa,0xe9e4d8][i]));
  g=item('Barre aimantée',furnTall);bx(g,367.6,180,369,238,1.2,1.22,0xb9bcbf);
}
function ch1_2(T){
  let g=item('Rails muraux du lit plafond',furnWall);
  [445,547].forEach(x=>bx(g,x,696.6,x+4,698.2,0,2.48,0x9aa0a6));
  g=item(ALT?'Lit plafond 160 × 200 descendu':'Lit plafond 160 × 200 remonté',ALT?furnGroup:furnTall);
  const y=ALT?0.3:2.08;
  bx(g,442,555.4,555.6,696.6,y,y+0.08,0xe9e4d8);bx(g,442,690,555.6,696.6,y+0.08,y+0.37,0xe9e4d8);
  literie(g,443.6,556,554,690,y+0.08,'S',{duvet:T.duvet,plaid:T.plaid});
  if(!ALT){
    g=item('Tapis de yoga et coussins de sol (sous le lit remonté)');
    tapis(g,452,568,545,684,0x9db8aa,0xb5cbbf);coussin(g,470,590,500,620,0,0.12,T.pouf);coussin(g,505,590,535,620,0,0.12,T.sofaC);
  }
  g=item('Canapé 3 places à coffre');
  canape(g,558,640,678,698.2,'S',T.sofa,T.sofaC,{pc:T.pc,n:3});
  g=item('Pouf');cy(g,640,600,0.25,0,0.42,T.pouf);
  g=item('TV 50" murale et étagère flottante',furnWall);
  tele(g,572,500.4,647,503.8,1.0,1.62);caisson(g,560,500.4,655,520.4,0.35,0.52,{c:CHENE,f:CHENE,face:'S',n:3});
  meuble('Armoire BRIMNES (existante)',furnWall,713.2,644.8,'W',brimnesL);
  g=item('Placard en pont au-dessus de la porte',furnTall);caisson(g,440.4,500.4,500,530,2.1,2.48,{c:BLANC,f:BLANC,face:'S',n:2,h:NOIR});
  g=item('Strelitzia');plante(g,520,522,1);
}
function ch2_2(T){
  let g=item('Caisson du lit escamotable 140 (+ colonne penderie)',furnWall);
  if(!ALT)caisson(g,586,221,684,251.6,0,2.2,{c:BLANC,f:[0xece8df,0xf4f3ef],face:'N',n:2,r:1,h:NOIR,hz:1});
  else{bx(g,586,245,684,251.6,0,2.2,BLANC);bx(g,586,221,588,245,0,2.2,BLANC);bx(g,682,221,684,245,0,2.2,BLANC);bx(g,586,221,684,245,2.05,2.2,BLANC);}
  caisson(g,684.5,221.6,713.2,251.6,0,2.2,{c:BLANC,f:0xece8df,face:'N',n:1,h:NOIR});
  if(ALT){g=item('Lit escamotable 140 × 200 ouvert');bx(g,588,107,682,221,0.08,0.36,0xece8df);[[589,108],[677,108]].forEach(p=>bx(g,p[0],p[1],p[0]+4,p[1]+4,0,0.08,NOIR));literie(g,589,108,681,220,0.36,'S',{duvet:T.duvet,plaid:T.plaid});}
  meuble('Bureau 180 × 80 (existant)',furnGroup,623.3,21.8,'S',bureauL);
  meuble('Siège gaming (existant)',furnGroup,ALT?565:623,100,'S',gamingL);
  g=item('Écrans et lampe');bx(g,592,26,632,32,0.75,1.15,0x151617);lampe(g,570,32,0.75);
  g=item('Étagères hautes à 1,95 m',furnTall);bx(g,523.4,30,537,190,1.95,1.97,CHENE);bx(g,523.4,30,537,190,2.3,2.32,CHENE);livres(g,32,186,false,523.4,536,1.97,0.28,71);livres(g,34,180,false,523.4,536,2.32,0.16,77);
  if(!ALT){g=item('Tapis');tapis(g,560,120,680,205,0x8a6f5a,0x9c8068);}
}
function entree2(T){
  let g=item('Meuble à chaussures basculant 20 cm',furnWall);
  caisson(g,163.8,474,177.4,520,0,1.05,{c:BLANC,f:BLANC,face:'E',n:1,r:3,h:NOIR});
  g=item('Miroir et patères',furnWall);bx(g,163.8,478,164.8,516,1.15,1.85,0xbfd3dc);bx(g,248,412,252,415,1.6,1.65,NOIR);bx(g,266,412,270,415,1.6,1.65,NOIR);bx(g,245,413,255,419,0.9,1.6,0x8a6f5a);
  g=item('Placard en pont au-dessus de la porte d\'entrée',furnTall);caisson(g,163.8,414,197.8,486,2.1,2.48,{c:BLANC,f:BLANC,face:'E',n:2,h:NOIR});
  g=item('Tapis');tapis(g,170,420,228,466,0x6e4b3a,0x5a3d2f);
}
function sdb2(T){
  etagereSdb();
  let g=item('Sèche-linge superposé et placard au-dessus',furnTall);
  bx(g,240,650,285,698,0.87,1.72,0xf6f6f6);disque(g,262.5,650,1.3,0.15,'z',0.01,0x9aa0a6);
  caisson(g,236.8,650,288,698.2,1.75,2.48,{c:BLANC,f:BLANC,face:'N',n:2,h:NOIR});
  g=item('Miroir-armoire au-dessus du lavabo',furnWall);caisson(g,343,688,387,698.2,1.15,1.85,{c:BLANC,f:0xbfd3dc,face:'N',n:2});
  g=item('Placard au-dessus des WC',furnWall);caisson(g,163.8,672,228.6,698.2,1.45,2.4,{c:BLANC,f:BLANC,face:'N',n:2,h:NOIR});
}
function balcon2(T){
  let g=item('Potager vertical en échelle');
  [[458],[505]].forEach(z=>bx(g,727.6,z[0],748,z[0]+2,0,1.6,0x8c6440));
  [0.35,0.8,1.25].forEach((y,i)=>{bx(g,727.6+i*4,460,748,505,y,y+0.03,0x8c6440);for(let z=465;z<503;z+=12)herbe(g,737+i*2,z,y+0.03,0.05,[0x5a9a48,0x7aa64a,0x4f8a45][i]);});
  g=item('Table bistrot pliante et 2 chaises');
  cy(g,780,645,0.3,0.72,0.74,0x3f7f6b);cy(g,780,645,0.02,0,0.72,NOIR);chaise(g,780,616,'N',0x3f7f6b,NOIR);chaise(g,780,674,'S',0x3f7f6b,NOIR);
  g=item('Armoire de balcon 130 × 60');caisson(g,730,17,818,57.8,0,1.8,{c:0x4a4d50,f:0x5c6064,face:'S',n:2,h:0x2a2a2a});
  g=item('Jardinières de garde-corps');[[290,440],[560,700]].forEach(r=>{bx(g,811,r[0],819,r[1],0.8,0.98,0x6d6f72);for(let z=r[0]+8;z<r[1]-4;z+=14)herbe(g,815,z,0.98,0.05,0xd9a441);});
  g=item('Bain de soleil pliant (rangé contre la façade)');bx(g,727.6,230,733,272,0,1.5,0xe9e4d8);
}
function sols(){
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'beton'));
  sol(157,565,232,705,'zellige');sol(232,565,437,705,'zellige');
  sol(437,497,720,705,'chevron');sol(520,15,720,255,'bambou');
}
