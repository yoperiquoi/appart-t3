Object.assign(tex,{
  p2beton:{t:tuiles(['#c9c3b8','#c4bdb1','#cec8bd','#c0b9ad'],4,4,'#a49d91',2,21),m:2.4},
  p2ciment:{t:ciment('#e8e1d3','#2f5d62','#c47a5e','#cfc6b5'),m:0.8},
  p2hex:{t:hexT(['#e9ecea','#dfe6e3','#cfdcd7','#e3e8e5'],'#9aa5a1',4),m:0.75},
  p2chene:{t:lames(['#d9b98c','#d2b082','#ddc094','#cfab7c'],'#9c7a50',8,6),m:1.6}
});
const PALETTES={
  linge:{n:'Bleu lessive',w:{ch1O:[0x8fa7c4,'Chambre · tête de lit bleu lessive'],sejN:[0xe3d9c6,'Séjour · mur TV lin'],ch2N:[0x9db8aa,'Bureau · vert d’eau'],entree:[0x2f5d62,'Entrée · bleu pétrole (mur des patères)']},f:{sofa:0xd8cfc0,sofaC:0x8fa7c4,plaid:0x8fa7c4,bz:0x5f6368,bzC:0xd9a441}},
  blanc:{n:'Murs blancs',w:{},f:{sofa:0x7d8a96,sofaC:0x96a3ae,plaid:0xd8cfc0,bz:0x5f6368,bzC:0x737880}}
};
const PIECES=[['Séjour','',600,340],['Coin repas','',370,455],['Cuisine','',470,170],['Bureau + couchage d’amis','9,0 m²',610,170],['Chambre (tête vers la SDB)','≈ 11,5 m²',600,560],['Entrée','',230,470],['WC','',195,690],['SDB-buanderie','',320,640],['Placard couloir = dressing','',368,545,2.55],['Lave-linge + sèche-linge','',262,672,1.9,1],['Étendoir plafond','',410,620,2.3,1],['Armoire à linge de maison','',696,640,2.0,1],['Balcon · étendoir & café','',775,250]];
function amenager(){
  mursPeints();const T=theme();
  solZone('eau','p2hex');solZone('ch1','p2chene');solZone('ch2','p2chene');
  sols([[360,15,520,232,'p2beton'],[300,232,520,255,'p2beton'],[300,255,720,497,'p2beton'],[300,497,437,565,'p2beton'],[157,350,300,565,'p2ciment']]);
  const rp=piece('Table ronde Ø 1,10 + 4 chaises');rond(rp,370,397,0.55,0.75,0xdcc296,0x2a2b2d);
  chaise(rp,370,354.8,'N',0x8b6a4a);chaise(rp,370,439.2,'S',0x8b6a4a);chaise(rp,327.8,397,'W',0x8b6a4a);chaise(rp,412.2,397,'E',0x8b6a4a);
  suspension('Suspension coin repas',370,397,1.55,0.25,0xe9e2d3);
  const cn=piece('Canapé 3 places 2,20 × 0,90');canape(cn,[520,432.4,669.6,493.6],'S',T.sofa,T.sofaC,'both');
  const tb=piece('Table basse 1,00 × 0,55');table(tb,[560,370,628,407.4],0.4,0xcaa97c,0x5a4330);
  const tv=piece('Meuble TV 1,60 × 0,40');cab(tv,[595,258.4,704,285.6],0,0.45,COL.blanc,'S',4,0xcaa97c);
  const te=piece('TV 55"',furnTall);ecran(te,[608,262,692,264.5],'S',1.0,1.72);
  const la=piece('Lampadaire');lampadaire(la,690,455,1.6);
  const pl=piece('Plante');plante(pl,690,312,0.12,1.4);
  tapis('Tapis du salon',535,345,660,430,0xb8a98f,0xc9bba1);
  cuisineMetod();
  const mi=piece('Miroir en pied (sortie du dressing)',furnWall);bx(mi,295.2,520,296.6,558,0.3,1.95,0xcfdde4);
  const en=piece('Meuble à chaussures 0,68 × 0,20 + patères');chaussures(en,[163.8,472,177.4,518],'E');patere(en,[163.8,474,177.4,516],'E',3,1.85);
  tapis('Paillasson',170,420,214,466,0x6b5a48);
  lingeSDB();secheLinge();wcDeco();
  const tr=piece('Trieur à linge 3 sacs (blanc / couleur / foncé)');tri(tr,[340,570,384,597],'S',[0xffffff,0x7fa6c9,0x3d3f42]);
  etendoirPlafond('Étendoir à poulie au-dessus de la baignoire',[390,582,433,690]);
  const lt=piece('Lit 160 × 200 + chevets');lit(lt,[440.4,569.6,579.8,678.4],'W',{plaid:T.plaid,tete:0x8fa7c4,hbH:1.1});
  bx(lt,440.4,542.4,467.6,569.6,0,0.5,0xe9e4da);lampe(lt,454,556,0.5);bx(lt,440.4,679.4,461,698.2,0,0.45,0xe9e4da);
  grab('Armoire BRIMNES = linge de maison',furnWall,()=>brimnes(713.2,604));
  const bc=piece('Banc-coffre de pied de lit');cab(bc,[584,585,611,665],0,0.45,0xcaa97c,'E',1);
  const pp=piece('Tablette de pliage murale rabattable (fermée) + planche à repasser murale',furnWall);bx(pp,520,500.4,601.6,506,0.4,1.0,0xcaa97c);bx(pp,612,500.4,642,505.4,0.4,1.6,0xe9e4da);
  tapis('Tapis de chambre',590,560,660,690,0xe9e2d3);
  const bu=piece('Bureau 180 × 80 + siège gaming');bureau(bu,[545,21.8,667.4,76.2],'S');gamer(bu,606,102,'S');ecran(bu,[580,30,630,32.5],'S',0.85,1.25);
  const bz=piece('BZ 140 × 90 (couchage d’amis)');canape(bz,[523.4,100,584.6,195.2],'W',T.bz,T.bzC,'none',0.88);
  const et=piece('Étagère 1,00 × 0,30 × 1,80',furnWall);etag(et,[590,231,658,251.6],1.8,COL.blanc,'N',[0.02,0.4,0.78,1.16,1.5,1.78],5);
  tapis('Tapis du bureau',592,110,690,190,0x9db8aa);
  abri(17);meubleBBQ(222,true);
  const ed=piece('Étendoir de balcon 1,50 × 0,55');etendoir(ed,[735,595,772,695],'E');
  const bi=piece('Table bistrot Ø 0,55 + 2 chaises');rond(bi,800,365,0.275,0.74,0xb08a5e,0x3a3d40);chaise(bi,800,330,'N');chaise(bi,800,400,'S');
  const ja=piece('Potager en jardinières');aromates(ja,[798,110,812,200],'W');
}
