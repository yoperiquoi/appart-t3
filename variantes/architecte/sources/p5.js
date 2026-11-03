module.exports={
n:5,
nom:'Face au paysage',
court:'Face au paysage',
idee:'le canapé tourne le dos à la cuisine et regarde la baie et le balcon ; le soir, une toile de projection descend devant la baie, qui devient l\'écran. Partout ailleurs, des rangements intégrés du sol au plafond libèrent le centre des pièces.',
hint:'Canapé face à la baie · toile de projection devant la baie · placards intégrés dans chaque pièce',
legende:[['#efeae0','#bdb3a2','Carreaux 20 × 20 blanc cassé'],['#c9825f','#e9dcc8','Zellige terre cuite'],['#d8ccb6','#cfc2aa','Moquette laine'],['#8a6646','#4e3824','Chevrons chêne foncé']],
palettes:{
  petrole:{b:'Pétrole',n:'Pétrole',w:{sej:[0x2f5d62,'Séjour mur de la chambre 2 · bleu pétrole'],ch1:[0xc9a46a,'Ch. 1 tête de lit · ocre doré'],ch2:[0xd9c3a2,'Ch. 2 mur du bureau intégré · sable']},f:{sofa:0xd8cfc0,sofaC:0xe8e0d2,cush:0x2f5d62,lin:0xf4f2ec,plaid:0x2f5d62,bz:0x5f6368,bzC:0xc9a46a,rug:0xcfc4b2,chair:0x8b6a4a,pax:0xf1efe9}},
  cacao:{b:'Cacao',n:'Cacao',w:{sej:[0x6b4a3a,'Séjour mur de la chambre 2 · cacao'],ch1:[0x9db8aa,'Ch. 1 tête de lit · sauge'],ch2:[0x8f8d62,'Ch. 2 mur du bureau intégré · olive']},f:{sofa:0x8a7a66,sofaC:0x9b8a74,cush:0xd9a441,lin:0xf7f4ee,plaid:0x9db8aa,bz:0xd8cfc0,bzC:0x6b4a3a,rug:0xe6d9c0,chair:0x2a2a2a,pax:0xe6dccb}}
},
murs:`
  sej:col=>paintWall(true,255,520+I*S/2,720-E*S/2,I,-1,[[525,585,'door']],col),
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  ch2:col=>paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col)
`,
passages:[
  ['Entrée → séjour (ouverture)',296.6,412,306.8,516,'z'],
  ['Séjour : nord du canapé (vers ch. 2 et baie)',525,258.4,620,315,'x'],
  ['Séjour : sud du canapé (vers la baie)',556,439,620,493.6,'x'],
  ['Séjour : chaise sud → mur ch. 1',437,437,556,493.6,'x'],
  ['Séjour : vers la baie (entre bibliothèque basse et table basse)',622,279,709,346,'x'],
  ['Cuisine : allée entre plan de travail et METOD',421,90,488,200,'z',90],
  ['Ch. 1 : porte → porte-fenêtre (pied de lit)',490,505,640,554,'x'],
  ['Ch. 1 : devant les placards intégrés',480,560,540,670,'z'],
  ['Ch. 2 : porte → porte-fenêtre',583,140,683,216,'x'],
  ['Balcon : allée façade (ch. 2 → séjour → ch. 1)',726.8,110,783,580,'z']
],
pieces:[['Salon face à la baie','',600,470],['Salle à manger','',440,455],['Cuisine','',445,150],['Toile de projection','',706,365,2.4,1],['Chambre','≈ 11,5 m²',577,535],['Placards intégrés 2,25 m','',460,620,1.2,1],['Bureau intégré · amis','9,0 m²',620,205],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard (dressing intégré)','',368,545,2.55],['Balcon','15,1 m²',775,520]],
code:`
function sejour5(){
  const T=theme();
  P('Canapé 3 places 180 × 95 face à la baie',furnGroup,556,377.2,'E',k=>{sofa(k,1.8,0.95,L(T.sofa),L(T.sofaC));[-0.45,0.45].forEach(x=>k.b(x-0.2,x+0.2,0.21,0.33,0.5,0.86,T.cush));});
  P('Table basse 90 × 50',furnGroup,652,377.2,'S',k=>{tableR(k,0.5,0.9,0xcaa97c,0x2a2a2a,0.4);k.k(0,0.2,0.06,0.08,0.4,0.55,0x6f8f5a);});
  P('Toile de projection motorisée (relevée)',furnTall,703,365,'S',k=>{k.b(-0.04,0.04,-1.2,1.2,2.36,2.46,0xf1efe9);k.b(-0.005,0.005,-1.15,1.15,2.2,2.36,0xf7f7f5);});
  P('Vidéoprojecteur au plafond',furnTall,540,377.2,'S',k=>{k.c(0,0,0.02,2.2,2.5,0x2a2a2a,8);k.b(-0.17,0.17,-0.15,0.15,2.1,2.22,0x2a2a2a);k.c(0.17,0,0.04,2.12,2.2,0x111111,12);});
  P('Bibliothèque basse 110 × 30',furnGroup,667,258.4,'S',k=>{shelves(k,1.1,0.3,0.9,2,0xe9e2d4,true);plant(k,0.38,0.15,0.08,0.45,0xc4704b);});
  P('Table ronde Ø 100 + 4 chaises',furnGroup,450,380,'S',k=>{k.c(0,0,0.5,0.72,0.75,0x6e5340);k.c(0,0,0.05,0,0.72,0x2a2a2a);k.c(0,0,0.25,0,0.02,0x2a2a2a);chairL(k,0,-0.6,'N',T.chair,0x2a2a2a);chairL(k,0,0.6,'S',T.chair,0x2a2a2a);chairL(k,-0.6,0,'W',T.chair,0x2a2a2a);chairL(k,0.6,0,'E',T.chair,0x2a2a2a);});
  P('Suspension au-dessus de la table',furnTall,450,380,'S',k=>pend(k,0,0,1.6,0.25,0x2f5d62));
  P('~Tapis du salon',furnGroup,630,377,'S',rug,1.9,1.8,T.rug,0xe6d9c0);
  P('Plante (strelitzia)',furnGroup,692,470,'S',k=>plant(k,0,0,0.12,1.7,0xe9e4da));
  P('Fauteuil de lecture dans la niche',furnGroup,330,262,'S',armchair,L(T.bzC),L(T.cush),0.62);
}
function chambre5(){
  const T=theme();
  P('Placards intégrés 225 × 58 (3 × PAX 75, portes coulissantes)',furnWall,440.4,621.6,'E',k=>{k.b(-1.125,1.125,0,0.58,0,2.36,T.pax);for(let i=0;i<3;i++){const x=-1.125+i*0.75;k.b(x+0.005,x+0.745,0.58,0.6,0.02,2.34,i===1?0xd9e4e8:T.pax);}k.b(-1.125,1.125,0,0.6,2.36,2.5,T.pax);});
  P('Lit 160 × 200 (tête capitonnée)',furnGroup,596.5,698.2,'N',fBed,0xa49d99,T.lin,T.plaid);
  P('Chevets suspendus + tablette',furnWall,596.5,698.2,'N',k=>{[-1.05,1.05].forEach(x=>{k.b(x-0.2,x+0.2,0,0.3,0.42,0.5,0xcaa97c);k.k(x,0.15,0.06,0.04,0.5,0.68,0xf3ead4);});k.b(-0.95,0.95,0,0.15,1.35,1.38,0xcaa97c);});
  P('Plante près de la porte-fenêtre',furnGroup,660,530,'S',k=>plant(k,0,0,0.11,1.2,0xe9e4da));
  P('~Tapis de lit',furnGroup,596.5,610,'S',rug,2.2,1.6,0xe6dccb);
}
function bureau5(){
  const T=theme(),w=0xe9e2d4;
  P('Mur intégré : 2 colonnes + fond de niche',furnWall,523.4,106.8,'E',k=>{
    [[0.9,1.25],[-1.25,-0.9]].forEach(c=>{k.b(c[0],c[1],0,0.5,0,2.5,w);k.b(c[0]+0.005,c[1]-0.005,0.5,0.515,0.02,2.48,0xdcd3c2);});
    k.b(-0.9,0.9,0,0.02,0.75,1.6,0xcaa97c);
  });
  P('Placards hauts au-dessus du bureau',furnTall,523.4,106.8,'E',k=>{k.b(-0.9,0.9,0,0.4,1.6,2.5,w);[-0.9,-0.45,0,0.45].forEach(x=>k.b(x+0.005,x+0.445,0.4,0.415,1.62,2.48,0xdcd3c2));});
  P('Bureau 180 × 80 dans la niche',furnGroup,523.4,106.8,'E',fDesk);
  P('Siège gaming',furnGroup,600,107,'E',fGaming);
  P('BZ 140 × 90 (canapé, couchage d\\'amis)',furnGroup,706,88,'W',fBZ,L(T.bz),L(T.bzC));
  P('Armoire BRIMNES 117 × 50',furnWall,640,251.6,'N',fBrimnes);
  P('~Tapis',furnGroup,620,110,'S',rug,1.5,1.1,T.rug);
}
function entree5(){
  P('Vestiaire intégré 70 × 35 avec niche-banc',furnWall,163.8,497.5,'E',k=>{k.b(-0.35,0.35,0,0.35,0,0.45,0xe9e2d4);k.b(-0.35,0.35,0,0.35,0.9,2.5,0xe9e2d4);k.b(-0.35,0.35,0,0.05,0.45,0.9,0xe9e2d4);k.b(-0.34,0.34,0.05,0.35,0.45,0.5,0xcaa97c);k.b(-0.345,0.345,0.35,0.362,0.92,2.48,0xdcd3c2);k.b(0.25,0.27,0.362,0.37,1.3,1.6,0x3a3a3a);});
  P('Suspension d\\'entrée',furnTall,235,465,'S',k=>pend(k,0,0,2.0,0.18,0x2f5d62));
  P('~Paillasson',furnGroup,190,442,'S',rug,0.5,0.8,0x8a7a66);
}
function bains5(){
  P('Placard au-dessus du lave-linge',furnTall,262,698.2,'N',k=>{k.b(-0.38,0.38,0,0.45,1.15,2.4,0xe9e2d4);k.b(-0.375,0.375,0.45,0.462,1.17,2.38,0xdcd3c2);});
  P('Colonne de rangement 40 × 30',furnWall,357,568.4,'S',k=>cab(k,0.4,0.3,2.0,0xe9e2d4,0xdcd3c2,1));
  P('Porte-serviettes',furnWall,315,568.4,'S',k=>{k.b(-0.25,0.25,0.06,0.08,1.0,1.02,0xb9bcbf);k.b(-0.2,0.2,0.04,0.1,0.85,1.02,0xc9825f);});
  P('~Tapis de bain',furnGroup,300,615,'S',rug,0.5,0.8,0xe9dcc8);
  P('Placard au-dessus du WC',furnWall,196.2,698.2,'N',k=>{k.b(-0.45,0.45,0,0.25,1.3,1.88,0xe9e2d4);k.b(-0.445,0.445,0.25,0.262,1.32,1.86,0xdcd3c2);});
}
function balcon5(){
  P('Banc-coffre intégré 300 × 55',furnGroup,821,365,'W',k=>{k.b(-1.5,1.5,0,0.55,0,0.45,0xa88058);k.b(-1.48,1.48,0.02,0.53,0.45,0.52,0xe6dccb);[-1.0,-0.3,0.4,1.1].forEach(x=>k.b(x-0.25,x+0.25,0.02,0.14,0.52,0.85,0x2f5d62));});
  P('Placard de balcon intégré 120 × 60 × 200',furnGroup,726.8,62,'E',k=>cab(k,1.2,0.6,2.0,0x4a4d50,0x5c6064,2));
  P('Table d\\'appoint',furnGroup,800,238,'S',k=>{k.c(0,0,0.22,0.42,0.45,0x2a2a2a);k.c(0,0,0.03,0,0.42,0x2a2a2a,8);});
  P('Jardinières (bout sud)',furnGroup,821,640,'W',jardiniere,1.6,0.4,0.6,0x6d5a48);
  P('~Dalles bois devant la baie',furnGroup,773.9,365,'S',rug,1.38,3.0,0xa88058);
}
`,
build:`
    sejour5();chambre5();bureau5();entree5();bains5();balcon5();cuisine();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'carreau20'));
    floor(157,565,232,705,'zelTerre');floor(232,565,437,705,'zelTerre');
    floor(437,497,720,705,'moquetteB');floor(520,15,720,255,'chevronD');
`
};
