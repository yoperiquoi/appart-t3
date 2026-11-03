module.exports={
n:1,
nom:'La salle commune',
court:'Salle commune',
idee:'le séjour devient une grande salle à vivre autour d\'une table d\'hôte, sans canapé ni télé ; l\'écran part dans la chambre 2 transformée en cocon.',
hint:'Séjour sans canapé ni télé : table d\'hôte, buffet, bibliothèque · Ch. 2 = cocon TV-jeux-amis',
legende:[['#bc5a3c','#e8d7bf','Tomettes hexagonales'],['#357562','#d9d4c4','Zellige vert'],['#d6b88d','#9c7b52','Chêne en chevrons'],['#2f3a4f','#283246','Moquette bouclée']],
palettes:{
  argile:{b:'Argile',n:'Argile',w:{sej:[0xcf9473,'Séjour mur du buffet · argile'],ch2:[0x2e3b52,'Cocon · bleu nuit, 4 murs'],ch1:[0xc9a46a,'Ch. 1 tête de lit · ocre'],alc:[0xcf9473,'Niche bibliothèque · argile']},f:{bz:0x9a4f3a,bzC:0xd9a441,plaid:0xc47a5e,lin:0xf2ece2,arm:0x6b7f5e,armC:0x7d9270,chair:0x8b6a4a,rug:0xd8c7a8}},
  olive:{b:'Olive',n:'Olive',w:{sej:[0x8f8d62,'Séjour mur du buffet · olive'],ch2:[0x3f4a3c,'Cocon · vert forêt, 4 murs'],ch1:[0xd8c3a5,'Ch. 1 tête de lit · lin'],alc:[0x8f8d62,'Niche bibliothèque · olive']},f:{bz:0xc9b9a0,bzC:0x6b7f5e,plaid:0x8f8d62,lin:0xf7f4ee,arm:0xb86b4f,armC:0xc98066,chair:0x3a3a3a,rug:0xcfc4b2}}
},
murs:`
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  alc:col=>paintWall(false,300,232+E*S/2,350,E,1,[],col),
  ch2:col=>{paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col);paintWall(true,15,520+I*S/2,720-E*S/2,E,1,[[640,690,'win']],col);paintWall(false,720,15+E*S/2,255-I*S/2,E,-1,[[160,220,'pf']],col);paintWall(true,255,520+I*S/2,720-E*S/2,I,-1,[[525,585,'door']],col);}
`,
passages:[
  ['Entrée → séjour (ouverture)',296.6,412,306.8,516,'z'],
  ['Séjour : derrière le banc (nord de la table)',520,258.4,620,315,'x'],
  ['Séjour : derrière les chaises (sud de la table)',510,418,672,472,'x'],
  ['Séjour : bout de table → baie',654,312,709,455,'z'],
  ['Séjour → porte ch. 1',445,420,490,490,'z'],
  ['Cuisine : allée entre plan de travail et METOD',421,90,488,200,'z',90],
  ['Ch. 1 : porte → porte-fenêtre (pied de lit)',490,505,640,554,'x'],
  ['Ch. 2 : porte → porte-fenêtre',583,172,683,230,'x'],
  ['Balcon : allée le long de la façade',726.8,100,781,700,'z'],
  ['Entrée : devant le banc',190,420,296.6,520,'z']
],
pieces:[['Salle commune','28,2 m²',430,455],['Cuisine','',445,150],['Table d\'hôte','',585,352,0.9,1],['Bibliothèque de niche','',318,300,2.3,1],['Chambre','≈ 11,5 m²',577,535],['Cocon TV · jeux · amis','9,0 m²',620,200],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard (dressing intégré)','',368,545,2.55],['Balcon potager','15,1 m²',775,360]],
code:`
function salleCommune(){
  const T=theme(),oakM=0xb98d5c,dk=0x3a2f26;
  P('Table d\\'hôte 200 × 85 + banc + 4 chaises',furnGroup,585,365,'S',k=>{
    tableR(k,2.0,0.85,oakM,0x7a5a3a,0.75);
    k.b(-0.9,0.9,-0.725,-0.375,0.41,0.45,oakM);[-0.8,0.8].forEach(x=>k.b(x-0.03,x+0.03,-0.7,-0.4,0,0.41,0x7a5a3a));
    [-0.66,0,0.66].forEach(x=>chairL(k,x,0.545,'S',T.chair));
    chairL(k,-1.12,0,'W',T.chair);
    k.c(0.15,0,0.12,0.75,0.8,0xe9e4da);k.s(0.15,0.84,0,0.06,0xd9a441);k.s(0.2,0.83,0.04,0.05,0xb3262d);
  });
  P('Suspensions ×3 au-dessus de la table',furnTall,585,365,'S',k=>[-0.7,0,0.7].forEach(x=>pend(k,x,0,1.6,0.19,0xe2c9a0)));
  P('Buffet bas 240 × 30',furnGroup,590,493.6,'N',k=>{cab(k,2.4,0.3,0.85,0xd8c7a8,0xc9b493,4,0.1);[-1.1,1.1].forEach(x=>k.b(x-0.02,x+0.02,0.03,0.27,0,0.1,dk));k.k(-0.8,0.15,0.08,0.11,0.85,1.12,0x6f8f5a);k.c(0.7,0.15,0.06,0.85,0.88,0xcaa97c);k.c(0.7,0.15,0.01,0.88,1.12,0x3a3a3a,8);k.k(0.7,0.15,0.12,0.08,1.1,1.28,0xf3ead4);});
  P('Cadres au-dessus du buffet',furnWall,590,493.6,'N',k=>{const f=(x,w,h,y,a)=>{k.b(x-w/2,x+w/2,0,0.025,y,y+h,0x2a2a2a);k.b(x-w/2+0.03,x+w/2-0.03,0.025,0.03,y+0.03,y+h-0.03,a);};f(-0.45,0.5,0.7,1.25,0xd9c9ab);f(0.2,0.7,0.5,1.35,0x9db8aa);f(0.75,0.3,0.4,1.3,0xc47a5e);});
  P('Fauteuil de lecture',furnGroup,679,262,'S',armchair,T.arm,T.armC,0.7);
  P('Lampadaire de lecture',furnGroup,640,275,'S',k=>fLamp(k,0,0));
  P('Bibliothèque de niche 150 × 32 × 220',furnWall,306.8,293,'E',shelves,1.5,0.32,2.2,6,0xe9e2d4,true);
  P('Plante (ficus lyrata)',furnGroup,692,470,'S',k=>plant(k,0,0,0.12,1.7,0xc4704b));
  P('Plante haute près de la cuisine',furnGroup,505,268,'S',k=>plant(k,0,0,0.11,1.3,0xe9e4da,0x5f8f4a));
  P('~Tapis sous la table',furnGroup,585,365,'S',rug,2.6,1.9,T.rug,0xe6d9c0);
}
function cocon(){
  const T=theme();
  P('Bureau 180 × 80',furnGroup,523.4,110,'E',fDesk,false);
  P('TV 55" murale au-dessus du bureau',furnTall,523.4,110,'E',k=>{k.b(-0.62,0.62,0,0.05,1.12,1.83,0x151617);k.b(-0.6,0.6,0.05,0.052,1.14,1.81,0x2a2f36);});
  P('Siège gaming',furnGroup,600,110,'E',fGaming);
  P('BZ 140 × 90 (canapé et lit d\\'amis)',furnGroup,706,88,'W',fBZ,L(T.bz),L(T.bzC));
  P('Étagères 160 × 30 × 180',furnWall,650,251.6,'N',shelves,1.6,0.3,1.8,5,0xf3f2ee,true);
  P('Panneaux acoustiques en feutre',furnWall,580,21.8,'S',k=>{[-0.42,0.02,0.46].forEach((x,i)=>k.b(x-0.18,x+0.18,0,0.03,1.0,1.9,[0x6b4f3a,0x8a5a3c,0x4a5a4a][i]));});
  P('Lampe d\\'appoint',furnGroup,615,38,'S',k=>fLamp(k,0,0,0xe2c9a0));
  P('~Tapis épais',furnGroup,620,112,'S',rug,1.7,1.3,0x9a4f3a,0xb86b4f);
}
function chambre(){
  const T=theme();
  P('Lit 160 × 200 (tête capitonnée)',furnGroup,576.8,698.2,'N',fBed,0xa49d99,T.lin,T.plaid);
  P('Chevet ouest',furnGroup,507,698.2,'N',fNight);
  P('Chevet est',furnGroup,646.6,698.2,'N',fNight);
  P('Armoire BRIMNES 117 × 50',furnWall,440.4,630,'E',fBrimnes);
  P('Fauteuil côté balcon',furnGroup,688,692.6,'N',armchair,T.arm,T.armC,0.7);
  P('Lampadaire',furnGroup,697,628,'S',k=>fLamp(k,0,0));
  P('Cadre au-dessus du lit',furnWall,576.8,698.2,'N',k=>frame(k,1.1,0.55,1.35,0x2a2a2a,0xd9c9ab));
  P('~Tapis de lit',furnGroup,576.8,610,'S',rug,2.2,1.6,0xe6dccb);
}
function entree(){
  P('Banc à chaussures + patères + miroir',furnGroup,163.8,497,'E',k=>{k.b(-0.35,0.35,0,0.34,0.42,0.47,0xb98d5c);[-0.32,0.32].forEach(x=>k.b(x-0.02,x+0.02,0.02,0.32,0,0.42,0x3a2f26));k.b(-0.33,0.33,0.03,0.31,0.1,0.12,0x3a2f26);[[-0.2,0x2a2a2a],[0.05,0x8b6a4a],[0.22,0xe9e4da]].forEach(s=>k.b(s[0]-0.06,s[0]+0.06,0.06,0.3,0.12,0.2,s[1]));k.b(-0.35,0.35,0,0.02,1.55,1.62,0xb98d5c);[-0.25,0,0.25].forEach(x=>k.b(x-0.012,x+0.012,0.02,0.08,1.5,1.56,0x2a2a2a));k.b(-0.25,0.25,0,0.02,0.9,1.45,0xd9e4e8);});
  P('Suspension d\\'entrée',furnTall,235,465,'S',k=>pend(k,0,0,2.0,0.17,0xc4704b));
  P('~Paillasson',furnGroup,190,442,'S',rug,0.5,0.8,0x8a7a66);
}
function bains(){
  P('Échelle porte-serviettes',furnGroup,315,568.4,'S',k=>{ladder(k,0.45,1.7,0xcaa97c);[[0.3,0xf2ece2],[0.6,0x357562],[0.9,0xf2ece2]].forEach(t=>k.b(-0.2,0.2,0.12,0.2,t[0]-0.15,t[0]+0.02,t[1]));});
  P('Colonne d\\'étagères 40 × 30',furnWall,357,568.4,'S',shelves,0.4,0.3,1.8,5,0xcaa97c,false);
  P('Panier à linge',furnGroup,300,670,'S',k=>{k.k(0,0,0.15,0.17,0,0.55,0xc9b48a);});
  P('Étagère au-dessus du lave-linge',furnTall,262,698.2,'N',k=>{[1.3,1.65].forEach(y=>{k.b(-0.38,0.38,0,0.24,y,y+0.025,0xcaa97c);[[-0.28,0xffffff],[-0.12,0x357562],[0.05,0xd9a441],[0.22,0xe9e4da]].forEach(b=>k.b(b[0]-0.05,b[0]+0.05,0.05,0.18,y+0.025,y+0.22,b[1]));});});
  P('~Tapis de bain',furnGroup,300,620,'S',rug,0.5,0.8,0xf2ece2);
  P('Étagère WC + plante retombante',furnWall,196.2,698.2,'N',k=>{k.b(-0.45,0.45,0,0.2,1.4,1.43,0xcaa97c);k.k(-0.25,0.1,0.06,0.07,1.43,1.55,0xe9e4da);k.s(-0.25,1.58,0.1,0.09,0x4f8a45,0.8);k.b(0.05,0.3,0.03,0.17,1.43,1.58,0xc9b48a);});
}
function balcon(){
  P('Jardinières potager 200 × 40',furnGroup,821,120,'W',jardiniere,2.0,0.4,0.6,0x6d5a48);
  P('Jardinières aromatiques 120 × 40',furnGroup,821,480,'W',jardiniere,1.2,0.4,0.6,0x6d5a48);
  P('Table bistro Ø 56 + 2 chaises',furnGroup,801,330,'S',k=>{k.c(0,0,0.28,0.71,0.74,0x2f5d50);k.c(0,0,0.02,0,0.71,0x2a2a2a,8);k.c(0,0,0.18,0,0.02,0x2a2a2a);bchair(k,0,-0.45,'N');bchair(k,0,0.45,'S');});
  P('Chaise longue',furnGroup,801,650,'S',k=>{k.b(-0.28,0.28,-0.95,0.95,0.25,0.33,0x8a7a66);k.b(-0.26,0.26,-0.93,0.93,0.33,0.38,0xe6dccb);k.b(-0.26,0.26,0.55,0.62,0.38,0.8,0xe6dccb);[[-0.24,-0.9],[0.24,-0.9],[-0.24,0.9],[0.24,0.9]].forEach(q=>k.b(q[0]-0.02,q[0]+0.02,q[1]-0.02,q[1]+0.02,0,0.25,0x6d5a48));});
  P('Armoire de balcon 100 × 55 × 160',furnGroup,726.8,60,'E',k=>cab(k,1.0,0.55,1.6,0x4a4d50,0x5c6064,2));
  P('~Dalles bois RUNNEN devant la baie',furnGroup,773.9,365,'S',rug,1.38,2.6,0xa88058);
}
`,
build:`
    salleCommune();cocon();chambre();entree();bains();balcon();cuisine();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'tomette'));
    floor(157,565,232,705,'zelVert');floor(232,565,437,705,'zelVert');
    floor(437,497,720,705,'chevron');floor(520,15,720,255,'moquette');
`
};
