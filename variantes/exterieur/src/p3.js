const paints={
  actuelle:{n:'Murs actuels',w:{},f:{sofa:0x7d8a96,sofaC:0x96a3ae,bz:0x5f6368,bzC:0x737880,plaid:0x9db8aa,out:0xe6dcc6,arm:0x4f7f7a,sofa2:0x4f7f7a}},
  foret:{n:'Sous-bois',w:{sejN:[0x5d7258,'Séjour mur de la ch. 2 · vert sous-bois'],ch2:[0x6f8a76,'Chambre tête de lit · vert lichen'],ch1:[0xd8c3a0,'Bureau mur du bureau · chanvre']},f:{sofa:0xd8cfc0,sofaC:0xe6dfd2,bz:0x5d7258,bzC:0xd8c3a0,plaid:0xb5703f,out:0xe6dcc6,arm:0x5d7258,sofa2:0xb5703f}},
  sable:{n:'Dune',w:{sejN:[0xd9bfa0,'Séjour mur de la ch. 2 · sable'],ch2:[0xb98b72,'Chambre tête de lit · vieux rose'],ch1:[0x9fb3bd,'Bureau mur du bureau · bleu brume']},f:{sofa:0x9fb3bd,sofaC:0xb9c8cf,bz:0xd9bfa0,bzC:0x9fb3bd,plaid:0xb98b72,out:0xf0e6d6,arm:0xb98b72,sofa2:0xd9bfa0}}
};
const paintWalls=pw2;
function sejourVisAVis(){
  const T=theme();
  P('Tabourets de bar × 3');
  [256,283,310].forEach(z=>tabouret(338,z,0.65,C.oak));
  P('Canapé 1,70 face au sud');
  canape(place(593,258.4,708.6,319.6,'S',furnGroup),T.sofa,T.sofaC,{coussins:[T.plaid,0xe8e2d4]});
  P('Canapé 1,70 face au nord');
  canape(place(593,427,708.6,488.2,'N',furnGroup),T.sofa2,T.sofaC,{coussins:[0xe8e2d4,T.plaid]});
  P('Tapis berbère');
  tapis(600,322,705,424,0xefe6d6,0xe2d6c0);
  P('Table 1,40 × 0,80 + 4 chaises');
  table(place(495,380,590,434,'S',furnGroup),C.oak,C.walnut,0.75);
  [518,567].forEach(x=>{chaise(x,372,'S',C.oakD);chaise(x,442,'N',C.oakD);});
  P('Suspension');
  suspension(542.5,407,1.6,0.25,0xe9e2d4);
  P('Strelitzia');
  plante(330,440,'kentia',0.85);
  P('Voilages (baie)');
  voilage(259.5,275,0xefe8da,0.7);voilage(455.5,470,0xefe8da,0.7);
}
function chambreCabane(){
  const T=theme();
  P('Lit 160 × 200 (existant) face à la porte-fenêtre');
  lit(place(523.4,52,664.2,160.8,'E',furnGroup),{tete:1.15,plaid:T.plaid,couette:0xf7f5ef});
  P('Chevets');
  chevet(537,38.8);chevet(537,174);
  P('Armoire BRIMNES 117 × 50 (existante)');
  brimnes(place(593,217.6,672.6,251.6,'N',furnWall));
  P('Banc de pied de lit');
  const b=place(667,70,691,150,'W',furnGroup);box(-b.w/2,-b.d/2,b.w/2,b.d/2,0,0.42,L(C.oak),b.g);box(-b.w/2+0.02,-b.d/2+0.02,b.w/2-0.02,b.d/2-0.02,0.42,0.46,L(T.bzC),b.g);
  P('Tapis');
  tapis(600,165,680,212,0xe8e2d4);
  P('Suspension');
  suspension(600,106,1.95,0.2,C.rattan);
  P('Voilage (porte-fenêtre)');
  voilage(222,248,0xefe8da,0.75);
}
function bureauAmis(){
  const T=theme();
  P('Dressing ouvert 2,00 × 0,50 (existant)');
  dressingO(place(440.4,552,474.4,688,'E',furnWall));
  P('Bureau 180 × 80 (existant)');
  bureau(place(500,643.8,622.4,698.2,'N',furnGroup));
  P('Siège gaming (existant)');
  gaming(561.2,615,'S');
  P('Étagères murales au-dessus du bureau');
  [1.45,1.8].forEach(y=>pbox(505,690,617,698.2,y,y+0.025,L(C.oak),furnTall));
  P('BZ 140 × 90 (existant), lit d\'amis');
  bz(place(652,579,713.2,674.2,'W',furnGroup),T.bz,T.bzC);
  P('TV 55" murale (existante)');
  tvMur(place(663,693.2,673,698.2,'N',furnTall));
  P('Monstera');
  plante(628,590,'monstera',0.8);
  P('Voilage (porte-fenêtre)');
  voilage(501,514,0xefe8da,0.75);
}
function annexes(){
  entreeBanc(C.oak,0x5d7258);
  P('Miroir d\'entrée');
  pbox(164,522,166,560,0.9,1.9,L(0xbfd3dc),furnTall);
  sdbDeco(C.oak,[0xffffff,0xd8c3a0,0x5d7258]);
  wcDeco(C.oak);
}
function balconBureau(){
  const T=theme();
  gardeCorps(0x3a3d40);
  P('Lit de jour 1,85 × 0,60 (jardinet de la chambre)');
  const d=place(728,25,769,151,'E',furnGroup);box(-d.w/2,-d.d/2,d.w/2,d.d/2,0,0.3,L(0x8b6a4a),d.g);box(-d.w/2+0.03,-d.d/2+0.03,d.w/2-0.03,d.d/2-0.03,0.3,0.42,L(T.out),d.g);box(-d.w/2+0.05,-d.d/2+0.05,-d.w/2+0.4,d.d/2-0.05,0.42,0.52,L(T.plaid),d.g);
  P('Jardinières de graminées (garde-corps)');
  jardiniere(799,20,819,150,0.45,C.anth,['graminee','lavande','graminee'],furnGroup);
  P('Banc d\'extérieur 0,70 × 0,40');
  const bn=place(728,227,755,272,'E',furnGroup);box(-bn.w/2,-bn.d/2,bn.w/2,bn.d/2,0,0.45,L(0x8b6a4a),bn.g);
  P('Citronnier en pot');
  plante(746,485,'agrume',0.85);
  P('Bureau d\'été rabattable 1,00 × 0,50 + chaise pliante');
  const t=place(728,600,762,668,'E',furnGroup);box(-t.w/2,-t.d/2,t.w/2,t.d/2,0.72,0.75,L(C.oak),t.g);box(-0.02,-t.d/2,0.02,t.d/2-0.05,0.3,0.72,L(C.metal),t.g);box(-t.w/2,-t.d/2,t.w/2,-t.d/2+0.03,0.6,0.75,L(C.oak),t.g);
  chaise(776,634,'W',0x2f5d62,furnGroup,C.metal);
  P('Bambous en bac (écran)');
  jardiniere(796,582,819,700,0.5,C.anth,'buis',furnGroup);
  [600,630,660,690].forEach(z=>{const g=at(808,z,furnWall);for(let i=0;i<3;i++){cy(g,(i-1)*0.05,0,0.012,0.5,1.9+0.1*i,L(0x8ea65a));sp(g,(i-1)*0.05,1.75+0.1*i,0,0.1,0.22,0.1,L(i%2?C.leaf:C.leafL));}});
  P('Voile d\'ombrage (bureau d\'été)');
  voile(585,700,0xe6dcc6);
  P('Guirlande');
  guirlande([[732,30],[732,690]],2.2);
}
const projet={
  build(){
    structureProjet();
    sejourVisAVis();chambreCabane();bureauAmis();annexes();cuisineMetod();balconBureau();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'boisTx'));
    sol(720,15,825,705,'deckL');
    sol(157,565,232,705,'ardoise');sol(232,565,437,705,'ardoise');
    sol(437,497,720,705,'liege');sol(520,15,720,255,'hongrie');
  },
  rooms:[['Séjour / cuisine','28,2 m²',420,330],['Chambre (ex-ch. 2)','9,0 m²',600,200],['Bureau + amis (ex-ch. 1)','≈ 11,5 m²',577,540],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',368,545,2.55],['Bureau d\'été','',760,634,1.2],['Jardinet de la chambre','',770,90,1.0],['Salon en vis-à-vis','',650,373,1.0,1]]
};
