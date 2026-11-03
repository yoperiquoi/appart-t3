module.exports={
n:3,
nom:'Les chambres inversées',
court:'Chambres inversées',
idee:'on dort dans la petite chambre, transformée en cabine boisée autour du lit, et on travaille dans la grande, devenue un atelier lumineux ouvert sur le balcon ; le séjour gagne une banquette maçonnée de 2,60 m.',
hint:'Ch. 2 = chambre-cabine · Ch. 1 = atelier (bureau, BZ, dressing en étagères) · vêtements dans le placard du couloir',
legende:[['#ebe5da','#9c8f80','Terrazzo clair'],['#ece6d8','#2f4a5c','Carreaux de ciment'],['#f1efe9','#1f2022','Hexagones noir et blanc'],['#b98a5a','#7a5a3a','Liège'],['#c9b48a','#a08560','Jonc de mer']],
palettes:{
  foret:{b:'Forêt',n:'Forêt',w:{ch2:[0x3d4f43,'Cabine · vert forêt, 4 murs'],sej:[0xd9c3a2,'Séjour mur de la banquette · sable'],ch1:[0xe7dfd0,'Atelier · blanc cassé chaud']},f:{ban:0x6b7f5e,banC:0xd9c3a2,lin:0xf2ece2,plaid:0xd9a441,bz:0xc9b9a0,bzC:0x6b7f5e,rug:0xcfc4b2,chair:0x8b6a4a}},
  brique:{b:'Brique',n:'Brique',w:{ch2:[0x8a4a3a,'Cabine · rouge brique, 4 murs'],sej:[0x9db8aa,'Séjour mur de la banquette · sauge'],ch1:[0xdfe3e0,'Atelier · gris perle']},f:{ban:0xc98066,banC:0xe8dccb,lin:0xf7f4ee,plaid:0x34495e,bz:0x5f6368,bzC:0xc98066,rug:0xd8c7a8,chair:0x2a2a2a}}
},
murs:`
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch1:col=>{paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col);paintWall(false,437,497+I*S/2,705-E*S/2,I,1,[],col);},
  ch2:col=>{paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col);paintWall(true,15,520+I*S/2,720-E*S/2,E,1,[[640,690,'win']],col);paintWall(false,720,15+E*S/2,255-I*S/2,E,-1,[[160,220,'pf']],col);paintWall(true,255,520+I*S/2,720-E*S/2,I,-1,[[525,585,'door']],col);}
`,
passages:[
  ['Entrée → séjour (ouverture)',296.6,412,306.8,516,'z'],
  ['Séjour : table → banquette',420,421,495,493.6,'x'],
  ['Séjour : table basse → baie',640,290,709,440,'z'],
  ['Séjour : derrière les chaises nord → ch. 2',430,258.4,600,318,'x'],
  ['Cuisine : allée entre plan de travail et METOD',421,90,488,200,'z',90],
  ['Cabine : porte → porte-fenêtre',583,172,683,231,'x'],
  ['Atelier : porte → porte-fenêtre',500,536,683,598,'x'],
  ['Atelier : devant le dressing-bibliothèque',475,560,540,636,'z'],
  ['Balcon : allée façade (ch. 2 → séjour → ch. 1)',726.8,100,783,580,'z']
],
pieces:[['Séjour','',600,430],['Cuisine','',445,150],['Banquette maçonnée 2,60 m','',585,478,0.8,1],['Chambre-cabine','9,0 m²',600,215],['Atelier','≈ 11,5 m²',600,575],['Dressing → étagères d\'atelier','',458,620,1.2,1],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard (dressing intégré)','',368,545,2.55],['Balcon','15,1 m²',775,360]],
code:`
function sejour3(){
  const T=theme();
  P('Banquette maçonnée 260 × 70 (tiroirs + coussins)',furnGroup,585.4,493.6,'N',k=>{
    k.b(-1.3,1.3,0,0.7,0,0.4,0xe9e2d4);for(let i=0;i<4;i++){const x=-1.3+i*0.65+0.01;k.b(x,x+0.63,0.7,0.712,0.06,0.36,0xe2dacb);k.b(x+0.25,x+0.38,0.712,0.72,0.3,0.33,0x3a3a3a);}
    k.b(-1.28,1.28,0.18,0.7,0.4,0.5,T.ban);[-0.9,-0.3,0.3,0.9].forEach((x,i)=>k.b(x-0.27,x+0.27,0.02,0.2,0.4,0.85,i%2?T.banC:T.ban));
  });
  P('Étagère haute au-dessus de la banquette',furnWall,585.4,493.6,'N',k=>{k.b(-1.3,1.3,0,0.25,1.55,1.58,0xcaa97c);[[-1.0,0x3b6ea5],[-0.9,0xc65f37],[-0.82,0xe6e1d8],[0.4,0x4f8a45],[0.48,0xd9a441]].forEach(b=>k.b(b[0],b[0]+0.06,0.03,0.22,1.58,1.85,b[1]));k.k(0.9,0.12,0.07,0.09,1.58,1.75,0xc4704b);});
  P('Table basse 110 × 60',furnGroup,600,400,'S',k=>{tableR(k,1.1,0.6,0xcaa97c,0x3a2f26,0.4);k.b(-0.2,0.1,-0.1,0.1,0.4,0.45,0xd9a441);});
  P('Pouf',furnGroup,545,410,'S',k=>k.c(0,0,0.23,0,0.42,T.banC));
  P('Meuble TV 150 × 35',furnGroup,651,258.4,'S',k=>{cab(k,1.5,0.35,0.5,0x3a3a3a,0x4a4644,3,0.1);[-0.7,0.7].forEach(x=>k.b(x-0.02,x+0.02,0.05,0.3,0,0.1,0x2a2a2a));});
  P('TV 55" murale',furnTall,651,258.4,'S',tv,1.23);
  P('~Tapis du salon',furnGroup,590,395,'S',rug,2.4,1.7,T.rug,0xe6d9c0);
  P('Table 140 × 80 + 4 chaises',furnGroup,470,370,'S',k=>{tableR(k,1.4,0.8,0xd8c3a0,0x2a2a2a);[-0.32,0.32].forEach(x=>{chairL(k,x,-0.52,'N',T.chair,0x2a2a2a);chairL(k,x,0.52,'S',T.chair,0x2a2a2a);});});
  P('Suspension linéaire',furnTall,470,370,'S',k=>{k.b(-0.6,0.6,-0.04,0.04,1.6,1.66,0x2a2a2a);[-0.5,0.5].forEach(x=>k.c(x,0,0.005,1.66,2.5,0x2a2a2a,6));});
  P('2 tabourets de comptoir',furnGroup,330,282,'S',k=>{stool(k,0,-0.3,0.68,0xcaa97c);stool(k,0,0.3,0.68,0xcaa97c);});
  P('Plante (kentia)',furnGroup,692,470,'S',k=>plant(k,0,0,0.12,1.7,0x3a3a3a));
}
function cabine(){
  const T=theme(),wd=0xb98d5c,wd2=0xa67b4d;
  P('Tête de lit habitée bois (niches, appliques, placards hauts)',furnWall,523.4,108.9,'E',k=>{
    k.b(-1.28,1.28,0,0.15,0,1.5,wd);
    k.b(-1.28,1.28,0,0.35,1.55,2.45,wd);for(let i=0;i<4;i++){const x=-1.28+i*0.64+0.005;k.b(x,x+0.63,0.35,0.362,1.57,2.43,wd2);k.b(x+0.3,x+0.33,0.362,0.37,1.6,1.75,0x3a3a3a);}
    [[-1.26,-1.0],[1.0,1.26]].forEach(n=>{k.b(n[0],n[1],0.15,0.38,0.5,0.53,wd);k.k((n[0]+n[1])/2,0.27,0.05,0.06,0.53,0.66,0xe9e4da);});
    sconce(k,-1.05,1.1);sconce(k,1.05,1.1);k.g.children.slice(-6).forEach(m=>m.position.z+=0.15);
  });
  P('Lit 160 × 200 à tiroirs',furnGroup,533.6,117,'E',k=>{fBed(k,0x8a6a4c,T.lin,T.plaid,0x6e5340);[-0.5,0.5].forEach(x=>k.b(x-0.3,x+0.3,2.0,2.112,0.08,0.26,0x7a5a3a));});
  P('Ciel de lit : cadre bois et voilage',furnTall,613,117,'S',k=>{k.b(-0.95,0.95,-0.82,-0.78,2.2,2.25,wd);k.b(-0.95,0.95,0.78,0.82,2.2,2.25,wd);k.b(0.91,0.95,-0.82,0.82,2.2,2.25,wd);[-0.8,0.8].forEach(z=>k.b(-0.9,0.93,z-0.005,z+0.005,1.6,2.2,new THREE.MeshLambertMaterial({color:0xf3f1ea,transparent:true,opacity:0.55})));});
  P('Commode étroite 100 × 30',furnGroup,634,251.6,'N',k=>{cab(k,1.0,0.25,0.9,0xe9e2d4,0xdcd3c2,2,0.05);k.k(0.3,0.12,0.07,0.06,0.9,1.15,0x6f8f5a);});
  P('Cadres au-dessus de la commode',furnWall,634,251.6,'N',k=>{frame(k,0.45,0.6,1.3,0x2a2a2a,0xd9c9ab);});
  P('~Tapis berbère',furnGroup,620,205,'S',rug,1.6,0.7,0xefe6d6,0xd9cbb3);
}
function atelier(){
  const T=theme();
  P('Armoire BRIMNES 117 × 50 (linge, matériel)',furnWall,537,500.4,'S',fBrimnes);
  P('Dressing ouvert recyclé en étagères d\\'atelier',furnWall,440.4,620,'E',fDressing);
  P('BZ 140 × 90 (canapé, couchage d\\'amis)',furnGroup,527.6,698.2,'N',fBZ,L(T.bz),L(T.bzC));
  P('Bureau 180 × 80',furnGroup,647,698.2,'N',fDesk);
  P('Siège gaming',furnGroup,647,620,'N',fGaming);
  P('Lampadaire d\\'atelier',furnGroup,600,610,'S',k=>fLamp(k,0,0,0xd9a441));
  P('Plante près de la porte-fenêtre',furnGroup,665,525,'S',k=>plant(k,0,0,0.12,1.3,0xe9e4da));
  P('Panneau perforé au-dessus du bureau',furnWall,647,698.2,'N',k=>{k.b(-0.8,0.8,0,0.02,1.2,1.9,0xcaa97c);[[-0.5,1.5,0x3b6ea5],[0.1,1.6,0xd9a441],[0.5,1.4,0x4f8a45]].forEach(b=>k.b(b[0]-0.12,b[0]+0.12,0.02,0.08,b[1],b[1]+0.15,b[2]));});
  P('~Tapis d\\'atelier',furnGroup,560,600,'S',rug,1.6,1.2,T.rug);
}
function entree3(){
  P('Meuble à chaussures bas 70 × 30 + miroir',furnGroup,163.8,497,'E',k=>{cab(k,0.7,0.3,0.9,0x2f4a5c,0x2f4a5c,2,0.05);k.b(-0.3,0.3,0,0.02,1.15,1.75,0xd9e4e8);k.b(-0.32,0.32,0,0.012,1.13,1.77,0xcaa97c);k.k(0.2,0.15,0.05,0.07,0.9,1.0,0xc4704b);});
  P('Patères murales',furnWall,296.6,540,'W',k=>{k.b(-0.3,0.3,0,0.02,1.6,1.7,0xcaa97c);[-0.2,0,0.2].forEach(x=>k.c(x,0.05,0.012,1.62,1.68,0x2a2a2a,8));});
  P('Applique d\\'entrée',furnWall,163.8,497,'E',k=>sconce(k,0,1.9));
}
function bains3(){
  P('Étagère à échelle 45 × 30',furnGroup,315,568.4,'S',k=>{ladder(k,0.45,1.75,0x2a2a2a);[0.6,1.2].forEach(y=>k.b(-0.22,0.22,0.05,0.28,y,y+0.02,0x2a2a2a));towels(k,0.4,0.62,[0xffffff,0xd9a441,0xffffff],0.08,0.26);});
  P('Colonne de rangement 40 × 30',furnWall,357,568.4,'S',k=>cab(k,0.4,0.3,1.8,0x2a2a2a,0x3a3a3a,1));
  P('Panier à linge',furnGroup,300,670,'S',k=>{k.k(0,0,0.15,0.17,0,0.55,0xc9b48a);});
  P('~Tapis de bain',furnGroup,300,615,'S',rug,0.5,0.8,0xd9a441);
  P('Étagère WC 90 × 20',furnWall,196.2,698.2,'N',k=>{k.b(-0.45,0.45,0,0.2,1.4,1.43,0x2a2a2a);k.b(-0.35,-0.15,0.03,0.17,1.43,1.6,0xffffff);k.b(0.1,0.35,0.03,0.17,1.43,1.55,0xc9b48a);});
}
function balcon3(){
  P('Table pliante murale 120 × 50 + 3 chaises',furnGroup,821,365,'W',k=>{k.b(-0.6,0.6,0,0.5,0.71,0.74,0x2f4a5c);[-0.5,0.5].forEach(x=>k.b(x-0.02,x+0.02,0.05,0.45,0,0.71,0x2a2a2a));bchair(k,-0.85,0.25,'W',0x2f4a5c);bchair(k,0.85,0.25,'E',0x2f4a5c);});
  P('Jardinières en bois 200 × 35',furnGroup,821,140,'W',jardiniere,2.0,0.35,0.55,0xb98d5c);
  P('Fauteuil suspendu sur pied (bout sud)',furnGroup,790,650,'S',k=>{k.c(-0.1,0,0.25,0,0.03,0x2a2a2a);k.c(-0.1,0,0.02,0.03,1.9,0x2a2a2a,8);k.b(-0.1,0.1,-0.01,0.01,1.85,1.9,0x2a2a2a);k.s(0,0.75,0,0.37,0xc9b48a,1.15);k.b(-0.25,0.25,-0.25,0.25,0.6,0.66,0xe6dccb);});
  P('Rangement bas 100 × 50',furnGroup,726.8,60,'E',k=>cab(k,1.0,0.5,0.8,0x5c6064,0x6d7176,2));
  P('~Dalles bois devant la baie',furnGroup,773.9,365,'S',rug,1.38,2.6,0xa88058);
}
`,
build:`
    sejour3();cabine();atelier();entree3();bains3();balcon3();cuisine();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497]].forEach(r=>floor(r[0],r[1],r[2],r[3],'terrazzo'));
    floor(157,350,300,565,'ciment');floor(300,497,437,565,'ciment');
    floor(157,565,232,705,'hexNB');floor(232,565,437,705,'hexNB');
    floor(437,497,720,705,'liege');floor(520,15,720,255,'jonc');
`
};
