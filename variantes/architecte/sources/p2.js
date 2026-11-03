module.exports={
n:2,
nom:'La bibliothèque traversante',
court:'Bibliothèque traversante',
idee:'un meuble double face sur l\'axe du mur de la cuisine coupe le séjour en deux pièces : salle à manger côté cuisine, salon côté baie avec un canapé flottant et une galerie derrière lui.',
hint:'Séjour en deux pièces · METOD recyclés en socle de bibliothèque · Ch. 2 = bureau + lit escamotable',
legende:[['#cfc8bd','#a69d8f','Grès 60 × 120 pose décalée'],['#ebe5da','#9c8f80','Terrazzo 60 × 60'],['#e3cfaf','#a88b62','Chêne clair grandes lames']],
palettes:{
  sauge:{b:'Sauge',n:'Sauge',w:{sej:[0x9db8aa,'Salon mur TV · vert sauge'],ch1:[0xe2cdb4,'Ch. 1 au-dessus du lambris · rose sable'],ch2:[0xc98a5e,'Ch. 2 mur du lit escamotable · terracotta']},f:{sofa:0xd9cfbf,sofaC:0xe8e0d2,lambris:0x9db8aa,lin:0xf7f4ee,plaid:0xc98a5e,rug:0xcfc4b2,chair:0x2a2a2a,cush:0x9db8aa}},
  encre:{b:'Encre',n:'Encre',w:{sej:[0x2f3e57,'Salon mur TV · bleu encre'],ch1:[0xd9d4c7,'Ch. 1 au-dessus du lambris · grège'],ch2:[0x6f7d5a,'Ch. 2 mur du lit escamotable · lichen']},f:{sofa:0x8a8f96,sofaC:0x9fa5ab,lambris:0x2f3e57,lin:0xf4f2ec,plaid:0xd9a441,rug:0x3a4559,chair:0x8b6a4a,cush:0xd9a441}}
},
murs:`
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch1:col=>pface(true,705,437+I*S/2,720-E*S/2,E,-1,1.25,H,col),
  ch2:col=>paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col)
`,
passages:[
  ['Entrée → séjour (ouverture)',296.6,412,306.8,516,'z'],
  ['Galerie derrière le canapé (vers ch. 2 et baie)',545,258.4,681,313,'x'],
  ['Bibliothèque : passage nord',512,258.4,541,329,'x'],
  ['Bibliothèque : passage sud',512,439,541,493.6,'x'],
  ['Salon : allée canapé → baie',545,379,709,466,'x'],
  ['Salle à manger : chaise sud → mur ch. 1',437,433,500,493.6,'x'],
  ['Cuisine : allée (METOD sortis)',421,90,516,200,'z',90],
  ['Ch. 1 : porte → porte-fenêtre (pied de lit)',490,505,640,554,'x'],
  ['Ch. 2 : porte → porte-fenêtre',583,185,683,230,'x'],
  ['Balcon : allée façade (ch. 2 → séjour → ch. 1)',726.8,100,783,580,'z']
],
pieces:[['Salle à manger','',420,455],['Salon','',625,430],['Bibliothèque traversante','',527,385,2.2,1],['Cuisine','',445,150],['Chambre','≈ 11,5 m²',577,535],['Bureau · lit d\'amis escamotable','9,0 m²',620,200],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard (dressing intégré)','',368,545,2.55],['Balcon salon','15,1 m²',760,520]],
code:`
function sejourDeuxPieces(){
  const T=theme();
  P('Bibliothèque traversante : socle 2 METOD/MAXIMERA',furnGroup,540,384.4,'W',fMetod,0xd9c9ab);
  const up=P('Bibliothèque traversante : étagères ajourées double face',furnTall,540,384.4,'W',k=>{shelves(k,1.6,0.4,1.14,3,0xd9c9ab,true);plant(k,0.5,0.2,0.07,0.3,0xe9e4da);});
  up.position.y=0.91;
  P('Canapé 3 places 200 × 95',furnGroup,613,313.5,'S',k=>{sofa(k,2.0,0.95,L(T.sofa),L(T.sofaC));[-0.55,0.55].forEach(x=>k.b(x-0.2,x+0.2,0.21,0.33,0.5,0.88,T.cush));});
  P('Bout de canapé + lampe',furnGroup,695,335,'S',k=>{k.c(0,0,0.19,0.5,0.53,0xcaa97c);k.c(0,0,0.02,0,0.5,0x2a2a2a,8);k.c(0,0,0.12,0,0.02,0x2a2a2a);k.c(0,0,0.06,0.53,0.56,0x2a2a2a);k.c(0,0,0.01,0.56,0.8,0x2a2a2a,8);k.k(0,0,0.13,0.08,0.78,0.95,0xf3ead4);});
  P('Meuble TV 160 × 40',furnGroup,625,493.6,'N',k=>{cab(k,1.6,0.4,0.45,0xf1efe9,0xe6e2d8,3,0.12);[-0.75,0.75].forEach(x=>k.b(x-0.02,x+0.02,0.05,0.35,0,0.12,0x2a2a2a));});
  P('TV 55" murale',furnTall,625,493.6,'N',tv,1.23);
  P('~Tapis du salon',furnGroup,613,415,'S',rug,2.2,1.5,T.rug);
  P('Table ronde Ø 110 + 4 chaises',furnGroup,440,375,'S',k=>{k.c(0,0,0.55,0.72,0.75,0xd8c3a0);k.c(0,0,0.05,0,0.72,0x2a2a2a);k.c(0,0,0.25,0,0.02,0x2a2a2a);chairL(k,0,-0.62,'N',T.chair,0x2a2a2a);chairL(k,0,0.62,'S',T.chair,0x2a2a2a);chairL(k,-0.62,0,'W',T.chair,0x2a2a2a);chairL(k,0.62,0,'E',T.chair,0x2a2a2a);});
  P('Suspension au-dessus de la table',furnTall,440,375,'S',k=>pend(k,0,0,1.55,0.3,0xe9d9b8));
  P('Coin plantes (strelitzia + monstera)',furnGroup,331,300,'S',k=>{plant(k,0,-0.35,0.15,1.8,0xe9e4da);plant(k,0.02,0.4,0.13,1.2,0xc4704b,0x5f8f4a);});
}
function bureauAmis(){
  const T=theme();
  P('Lit escamotable 140 × 200 (fermé) + colonne penderie',furnWall,523.4,131,'E',k=>{
    k.b(-0.78,0.78,0,0.45,0,2.2,0xf1efe9);k.b(-0.74,0.74,0.45,0.47,0.05,2.1,0xe9e2d4);k.b(-0.3,0.3,0.47,0.49,1.0,1.04,0xb9bcbf);
    k.b(0.78,1.6,0,0.45,0,2.2,0xf1efe9);k.b(0.8,1.58,0.45,0.465,0.05,2.15,0xe9e2d4);k.b(0.82,0.86,0.465,0.48,0.9,1.2,0x9aa0a6);
  });
  P('Bureau 180 × 80 + portable',furnGroup,641,21.8,'S',k=>{fDesk(k,false);k.b(-0.75,-0.43,0.25,0.47,0.75,0.765,0x9aa0a6);k.b(-0.75,-0.43,0.25,0.27,0.765,0.97,0x2a2f36);});
  P('Siège gaming',furnGroup,641,100,'S',fGaming);
  P('Étagères 160 × 30 × 180',furnWall,650,251.6,'N',shelves,1.6,0.3,1.8,5,0xf3f2ee,true);
  P('~Tapis du bureau',furnGroup,640,110,'S',rug,1.5,1.1,T.rug);
}
function chambreHotel(){
  const T=theme();
  tface(true,705,437+I*S/2,720-E*S/2,E,-1,0,1.25,L(T.lambris));
  P('Lit 160 × 200 (tête capitonnée)',furnGroup,576.8,698.2,'N',fBed,0xa49d99,T.lin,T.plaid);
  P('Chevet ouest',furnGroup,507,698.2,'N',fNight,0xe9e4da,false);
  P('Chevet est',furnGroup,646.6,698.2,'N',fNight,0xe9e4da,false);
  P('Tablette de lambris + appliques',furnWall,576.8,698.2,'N',k=>{k.b(-1.12,1.12,0,0.1,1.25,1.28,0xcaa97c);sconce(k,-1.02,1.05);sconce(k,1.02,1.05);});
  P('Armoire BRIMNES 117 × 50',furnWall,440.4,630,'E',fBrimnes);
  P('Coiffeuse 90 × 40 + miroir',furnGroup,713.2,641,'W',k=>{k.b(-0.45,0.45,0,0.4,0.72,0.75,0xcaa97c);[-0.42,0.42].forEach(x=>k.b(x-0.02,x+0.02,0.03,0.37,0,0.72,0x3a3a3a));k.b(-0.3,0.3,0,0.02,1.0,1.6,0xd9e4e8);k.k(0.3,0.2,0.07,0.05,0.75,0.95,0xf3ead4);});
  P('~Tapis de lit',furnGroup,576.8,610,'S',rug,2.2,1.6,0xe6dccb);
}
function entree2(){
  P('Colonne à chaussures 60 × 30 × 180',furnGroup,163.8,496.5,'E',k=>cab(k,0.6,0.3,1.8,0xf1efe9,0xe9e2d4,2));
  P('Miroir rond',furnWall,296.6,540,'W',k=>{k.b(-0.25,0.25,0,0.02,1.2,1.7,0xd9e4e8);k.b(-0.27,0.27,0,0.012,1.18,1.72,0x2a2a2a);});
  P('Suspension d\\'entrée',furnTall,235,465,'S',k=>pend(k,0,0,2.0,0.17,0x2a2a2a));
  P('~Tapis d\\'entrée',furnGroup,235,470,'S',rug,0.8,1.2,0x8a7a66,0xa8987f);
}
function bains2(){
  P('Meuble colonne 40 × 30',furnWall,357,568.4,'S',k=>cab(k,0.4,0.3,1.8,0xf1efe9,0xe9e2d4,1));
  P('Porte-serviettes mural',furnWall,315,568.4,'S',k=>{[0.9,1.3].forEach(y=>k.b(-0.25,0.25,0.06,0.08,y,y+0.02,0xb9bcbf));k.b(-0.2,0.2,0.04,0.1,0.75,0.92,0xf2ece2);k.b(-0.2,0.2,0.04,0.1,1.15,1.32,0x9db8aa);});
  P('Panier à linge',furnGroup,300,670,'S',k=>{k.k(0,0,0.15,0.17,0,0.55,0x3a3a3a);});
  P('~Tapis de bain',furnGroup,300,615,'S',rug,0.5,0.8,0x9db8aa);
  P('Niche WC : tablette + cadre',furnWall,196.2,698.2,'N',k=>{k.b(-0.45,0.45,0,0.15,1.35,1.38,0xf1efe9);k.b(-0.2,0.2,0,0.025,1.5,1.9,0x2a2a2a);k.b(-0.17,0.17,0.025,0.03,1.53,1.87,0xc98a5e);k.k(0.3,0.08,0.05,0.06,1.38,1.5,0xe9e4da);k.s(0.3,1.53,0.08,0.07,0x4f8a45);});
}
function balcon2(){
  P('Banquette d\\'extérieur 200 × 55 + coussins',furnGroup,821,365,'W',k=>{k.b(-1.0,1.0,0,0.55,0,0.4,0xa88058);k.b(-0.98,0.98,0.02,0.53,0.4,0.48,0xe6dccb);[-0.6,0,0.6].forEach(x=>k.b(x-0.25,x+0.25,0.02,0.14,0.48,0.82,0x9db8aa));});
  P('Table d\\'appoint nord',furnGroup,800,280,'S',k=>{k.c(0,0,0.2,0.42,0.45,0x2a2a2a);k.c(0,0,0.03,0,0.42,0x2a2a2a,8);});
  P('Table d\\'appoint sud',furnGroup,800,450,'S',k=>{k.c(0,0,0.2,0.42,0.45,0x2a2a2a);k.c(0,0,0.03,0,0.42,0x2a2a2a,8);});
  P('Olivier en pot (bout nord)',furnGroup,790,55,'S',k=>plant(k,0,0,0.24,1.7,0xc4704b,0x7d9270));
  P('Coffre de balcon 100 × 50',furnGroup,726.8,60,'E',k=>cab(k,1.0,0.5,0.6,0x5c6064,0x6d7176,2));
  P('Grand pot (bout sud)',furnGroup,795,650,'S',k=>plant(k,0,0,0.22,1.4,0xe9e4da,0x5f8f4a));
  P('~Dalles bois devant la baie',furnGroup,773.9,365,'S',rug,1.38,2.6,0xa88058);
}
`,
build:`
    sejourDeuxPieces();bureauAmis();chambreHotel();entree2();bains2();balcon2();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>floor(r[0],r[1],r[2],r[3],'dalle'));
    floor(157,565,232,705,'terrazzo');floor(232,565,437,705,'terrazzo');
    floor(437,497,720,705,'plancheC');floor(520,15,720,255,'plancheC');
`
};
