Object.assign(tex,{
  p3tomette:{t:hexT(['#b8643f','#ad5b39','#c06e47','#a65435','#b96a45'],'#7a3f26',9,21.333),m:0.9},
  p3zellige:{t:tuiles(['#5f8f7a','#6d9c86','#557f6c','#78a68f','#4f7a66'],8,8,'#e8e4da',1.6,33),m:0.8},
  p3laine:{t:bruit('#d8cdb9',['#cfc3ad','#e1d7c4','#c9bca4','#ded2bd'],9000,1.8,51),m:0.5},
  p3lino:{t:bruit('#c49a4e',['#b88c43','#cfa75c','#ad8238','#d6b06a'],6000,3.2,77),m:0.9}
});
const PALETTES={
  service:{n:'Olive & ocre',w:{ch2N:[0x7d7d4e,'Pièce qui travaille · olive'],ch2:[0x7d7d4e,'Pièce qui travaille · olive (garde-manger)'],sejN:[0xd9b77e,'Séjour · mur TV ocre doux'],ch1:[0xc9a99a,'Chambre · vieux rose']},f:{sofa:0xd6c7ab,sofaC:0x7d7d4e,plaid:0xc47a5e}},
  blanc:{n:'Murs blancs',w:{},f:{sofa:0x7d8a96,sofaC:0x96a3ae,plaid:0xd8cfc0}}
};
const PIECES=[['Salon (canapé convertible)','',600,340],['Cuisine','',470,170],['Repas du quotidien au bar','',390,375,0.9,1],['Pièce qui travaille','9,0 m²',612,175],['Chambre','≈ 11,5 m²',590,560],['Entrée','',230,470],['WC','',195,690],['SDB','',320,640],['Placard couloir = vestiaire','',368,545,2.55],['Console extensible 10 couverts','',318,340,1.0,1],['Balcon · cour de service','',775,250],['Repas dehors','',775,600]];
function amenager(){
  mursPeints();const T=theme();
  solZone('sejour','p3tomette');solZone('eau','p3zellige');solZone('ch1','p3laine');solZone('ch2','p3lino');
  const cn=piece('Canapé d’angle convertible 2,60 + méridienne 1,50');canape(cn,[500,432.4,676.8,493.6],'S',T.sofa,T.sofaC,'b');canape(cn,[500,330,561.2,432.4],'W',T.sofa,T.sofaC,'a');
  const tb=piece('Table basse 1,00 × 0,55');table(tb,[585,365,653,402.4],0.4,0x6b4a32,0x2a2b2d);
  const tv=piece('Meuble TV 1,60 × 0,40');cab(tv,[595,258.4,704,285.6],0,0.45,0x6b4a32,'S',4,0x7d5a40);
  const te=piece('TV 55"',furnTall);ecran(te,[608,262,692,264.5],'S',1.0,1.72);
  const la=piece('Lampadaire');lampadaire(la,692,455,1.6);
  const pl=piece('Plante');plante(pl,690,312,0.12,1.4);
  tapis('Tapis du salon',570,330,668,425,0xc9b28e,0xd8c3a0);
  const bt=piece('2 tabourets de bar');tabouret(bt,372,352,0.75);tabouret(bt,408,352,0.75);
  suspension('Suspension du bar',390,310,1.6,0.18,0x2f3033);
  const ce=piece('Console extensible 0,90 × 0,45 (→ 3,00 m)');table(ce,[303.4,352,334,410],0.76,0x6b4a32,0x2a2b2d);bx(ce,306,355,331,407,0.62,0.66,0x6b4a32);
  const ci=piece('Chaises pliantes accrochées',furnWall);[360,375,390].forEach(z=>bx(ci,303.4,z,306,z+12,1.2,1.95,0xcaa97c));
  cuisineMetod();
  const en=piece('Meuble à chaussures 0,68 × 0,20 + patères');chaussures(en,[163.8,472,177.4,518],'E');patere(en,[163.8,474,177.4,516],'E',3,1.85);
  tapis('Paillasson',170,420,214,466,0x6b5a48);
  lingeSDB('etageres');wcDeco();
  const gm=piece('BRIMNES = garde-manger (courses)');cab(gm,[523.4,26,557.4,105.6],0,1.9,0xf6f5f1,'E',3,0xfbfbf9);
  const ep=piece('Étagère réserves 0,30 × 1,20 × 2,00');etag(ep,[523.4,110,543.8,190],2.0,COL.chene,'E',[0.02,0.42,0.82,1.22,1.62,1.98],8,0.9);
  const bu=piece('Bureau-établi 180 × 80 + siège');bureau(bu,[560,21.8,682.4,76.2],'S');gamer(bu,621,102,'S');ecran(bu,[596,30,646,32.5],'S',0.85,1.25);
  const me=piece('Colonne ménage 0,60 × 0,80 × 2,00 (aspirateur, seau, outils)');cab(me,[673,80,713.2,134],0,2.0,0x7d7d4e,'W',2,0x8a8a5a);
  const tr=piece('Tri 4 bacs 1,00 × 0,45');tri(tr,[590,221,658,251.6],'N');
  const pg=piece('Panneau à outils',furnWall);bx(pg,590,250.2,658,251.6,1.1,1.8,0xcaa97c);[[600,1.3,0xb3262d],[615,1.5,0x3a3d40],[630,1.25,0xd9a441],[645,1.55,0x3b6ea5]].forEach(b=>bx(pg,b[0],248.6,b[0]+6,250.2,b[1],b[1]+0.18,b[2]));
  tapis('Tapis lavable',590,120,660,195,0x8a7a66);
  grab('Dressing ouvert 2,00 × 0,50',furnWall,()=>dressing(440.4,552,552+2.0*S,34,2.05));
  chambreCentree({x0:539.4,plaid:T.plaid,tete:0xc9a99a});
  tapis('Tapis de chambre',515,575,672,640,0xe9e2d3);
  abri(17);
  const co=piece('Lombricomposteur + bacs verre / papier');bx(co,735,75,762,102,0,0.8,0x4f6b52);bx(co,735,75,762,102,0.8,0.84,0x3a3d40);tri(co,[735,106,762,150],'E',[0x4f8a45,0x3b6ea5]);
  const ja=piece('Bacs potager surélevés');aromates(ja,[798,80,812,200],'W');aromates(ja,[798,290,812,440],'W');
  tableBalcon('Table 1,10 × 0,60 + 3 chaises (bout du balcon)',630,788.4,['W1','W2','N']);
  meubleBBQ(222,true);
}
