const PROP={
  titre:'4 · Les hauteurs',sous:'tout ce qui est au-dessus de 1 m travaille',
  alt:['Tables sorties','Comptoir prolongé avec ses 6 tabourets sortis, table murale du balcon dépliée, échelle de mezzanine posée'],
  legende:[['#ece7de','#8f8a82','Carrelage effet terrazzo 60 × 60'],['#1e1f21','#f2f0ea','Damier noir et blanc 20 × 20'],['#7f8b7c','#738070','Moquette laine (ch. 1)'],['#e3d8c4','#b9ab90','Chêne blanchi (ch. 2)'],['#3b82c4','#1f4f7d','Portes']],
  rooms:[['Séjour','',600,370],['Comptoir prolongé','',390,400,1.0,1],['Cuisine','',445,150],['Chambre perchée (ch. 1)','≈ 11,5 m²',650,560],['Lit haut 1,05 m sur tiroirs','',510,640,1.6,1],['Escalier-coffre','',607,675,1.2,1],['Bureau sous mezzanine (ch. 2)','≈ 9 m²',665,120],['Mezzanine d\'amis 140','',572,90,1.9,1],['Entrée','',240,500],['WC','',195,640],['SDB','',320,620],['Balcon','',775,360],['Bibliothèque qui enjambe la porte','',470,480,2.3,1]]
};
const PAINTS={
  ciel:{b:'Ciel',n:'Ciel',w:{ch1:[0x9fb8c9,'Ch. 1 mur du lit · bleu ciel'],sej:[0xe8dcc6,'Séjour mur bibliothèque · sable'],ch2:[0xd98c5f,'Ch. 2 mur de la mezzanine · abricot']},f:{sofa:0x8a9a8c,sofaC:0x9fae9f,pc:[0xd98c5f,0xe8dcc6,0x9fb8c9],duvet:0xf4f2ec,plaid:0xd98c5f,mat:0x9fb8c9}},
  canopee:{b:'Canopée',n:'Canopée',w:{ch1:[0x48604f,'Ch. 1 mur du lit · vert forêt'],sej:[0x9db8aa,'Séjour mur bibliothèque · sauge'],ch2:[0xc9a04a,'Ch. 2 mur de la mezzanine · moutarde']},f:{sofa:0xc9b48f,sofaC:0xd8c7a8,pc:[0x48604f,0xc9a04a,0x9db8aa],duvet:0xeef0ea,plaid:0x48604f,mat:0x48604f}}
};
const PWALLS={
  ch1:col=>paintWall(false,437,565,705-E*S/2,I,1,[],col),
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch2:col=>paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col)
};
const PASSAGES=[
  ['Cuisine : entre plan de travail et METOD',421,90,482.2,235,0.9],
  ['Séjour : entrée → séjour (sud du comptoir)',330,450,400,504.4],
  ['Séjour : devant la porte de la chambre 2',525,258.4,585,312.8],
  ['Séjour : devant la porte de la chambre 1',445,440,490,493.6],
  ['Séjour : entre canapé et bibliothèque',600,400,660,454.4],
  ['Entrée : porte → séjour',212,422,296.6,476.4],
  ['Entrée : devant WC et SDB',200,470,254.4,518],
  ['Ch. 1 : porte → escalier',495,530,595,584.6],
  ['Ch. 1 : devant l\'escalier',634.2,600,688.6,698],
  ['Ch. 2 : porte → bureau',527,165,581.4,215],
  ['Ch. 2 : devant l\'échelle',636,60,690.4,150],
  ['SDB : de la porte au lavabo',300,600,354.4,655],
  ['Balcon : ch. 2 ↔ séjour',740,170,794.4,270],
  ['Balcon : séjour ↔ ch. 1',760,455,814.4,515]
];
Object.assign(tex,{chenePale:{t:planches('#e3d8c4',['#e6dcc9','#ddd1bb','#e9e0cf','#d9ccb4'],'#b9ab90',5,1.5,44,'#c9bba2'),m:1.4}});
const BL=0xf3f1ec,CH=0xd8c3a0,CHF=0xcbb48c,ACIER=0x2b2c2e;
function amenagement(){const T=theme();sejour4(T);cuisine4(T);ch1_4(T);ch2_4(T);entree4(T);sdb4(T);balcon4(T);}
function sejour4(T){
  let g=item('Comptoir prolongé 150 × 82, h 92 cm, casiers dessous');
  bx(g,362,340,418,442,0.89,0.93,0x3e4044);bx(g,365,343,415,439,0,0.06,ACIER);
  caisson(g,366,344,414,438,0.06,0.6,{c:BL,f:[CH,CHF],face:'W',n:3,r:1});
  [[363,438],[415,438]].forEach(p=>bx(g,p[0],p[1]-2,p[0]+2,p[1]+2,0,0.89,ACIER));
  g=item(ALT?'6 tabourets hauts sortis':'Tabourets rangés sous le comptoir');
  if(ALT){[360,395,428].forEach(z=>{tabouret(g,346,z,0.68,CH);tabouret(g,434,z,0.68,CH);});}
  else{[360,395,428].forEach(z=>tabouret(g,431,z,0.68,CH));}
  g=item('Canapé 3 places à coffres');canape(g,590,258.4,708,323,'N',T.sofa,T.sofaC,{pc:T.pc,n:3});
  g=item('Table basse gigogne et pouf');bx(g,615,345,680,380,0.38,0.41,CH);[[616,346],[676,346],[616,376],[676,376]].forEach(p=>bx(g,p[0],p[1],p[0]+3,p[1]+3,0,0.38,ACIER));cy(g,560,350,0.22,0,0.42,T.pc[0]);
  g=item('Bibliothèque pleine hauteur autour de la TV',furnWall);
  etag(g,492,466.4,560,493.6,0,2.48,[0.02,0.42,0.82,1.22,1.62,2.02,2.46],CH,{back:'S',books:true,seed:31});
  etag(g,620,466.4,678,493.6,0,2.48,[0.02,0.42,0.82,1.22,1.62,2.02,2.46],CH,{back:'S',books:true,seed:37});
  caisson(g,560,466.4,620,493.6,0,0.5,{c:CH,f:CHF,face:'N',n:2});bx(g,560,466.4,620,493.6,2.02,2.04,CH);livres(g,561,619,true,466.4,493,2.04,0.4,41);
  tele(g,562,490.2,618,493.6,0.9,1.4);
  g=item('Pont de bibliothèque au-dessus de la porte de la ch. 1',furnTall);
  caisson(g,440.4,466.4,492,493.6,2.1,2.48,{c:CH,f:CHF,face:'N',n:2});
  g=item('Pont de bibliothèque au-dessus du passage vers l\'entrée',furnTall);
  bx(g,296.6,412,310,516,2.1,2.12,CH);bx(g,296.6,412,310,516,2.46,2.48,CH);livres(g,414,514,false,297,309,2.12,0.3,47);
  g=item('Plantes suspendues près de la baie',furnTall);[[690,340],[690,430]].forEach(p=>{cy(g,p[0],p[1],0.005,2.2,H,0x222222);cy(g,p[0],p[1],0.12,2.08,2.2,0xd8cfc0,16,0.1);sp(g,p[0],p[1],2.02,0.18,0x5a9a48,0.7);});
  g=item('Lampadaire arc');lampadaire(g,700,350,1.7);
}
function cuisine4(T){
  cuisineMetod();
  let g=item('Barre à casseroles suspendue au-dessus du bar',furnTall);
  bx(g,365,250,415,296,2.1,2.12,ACIER);[[372,1.9],[384,1.94],[396,1.88],[408,1.92]].forEach(q=>cy(g,q[0],273,0.1,q[1],q[1]+0.1,0xb9bcbf));
  g=item('Étagère au-dessus de la fenêtre',furnTall);bx(g,470,21.8,516,36,2.15,2.17,CH);
}
function ch1_4(T){
  let g=item('Lit haut 160 × 200 sur 12 tiroirs (plateforme h 1,05 m)',furnWall);
  caisson(g,440.4,585,579.8,698.2,0,1.0,{c:BL,f:[CH,CHF],face:'N',n:4,r:3,h:ACIER});
  bx(g,440.4,585,579.8,698.2,1.0,1.05,CH);
  literie(g,442,587.8,578.2,696.6,1.05,'W',{duvet:T.duvet,plaid:T.plaid});
  bx(g,470,585,579.8,587,1.25,1.42,CH);[470,525,577.8].forEach(x=>bx(g,x,585,x+2,587,1.05,1.42,CH));
  g=item('Escalier-coffre (kaidan) 4 marches',furnWall);
  [[579.8,593.4,1.05],[593.4,607,0.79],[607,620.6,0.53],[620.6,634.2,0.27]].forEach((s,i)=>caisson(g,s[0],650,s[1],698.2,0,s[2],{c:CH,f:CHF,face:'N',n:1,r:Math.max(1,4-i),h:ACIER}));
  g=item('Espalier mural (coin sport)',furnWall);[[610,612],[670,672]].forEach(z=>bx(g,708,z[0],713.2,z[1],0,2.3,CH));for(let y=0.15;y<2.3;y+=0.15)bx(g,709,612,711,670,y,y+0.03,CH);
  g=item('Tapis de sport');tapis(g,640,605,700,690,T.mat,0x5f7f8f);
  g=item('Fauteuil de lecture');bx(g,600,505,655,560,0.1,0.42,T.sofa);bx(g,600,505,655,516,0.42,0.85,T.sofa);bx(g,600,516,610,560,0.42,0.62,T.sofa);bx(g,645,516,655,560,0.42,0.62,T.sofa);bx(g,610,516,645,560,0.42,0.48,T.sofaC);
  g=item('Placard en pont au-dessus de la porte',furnTall);caisson(g,440.4,500.4,500,530,2.1,2.48,{c:BL,f:BL,face:'S',n:2,h:ACIER});
  g=item('Plante suspendue',furnTall);cy(g,628,532,0.005,2.2,H,0x222222);cy(g,628,532,0.12,2.08,2.2,0xd8cfc0,16,0.1);sp(g,628,532,2.0,0.2,0x4f8a45,0.8);
  g=item('Lampadaire de lecture');lampadaire(g,586,515,1.5);
}
function ch2_4(T){
  let g=item('Mezzanine d\'amis 140 × 200 (plancher à 1,48 m)',furnWall);
  bx(g,523.4,21.8,622,161.2,1.48,1.58,CH);
  [[616,21.8],[616,155.2]].forEach(p=>bx(g,p[0],p[1],p[0]+6,p[1]+6,0,1.48,CH));
  literie(g,525,23.4,618,159.6,1.58,'N',{duvet:T.duvet,plaid:T.plaid});
  bx(g,619,21.8,622,118,1.76,2.0,CH);
  g=item(ALT?'Échelle de mezzanine posée':'Échelle de mezzanine accrochée');
  if(ALT){[120,148].forEach(z=>bx(g,622,z,630,z+2,0,1.95,ACIER));for(let y=0.3;y<1.9;y+=0.3)bx(g,622,120,630,150,y,y+0.025,ACIER);}
  else{[120,148].forEach(z=>bx(g,622,z,625,z+2,0.05,1.95,ACIER));for(let y=0.3;y<1.9;y+=0.3)bx(g,622,120,625,150,y,y+0.025,ACIER);}
  meuble('Bureau 180 × 80 (existant)',furnGroup,523.4,92,'E',bureauL);
  meuble('Siège gaming (existant)',furnGroup,600,92,'E',gamingL);
  g=item('Écran et lampe');bx(g,526,72,532,112,0.75,1.15,0x151617);lampe(g,535,135,0.75);
  meuble('Armoire BRIMNES (existante)',furnWall,629.8,251.6,'N',brimnesL);
  g=item('Bibliothèque basse sous la fenêtre');etag(g,640,21.8,700,42,0,0.85,[0.02,0.42,0.83],BL,{back:'N',books:true,seed:53});
  g=item('Tapis');tapis(g,636,70,700,190,0xb3412f,0x9c3a28);
  g=item('Plante');plante(g,690,232,0.7,0xd8cfc0,0x4f8a45);
}
function entree4(T){
  let g=item('Banc à chaussures');caisson(g,163.8,474,197.8,520,0,0.45,{c:BL,f:CH,face:'E',n:2});bx(g,163.8,474,197.8,520,0.45,0.5,T.sofaC);
  g=item('Vélo suspendu au mur',furnWall);[494,538].forEach(z=>{disque(g,170,z,1.55,0.31,'x',0.03,0x1e1f21);disque(g,170,z,1.55,0.27,'x',0.035,0xe9e4d8);});bx(g,168,494,172,538,1.5,1.62,0xb3412f);bx(g,168,500,172,512,1.62,1.8,0xb3412f);bx(g,164.8,512,177,516,1.82,1.86,ACIER);
  g=item('Placard en pont au-dessus de la porte d\'entrée',furnTall);caisson(g,163.8,414,197.8,486,2.1,2.48,{c:BL,f:BL,face:'E',n:2,h:ACIER});
  g=item('Placard en pont au-dessus des portes WC et SDB',furnTall);caisson(g,163.8,540,296.6,561.6,2.1,2.48,{c:BL,f:BL,face:'N',n:4,h:ACIER});
  g=item('Tapis');tapis(g,205,420,260,466,0x2b2c2e,0x3e4044);
}
function sdb4(T){
  etagereSdb();etageresLinge();
  let g=item('Étagères hautes au-dessus de l\'étagère bois',furnTall);[2.0,2.25].forEach(y=>bx(g,296,568.4,336.8,588.8,y,y+0.02,CH));
  g=item('Placard en pont au-dessus de la porte SDB',furnTall);caisson(g,236,568.4,294,590,2.1,2.48,{c:BL,f:BL,face:'S',n:2,h:ACIER});
  g=item('Placard haut au-dessus des WC',furnWall);caisson(g,163.8,672,228.6,698.2,1.45,2.45,{c:BL,f:BL,face:'N',n:2,h:ACIER});
}
function balcon4(T){
  let g=item('Treillis et grimpantes sur la façade',furnWall);
  [[20,155],[580,700]].forEach(r=>{bx(g,727.6,r[0],730,r[1],0,2.2,0x8c6440);for(let z=r[0]+8;z<r[1];z+=16)sp(g,738,z,0.6+((z*13)%17)/10,0.14,0x4f8a45,1.5);});
  g=item(ALT?'Table murale dépliée':'Table murale rabattue');
  if(ALT)bx(g,727.6,460,758.2,512,0.72,0.75,CH);else bx(g,727.6,460,732,512,0.3,0.78,CH);
  g=item('Fauteuil suspendu (œuf en rotin)');sp(g,781,640,0.75,0.42,0xc9a676,1.15);cy(g,781,640,0.01,1.2,H,ACIER);bx(g,766,625,796,655,0.45,0.55,T.sofaC);
  g=item('Jardinières suspendues au garde-corps');[[170,270],[290,440]].forEach(r=>{bx(g,811,r[0],819,r[1],0.8,0.98,0x6d6f72);for(let z=r[0]+8;z<r[1]-4;z+=14)herbe(g,815,z,0.98,0.05);});
  g=item('Armoire haute de balcon');caisson(g,750,17,818,52,0,2.1,{c:0x4a4d50,f:0x5c6064,face:'S',n:2,h:0x2a2a2a});
}
function sols(){
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'terrazzo'));
  sol(157,565,232,705,'damierN');sol(232,565,437,705,'damierN');
  sol(437,497,720,705,'moquette');sol(520,15,720,255,'chenePale');
}
