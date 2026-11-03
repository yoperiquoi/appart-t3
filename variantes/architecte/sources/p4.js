module.exports={
n:4,
nom:'L\'îlot-table',
court:'Îlot-table',
idee:'la table prolonge le bar de la cuisine sur son axe, avec une banquette contre le mur de l\'entrée : la cuisine, le comptoir et la salle à manger forment une seule épine de 2,85 m, et tout l\'est du séjour devient un vrai salon en L.',
hint:'Table dans l\'axe du bar (4 places + 2 tabourets) · salon en L face à la TV · pose de carrelage en diagonale',
legende:[['#e3d3b5','#ad9a78','Carreaux 30 × 30 en diagonale'],['#efece4','#232426','Damier noir et blanc'],['#6e5340','#3e2c1e','Chêne fumé'],['#d6b88d','#9c7b52','Chevrons chêne']],
palettes:{
  ocre:{b:'Ocre',n:'Ocre',w:{alc:[0xd4a55c,'Mur de la banquette · ocre'],tv:[0x5b6b5d,'Salon mur TV · vert de gris'],ch1:[0xe8d6c0,'Ch. 1 tête de lit · rose poudré'],ch2:[0x8fa3b0,'Ch. 2 mur du BZ · bleu-gris']},f:{sofa:0xd9cfbf,sofaC:0xe8e0d2,cush:0xd4a55c,ban:0x5b6b5d,lin:0xf4f2ec,plaid:0xd4a55c,bz:0x5f6368,bzC:0x8fa3b0,rug:0xcfc4b2,chair:0xcaa97c}},
  ardoise:{b:'Ardoise',n:'Ardoise',w:{alc:[0x4a5560,'Mur de la banquette · ardoise'],tv:[0xc9b9a0,'Salon mur TV · grège'],ch1:[0x6f7d5a,'Ch. 1 tête de lit · lichen'],ch2:[0xd9c3a2,'Ch. 2 mur du BZ · sable']},f:{sofa:0x5a5f66,sofaC:0x6b7178,cush:0xc47a5e,ban:0xc47a5e,lin:0xf7f4ee,plaid:0x6f7d5a,bz:0xd8cfc0,bzC:0x4a5560,rug:0x3a4559,chair:0x2a2a2a}}
},
murs:`
  alc:col=>{paintWall(false,300,232+E*S/2,350,E,1,[],col);paintWall(false,300,350,412,I,1,[],col);},
  tv:col=>paintWall(true,255,520+I*S/2,720-E*S/2,I,-1,[[525,585,'door']],col),
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  ch2:col=>paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col)
`,
passages:[
  ['Entrée → séjour (ouverture)',296.6,412,306.8,516,'z'],
  ['Entrée → salon : bout de l\'îlot-table → mur ch. 1',437,435,495,493.6,'x'],
  ['Séjour : îlot → salon (devant la TV)',470,283,700,339,'x'],
  ['Séjour : entre chaises de l\'îlot et canapé',455,400,510,440,'z'],
  ['Salon : vers la baie',662,290,709,440,'z'],
  ['Cuisine : allée entre plan de travail et METOD',421,90,488,200,'z',90],
  ['Cuisine → séjour : derrière les tabourets',458,256,510,330,'z'],
  ['Ch. 1 : porte → porte-fenêtre (pied de lit)',490,505,640,554,'x'],
  ['Ch. 1 : ruelle est (vers la porte-fenêtre)',656,575,713,670,'z'],
  ['Ch. 2 : porte → porte-fenêtre',590,176,683,224,'x'],
  ['Balcon : allée façade (ch. 2 → séjour → ch. 1)',726.8,160,783,580,'z']
],
pieces:[['Îlot-table','',390,395,0.9,1],['Cuisine','',445,150],['Salon','',600,410],['Chambre','≈ 11,5 m²',577,535],['Bureau · amis','9,0 m²',620,205],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard (dressing intégré)','',368,545,2.55],['Balcon','15,1 m²',775,360]],
code:`
function sejour4(){
  const T=theme(),oakM=0xc9a57a;
  P('Îlot-table 140 × 95 dans l\\'axe du bar',furnGroup,390,385.6,'S',k=>{k.b(-0.475,0.475,-0.7,0.7,0.71,0.75,oakM);[[-0.4,0.62],[0.4,0.62]].forEach(q=>k.b(q[0]-0.03,q[0]+0.03,q[1]-0.03,q[1]+0.03,0,0.71,0x2a2a2a));k.b(-0.03,0.03,-0.66,-0.6,0,0.71,0x2a2a2a);k.c(0.1,0,0.13,0.75,0.79,0xe9e4da);k.s(0.1,0.83,0,0.06,0xd9a441);});
  P('Banquette contre le mur de l\\'entrée 116 × 40',furnGroup,306.8,370,'E',k=>{k.b(-0.58,0.58,0,0.4,0,0.4,0xe9e2d4);k.b(-0.57,0.57,0.02,0.4,0.4,0.47,T.ban);[-0.28,0.28].forEach(x=>k.b(x-0.22,x+0.22,0,0.12,0.47,0.85,T.ban));});
  P('2 chaises côté est',furnGroup,440,385.6,'S',k=>{chairL(k,0,-0.33,'E',T.chair,0x2a2a2a);chairL(k,0,0.33,'E',T.chair,0x2a2a2a);});
  P('2 tabourets de bar côté est',furnGroup,440,288,'S',k=>{stool(k,0,-0.27,0.68,T.chair);stool(k,0,0.27,0.68,T.chair);});
  P('Suspensions ×2 au-dessus de l\\'îlot',furnTall,390,385.6,'S',k=>{pend(k,0,-0.35,1.6,0.16,0x2a2a2a);pend(k,0,0.35,1.6,0.16,0x2a2a2a);});
  P('Bibliothèque de cuisine en niche',furnWall,306.8,292,'E',shelves,1.0,0.3,2.2,6,0xe9e2d4,true);
  P('Canapé d\\'angle : 220 × 95 + méridienne',furnGroup,585.4,493.6,'N',k=>{sofa(k,2.2,0.95,L(T.sofa),L(T.sofaC),{l:false});k.b(-1.1,-0.15,0.95,1.95,0,0.1,0x3a3a3a);k.b(-1.1,-0.15,0.95,1.95,0.1,0.42,L(T.sofa));k.b(-1.08,-0.17,0.95,1.93,0.42,0.5,L(T.sofaC));k.b(-1.1,-0.92,0.95,1.95,0.42,0.62,L(T.sofa));[-0.6,0.4].forEach(x=>k.b(x-0.2,x+0.2,0.21,0.33,0.5,0.86,T.cush));});
  P('Table basse 90 × 50',furnGroup,550,378,'S',k=>{tableR(k,0.9,0.5,0x3a2f26,0x3a2f26,0.4);k.b(-0.3,-0.05,-0.1,0.1,0.4,0.43,0xe9e4da);});
  P('Meuble TV 160 × 35',furnGroup,647,258.4,'S',k=>{cab(k,1.6,0.35,0.48,0x3a2f26,0x4a3a2c,4,0.1);[-0.75,0.75].forEach(x=>k.b(x-0.02,x+0.02,0.05,0.3,0,0.1,0x2a2a2a));});
  P('TV 55" murale',furnTall,647,258.4,'S',tv,1.23);
  P('Suspension du salon',furnTall,560,378,'S',k=>pend(k,0,0,1.75,0.25,0xe9d9b8));
  P('~Tapis du salon',furnGroup,575,385,'S',rug,2.0,1.5,T.rug,0xe6d9c0);
  P('Plante (ficus)',furnGroup,692,470,'S',k=>plant(k,0,0,0.12,1.6,0x3a2f26));
}
function chambre4(){
  const T=theme();
  P('Lit 160 × 200 (tête capitonnée)',furnGroup,598,698.2,'N',fBed,0xa49d99,T.lin,T.plaid);
  P('Chevet ouest',furnGroup,528.4,698.2,'N',fNight);
  P('Chevet est',furnGroup,667.4,698.2,'N',fNight);
  P('Armoire BRIMNES 117 × 50',furnWall,440.4,650,'E',fBrimnes);
  P('Secrétaire 90 × 45 + chaise',furnGroup,440.4,577,'E',k=>{k.b(-0.45,0.45,0,0.45,0.72,0.75,0x6e5340);[-0.42,0.42].forEach(x=>k.b(x-0.02,x+0.02,0.03,0.42,0,0.72,0x3a2f26));k.b(-0.45,0.45,0,0.2,0.75,1.1,0x6e5340);k.k(0.3,0.3,0.06,0.04,0.75,0.95,0xf3ead4);chairL(k,0,0.62,'S',0x3a2f26,0x3a2f26);});
  P('~Tapis de lit',furnGroup,598,610,'S',rug,2.2,1.6,0xd9cbb3);
}
function bureau4(){
  const T=theme();
  P('Bureau 180 × 80 + portable',furnGroup,641,21.8,'S',k=>{fDesk(k,false);k.b(-0.75,-0.43,0.25,0.47,0.75,0.765,0x9aa0a6);k.b(-0.75,-0.43,0.25,0.27,0.765,0.97,0x2a2f36);});
  P('Siège gaming',furnGroup,641,100,'S',fGaming);
  P('BZ 140 × 90 (canapé, couchage d\\'amis)',furnGroup,523.4,127.6,'E',fBZ,L(T.bz),L(T.bzC));
  P('Meuble bas 4 cases 147 × 39',furnGroup,650,251.6,'N',k=>{shelves(k,1.47,0.39,0.77,2,0xf3f2ee,true);plant(k,0.5,0.2,0.08,0.4,0xe9e4da);});
  P('~Tapis',furnGroup,620,120,'S',rug,1.4,1.0,T.rug);
}
function entree4(){
  P('Console étroite 70 × 25 + grand miroir',furnGroup,163.8,497,'E',k=>{k.b(-0.35,0.35,0,0.25,0.8,0.83,0x6e5340);[-0.32,0.32].forEach(x=>k.b(x-0.015,x+0.015,0.02,0.23,0,0.8,0x2a2a2a));k.b(-0.3,0.3,0,0.03,0.9,2.0,0xd9e4e8);k.k(-0.2,0.12,0.06,0.08,0.83,1.0,0xc4704b);k.b(0.1,0.3,0.05,0.2,0.83,0.86,0x2a2a2a);});
  P('Suspension d\\'entrée',furnTall,235,465,'S',k=>pend(k,0,0,2.0,0.2,0xd4a55c));
  P('~Tapis d\\'entrée',furnGroup,235,470,'S',rug,0.8,1.3,0x3a4559,0x5a6579);
}
function bains4(){
  P('Étagère ouverte 60 × 30',furnWall,320,568.4,'S',k=>{shelves(k,0.6,0.3,1.8,5,0x2a2a2a,false);towels(k,0.5,0.06,[0xffffff,0xe6e1d8,0xffffff],0.04,0.28);towels(k,0.5,0.41,[0xd4a55c,0xffffff,0xd4a55c],0.04,0.28);});
  P('Panier à linge',furnGroup,300,670,'S',k=>{k.k(0,0,0.15,0.17,0,0.55,0x2a2a2a);});
  P('Plante',furnGroup,365,585,'S',k=>plant(k,0,0,0.1,0.9,0xffffff));
  P('~Tapis de bain',furnGroup,300,625,'S',rug,0.5,0.8,0x2a2a2a);
  P('Étagère WC + cadre',furnWall,196.2,698.2,'N',k=>{k.b(-0.45,0.45,0,0.18,1.4,1.43,0x6e5340);k.b(-0.2,0.2,0,0.025,1.55,1.95,0x2a2a2a);k.b(-0.17,0.17,0.025,0.03,1.58,1.92,0xd4a55c);});
}
function balcon4(){
  P('Coin salon d\\'angle : 2 fauteuils bas + table',furnGroup,773.9,75,'S',k=>{[-0.38,0.38].forEach(x=>{k.b(x-0.3,x+0.3,-0.55,0.05,0,0.35,0x9a8a74);k.b(x-0.28,x+0.28,-0.53,0.03,0.35,0.42,0xe6dccb);k.b(x-0.3,x+0.3,-0.55,-0.45,0.35,0.75,0x9a8a74);});k.c(0,0.45,0.25,0.38,0.41,0x2a2a2a);k.c(0,0.45,0.03,0,0.38,0x2a2a2a,8);});
  P('Jardinière longue 300 × 35',furnGroup,821,365,'W',jardiniere,3.0,0.35,0.55,0x5c6064,0x7d9270);
  P('Barbecue électrique sur desserte',furnGroup,803,630,'S',k=>{k.b(-0.25,0.25,-0.35,0.35,0,0.8,0x3a3d40);k.b(-0.18,0.18,-0.25,0.25,0.8,0.95,0x1e1f21);});
  P('Grand pot (bout sud)',furnGroup,795,680,'S',k=>plant(k,0,0,0.14,1.2,0xc4704b));
  P('~Dalles bois devant la baie',furnGroup,773.9,365,'S',rug,1.38,2.6,0xa88058);
}
`,
build:`
    sejour4();chambre4();bureau4();entree4();bains4();balcon4();cuisine();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'diag'));
    floor(157,565,232,705,'damier');floor(232,565,437,705,'damier');
    floor(437,497,720,705,'planche');floor(520,15,720,255,'chevron');
`
};
