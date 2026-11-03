Object.assign(tex,{
  p1pierre:{t:tuiles(['#e4dccd','#ded5c4','#e8e0d2','#dad1bf'],2,4,'#b9ae99',2.5,5,true),m:2.4},
  p1terrazzo:{t:terrazzo('#9a9c9c',['#6b6d6f','#d9d6cf','#4c4e50','#b7b3aa','#c98a6a'],'#7d7f80',4,8),m:2.4},
  p1batons:{t:batons(['#c99f6d','#bf945f','#d2aa79','#c39865'],'#7a5a38',4),m:1.6},
  p1liege:{t:bruit('#b88b5c',['#a57a4e','#c99b6a','#946b42','#d1a676'],5000,2.2,12),m:0.6}
});
const PALETTES={
  table:{n:'Salle commune',w:{sejS:[0xc9b79c,'Mur de la desserte · sable'],ch2N:[0x2f4a52,'Pièce des écrans · bleu canard'],ch2:[0x2f4a52,'Pièce des écrans · bleu canard (mur bureau)'],ch1:[0x9db8aa,'Chambre · vert sauge']},f:{plaid:0x9db8aa,bz:0xb9a27f,bzC:0xd9a441,chaise:0x2f3033,fauteuil:0xb86b4f}},
  blanc:{n:'Murs blancs',w:{},f:{plaid:0xd8cfc0,bz:0x8d8f92,bzC:0xd8cfc0,chaise:0x2f3033,fauteuil:0x8fae9f}}
};
const PIECES=[['Salle commune · table 2,20 m','',545,455],['Cuisine','',470,170],['Pièce des écrans','9,0 m²',620,190],['Chambre','≈ 11,5 m²',577,535],['Entrée','',230,470],['WC','',195,690],['SDB','',320,640],['Placard : vaisselle des tablées','',368,545,2.55],['Console de retour','',313,380,1.0,1],['Coin lecture','',665,290,0.9,1],['Balcon · repas & aromates','',775,250]];
function amenager(){
  mursPeints();
  const T=theme();
  solZone('sejour','p1pierre');solZone('eau','p1terrazzo');solZone('ch1','p1batons');solZone('ch2','p1liege');
  const tb=piece('Grande table 2,20 × 0,90 + 8 chaises'),tr=[480,336.7,630,397.9];
  table(tb,tr,0.75,0xc49a6c,0x2a2b2d,0.04);
  [505,555,605].forEach(x=>{chaise(tb,x,329.7,'N',T.chaise,0x2a2b2d);chaise(tb,x,404.9,'S',T.chaise,0x2a2b2d);});
  chaise(tb,473,367.3,'W',T.chaise,0x2a2b2d);chaise(tb,637,367.3,'E',T.chaise,0x2a2b2d);
  bx(tb,530,360,542,374,0.75,0.9,0x9db8aa);bx(tb,570,358,610,376,0.75,0.77,0xe9e2d3);
  suspension('Suspension 1',530,367,1.6,0.2,0x2f3033);suspension('Suspension 2',585,367,1.6,0.2,0x2f3033);
  tapis('Tapis de la table',458,300,652,436,0xb9a27f,0xcdb894);
  const ds=piece('Desserte BESTÅ 1,80 × 0,20 × 0,64');cab(ds,[500,480,622.4,493.6],0,0.64,COL.blanc,'N',3,0xcaa97c);
  bx(ds,505,482,525,492,0.64,0.95,0xe9e4da);bx(ds,590,483,615,492,0.64,0.7,0x3b6ea5);lampe(ds,560,487,0.64);
  const ar=piece('Cadres',furnWall);cadre(ar,[512,492.2,552,493.6],1.25,1.75);cadre(ar,[570,492.2,602,493.6],1.3,1.65);
  const cr=piece('Console de retour 0,90 × 0,30');tiroirs(cr,[303.4,352,323.8,410],0,0.85,COL.chene,'E',3,0xcaa97c);
  bx(cr,308,358,320,372,0.85,0.9,0x2f3033);bx(cr,308,380,320,400,0.85,0.88,0xe9e4da);cy(cr,314,404,0.05,0.85,0.95,0x9db8aa);
  const mi=piece('Miroir + crochets à clés',furnWall);bx(mi,303.4,360,304.8,402,1.15,1.85,0xcfdde4);bx(mi,303.4,404,305.6,409,1.1,1.14,0x2f3033);
  const lc=piece('Coin lecture : fauteuil + lampadaire');fauteuil(lc,[636,258.4,690.4,312.8],'N',T.fauteuil);lampadaire(lc,622,271,1.55);
  const pl=piece('Ficus');plante(pl,692,465,0.12,1.6);
  cuisineMetod();
  const en=piece('Meuble à chaussures 0,68 × 0,20 + patères');chaussures(en,[163.8,472,177.4,518],'E');patere(en,[163.8,474,177.4,516],'E',3,1.85);
  tapis('Paillasson',170,420,214,466,0x6b5a48);
  lingeSDB('etageres');wcDeco();
  const bu=piece('Bureau 180 × 80 + siège gaming + écran 43" sur bras');
  bureau(bu,[523.4,30,577.8,152.4],'E');gamer(bu,604,91,'E');
  bx(bu,523.4,89,532,93,1.18,1.22,0x2a2b2d);ecran(bu,[532,58,534.5,124],'E',0.92,1.5);bx(bu,540,80,556,102,0.75,0.77,0x2a2b2d);
  const bz=piece('BZ 140 × 90 (couchage d’amis 140 × 190)');canape(bz,[648,62,709.4,157.2],'E',T.bz,T.bzC,'none',0.88);
  const mj=piece('Meuble jeux & consoles 1,60 × 0,38');cab(mj,[592,226,700,251.6],0,0.55,0x2f4a52,'N',3,0x3c5c66);bx(mj,600,232,630,248,0.55,0.62,0x151617);bx(mj,680,236,690,248,0.55,0.8,0x2a2b2d);
  const sh=piece('Étagère vinyles & jeux',furnWall);bx(sh,592,236,700,251.6,1.4,1.42,0xcaa97c);bx(sh,592,236,700,251.6,1.75,1.77,0xcaa97c);
  [[598,1.42,0xc65f37],[606,1.42,0x3b6ea5],[614,1.42,0xd9a441],[640,1.77,0x4f8a45],[650,1.77,0x6b6d70],[660,1.77,0xe9e4da]].forEach(b=>bx(sh,b[0],238,b[0]+6,250,b[1],b[1]+0.28,b[2]));
  tapis('Tapis épais',592,112,706,214,0x8a7a66,0x9b8a74);
  chambreClassique(603,{plaid:T.plaid});
  tapis('Tapis de chambre',500,600,650,650,0xe9e2d3);
  grab('Balcon : table 1,10 × 0,60, 4 chaises, rangements, barbecue',furnGroup,balcony);
  const ja=piece('Jardinières d’aromates 2 × 0,90 × 0,20');aromates(ja,[798,80,812,141],'W');aromates(ja,[798,520,812,581],'W');
  const lb=piece('Bac à herbes devant la cuisine');aromates(lb,[733,462,747,508],'E',2);
}
