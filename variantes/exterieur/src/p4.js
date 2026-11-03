const paints={
  actuelle:{n:'Murs actuels',w:{},f:{sofa:0x8f8a80,sofaC:0xa59f94,zab:0x6b6d70,plaid:0x9db8aa,out:0xd9d2c3,cad:0x5a4330}},
  washi:{n:'Washi',w:{sej:[0xe6dccb,'Séjour mur de la ch. 1 · papier washi'],ch1W:[0xc9b79a,'Ch. 1 tête de lit · terre de Kyoto'],ch2:[0xb7b48a,'Ch. 2 mur du dressing · thé vert']},f:{sofa:0xcfc6b6,sofaC:0xded6c8,zab:0x3f4f63,plaid:0x8a3b2e,out:0xe6dcc6,cad:0xb08a5e}},
  sumi:{n:'Sumi',w:{sej:[0x3b3c3e,'Séjour mur de la ch. 1 · encre sumi'],ch1W:[0x6b5a4a,'Ch. 1 tête de lit · cèdre brûlé'],ch2:[0x8a9aa3,'Ch. 2 mur du dressing · gris pluie']},f:{sofa:0x55575a,sofaC:0x6b6d70,zab:0xc0462e,plaid:0xc0462e,out:0xc9c2b3,cad:0x3b3c3e}}
};
const paintWalls=pw2;
function zashiki(){
  const T=theme();
  P('Tabourets de bar × 3');
  [256,283,310].forEach(z=>tabouret(338,z,0.65,0x5a4330));
  P('Canapé bas 2,18 m (assise 35 cm)');
  canape(place(502,435.8,650,493.6,'N',furnGroup),T.sofa,T.sofaC,{seat:0.35,backH:0.62,arm:0.1,leg:0x5a4330,coussins:[T.zab,0xe8e2d4]});
  P('Tapis tatami 1,80 × 1,60');
  tapis(548,308,655,430,0xc8c58f,0xbdb984);
  P('Chabudai 1,00 × 0,70 (h 33 cm) + 3 zabutons');
  table(place(586,351,654,398.6,'S',furnGroup),0x5a4330,0x5a4330,0.33,{t:0.035,inset:0.08});
  [[620,333],[572,375],[620,416]].forEach(p=>{const g=at(p[0],p[1],furnGroup);box(-0.27,-0.27,0.27,0.27,0.012,0.1,L(T.zab),g);});
  P('Lampe akari');
  const a=at(690,470,furnGroup);cy(a,0,0,0.012,0,0.2,L(C.dark));cy(a,0,0,0.2,0.2,0.8,new THREE.MeshLambertMaterial({color:0xfff6e2,emissive:0x3a2e10}));
  P('Suspension papier');
  const s=at(620,375,furnTall);cy(s,0,0,0.004,1.9,H-0.01,L(C.dark));sp(s,0,1.72,0,0.28,0.2,0.28,new THREE.MeshLambertMaterial({color:0xfff6e2,emissive:0x2a2210}));
  P('Niwaki en pot');
  plante(330,440,'niwaki',0.9);
  P('Shoji coulissants (voilages translucides)');
  voilage(259.5,275,0xf6f1e6,0.85);voilage(455.5,470,0xf6f1e6,0.85);
}
function chambre1Basse(){
  const T=theme();
  P('Lit 160 × 200 (existant) sur socle bas, face au balcon');
  lit(place(440.4,556.8,581.2,665.6,'E',furnGroup),{tete:0.6,teteCol:T.cad,bas:0.16,socle:1,cadre:T.cad,plaid:T.plaid,couette:0xf3efe6});
  P('Chevet bas');
  const c=at(456,681,furnGroup);box(-0.2,-0.17,0.2,0.17,0,0.3,L(T.cad),c);cy(c,0,0,0.1,0.3,0.55,new THREE.MeshLambertMaterial({color:0xfff6e2,emissive:0x2a2210}),0.07);
  P('Armoire BRIMNES 117 × 50 (existante)');
  brimnes(place(679.2,582,713.2,661.6,'W',furnWall));
  P('Coffre tansu 1,20 × 0,40');
  const t=place(596,671,678,698.2,'N',furnGroup);armoire(t,0.6,T.cad,{portes:3,face:0x6b4f36});
  P('Voilage (porte-fenêtre)');
  voilage(501,514,0xf6f1e6,0.85);
}
function washitsu(){
  const T=theme();
  P('Dressing ouvert 2,00 × 0,50 (existant)');
  dressingO(place(523.4,21.8,557.4,157.8,'E',furnWall));
  P('Bureau 180 × 80 (existant)');
  bureau(place(560,21.8,682.4,76.2,'S',furnGroup));
  P('Siège gaming (existant)');
  gaming(621.2,102,'N');
  P('Coffre à futon d\'amis 1,00 × 0,45');
  const f=place(600,221,668,251.6,'N',furnGroup);armoire(f,0.5,T.cad,{portes:2,face:0x6b4f36});box(-f.w/2+0.05,-f.d/2+0.05,f.w/2-0.05,f.d/2-0.05,0.5,0.62,L(0xf3efe6),f.g);
  P('Bonsaï sur tabouret');
  const b=at(690,140,furnGroup);box(-0.15,-0.15,0.15,0.15,0,0.45,L(T.cad),b);const k=plante(0,0,'niwaki',0.45,b);k.position.set(0,0.45,0);
  P('Voilage (porte-fenêtre)');
  voilage(222,248,0xf6f1e6,0.85);
}
function annexes(){
  const T=theme();
  entreeBanc(T.cad,0xe6dcc6);
  P('Noren (rideau d\'entrée)');
  pbox(299,415,301.5,512,1.91,2.1,L(0x3f4f63),furnTall);
  sdbDeco(0xc9a171,[0xffffff,0xe6dcc6,0x8a9aa3]);
  wcDeco(0xc9a171);
}
function engawa(){
  const T=theme();
  gardeCorps(0x2f3033);
  P('Banc continu engawa (4 tronçons, 40 × 42 cm)');
  [[20,157],[223,272],[458,512],[578,700]].forEach(r=>{const o=place(727.8,r[0],755,r[1],'E',furnGroup);box(-o.w/2,-o.d/2,o.w/2,o.d/2,0.38,0.42,L(0xa6865f),o.g);[-1,1].forEach(q=>box(q*(o.w/2-0.06)-0.03,-o.d/2+0.03,q*(o.w/2-0.06)+0.03,o.d/2-0.03,0,0.38,L(0x6f5a42),o.g));});
  P('Zabutons d\'extérieur');
  [[741,60],[741,100],[741,640]].forEach(p=>{const g=at(p[0],p[1],furnGroup);box(-0.17,-0.25,0.17,0.25,0.42,0.48,L(T.out),g);});
  P('Lanternes sur le banc');
  [[741,135],[741,248],[741,485],[741,600]].forEach(p=>{const g=at(p[0],p[1],furnGroup);box(-0.08,-0.08,0.08,0.08,0.42,0.7,new THREE.MeshLambertMaterial({color:0xfff6e2,emissive:0x3a2e10}),g);});
  P('Érable du Japon (bout nord)');
  plante(793,85,'erable',0.95);
  P('Graminées en pots');
  plante(805,135,'graminee',0.9);plante(805,30,'graminee',0.9);
  P('Bambous en bac (bout sud)');
  jardiniere(790,590,819,700,0.5,C.anth,'buis',furnGroup);
  [605,635,665,692].forEach(z=>{const g=at(804,z,furnWall);for(let i=0;i<3;i++){cy(g,(i-1)*0.05,0,0.012,0.5,1.9+0.1*i,L(0x8ea65a));sp(g,(i-1)*0.05,1.75+0.1*i,0,0.1,0.22,0.1,L(i%2?C.leaf:C.leafL));}});
  P('Niwaki en pot (devant la ch. 1)');
  plante(772,640,'niwaki',0.8);
  P('Sudare (stores de bambou roulés)');
  [[20,157],[458,512],[578,700]].forEach(r=>pbox(728,r[0],734,r[1],2.2,2.3,L(0xb8a27a),furnTall));
}
const projet={
  build(){
    structureProjet();
    zashiki();chambre1Basse();washitsu();annexes();cuisineMetod();engawa();
    [[360,15,520,232],[300,232,520,255],[300,255,720,497],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'beton'));
    sol(157,350,300,565,'ardoise');
    sol(720,15,825,705,'deckV');
    sol(157,565,232,705,'boisT');sol(232,565,437,705,'boisT');
    sol(437,497,720,705,'chene');sol(520,15,720,255,'tatami');
  },
  rooms:[['Séjour / cuisine','28,2 m²',420,380],['Washitsu : bureau + futon d\'amis (ch. 2)','9,0 m²',620,180],['Chambre 1','≈ 11,5 m²',600,620],['Genkan (entrée)','5,1 m²',228,470],['WC','1,2 m²',195,690],['Salle de bains','5,6 m²',320,640],['Placard','',368,545,2.55],['Engawa','15,1 m²',780,360],['Chabudai','',620,375,0.6,1],['Lit bas face au balcon','',510,610,0.8,1]]
};
