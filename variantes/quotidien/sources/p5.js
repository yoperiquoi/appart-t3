Object.assign(tex,{
  p5bleue:{t:tuiles(['#6d7378','#666c71','#737a7f','#62686d'],4,4,'#4c5156',2,44),m:2.4},
  p5rose:{t:terrazzo('#e6cfc4',['#b98b7b','#f4ece6','#8d8f8c','#c9a493'],'#cdb3a6',4,14),m:1.2},
  p5noyer:{t:lames(['#7a573b','#6e4e34','#835f42','#73523a'],'#3e2a1a',8,15),m:1.6},
  p5batons:{t:batons(['#d2aa79','#c99f6d','#d8b384'],'#8a6a44',27),m:1.4}
});
const PALETTES={
  diner:{n:'Brique & bleu nuit',w:{ch2N:[0x9c4a36,'Salle à manger · rouge brique'],ch2:[0x9c4a36,'Salle à manger · rouge brique (vaisselier)'],ch1N:[0x34495e,'Chambre · tête de lit bleu nuit'],sejN:[0xe6d6c1,'Séjour · mur TV grège']},f:{sofa:0x34495e,sofaC:0x4a5f75,plaid:0x9c4a36,chaise:0x6b4a32}},
  blanc:{n:'Murs blancs',w:{},f:{sofa:0x7d8a96,sofaC:0x96a3ae,plaid:0xd8cfc0,chaise:0x8b6a4a}}
};
const PIECES=[['Grand salon','',560,330],['Bureau face au balcon','',672,320,0.9,1],['Cuisine','',470,170],['Salle à manger fermée','9,0 m²',612,200],['Chambre (tête côté séjour)','≈ 11,5 m²',585,665],['Entrée','',230,470],['WC','',195,690],['SDB','',320,640],['Placard couloir : linge & réserve','',368,545,2.55],['Banc d’entrée','',318,380,0.9,1],['Balcon · le dîner continue dehors','',775,120]];
function amenager(){
  mursPeints();const T=theme();
  solZone('sejour','p5bleue');solZone('eau','p5rose');solZone('ch1','p5noyer');solZone('ch2','p5batons');
  const cn=piece('Canapé 1,80 × 0,90');canape(cn,[492,432.4,614.4,493.6],'S',T.sofa,T.sofaC,'both');
  const fa=piece('Pouf Ø 0,50');cy(fa,550,345,0.25,0,0.42,0xd9a441);
  const tb=piece('Table basse 1,00 × 0,55');table(tb,[515,370,583,407.4],0.4,0xcaa97c,0x2a2b2d);
  const tv=piece('Meuble TV 1,25 × 0,40');cab(tv,[595,258.4,680,285.6],0,0.45,COL.noyer,'S',3,0x7d5a40);
  const te=piece('TV 50"',furnTall);ecran(te,[600,262,676,264.5],'S',1.0,1.66);
  const bu=piece('Bureau 180 × 80 face à la baie + siège gaming');bureau(bu,[646,345,700.4,467.4],'W');gamer(bu,626,395,'W');ecran(bu,[685,380,687.5,430],'W',0.85,1.25);
  const la=piece('Lampadaire');lampadaire(la,450,470,1.6);
  tapis('Tapis du salon',500,330,600,425,0x4a5f75,0x5b7189);
  const bc=piece('Banc d’entrée 0,85 × 0,40 (chaussures dessous)');cab(bc,[303.4,352,330.6,410],0,0.46,COL.chene,'E',2);bx(bc,305,355,329,407,0.46,0.52,0xe6d6c1);
  const mi=piece('Patères au-dessus du banc',furnWall);patere(mi,[303.4,355,315,407],'E',3,1.85);
  cuisineMetod();
  const en=piece('Meuble à chaussures 0,68 × 0,20 + miroir');chaussures(en,[163.8,472,177.4,518],'E');bx(en,163.8,478,165.2,512,1.15,1.85,0xcfdde4);
  tapis('Paillasson',170,420,214,466,0x6b5a48);
  lingeSDB('etageres');wcDeco();
  const sm=piece('Table 1,40 × 0,80 + 6 chaises');table(sm,[570.4,102.8,665.6,157.2],0.75,0x6b4a32,0x2a2b2d);
  [595,641].forEach(x=>{chaise(sm,x,95.8,'N',T.chaise);chaise(sm,x,164.2,'S',T.chaise);});chaise(sm,563.4,130,'W',T.chaise);chaise(sm,672.6,130,'E',T.chaise);
  suspension('Suspension salle à manger',618,130,1.55,0.28,0xd9a441);
  const vs=piece('BRIMNES = vaisselier (nappes, vaisselle des grands jours)');cab(vs,[523.4,26,557.4,105.6],0,1.9,0xf6f5f1,'E',3,0xfbfbf9);
  const bf=piece('Buffet bas 1,00 × 0,45 (desserte)');cab(bf,[590,221,658,251.6],0,0.8,COL.noyer,'N',2,0x7d5a40);bx(bf,600,230,620,245,0.8,0.95,0xe9e4da);lampe(bf,645,236,0.8);
  tapis('Tapis de la salle à manger',555,80,682,180,0xc9a493);
  grab('Dressing ouvert 2,00 × 0,50',furnWall,()=>dressing(440.4,552,688,34,2.05));
  const lt=piece('Lit 160 × 200 tête au nord + chevets');lit(lt,[530,500.4,638.8,639.8],'N',{plaid:T.plaid,tete:0x34495e,hbH:1.1});
  bx(lt,505,500.4,528,524,0,0.5,0xe9e4da);lampe(lt,516.5,512,0.5);bx(lt,640.8,500.4,659,524,0,0.5,0xe9e4da);lampe(lt,650,512,0.5);
  tapis('Tapis de chambre',540,642,630,690,0xe9e2d3);
  abri(17);
  const lt2=piece('Grande table 2,20 × 0,60 (table actuelle + jumelle pliante) + 3 chaises');table(lt2,[780,80,820,230],0.75,0xb08a5e,0x3a3d40);
  [105,150,195].forEach(z=>chaise(lt2,763,z,'W'));
  meubleBBQ(222,true);
  const ja=piece('Jardinières');aromates(ja,[798,290,812,440],'W');aromates(ja,[798,580,812,680],'W');
  const lo=piece('Fauteuil d’extérieur');fauteuil(lo,[736,620,786,670],'W',0xb08a5e,0xe6d6c1);
}
