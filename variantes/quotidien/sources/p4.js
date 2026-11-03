Object.assign(tex,{
  p4terrazzo:{t:terrazzo('#ece8e0',['#c9c2b5','#8f8a80','#d8a58a','#b9c7c0','#ffffff'],'#cfc8bb',2,4),m:1.6},
  p4noir:{t:tuiles(['#2e2f31','#323335','#2a2b2d'],2,4,'#5a5c5f',1.5,3,true),m:1.2},
  p4hongrie:{t:batons(['#b88a5a','#ad7f50','#c29462','#a87a4b'],'#6b4a2c',19),m:0.8},
  p4moquette:{t:bruit('#b9a7a0',['#ad9b94','#c6b4ad','#a69089'],8000,1.5,61),m:0.5}
});
const PALETTES={
  studio:{n:'Terracotta & rose',w:{ch1O:[0xc47a5e,'Studio · mur de l’armoire-lit terracotta'],ch1N:[0xe0cbb0,'Studio · mur du bureau sable'],ch2N:[0xd9b3a7,'Dressing-amis · rose poudré'],sejS:[0xa9b59a,'Séjour · vert lichen']},f:{sofa:0xc47a5e,sofaC:0xd9b3a7,arm:0xe0cbb0,bz:0xd8cfc0,bzC:0xc47a5e}},
  blanc:{n:'Murs blancs',w:{},f:{sofa:0x7d8a96,sofaC:0x96a3ae,arm:0x4f7f7a,bz:0x5f6368,bzC:0x737880}}
};
const PIECES=[['Salon face au balcon','',620,445],['Coin repas','',370,455],['Cuisine','',470,170],['Dressing + chambre d’amis','9,0 m²',600,175],['Studio : bureau le jour, chambre la nuit','≈ 11,5 m²',580,535],['Lit ouvert (la nuit)','',540,640,0.5,1],['Entrée','',230,470],['WC','',195,690],['SDB','',320,640],['Placard couloir : sport & valises','',368,545,2.55],['Balcon · salon d’été','',775,250]];
function amenager(){
  mursPeints();const T=theme();
  solZone('sejour','p4terrazzo');solZone('eau','p4noir');solZone('ch1','p4hongrie');solZone('ch2','p4moquette');
  const rp=piece('Table ronde Ø 1,10 + 4 chaises');rond(rp,370,397,0.55,0.75,0xece8e0,0x2a2b2d);
  chaise(rp,370,354.8,'N',0x2a2b2d);chaise(rp,370,439.2,'S',0x2a2b2d);chaise(rp,327.8,397,'W',0x2a2b2d);chaise(rp,412.2,397,'E',0x2a2b2d);
  suspension('Suspension coin repas',370,397,1.55,0.25,0xd8a58a);
  const cn=piece('Canapé 2,00 × 0,90 tourné vers la baie');canape(cn,[490,352,551.2,488],'W',T.sofa,T.sofaC,'both');
  const fa=piece('Fauteuil 0,80 × 0,80');fauteuil(fa,[580,435,634.4,489.4],'S',T.arm);
  const tb=piece('Table basse ronde Ø 0,70');rond(tb,600,395,0.35,0.4,0xcaa97c,0x2a2b2d);
  const lb=piece('Bibliothèque basse 1,60 × 0,35 (mur de la chambre 2)');etag(lb,[595,258.4,704,282.2],0.9,COL.chene,'S',[0.02,0.45,0.88],23);
  const la=piece('Lampadaire');lampadaire(la,566,476,1.6);
  const pl=piece('Grandes plantes');plante(pl,690,312,0.13,1.6);plante(pl,690,465,0.12,1.3);
  tapis('Tapis du salon',560,330,668,470,0xd9c7b0,0xe6d6c1);
  cuisineMetod();
  const en=piece('Meuble à chaussures 0,68 × 0,20 + patères');chaussures(en,[163.8,472,177.4,518],'E');patere(en,[163.8,474,177.4,516],'E',3,1.85);
  tapis('Paillasson',170,420,214,466,0x6b5a48);
  lingeSDB('etageres');wcDeco();
  litEscamotable([440.4,560,471,679],'E');
  tapis('Emprise du lit ouvert 160 × 200',471,564,608,675,0xf1ead8);
  const bu=piece('Bureau 180 × 80 + siège gaming');bureau(bu,[496,500.4,618.4,554.8],'S');gamer(bu,557,581,'S');ecran(bu,[532,508,582,510.5],'S',0.85,1.25);
  const tv=piece('Meuble TV bas 1,20 × 0,40 (face au lit)');cab(tv,[686,606,713.2,688],0,0.42,0xe9e4da,'W',3,0xc47a5e);
  const te=piece('TV 43" murale',furnTall);ecran(te,[709.4,618,712,676],'W',0.95,1.5);
  const pl2=piece('Plante');plante(pl2,640,530,0.1,1.0);
  const yg=piece('~Tapis de yoga');bx(yg,622,612,676,632,0,0.008,0x6f8f7a);
  grab('Dressing ouvert 2,00 × 0,50',furnWall,()=>dressing(523.4,30,166,34,2.05));
  const br2=piece('Armoire BRIMNES 117 × 50');cab(br2,[560,21.8,639.6,55.8],0,1.9,0xf6f5f1,'S',3,0xfbfbf9);bx(br2,589,55.8,611,57,0.2,1.74,0xbfd3dc);
  const bz=piece('BZ 140 × 90 (couchage d’amis)');canape(bz,[648,62,709.4,157.2],'E',T.bz,T.bzC,'none',0.88);
  const va=piece('Valet + miroir sur pied');bx(va,600,170,604,176,0,1.7,0x2a2b2d);bx(va,592,168,612,170,1.4,1.45,0x2a2b2d);
  tapis('Tapis',575,80,640,150,0xe6d6c1);
  abri(17);meubleBBQ(222,true);
  const cl=piece('Bain de soleil 1,90 × 0,60');bx(cl,736,575,776,700,0,0.32,0xb08a5e);bx(cl,738,577,774,640,0.32,0.38,0xe0cbb0);bx(cl,738,577,774,592,0.38,0.75,0xe0cbb0);
  const ts=piece('Table d’appoint');rond(ts,800,600,0.2,0.45,0xb08a5e,0x3a3d40);
  tableBalcon('Table 1,10 × 0,60 + 2 chaises',365,800,['N','S']);
  const ja=piece('Jardinières');aromates(ja,[798,80,812,200],'W');aromates(ja,[798,450,812,520],'W');
}
