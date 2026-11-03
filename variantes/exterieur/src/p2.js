const paints={
  actuelle:{n:'Murs actuels',w:{},f:{sofa:0xd9cfbd,sofaC:0xe8e0d0,bz:0x5f6368,bzC:0x737880,plaid:0x9db8aa,out:0xe6dcc6,arm:0x8fae9f,banc:0xe8e0d0}},
  tomate:{n:'Tomate séchée',w:{sej:[0xc06a4a,'Séjour mur de la ch. 1 · tomate séchée'],ch2:[0xd9a441,'Ch. 2 mur du BZ · moutarde'],ch1:[0xe3cdb0,'Ch. 1 tête de lit · argile']},f:{sofa:0xd9cfbd,sofaC:0xe8e0d0,bz:0x6b4a3a,bzC:0xd9a441,plaid:0xc06a4a,out:0xf2e6cf,arm:0xc06a4a,banc:0xc06a4a}},
  prusse:{n:'Bleu de Prusse',w:{sej:[0x2f4f6a,'Séjour mur de la ch. 1 · bleu de Prusse'],ch2:[0x8a5a44,'Ch. 2 mur du BZ · brique'],ch1:[0xb7c4c9,'Ch. 1 tête de lit · gris bleuté']},f:{sofa:0xcfc8bb,sofaC:0xe0dacd,bz:0x2f4f6a,bzC:0xe3cdb0,plaid:0x2f4f6a,out:0xe8eef0,arm:0xe3cdb0,banc:0x2f4f6a}}
};
const paintWalls=pw2;
function tablee(){
  const T=theme();
  P('Tabourets de bar × 3');
  [256,283,310].forEach(z=>tabouret(338,z,0.65,C.oak));
  P('Table de ferme 2,40 × 0,90 + banc + 4 chaises');
  table(place(476.8,345,640,406.2,'S',furnGroup),0xb98a5a,0x5a4330,0.75,{trestle:true,t:0.05});
  const bc=place(490,314.5,626,344.5,'S',furnGroup);box(-bc.w/2,-bc.d/2,bc.w/2,bc.d/2,0.4,0.45,L(0xb98a5a),bc.g);[-1,1].forEach(q=>box(q*(bc.w/2-0.15)-0.03,-bc.d/2+0.03,q*(bc.w/2-0.15)+0.03,bc.d/2-0.03,0,0.4,L(0x5a4330),bc.g));box(-bc.w/2+0.1,-bc.d/2+0.02,bc.w/2-0.1,bc.d/2-0.02,0.45,0.49,L(T.banc),bc.g);
  [510,558,606].forEach(x=>chaise(x,422,'N',0x2f3033,furnGroup,0x2f3033));
  chaise(460.8,375.6,'E',0x2f3033,furnGroup,0x2f3033);
  P('Suspensions × 3 au-dessus de la table');
  [515,558,601].forEach(x=>suspension(x,375.6,1.6,0.17,0xe9e2d4));
  P('Coin lecture : 2 fauteuils face à face');
  fauteuil(683,292,'S',T.arm,T.sofaC,furnGroup,0.75);fauteuil(683,345,'N',T.arm,T.sofaC,furnGroup,0.75);
  P('Ficus lyrata');
  plante(692,474,'ficus',0.9);
  P('Voilages lin (baie)');
  voilage(259.5,275,0xefe8da,0.75);voilage(455.5,470,0xefe8da,0.75);
}
function salonCh2(){
  const T=theme();
  chambre2Base(T,{etagere:0x6e5038});
  P('TV 55" murale (existante)');
  tvMur(place(708.2,62,713.2,146,'W',furnTall));
  P('Tapis');
  tapis(590,135,680,215,0xd9a441,0xc9923a);
  P('Pouf');
  pouf(665,135,0.22,0.4,T.bzC);
  P('Lampadaire');
  lampadaire(538,55,1.55,0xf3ead4);
}
function cuisineEte(){
  const T=theme();
  gardeCorps(0x2f3033);
  P('Cuisine d\'été 1,90 × 0,50 : plancha, plan, rangements');
  const k=place(728,20,762,150,'E',furnGroup),g=k.g,w=k.w,d=k.d;
  box(-w/2,-d/2,w/2,d/2-0.02,0,0.86,L(0x9aa0a6),g);box(-w/2,-d/2,w/2,d/2+0.01,0.86,0.9,L(0xe4e1d9),g);
  for(let i=0;i<4;i++)box(-w/2+i*w/4+0.01,d/2-0.02,-w/2+(i+1)*w/4-0.01,d/2,0.08,0.82,L(0x7f868b),g);
  box(-w/2+0.08,-0.18,-w/2+0.68,0.18,0.9,0.98,L(0x2b2c2e),g);box(-w/2+0.1,-0.16,-w/2+0.66,0.16,0.98,0.985,L(0x55595e),g);
  box(0.1,-0.15,0.45,0.15,0.9,0.92,L(0xb98a5a),g);cy(g,0.65,0,0.1,0.9,1.12,L(0xb9bcbf));
  P('Mur d\'aromatiques au-dessus du plan');
  [1.3,1.65].forEach(y=>{pbox(727.7,28,737,142,y,y+0.14,L(C.terra),furnTall);for(let z=36;z<140;z+=14)sp(at(732,z,furnTall),0,y+0.18,0,0.06,0.07,0.06,L([C.leaf,C.leafL,0x5c8f43][z%3]));});
  P('Figuier en pot');
  plante(746,240,'figuier',0.58);
  P('Bar de garde-corps 2,35 × 0,25 + 4 tabourets');
  pbox(802,290,819,450,1.0,1.04,L(0xb98a5a),furnGroup);
  [300,370,440].forEach(z=>pbox(815,z,819,z+3,0.9,1.0,L(C.metal),furnGroup));
  [310,350,390,430].forEach(z=>tabouret(795,z,0.75,0xb98a5a,furnGroup,0.15));
  P('Citronnier en pot');
  plante(746,485,'agrume',0.85);
  P('Salon d\'été : 2 fauteuils bas + table d\'appoint');
  fauteuil(752,615,'E',T.out,T.out,furnGroup,0.7);fauteuil(752,670,'E',T.out,T.out,furnGroup,0.7);
  tableRonde(792,642,0.2,0xe4e1d9,C.metal,0.45);
  P('Olivier en pot');
  plante(797,600,'olivier',0.75);
  P('Voile d\'ombrage');
  voile(280,460,0xf2e6cf);
  P('Guirlande guinguette');
  guirlande([[740,25],[810,150],[740,280],[810,455],[740,600],[810,700]],2.15);
}
function annexes(){
  entreeBanc(0xb98a5a,0xc06a4a);
  P('Miroir d\'entrée');
  pbox(164,522,166,560,0.9,1.9,L(0xbfd3dc),furnTall);
  sdbDeco(0xb98a5a,[0xffffff,0xd9a441,0xe6e1d8]);
  wcDeco(0xb98a5a);
}
const projet={
  build(){
    structureProjet();
    tablee();chambre1Base(theme(),{tapis:0xd9c2a0});salonCh2();annexes();cuisineMetod();cuisineEte();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'terrazzo'));
    sol(720,15,825,705,'terraOut');
    sol(157,565,232,705,'terrazzoV');sol(232,565,437,705,'terrazzoV');
    sol(437,497,720,705,'hongrie');sol(520,15,720,255,'cheneF');
  },
  rooms:[['Salle à manger / cuisine','28,2 m²',430,450],['Petit salon TV-bureau (ex-ch. 2)','9,0 m²',620,150],['Chambre 1','≈ 11,5 m²',577,535],['Entrée','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',368,545,2.55],['Cuisine d\'été','',745,85,1.2],['Bar de garde-corps','',810,370,1.2],['Salon d\'été','',770,640,1.0],['Table 2,40 m','',558,376,0.9,1],['Coin lecture','',683,318,1.0,1]]
};
