const items=[];
function P(n){items.push([n,furnGroup.children.length,furnWall.children.length,furnTall.children.length]);}
function tileTex(cols,joint,n,jw,seed,chips){
  return mk(g=>{
    const r=rnd(seed),u=256/n;
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(j*u,i*u,u,u);}
    if(chips)for(let k=0;k<chips.n;k++){g.fillStyle=chips.c[Math.floor(r()*chips.c.length)];const s=chips.s*(0.4+r());g.beginPath();g.ellipse(r()*256,r()*256,s,s*(0.5+r()*0.5),r()*3,0,6.283);g.fill();}
    g.strokeStyle=joint;g.lineWidth=jw;
    for(let k=0;k<=n;k++){g.beginPath();g.moveTo(k*u,0);g.lineTo(k*u,256);g.moveTo(0,k*u);g.lineTo(256,k*u);g.stroke();}
  });
}
function planksTex(cols,n,joint,seed,vert){
  return mk(g=>{
    const r=rnd(seed),u=256/n;
    for(let i=0;i<n;i++){
      const off=Math.floor(r()*256);
      for(let s=-2;s<2;s++){g.fillStyle=cols[Math.floor(r()*cols.length)];vert?g.fillRect(i*u,off+s*128,u,128):g.fillRect(off+s*128,i*u,128,u);}
      g.strokeStyle='rgba(60,40,20,0.18)';g.lineWidth=1;
      for(let k=1;k<4;k++){const p=i*u+k*u/4;g.beginPath();vert?(g.moveTo(p,0),g.lineTo(p+2,256)):(g.moveTo(0,p),g.lineTo(256,p+2));g.stroke();}
      g.strokeStyle=joint;g.lineWidth=2;g.beginPath();
      vert?(g.moveTo(i*u,0),g.lineTo(i*u,256),g.moveTo(i*u,off),g.lineTo(i*u+u,off),g.moveTo(i*u,(off+128)%256),g.lineTo(i*u+u,(off+128)%256)):(g.moveTo(0,i*u),g.lineTo(256,i*u),g.moveTo(off,i*u),g.lineTo(off,i*u+u),g.moveTo((off+128)%256,i*u),g.lineTo((off+128)%256,i*u+u));
      g.stroke();
    }
  });
}
function chevronTex(cols,joint,seed,cw,ph){
  return mk(g=>{
    const r=rnd(seed),n=256/cw;
    for(let c=0;c<n;c++){
      const x0=c*cw,x1=x0+cw,dir=c%2?1:-1;
      for(let y=-cw-ph;y<256+cw+ph;y+=ph){
        const ya=y,yb=y+dir*cw;
        g.fillStyle=cols[Math.floor(r()*cols.length)];
        g.beginPath();g.moveTo(x0,ya);g.lineTo(x1,yb);g.lineTo(x1,yb+ph);g.lineTo(x0,ya+ph);g.closePath();g.fill();
        g.strokeStyle=joint;g.lineWidth=1.6;g.stroke();
      }
    }
  });
}
function hexTex(cols,joint,seed){
  return mk((g,w,h)=>{
    const r=rnd(seed),a=w/4,rr=a/Math.sqrt(3),vy=1.5*rr;
    g.fillStyle=joint;g.fillRect(0,0,w,h);
    for(let row=-1;row<=4;row++)for(let col=-1;col<=4;col++){
      const cx=col*a+(row%2?a/2:0),cy=row*vy;
      g.fillStyle=cols[Math.floor(r()*cols.length)];g.beginPath();
      for(let k=0;k<6;k++){const an=Math.PI/6+k*Math.PI/3,px=cx+(rr-1.6)*Math.cos(an),py=cy+(rr-1.6)*Math.sin(an);k?g.lineTo(px,py):g.moveTo(px,py);}
      g.closePath();g.fill();
    }
  },256,Math.round(3*256/4/Math.sqrt(3)*2));
}
function cimentTex(a,b,c,joint){
  return mk(g=>{
    for(let i=0;i<2;i++)for(let j=0;j<2;j++){
      const x=j*128,y=i*128;g.fillStyle=a;g.fillRect(x,y,128,128);
      g.fillStyle=b;[[0,0],[128,0],[0,128],[128,128]].forEach(p=>{g.beginPath();g.moveTo(x+p[0],y+p[1]);g.arc(x+p[0],y+p[1],52,0,6.283);g.fill();});
      g.fillStyle=a;[[0,0],[128,0],[0,128],[128,128]].forEach(p=>{g.beginPath();g.arc(x+p[0],y+p[1],30,0,6.283);g.fill();});
      g.fillStyle=c;g.beginPath();g.moveTo(x+64,y+34);g.lineTo(x+94,y+64);g.lineTo(x+64,y+94);g.lineTo(x+34,y+64);g.closePath();g.fill();
    }
    g.strokeStyle=joint;g.lineWidth=2;for(let k=0;k<=2;k++){g.beginPath();g.moveTo(k*128,0);g.lineTo(k*128,256);g.moveTo(0,k*128);g.lineTo(256,k*128);g.stroke();}
  });
}
Object.assign(tex,{
  hexa:{t:hexTex(['#b8603a','#c06a40','#a9563a','#c8774a','#b36843'],'#e6d6c0',11),m:0.6,k:0.866},
  pierre:{t:tileTex(['#e9e2d4','#e4dccc','#ede6d9','#e1d8c6'],'#cbbfa8',2,2,4,{n:160,c:['rgba(150,135,110,0.18)','rgba(255,255,255,0.35)'],s:2}),m:1.2},
  terrazzo:{t:tileTex(['#ecebe6','#e8e6e0','#efeee9'],'#c9c6bd',2,2,9,{n:900,c:['#c65f37','#8a8f94','#3c3f44','#d9a441','#9db8aa','#b9b6ad'],s:2.6}),m:1.2},
  terrazzoV:{t:tileTex(['#9fb4a3','#a7bca9','#98ad9c'],'#7e927f',2,2,12,{n:700,c:['#f2efe6','#5a6e5c','#d9a441','#3c4a3e'],s:2.4}),m:0.8},
  terraOut:{t:tileTex(['#e4e1d9','#dedad1','#e8e5dd'],'#a9a59b',2,3,13,{n:500,c:['#8a8f94','#c65f37','#55595e'],s:2.2}),m:1.2},
  chene:{t:planksTex(['#d2b083','#cba675','#d8b98d','#c49f6e'],4,'#8e6c42',3),m:1.2},
  cheneF:{t:planksTex(['#6e5038','#654832','#77573d','#5f442f'],4,'#3b2a1c',5),m:1.2},
  hongrie:{t:chevronTex(['#d7b98c','#cfae7e','#dcc196','#c9a676'],'#9c7a4c',8,64,32),m:1.0},
  chevronT:{t:chevronTex(['#c0663e','#b85e38','#c97247','#ad5a37'],'#e3d2bb',6,64,32),m:0.7},
  boisT:{t:planksTex(['#c9a171','#c19867','#d1ab7d','#bb9161'],8,'#7d5c36',14,true),m:1.6},
  deckL:{t:planksTex(['#9b7b58','#a6865f','#8f704f','#ad8e67'],8,'#4f3d2a',17),m:1.2},
  deckV:{t:planksTex(['#9b7b58','#a6865f','#8f704f','#ad8e67'],8,'#4f3d2a',19,true),m:1.2},
  ciment:{t:cimentTex('#efe9dc','#2f5d62','#c65f37','#cfc6b4'),m:0.4},
  zellige:{t:tileTex(['#3f7f6e','#4a8a78','#367364','#57968a','#2f6a5c'],'#e8e2d4',8,1.6,21),m:0.8},
  zelligeB:{t:tileTex(['#f1ede4','#e9e3d6','#f6f2ea','#e3dccd'],'#cfc6b4',8,1.4,23),m:0.8},
  sisal:{t:mk(g=>{g.fillStyle='#cdb88f';g.fillRect(0,0,256,256);for(let i=0;i<32;i++)for(let j=0;j<32;j++){g.fillStyle=(i+j)%2?'#bfa77c':'#d8c49d';g.fillRect(j*8+((i%2)*4),i*8,6,7);}}),m:0.5},
  tatami:{t:mk(g=>{g.fillStyle='#c8c58f';g.fillRect(0,0,256,256);for(let i=0;i<128;i++){g.fillStyle=i%2?'#bdb984':'#d0cd99';g.fillRect(0,i*2,256,2);}g.fillStyle='#2c2c28';g.fillRect(0,0,256,8);g.fillRect(0,124,256,8);g.fillRect(0,248,256,8);}),m:1.8},
  beton:{t:tileTex(['#b9b6b0','#b2afa9','#bfbcb6'],'#8f8c86',2,1.5,25,{n:400,c:['rgba(90,90,85,0.18)','rgba(255,255,255,0.25)'],s:1.6}),m:2.4},
  ardoise:{t:tileTex(['#4a4e53','#44484d','#50545a','#3f4348'],'#2b2d30',2,2,27),m:1.2},
  dalle:{t:tileTex(['#a8a49b','#b0aca3','#a19d95'],'#6f6c66',2,3,29,{n:300,c:['rgba(70,70,65,0.2)'],s:1.5}),m:1.2},
  gravier:{t:mk(g=>{g.fillStyle='#b9b2a3';g.fillRect(0,0,256,256);const r=rnd(31);for(let i=0;i<1600;i++){g.fillStyle=['#d8d2c4','#9e978a','#c9c2b3','#8c8578'][i%4];g.beginPath();g.arc(r()*256,r()*256,1+r()*2.5,0,6.283);g.fill();}}),m:0.6},
  vigne:{t:mk(g=>{g.fillStyle='rgba(0,0,0,0)';g.clearRect(0,0,256,256);const r=rnd(33);for(let i=0;i<260;i++){g.fillStyle=['#3f7a34','#4f8f3f','#2f6428','#6aa34f'][i%4];g.beginPath();g.ellipse(r()*256,r()*256,6+r()*8,4+r()*6,r()*3,0,6.283);g.fill();}}),m:1.0}
});
function tmx(name,w,d){
  const t=tex[name].t.clone();t.needsUpdate=true;t.repeat.set(w/tex[name].m,d/(tex[name].m*(tex[name].k||1)));
  return new THREE.MeshLambertMaterial({map:t});
}
function sol(x0,z0,x1,z1,name){box(X(x0),Z(z0),X(x1),Z(z1),-0.06,0,tmx(name,(x1-x0)/S,(z1-z0)/S),floorGroup);}
const DIRS={S:0,E:Math.PI/2,N:Math.PI,W:-Math.PI/2};
function place(x0,z0,x1,z1,dir,grp){
  const g=new THREE.Group(),ns=dir==='S'||dir==='N';
  g.position.set(X((x0+x1)/2),0,Z((z0+z1)/2));g.rotation.y=DIRS[dir];grp.add(g);
  return {g,w:(ns?x1-x0:z1-z0)/S,d:(ns?z1-z0:x1-x0)/S};
}
function at(cx,cz,grp){const g=new THREE.Group();g.position.set(X(cx),0,Z(cz));grp.add(g);return g;}
function cy(g,x,z,r,y0,y1,mat,r2){const m=new THREE.Mesh(new THREE.CylinderGeometry(r2===undefined?r:r2,r,y1-y0,20),mat);m.position.set(x,(y0+y1)/2,z);g.add(m);return m;}
function sp(g,x,y,z,rx,ry,rz,mat){const m=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),mat);m.scale.set(rx,ry,rz);m.position.set(x,y,z);g.add(m);return m;}
const glow=c=>new THREE.MeshBasicMaterial({color:c});
const C={dark:0x2f3033,oak:0xcaa97c,oakD:0x8b6a4a,walnut:0x5a4330,white:0xf4f3ef,terra:0xb8643c,anth:0x3a3d40,rattan:0xb89160,linen:0xe7e0d2,zinc:0x9aa0a6,soil:0x4a3526,leaf:0x3f7a34,leafD:0x2f5f2a,leafL:0x6aa34f,olive:0x8a9a6b,metal:0x2a2c2f};
function pot(g,r,h,col){cy(g,0,0,r*0.82,0,h,L(col),r);cy(g,0,0,r*0.9,h-0.03,h-0.01,L(C.soil));}
function plante(cx,cz,type,s,grp,potCol){
  const g=at(cx,cz,grp||furnGroup);s=s||1;
  const lf=L(C.leaf),ld=L(C.leafD),ll=L(C.leafL);
  if(type==='olivier'){pot(g,0.26*s,0.45*s,potCol||C.terra);cy(g,0,0,0.045*s,0.42*s,1.25*s,L(0x6b5a45));[[0,1.55,0,0.36],[0.14,1.4,0.1,0.26],[-0.12,1.42,-0.08,0.26]].forEach(p=>sp(g,p[0]*s,p[1]*s,p[2]*s,p[3]*s,p[3]*0.8*s,p[3]*s,L(C.olive)));}
  if(type==='agrume'){pot(g,0.22*s,0.4*s,potCol||C.terra);cy(g,0,0,0.035*s,0.38*s,0.85*s,L(0x6b5a45));sp(g,0,1.1*s,0,0.3*s,0.32*s,0.3*s,ld);[[0.18,1.0,0.15],[-0.2,1.15,0.05],[0.05,1.25,-0.2],[0.12,0.92,-0.16],[-0.1,0.95,0.2]].forEach(p=>sp(g,p[0]*s,p[1]*s,p[2]*s,0.045*s,0.045*s,0.045*s,L(s>0.9?0xf0a020:0xf3d23a)));}
  if(type==='figuier'){pot(g,0.25*s,0.42*s,potCol||C.anth);cy(g,0,0,0.04*s,0.4*s,0.9*s,L(0x7a6a58));[[0,1.25,0,0.34],[0.16,1.05,0.12,0.24],[-0.16,1.1,-0.1,0.24]].forEach(p=>sp(g,p[0]*s,p[1]*s,p[2]*s,p[3]*s,p[3]*0.75*s,p[3]*s,ll));}
  if(type==='monstera'){pot(g,0.2*s,0.32*s,potCol||C.white);for(let i=0;i<6;i++){const a=i*1.05;sp(g,Math.cos(a)*0.14*s,(0.55+0.12*(i%3))*s,Math.sin(a)*0.14*s,0.16*s,0.05*s,0.11*s,i%2?lf:ld);}}
  if(type==='kentia'){pot(g,0.2*s,0.35*s,potCol||C.rattan);for(let i=0;i<7;i++){const a=i*0.9,e=sp(g,Math.cos(a)*0.12*s,(0.9+0.15*(i%3))*s,Math.sin(a)*0.12*s,0.08*s,0.42*s,0.05*s,i%2?lf:ll);e.rotation.z=Math.cos(a)*0.5;e.rotation.x=-Math.sin(a)*0.5;}cy(g,0,0,0.03*s,0.33*s,0.9*s,L(0x6b7a45));}
  if(type==='ficus'){pot(g,0.18*s,0.3*s,potCol||C.anth);cy(g,0,0,0.025*s,0.28*s,1.0*s,L(0x6b5a45));[[0,1.35],[0.08,1.15],[-0.08,1.0],[0.05,1.5]].forEach((p,i)=>sp(g,p[0]*s,p[1]*s,(i%2?0.06:-0.06)*s,0.16*s,0.14*s,0.12*s,ld));}
  if(type==='bambou'){pot(g,0.22*s,0.45*s,potCol||C.anth);for(let i=0;i<7;i++){const a=i*0.9,x=Math.cos(a)*0.1*s,z=Math.sin(a)*0.1*s;cy(g,x,z,0.012*s,0.43*s,(1.6+0.2*(i%3))*s,L(0x8ea65a));sp(g,x*1.4,(1.45+0.2*(i%3))*s,z*1.4,0.1*s,0.24*s,0.1*s,i%2?lf:ll);}}
  if(type==='graminee'){pot(g,0.18*s,0.3*s,potCol||C.zinc);for(let i=0;i<5;i++){const a=i*1.26;sp(g,Math.cos(a)*0.06*s,0.58*s,Math.sin(a)*0.06*s,0.07*s,0.3*s,0.07*s,L(i%2?0xb9b27a:0x8a9a5b));}}
  if(type==='lavande'){pot(g,0.16*s,0.26*s,potCol||C.terra);sp(g,0,0.38*s,0,0.15*s,0.12*s,0.15*s,L(0x7f8f68));for(let i=0;i<6;i++){const a=i*1.05;sp(g,Math.cos(a)*0.09*s,0.5*s,Math.sin(a)*0.09*s,0.03*s,0.06*s,0.03*s,L(0x8a6fb5));}}
  if(type==='fougere'){pot(g,0.16*s,0.28*s,potCol||C.white);sp(g,0,0.42*s,0,0.24*s,0.14*s,0.24*s,ll);}
  if(type==='geranium'){pot(g,0.14*s,0.22*s,potCol||C.terra);sp(g,0,0.32*s,0,0.14*s,0.1*s,0.14*s,lf);for(let i=0;i<5;i++){const a=i*1.26;sp(g,Math.cos(a)*0.08*s,0.4*s,Math.sin(a)*0.08*s,0.035*s,0.035*s,0.035*s,L(0xd2343a));}}
  if(type==='tomate'){pot(g,0.2*s,0.35*s,potCol||C.terra);cy(g,0,0,0.008,0.3*s,1.45*s,L(0x8b6a4a));[0.6,0.85,1.1,1.3].forEach((y,i)=>sp(g,(i%2?0.05:-0.05)*s,y*s,0,0.14*s,0.12*s,0.12*s,lf));[[0.08,0.7],[-0.07,0.95],[0.06,1.15]].forEach(p=>sp(g,p[0]*s,p[1]*s,0.1*s,0.04*s,0.04*s,0.04*s,L(0xd2343a)));}
  if(type==='erable'){pot(g,0.24*s,0.38*s,potCol||C.anth);cy(g,0,0,0.03*s,0.36*s,0.95*s,L(0x5a4330));[[0,1.15,0,0.3],[0.15,1.0,0.08,0.2],[-0.14,1.05,-0.06,0.2]].forEach((p,i)=>sp(g,p[0]*s,p[1]*s,p[2]*s,p[3]*s,p[3]*0.6*s,p[3]*s,L(i?0xa8322a:0xc0462e)));}
  if(type==='niwaki'){pot(g,0.22*s,0.35*s,potCol||C.anth);cy(g,0,0,0.03*s,0.33*s,1.2*s,L(0x5a4330));[[0,1.25,0,0.16],[0.12,0.95,0.05,0.12],[-0.12,0.75,-0.04,0.12]].forEach(p=>sp(g,p[0]*s,p[1]*s,p[2]*s,p[3]*s,p[3]*0.55*s,p[3]*s,L(C.leafD)));}
  return g;
}
function touffe(g,x,z,type,s){
  s=s||1;const cols={herbes:[0x5c8f43,0x7aa457,0x4b7a3a],lavande:[0x7f8f68,0x8a6fb5,0x7f8f68],fraise:[0x4f8a3f,0xd2343a,0x4f8a3f],salade:[0x8fc05f,0x7ab04f,0xa5cf72],fleurs:[0xd9a441,0xd2343a,0xe8e2d4],graminee:[0xb9b27a,0x8a9a5b,0xc7bf8a],buis:[0x2f5f2a,0x3f6b2f,0x2f5f2a],tomate:[0x3f7a34,0xd2343a,0x3f7a34],lierre:[0x2f5f2a,0x3f7a34,0x2f5f2a]}[type]||[C.leaf,C.leafL,C.leafD];
  sp(g,x,0.1*s,z,0.11*s,0.1*s,0.11*s,L(cols[0]));sp(g,x+0.03*s,0.16*s,z,0.05*s,0.05*s,0.05*s,L(cols[1]));
  if(type==='tomate'||type==='haricot'){cy(g,x,z,0.006,0,0.9,L(0x8b6a4a));sp(g,x,0.45,z,0.09,0.2,0.09,L(cols[0]));sp(g,x+0.04,0.55,z+0.04,0.03,0.03,0.03,L(cols[1]));}
}
function jardiniere(x0,z0,x1,z1,h,col,type,grp,legs){
  const o=place(x0,z0,x1,z1,(x1-x0)>=(z1-z0)?'S':'E',grp||furnGroup),g=o.g,w=o.w,d=o.d,y0=legs||0;
  if(legs)[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>box(q[0]*(w/2-0.03)-0.02,q[1]*(d/2-0.03)-0.02,q[0]*(w/2-0.03)+0.02,q[1]*(d/2-0.03)+0.02,0,y0,L(col),g));
  box(-w/2,-d/2,w/2,d/2,y0,y0+h,L(col),g);
  box(-w/2+0.03,-d/2+0.03,w/2-0.03,d/2-0.03,y0+h,y0+h+0.005,L(C.soil),g);
  const n=Math.max(1,Math.round(w/0.26)),tg=new THREE.Group();tg.position.y=y0+h;g.add(tg);
  for(let i=0;i<n;i++)touffe(tg,-w/2+(i+0.5)*w/n,0,Array.isArray(type)?type[i%type.length]:type,Math.min(1,d/0.3));
  return o;
}
function treille(x0,z0,x1,z1,y0,y1,grp){
  const vm=tmx('vigne',Math.max(x1-x0,z1-z0)/S,y1-y0);vm.transparent=true;vm.alphaTest=0.3;
  const m=new THREE.Mesh(new THREE.BoxGeometry(X(x1)-X(x0),y1-y0,Z(z1)-Z(z0)),[vm,vm,L(C.leafD),L(C.leafD),vm,vm]);
  m.position.set((X(x0)+X(x1))/2,(y0+y1)/2,(Z(z0)+Z(z1))/2);(grp||furnWall).add(m);
  const ns=(x1-x0)<(z1-z0),wm=L(0x7a5b3a);
  for(let k=0;k<=4;k++){const t=k/4;if(ns)pbox(x0,z0+t*(z1-z0-1),x1,z0+t*(z1-z0-1)+1,y0,y1,wm,grp||furnWall);else pbox(x0+t*(x1-x0-1),z0,x0+t*(x1-x0-1)+1,z1,y0,y1,wm,grp||furnWall);}
}
function tapis(x0,z0,x1,z1,col,col2){pbox(x0,z0,x1,z1,0.001,0.012,L(col),furnGroup);if(col2)pbox(x0+5,z0+5,x1-5,z1-5,0.012,0.014,L(col2),furnGroup);}
function canape(o,fab,cush,opt){
  opt=opt||{};const {g,w,d}=o,x0=-w/2,x1=w/2,z0=-d/2,z1=d/2,a=opt.arm===undefined?0.16:opt.arm,bk=opt.back||0.2,sy=opt.seat||0.42,by=opt.backH||0.82,F=L(fab),Cu=L(cush);
  box(x0+0.04,z0+0.04,x1-0.04,z1-0.04,0,0.06,L(opt.leg||C.dark),g);
  box(x0,z0,x1,z1,0.06,sy-0.1,F,g);
  box(x0+a,z0+bk,x1-a,z1,sy-0.1,sy,Cu,g);
  box(x0,z0,x1,z0+bk,sy-0.1,by,F,g);
  if(a>0){box(x0,z0,x0+a,z1,sy-0.1,sy+0.18,F,g);box(x1-a,z0,x1,z1,sy-0.1,sy+0.18,F,g);}
  const n=Math.max(2,Math.round((w-2*a)/0.65));for(let i=0;i<n;i++){const u0=x0+a+i*(w-2*a)/n+0.02,u1=x0+a+(i+1)*(w-2*a)/n-0.02;box(u0,z0+bk,u1,z0+bk+0.14,sy,by-0.04,Cu,g);}
  if(opt.chaise){const s=opt.chaise;box(s<0?x0:x1-0.7,z1,s<0?x0+0.7:x1,z1+opt.chaiseL,0.06,sy-0.1,F,g);box(s<0?x0+a:x1-0.7,z1,s<0?x0+0.7:x1-a,z1+opt.chaiseL,sy-0.1,sy,Cu,g);box(s<0?x0+0.04:x1-0.66,z1,s<0?x0+0.66:x1-0.04,z1+opt.chaiseL-0.04,0,0.06,L(opt.leg||C.dark),g);if(a>0)box(s<0?x0:x1-a,z1,s<0?x0+a:x1,z1+opt.chaiseL,sy-0.1,sy+0.18,F,g);}
  if(opt.coussins)opt.coussins.forEach((c,i)=>box(x0+a+0.08+i*0.5,z0+bk+0.02,x0+a+0.46+i*0.5,z0+bk+0.14,sy,sy+0.36,L(c),g));
}
function fauteuil(cx,cz,dir,fab,cush,grp,sz){
  const s=(sz||0.8)*S/2,o=place(cx-s,cz-s,cx+s,cz+s,dir,grp||furnGroup);canape(o,fab,cush,{arm:0.14,back:0.18});return o;
}
function chaise(cx,cz,dir,col,grp,leg){
  const h=0.225*S,o=place(cx-h,cz-h,cx+h,cz+h,dir,grp||furnGroup),g=o.g,m=L(col||C.oakD),lg=L(leg||C.walnut);
  box(-0.225,-0.225,0.225,0.225,0.43,0.47,m,g);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>box(q[0]*0.2-0.015,q[1]*0.2-0.015,q[0]*0.2+0.015,q[1]*0.2+0.015,0,0.43,lg,g));
  box(-0.225,-0.225,0.225,-0.195,0.47,0.88,m,g);
  return o;
}
function tabouret(cx,cz,h,col,grp,r){const g=at(cx,cz,grp||furnGroup);r=r||0.17;cy(g,0,0,r,h-0.04,h,L(col||C.oak));[[1,1],[-1,1],[1,-1],[-1,-1]].forEach(q=>box(q[0]*r*0.6-0.012,q[1]*r*0.6-0.012,q[0]*r*0.6+0.012,q[1]*r*0.6+0.012,0,h-0.04,L(C.metal),g));box(-r*0.6,-r*0.6,r*0.6,r*0.6,0.3,0.32,L(C.metal),g);return g;}
function pouf(cx,cz,r,h,col,grp){const g=at(cx,cz,grp||furnGroup);cy(g,0,0,r,0,h,L(col));return g;}
function table(o,top,leg,h,opt){
  opt=opt||{};const {g,w,d}=o,y=h||0.75,t=opt.t||0.04,li=opt.inset||0.06;
  box(-w/2,-d/2,w/2,d/2,y-t,y,L(top),g);
  if(opt.trestle){[-1,1].forEach(q=>{const x=q*(w/2-0.25);box(x-0.03,-d/2+0.08,x+0.03,d/2-0.08,0,0.05,L(leg),g);box(x-0.03,-0.04,x+0.03,0.04,0.05,y-t,L(leg),g);});return;}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>box(q[0]*(w/2-li)-0.025,q[1]*(d/2-li)-0.025,q[0]*(w/2-li)+0.025,q[1]*(d/2-li)+0.025,0,y-t,L(leg),g));
}
function tableRonde(cx,cz,r,top,leg,h,grp){const g=at(cx,cz,grp||furnGroup),y=h||0.75;cy(g,0,0,r,y-0.03,y,L(top));cy(g,0,0,0.04,0,y-0.03,L(leg));cy(g,0,0,Math.min(0.24,r*0.5),0,0.02,L(leg));return g;}
function etagere(o,h,n,col,opt){
  opt=opt||{};const {g,w,d}=o,m=L(col),t=0.02,cols=opt.cols||Math.max(1,Math.round(w/0.8));
  for(let i=0;i<=cols;i++){const x=-w/2+i*(w-t)/cols;box(x,-d/2,x+t,d/2,0,h,m,g);}
  for(let k=0;k<=n;k++){const y=k===0?0.02:k*(h-0.02)/n;box(-w/2,-d/2,w/2,d/2,y,y+t,m,g);}
  if(opt.back)box(-w/2,-d/2,w/2,-d/2+0.01,0,h,L(opt.back),g);
  if(opt.livres!==false){const r=rnd(opt.seed||3),pal=[0x3b6ea5,0xc65f37,0x4f8a45,0xd9a441,0x6b6d70,0x8b6a4a,0xe8e2d4,0x9db8aa];
    for(let k=0;k<n;k++){const y=k===0?0.04:k*(h-0.02)/n+t;let x=-w/2+0.04;while(x<w/2-0.12){const bw=0.025+r()*0.03,bh=Math.min((h-0.02)/n-0.06,0.18+r()*0.12);if(r()<0.72)box(x,-d/2+0.03,x+bw,d/2-0.02,y,y+bh,L(pal[Math.floor(r()*8)]),g);x+=bw+(r()<0.15?0.12:0.004);}}}
}
function armoire(o,h,col,opt){
  opt=opt||{};const {g,w,d}=o,n=opt.portes||Math.max(1,Math.round(w/0.5));
  box(-w/2,-d/2,w/2,d/2-0.02,0,h,L(col),g);
  for(let i=0;i<n;i++){const x0=-w/2+i*w/n+0.004,x1=-w/2+(i+1)*w/n-0.004;box(x0,d/2-0.02,x1,d/2,0.05,h-0.01,L(opt.face||col),g);if(opt.poignee!==false)box(i%2?x0+0.03:x1-0.05,d/2,i%2?x0+0.05:x1-0.03,d/2+0.008,h*0.45,h*0.45+0.18,L(opt.poignee||C.zinc),g);}
}
function lit(o,opt){
  opt=opt||{};const {g,w,d}=o,z0=-d/2,z1=d/2,hb=opt.tete===undefined?1.0:opt.tete,fh=opt.bas||0.3,mh=fh+0.22;
  if(hb>0)box(-w/2,z0,w/2,z0+0.07,0,hb,L(opt.teteCol||0xa49d99),g);
  const zb=hb>0?z0+0.07:z0;
  box(-w/2,zb,w/2,z1,opt.socle?0:0.06,fh,L(opt.cadre||0x3d3d3f),g);
  box(-w/2+0.02,zb+0.02,w/2-0.02,z1-0.02,fh,mh,L(0xf4f2ec),g);
  box(-w/2-0.01,zb+0.55,w/2+0.01,z1-0.01,mh-0.03,mh+0.05,L(opt.couette||0xf7f7f5),g);
  box(-w/2+0.06,zb+0.08,-0.03,zb+0.45,mh,mh+0.12,L(0xffffff),g);box(0.03,zb+0.08,w/2-0.06,zb+0.45,mh,mh+0.12,L(0xffffff),g);
  if(opt.plaid)box(-w/2-0.015,z1-0.55,w/2+0.015,z1-0.12,mh-0.04,mh+0.07,L(opt.plaid),g);
}
function chevet(cx,cz,grp,col){const s=0.19*S,g=at(cx,cz,grp||furnGroup);box(-0.19,-0.17,0.19,0.17,0,0.48,L(col||0xe9e4da),g);cy(g,0,0,0.08,0.48,0.5,L(C.oak));cy(g,0,0,0.012,0.5,0.72,L(C.dark));cy(g,0,0,0.11,0.72,0.88,L(0xf3ead4),0.08);return g;}
function bureau(o){
  const {g,w,d}=o,top=L(0xdcc296),wh=L(0xf4f4f2);
  box(-w/2,-d/2,w/2,d/2,0.725,0.75,top,g);
  [-w/2+0.12,w/2-0.12].forEach(x=>{box(x-0.03,-d/2+0.04,x+0.03,d/2-0.04,0,0.03,wh,g);box(x-0.035,-0.035,x+0.035,0.035,0.03,0.42,wh,g);box(x-0.025,-0.025,x+0.025,0.025,0.42,0.725,wh,g);});
  box(-w/2+0.12,-0.02,w/2-0.12,0.02,0.67,0.71,wh,g);
  box(-0.36,-d/2+0.08,0.36,-d/2+0.12,0.95,1.36,L(0x151617),g);box(-0.05,-d/2+0.12,0.05,-d/2+0.2,0.75,0.95,L(0x2a2a2a),g);
  box(-0.22,0.05,0.22,0.2,0.75,0.77,L(0x2a2a2a),g);
}
function gaming(cx,cz,dir,grp){
  const o=place(cx-0.3*S,cz-0.3*S,cx+0.3*S,cz+0.3*S,dir,grp||furnGroup),g=o.g,blk=L(0x222324),red=L(0xb3262d);
  cy(g,0,0,0.3,0,0.04,blk);cy(g,0,0,0.025,0.04,0.46,L(0x6b6e72));
  box(-0.27,-0.27,0.27,0.27,0.46,0.56,blk,g);box(-0.16,-0.2,0.16,0.24,0.56,0.58,red,g);
  box(-0.27,-0.3,0.27,-0.2,0.56,1.38,blk,g);box(-0.14,-0.2,0.14,-0.19,0.7,1.32,red,g);
  [-0.29,0.27].forEach(x=>box(x,-0.18,x+0.02,0.18,0.68,0.72,blk,g));return o;
}
function bz(o,fab,cu){canape(o,fab,cu,{arm:0,back:0.22,backH:0.88});}
function brimnes(o){
  const {g,w,d}=o,pw=w/3;box(-w/2,-d/2,w/2,d/2-0.015,0,1.9,L(0xf6f5f1),g);
  for(let i=0;i<3;i++){const x0=-w/2+i*pw+0.006,x1=-w/2+(i+1)*pw-0.006;box(x0,d/2-0.015,x1,d/2,0.08,1.86,L(0xfbfbf9),g);if(i===1)box(x0+0.04,d/2,x1-0.04,d/2+0.003,0.2,1.74,L(0xbfd3dc),g);const hx=i===0?x1-0.045:x0+0.045;box(hx-0.008,d/2,hx+0.008,d/2+0.012,0.9,1.15,L(C.zinc),g);}
}
function dressingO(o,ht){
  const {g,w,d}=o,m=L(0x4a4644),t=0.025,cw=0.45;ht=ht||2.05;
  [-w/2,-w/2+cw,w/2-cw-t,w/2-t].forEach(x=>box(x,-d/2,x+t,d/2,0,ht,m,g));
  box(-w/2,-d/2,w/2,d/2,ht-0.03,ht,m,g);box(-w/2,-d/2,w/2,-d/2+0.015,0,ht,L(0x8a8580),g);
  [[-w/2,-w/2+cw],[w/2-cw,w/2]].forEach(c=>{box(c[0],-d/2,c[1],d/2,0,0.06,m,g);[0.45,0.8,1.15,1.5,1.85].forEach(y=>box(c[0],-d/2,c[1],d/2,y,y+0.025,m,g));[0.47,0.82,1.17].forEach((y,i)=>box(c[0]+0.05,-d/2+0.05,c[1]-0.05,d/2-0.08,y+0.025,y+0.2,L([0xe8e2d4,0x6b6d70,0x3b6ea5][i]),g));});
  [1.15,1.95].forEach(y=>box(-w/2+cw,-0.01,w/2-cw,0.01,y,y+0.02,L(C.zinc),g));
  for(let i=0;i<7;i++){const x=-w/2+cw+0.08+i*(w-2*cw-0.16)/6;box(x-0.02,-0.2,x+0.02,0.2,1.2,1.92,L([0x3b6ea5,0xe8e2d4,0x222324,0x9db8aa,0xc65f37,0x6b6d70,0xe8e2d4][i]),g);}
  box(w/2-cw-0.2,d/2-0.02,w/2-cw,d/2,0.05,ht-0.05,L(0x6b6866),g);
}
function metod(o){
  const {g,w,d}=o,ash=L(0xd9c9ab),uw=w/2;
  box(-w/2+0.01,-d/2,w/2-0.01,d/2-0.02,0,0.08,L(0x3a3a3a),g);
  box(-w/2,-d/2,w/2,d/2-0.02,0.08,0.88,L(0xffffff),g);
  box(-w/2,-d/2,w/2,d/2+0.018,0.88,0.91,L(0x3e4044),g);
  for(let u=0;u<2;u++)for(let k=0;k<2;k++){const x0=-w/2+u*uw+0.004,x1=-w/2+(u+1)*uw-0.004,y0=0.084+k*0.4,y1=y0+0.392;box(x0,d/2-0.02,x1,d/2,y0,y1,ash,g);box((x0+x1)/2-0.12,d/2,(x0+x1)/2+0.12,d/2+0.012,y1-0.06,y1-0.045,L(C.zinc),g);}
  if(o.appareils!==false){box(w/2-0.06-0.48,-d/2+0.03,w/2-0.06,d/2-0.03,0.91,1.2,L(0x2b2c2e),g);box(-w/2+0.06,-d/2+0.04,-w/2+0.32,d/2-0.08,0.91,1.25,L(0x1d1d1f),g);cy(g,-w/2+0.5,0,0.07,0.91,1.12,L(0xb9bcbf));}
}
function metodHaut(o){const {g,w,d}=o,ash=L(0xd9c9ab);box(-w/2,-d/2,w/2,d/2-0.02,1.45,2.25,L(0xffffff),g);for(let i=0;i<4;i++){const x0=-w/2+i*w/4+0.004,x1=-w/2+(i+1)*w/4-0.004;box(x0,d/2-0.02,x1,d/2,1.452,2.248,ash,g);const hx=i%2?x0+0.035:x1-0.035;box(hx-0.006,d/2,hx+0.006,d/2+0.012,1.47,1.62,L(C.zinc),g);}}
function tvMur(o){const {g,w}=o;box(-0.62,-0.03,0.62,0.03,1.0,1.72,L(0x151617),g);box(-0.6,0.03,0.6,0.035,1.02,1.7,L(0x2a2f36),g);}
function suspension(cx,cz,yb,r,col,grp){const g=at(cx,cz,grp||furnTall);cy(g,0,0,0.004,yb+0.2,H-0.01,L(C.dark));cy(g,0,0,r,yb,yb+0.2,L(col||C.rattan),r*0.35);sp(g,0,yb+0.02,0,0.05,0.04,0.05,glow(0xfff1c4));return g;}
function lampadaire(cx,cz,h,col,grp){const g=at(cx,cz,grp||furnGroup);cy(g,0,0,0.14,0,0.025,L(C.dark));cy(g,0,0,0.012,0.025,h-0.3,L(C.dark));cy(g,0,0,0.2,h-0.3,h,L(col||C.linen),0.14);return g;}
function guirlande(pts,y,grp){
  const g=grp||furnTall,wm=L(0x222222),bm=glow(0xffe6a0);
  for(let i=0;i<pts.length-1;i++){
    const a=pts[i],b=pts[i+1],n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/S/0.45));
    for(let k=0;k<n;k++){const t0=k/n,t1=(k+1)/n,sag=0.12*Math.sin(Math.PI*(t0+t1)/2),xa=a[0]+(b[0]-a[0])*t0,za=a[1]+(b[1]-a[1])*t0,xb=a[0]+(b[0]-a[0])*t1,zb=a[1]+(b[1]-a[1])*t1;
      box(Math.min(X(xa),X(xb))-0.003,Math.min(Z(za),Z(zb))-0.003,Math.max(X(xa),X(xb))+0.003,Math.max(Z(za),Z(zb))+0.003,y-sag-0.004,y-sag,wm,g);
      const m=new THREE.Mesh(new THREE.SphereGeometry(0.035,8,6),bm);m.position.set(X(xb),y-sag-0.05,Z(zb));g.add(m);}
  }
}
function voilage(s,e,col,op,grp){const m=new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:op});pbox(709.6,s,712.6,e,0.02,2.3,m,grp||furnTall);pbox(711.6,s,712.8,e,2.3,2.33,L(C.dark),grp||furnTall);}
function gardeCorps(col){
  const m=L(col||0x4a4d50);
  for(let z=15;z<=705;z+=6)pbox(821.5,z,823,z+1,0,1.1,m,fixGroup);
  pbox(821,15,824,705,0.04,0.08,m,fixGroup);
}
function voile(z0,z1,col,grp){
  const g=grp||furnTall,m=new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:0.92}),w=(817-730)/S,d=(z1-z0)/S;
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,0.006,d),m);mesh.rotation.z=0.09;mesh.position.set(X(773.5),2.3,Z((z0+z1)/2));g.add(mesh);
  [z0+2,z1-2].forEach(z=>cy(at(819.95,z,g),0,0,0.013,1.165,2.26,L(C.metal)));
}
function hublot(cx,cz,y,grp){const g=at(cx,cz,grp||furnTall);sp(g,0,y,0,0.07,0.07,0.07,glow(0xfff1c4));return g;}
function cuisineMetod(haut){
  P('2 METOD/MAXIMERA 80 × 39,2 × 88 (existants)');
  metod(place(489.9,145.2,516.6,254,'W',furnGroup));
  if(haut!==false)metodHaut(place(491.4,145.2,516.6,254,'W',furnTall));
}
function entreeBanc(col,coussin){
  P('Banc à chaussures 0,50 × 0,25 + patères');
  const o=place(164,472,181,522,'E',furnGroup);box(-o.w/2,-o.d/2,o.w/2,o.d/2,0,0.06,L(C.dark),o.g);box(-o.w/2,-o.d/2,o.w/2,o.d/2,0.38,0.45,L(col),o.g);box(-o.w/2,-o.d/2,o.w/2,o.d/2,0.15,0.17,L(col),o.g);if(coussin)box(-o.w/2+0.02,-o.d/2+0.02,o.w/2-0.02,o.d/2-0.02,0.45,0.5,L(coussin),o.g);
  [-0.18,-0.06,0.06,0.18].forEach((x,i)=>{const z=-o.d/2;box(x-0.012,z,x+0.012,z+0.07,1.6,1.63,L(C.metal),o.g);if(i%2)box(x-0.12,z+0.01,x+0.12,z+0.12,0.95,1.6,L([0x3b6ea5,0x6b6d70,0xc65f37,0x8b6a4a][i]),o.g);});
}
function sdbDeco(bois,linge){
  P('Étagère SDB 0,60 × 0,30 × 1,80');
  const z0=568.4,o=place(296,z0,336.8,z0+0.3*S,'S',furnWall);etagere(o,1.8,5,bois,{livres:false,cols:1});
  [0.06,0.42].forEach((y,j)=>{for(let i=0;i<3;i++){const a=-0.27+i*0.18;box(a,-0.12,a+0.16,0.12,y,y+0.13,L(linge[(i+j)%linge.length]),o.g);}});
  P('Caillebotis 0,60 × 0,45');
  const c=place(342,604,383,644,'S',furnGroup);for(let i=0;i<6;i++)box(-c.w/2+i*c.w/6+0.01,-c.d/2,-c.w/2+(i+1)*c.w/6-0.01,c.d/2,0.005,0.025,L(bois),c.g);
  P('Échelle à serviettes');
  const e=place(236,592,246,640,'E',furnGroup);[-0.3,0.3].forEach(x=>box(x-0.02,-0.07,x+0.02,0.07,0,1.6,L(bois),e.g));[0.4,0.75,1.1,1.45].forEach((y,i)=>{box(-0.3,-0.02,0.3,0.02,y,y+0.03,L(bois),e.g);if(i<2)box(-0.26,0.02,0.26,0.06,y-0.4,y+0.03,L(linge[i]),e.g);});
}
function wcDeco(col){
  P('Étagère WC au-dessus du réservoir');
  const z1=705-E*S/2;pbox(170,z1-0.2*S,215,z1,1.55,1.57,L(col),furnTall);
  [[175,0xffffff,0.12],[185,0xe8e2d4,0.18],[200,C.terra,0.1]].forEach(b=>pbox(b[0],z1-0.14*S,b[0]+6,z1-0.04*S,1.57,1.57+b[2],L(b[1]),furnTall));
}
function structureProjet(){
  common();
  wall('h',497,437,720,I,[{a:445,b:490,k:'open'}]);
  leaf(445,497,45,'S');
  wall('v',437,497,565,I,[]);
  wall('v',300,350,412,I,[]);
  wall('v',300,516,565,I,[]);
  wall('h',565,157,437,I,[{a:175,b:215,k:'open'},{a:245,b:290,k:'open'}]);
  leaf(176,565,40,'N');leaf(247,565,43,'N');
  closet(300,524.2,437,565,closetMat);
  pbox(300,520.8,437,524.2,2.38,H,L(0x8f4326),wallGroup);
  pbox(300,520.8,437,524.2,0,0.04,L(0x8c8f93),wallGroup);
  const pw=137/3+4;
  for(let i=0;i<3;i++){
    const x0=300+i*(137-pw)/2,mid=i===1,z0=mid?521.2:522.7,z1=mid?522.6:524.0;
    pbox(x0,z0,x0+pw,z1,0.04,2.38,L(mid?0xd2704a:0xc65f37),wallGroup);
    pbox(x0+pw-6,z0-0.6,x0+pw-4.5,z0,0.95,1.3,L(0x3a3a3a),wallGroup);
  }
  items.length=0;
}
const pw2={
  ch1:col=>paintWall(true,705,437+I*S/2,720-E*S/2,E,-1,[],col),
  ch2:col=>paintWall(false,520,15+E*S/2,255-I*S/2,I,1,[],col),
  sej:col=>paintWall(true,497,437-I*S/2,720-E*S/2,I,-1,[[445,490,'door']],col),
  sejN:col=>paintWall(true,255,520-I*S/2,720-E*S/2,I,1,[[525,585,'door']],col),
  ch1N:col=>paintWall(true,497,437+I*S/2,720-E*S/2,I,1,[[445,490,'door']],col),
  ch1W:col=>paintWall(false,437,497+I*S/2,705-E*S/2,I,1,[],col),
  ch2S:col=>paintWall(true,255,520+I*S/2,720-E*S/2,I,-1,[[525,585,'door']],col),
  ch2N:col=>paintWall(true,15,520+I*S/2,720-E*S/2,E,1,[[640,690,'win']],col),
  ent:col=>paintWall(false,157,350+E*S/2,565-I*S/2,E,1,[[415,470,'door']],col),
  fac:col=>{paintWall(false,720,255+I*S/2,497-I*S/2,E,-1,[[275,455,'pf']],col);}
};
function chambre1Base(T,o){
  o=o||{};
  P('Dressing ouvert 2,00 × 0,50 (existant)');
  dressingO(place(440.4,552,474.4,688,'E',furnWall));
  P('Armoire BRIMNES 117 × 50 (existante)');
  brimnes(place(679.2,582,713.2,661.6,'W',furnWall));
  P('Lit 160 × 200 (existant)');
  lit(place(522.4,556,631.2,698.2,'N',furnGroup),{tete:1.15,plaid:T.plaid,couette:o.couette||0xf7f5ef});
  P('Chevets');
  chevet(503.8,686.3,furnGroup,o.chevet);chevet(649.8,686.3,furnGroup,o.chevet);
  P('Tapis');
  tapis(500,500,650,553,o.tapis||0xe8e2d4);
  P('Voilage (porte-fenêtre)');
  voilage(501,514,o.voile||0xefe8da,0.75);
}
function chambre2Base(T,o){
  o=o||{};
  P('Bureau 180 × 80 (existant)');
  bureau(place(557.1,21.8,679.5,76.2,'S',furnGroup));
  P('Siège gaming (existant)');
  gaming(618.3,102,'N');
  P('BZ 140 × 90 (existant)');
  bz(place(523.4,89.1,584.6,184.3,'E',furnGroup),T.bz,T.bzC);
  P('Bibliothèque mur sud');
  etagere(place(590,231.2,708,251.6,'N',furnWall),1.8,5,o.etagere||C.white,{seed:5});
  P('Voilage (porte-fenêtre)');
  voilage(222,248,o.voile||0xefe8da,0.75);
}
Object.assign(tex,{boisTx:{t:planksTex(['#c9a171','#c19867','#d1ab7d','#bb9161'],8,'#7d5c36',15),m:1.6},liege:{t:mk(g=>{g.fillStyle='#b88a5a';g.fillRect(0,0,256,256);const r=rnd(41);for(let i=0;i<2200;i++){g.fillStyle=['#a57a4c','#c99a68','#9a6f45','#d4a979'][i%4];g.fillRect(r()*256,r()*256,2+r()*3,2+r()*3);}g.strokeStyle='#8f6a42';g.lineWidth=1.5;for(let k=0;k<=2;k++){g.beginPath();g.moveTo(k*128,0);g.lineTo(k*128,256);g.moveTo(0,k*128);g.lineTo(256,k*128);g.stroke();}}),m:0.6}});
