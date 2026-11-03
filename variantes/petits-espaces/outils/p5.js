const PROP={
  titre:'5 · Tetris',sous:'tout roule, rien n\'est figé',
  alt:['Amis','Les 4 modules du canapé roulés dans la ch. 2 forment un lit 150 × 200 ; le bureau à roulettes est repoussé contre le mur'],
  legende:[['#c26c48','#e9e2d6','Tomettes hexagonales'],['#d9a46a','#f1ead8','Carreaux ocre 10 × 10'],['#d0b080','#9c7c50','Chêne naturel (ch. 1)'],['#d8c23a','#a8941e','Caoutchouc moucheté (ch. 2)'],['#3b82c4','#1f4f7d','Portes']],
  rooms:[['Séjour modulable','',520,440],['Cuisine','',445,150],['Îlot à roulettes','',469,361,1.05,1],['4 modules = canapé','',640,300,0.6,1],['Chambre (ch. 1)','≈ 11,5 m²',600,530],['Pièce caméléon (ch. 2)','≈ 9 m²',640,160],['Entrée','',240,500],['WC','',195,640],['SDB','',320,620],['Balcon','',775,360],['Chaises pliantes sur cimaise','',586,488,1.8,1]],
  roomsAlt:[['Séjour (modules partis)','',560,360],['Lit d\'amis 150 × 200 (4 modules)','',631,90,0.6,1],['Bureau repoussé','',550,90,0.9,1],['Chambre (ch. 1)','',600,530]]
};
const PAINTS={
  bauhaus:{b:'Bauhaus',n:'Bauhaus',w:{sej:[0xd8c23a,'Séjour mur des patères · jaune'],ch1:[0x3b6ea5,'Ch. 1 tête de lit · bleu'],ch2:[0xc65f37,'Ch. 2 mur du bureau · rouge brique']},f:{mod:0x3b6ea5,modC:0x4a7fb5,dos:[0xd8c23a,0xc65f37,0xe9e4d8,0x2b2c2e],duvet:0xf4f2ec,plaid:0xd8c23a}},
  pastel:{b:'Pastel',n:'Pastel',w:{sej:[0xe7c6b5,'Séjour mur des patères · rose argile'],ch1:[0xb5c9b0,'Ch. 1 tête de lit · menthe'],ch2:[0xc9c0dd,'Ch. 2 mur du bureau · lavande']},f:{mod:0xd8cfc0,modC:0xe6ddd0,dos:[0xe7c6b5,0xb5c9b0,0xc9c0dd,0xd8cfc0],duvet:0xf7f5f0,plaid:0xb5c9b0}}
};
const PWALLS={
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  ch2:col=>paintWall(true,15,520+I*S/2,720-E*S/2,E,1,[[640,690,'win']],col)
};
const PASSAGES=[
  ['Cuisine : entre plan de travail et METOD',421,90,482.2,235,0.9],
  ['Séjour : entre îlot et canapé',500,300,554.4,420],
  ['Séjour : devant la porte de la chambre 2',525,258.4,585,312.8],
  ['Séjour : devant la porte de la chambre 1',445,440,490,493.6],
  ['Séjour : vers la baie',655,385,705,439.4],
  ['Entrée : porte → séjour',212,422,296.6,476.4],
  ['Entrée : devant WC et SDB',200,470,254.4,518],
  ['Ch. 1 : porte → lit (côté ouest)',478,560,532,665],
  ['Ch. 1 : côté est du lit',656,600,705,665],
  ['Ch. 2 : porte → lit d\'amis',585,163,650,214],
  ['SDB : de la porte au lavabo',300,600,354.4,655],
  ['Balcon : ch. 2 ↔ séjour',757,170,811.4,270],
  ['Balcon : devant la baie',735,300,789,400],
  ['Balcon : séjour ↔ ch. 1',740,455,794.4,515]
];
Object.assign(tex,{
  chene:{t:planches('#d0b080',['#d4b585','#c9a876','#d9bc8e','#c5a370'],'#9c7c50',6,1.5,55,'#b08e5e'),m:1.3},
  caoutchouc:{t:mk(g=>{g.fillStyle='#d8c23a';g.fillRect(0,0,256,256);const r=rnd(91);for(let i=0;i<260;i++){g.fillStyle=['#2b2c2e','#f2f0ea','#c65f37'][i%3];g.beginPath();g.arc(r()*256,r()*256,1.5+r()*2,0,6.283);g.fill();}}),m:0.8}
});
const BOULEAU=0xe3cfa8,BF=0xd6bf93,NOIR=0x2b2c2e,ROUE=0x3a3a3a;
function roulettes(g,x0,z0,x1,z1){[[x0+2,z0+2],[x1-2,z0+2],[x0+2,z1-2],[x1-2,z1-2]].forEach(p=>cy(g,p[0],p[1],0.025,0,0.05,ROUE));}
function module(g,x0,z0,x1,z1,T,dos){
  roulettes(g,x0,z0,x1,z1);
  caisson(g,x0,z0,x1,z1,0.05,0.38,{c:BOULEAU,f:BF,face:dos==='S'?'N':'S',n:1,h:NOIR,hz:1});
  bx(g,x0+0.4,z0+0.4,x1-0.4,z1-0.4,0.38,0.5,T.mod);
}
function amenagement(){const T=theme();sejour5(T);cuisine5(T);ch1_5(T);ch2_5(T);entree5(T);sdb5(T);balcon5(T);}
function sejour5(T){
  const mw=cm(75),md=cm(100);
  if(!ALT){
    let g=item('Modules 1 et 2 (canapé)');
    module(g,600,258.4,600+mw,258.4+md,T);module(g,600+mw,258.4,600+2*mw,258.4+md,T);
    T.dos.slice(0,2).forEach((c,i)=>bx(g,602+i*mw,258.4,598+(i+1)*mw,272,0.5,0.95,c));
    g=item('Module 3 (chaise longue)');module(g,600+2*mw-md,258.4+md,600+2*mw,258.4+md+mw,T);
    g=item('Module 4 (pouf-coffre)');module(g,555,345,555+mw,345+mw*0.68,T);bx(g,560,348,600,370,0.5,0.53,0xe9e4d8);
  }
  let g=item('Îlot-table à roulettes 120 × 70, rabat 40 cm');
  roulettes(g,445,320,492.6,401.6);caisson(g,445,320,492.6,401.6,0.05,0.86,{c:BOULEAU,f:[BF,BOULEAU],face:'E',n:2,r:3,h:NOIR});bx(g,443,318,494.6,403.6,0.86,0.9,0x2b2c2e);
  g=item('Tabourets hauts');tabouret(g,437,256,0.65,BOULEAU);tabouret(g,437,288,0.65,BOULEAU);
  g=item('Cimaise Shaker, 4 chaises pliantes, paniers',furnWall);
  bx(g,495,491.6,678,493.6,1.72,1.8,BOULEAU);for(let x=505;x<675;x+=17)bx(g,x,489.6,x+1.4,491.6,1.74,1.78,BF);
  [510,532,554,576].forEach((x,i)=>{bx(g,x,491,x+20,493.6,0.85,1.72,[0xd8c23a,0x3b6ea5,0xc65f37,NOIR][i]);});
  [612,640].forEach((x,i)=>cy(g,x+8,486,0.11,1.35,1.7,0xc9b48f));
  g=item('TV sur pied à roulettes');roulettes(g,600,440,641,467);bx(g,600,440,641,467,0.05,0.08,NOIR);bx(g,618,452,623,455,0.08,0.85,NOIR);tele(g,589,452,652,455,0.85,1.42);
  g=item('Desserte à plantes à roulettes');roulettes(g,670,450,700,474);bx(g,670,450,700,474,0.05,0.07,BOULEAU);plante(g,685,462,0.9,0xd8cfc0,0x4f8a45,0.07);
  g=item('Tapis rond');tapis(g,540,330,650,440,0xe9e4d8,0xd8c23a);
  suspension('Suspension au-dessus de l\'îlot',469,361,1.6,0xd8c23a,0.18);
}
function cuisine5(T){
  cuisineMetod();
  let g=item('Chariot de cuisine à roulettes (garé)');roulettes(g,464,236,489,282);etag(g,464,236,489,282,0.05,0.9,[0.06,0.45,0.88],BOULEAU,{});[246,264].forEach((z,i)=>cy(g,476,z,0.06,0.48,0.64,[0xc65f37,0xe9e4d8][i]));
}
function ch1_5(T){
  meuble('Lit 160 × 200 et tête de lit capitonnée (existants)',furnGroup,595.75,698.2,'N',s=>litPossedeL(s,{plaid:T.plaid,duvet:T.duvet}));
  meuble('Dressing ouvert existant',furnWall,440.4,620,'E',s=>dressingL(s));
  let g=item('Chevets-dessertes à roulettes');[[527,670],[653,670]].forEach(p=>{roulettes(g,p[0],p[1],p[0]+12,p[1]+24);bx(g,p[0],p[1],p[0]+12,p[1]+24,0.05,0.5,BOULEAU);lampe(g,p[0]+6,p[1]+12,0.5,0xd8c23a);});
  g=item('Portant à roulettes (tenues du lendemain)');roulettes(g,560,503,640,525);[561,637].forEach(x=>bx(g,x,512,x+2,516,0.05,1.6,NOIR));bx(g,561,513,639,515,1.58,1.6,NOIR);[[575,0x3b6ea5],[595,0xe9e4d8],[615,0xc65f37]].forEach(q=>bx(g,q[0],506,q[0]+14,522,0.9,1.55,q[1]));
  g=item('Placard en pont au-dessus de la porte',furnTall);caisson(g,440.4,500.4,500,530,2.1,2.48,{c:BOULEAU,f:BF,face:'S',n:2,h:NOIR});
}
function ch2_5(T){
  meuble('Armoire BRIMNES (existante)',furnWall,629.8,251.6,'N',brimnesL);
  if(!ALT){
    meuble('Bureau 180 × 80 à roulettes (existant + roulettes)',furnGroup,623.3,21.8,'S',bureauL);
    meuble('Siège gaming (existant)',furnGroup,623,100,'S',gamingL);
    let g=item('Écran et lampe');bx(g,592,26,632,32,0.75,1.15,0x151617);lampe(g,575,32,0.75);
    g=item('Tapis');tapis(g,560,120,690,200,0x2b2c2e,0x3e4044);
  }else{
    meuble('Bureau 180 × 80 repoussé contre le mur',furnGroup,523.4,91.2,'E',bureauL);
    meuble('Siège gaming rangé',furnGroup,560,178,'W',gamingL);
    const g=item('Lit d\'amis : 4 modules assemblés 150 × 200');
    const mw=cm(75),md=cm(100);
    for(let i=0;i<2;i++)for(let j=0;j<2;j++){roulettes(g,580+i*mw,21.8+j*md,580+(i+1)*mw,21.8+(j+1)*md);caisson(g,580+i*mw,21.8+j*md,580+(i+1)*mw,21.8+(j+1)*md,0.05,0.38,{c:BOULEAU,f:BF,face:'E',n:1});}
    literie(g,580.4,22.2,681.6,157.4,0.38,'N',{duvet:T.duvet,plaid:T.plaid});
  }
  const g=item('Étagères murales hautes',furnTall);bx(g,523.4,30,537,190,1.95,1.97,BOULEAU);livres(g,32,186,false,523.4,536,1.97,0.28,93);
}
function entree5(T){
  let g=item('Desserte à chaussures à roulettes');roulettes(g,163.8,474,190,520);etag(g,163.8,474,190,520,0.05,0.6,[0.06,0.32,0.58],BOULEAU,{});[480,492,504].forEach((z,i)=>bx(g,166,z,186,z+9,0.08,0.18,[0xc65f37,NOIR,0x3b6ea5][i]));
  g=item('Cimaise Shaker de l\'entrée',furnWall);bx(g,163.8,474,165.4,560,1.7,1.78,BOULEAU);[482,500,518].forEach(z=>bx(g,165.4,z,168,z+1.4,1.72,1.76,BF));bx(g,166,486,172,500,0.95,1.7,0xd8c23a);
  g=item('Placard en pont au-dessus de la porte d\'entrée',furnTall);caisson(g,163.8,414,197.8,486,2.1,2.48,{c:BOULEAU,f:BF,face:'E',n:2,h:NOIR});
  g=item('Tapis');tapis(g,205,420,260,466,0xd8c23a,0xc9b030);
}
function sdb5(T){
  etagereSdb();etageresLinge();
  let g=item('Chariot de salle de bains à roulettes');roulettes(g,318,670,343,698.2);etag(g,318,670,343,698.2,0.05,0.85,[0.06,0.45,0.83],BOULEAU,{});[[321,0.48,0xffffff],[331,0.48,0x3b6ea5],[324,0.86,0xd8c23a]].forEach(q=>bx(g,q[0],673,q[0]+8,690,q[1],q[1]+0.12,q[2]));
  g=item('Étagère au-dessus des WC',furnWall);bx(g,163.8,672,228.6,698.2,1.4,1.42,BOULEAU);
}
function balcon5(T){
  let g=item('Jardinières à roulettes (potager mobile)');
  [[25,85],[95,150],[590,650],[655,700]].forEach(r=>{roulettes(g,730,r[0],770,r[1]);bx(g,730,r[0],770,r[1],0.05,0.6,BOULEAU);for(let z=r[0]+8;z<r[1]-4;z+=14)herbe(g,750,z,0.6,0.07,[0x5a9a48,0xb3262d,0x7aa64a][(z/14|0)%3]);});
  g=item('Table pliante et 2 fauteuils pliants');bx(g,790,320,819,380,0.72,0.75,0xd8c23a);bx(g,814,345,817,355,0,0.72,NOIR);
  [[800,309,-1],[800,391,1]].forEach(p=>{bx(g,p[0]-10,p[1]-9,p[0]+10,p[1]+9,0.4,0.44,0xd8c23a);const zb=p[2]<0?p[1]-9:p[1]+7;bx(g,p[0]-10,zb,p[0]+10,zb+2,0.44,0.85,0xd8c23a);});
  g=item('Coffre de balcon sur roulettes');roulettes(g,730,230,755,272);caisson(g,730,230,755,272,0.05,0.55,{c:0x4a4d50,f:0x5c6064,face:'E',n:1,h:NOIR});
}
function sols(){
  [[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]].forEach(r=>sol(r[0],r[1],r[2],r[3],'hexa'));
  sol(157,565,232,705,'ocre');sol(232,565,437,705,'ocre');
  sol(437,497,720,705,'chene');sol(520,15,720,255,'caoutchouc');
}
