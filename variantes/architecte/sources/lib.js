const DIRS={S:0,E:Math.PI/2,N:Math.PI,W:-Math.PI/2};
function M(c){return typeof c==='number'?L(c):c;}
function piece(name,grp,cx,cz,dir,fn){
  const g=new THREE.Group();g.position.set(X(cx),0,Z(cz));g.rotation.y=DIRS[dir||'S'];g.userData.it=name;grp.add(g);
  const k={g,
    b:(x0,x1,z0,z1,y0,y1,c)=>box(x0,z0,x1,z1,y0,y1,M(c),g),
    c:(x,z,r,y0,y1,c,n)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,y1-y0,n||24),M(c));m.position.set(x,(y0+y1)/2,z);g.add(m);},
    k:(x,z,r0,r1,y0,y1,c)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r0,y1-y0,24),M(c));m.position.set(x,(y0+y1)/2,z);g.add(m);},
    s:(x,y,z,r,c,sy)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),M(c));m.position.set(x,y,z);if(sy)m.scale.y=sy;g.add(m);}
  };
  fn(k);return g;
}
const P=(name,grp,cx,cz,dir,f,...a)=>piece(name,grp,cx,cz,dir,k=>f(k,...a));
function legs4(k,w,d,z0,h,r,c){[[-1,z0+r],[1,z0+r],[-1,z0+d-r],[1,z0+d-r]].forEach(q=>k.c(q[0]*(w/2-r),q[1],r,0,h,c,10));}
function fDesk(k,mon){
  const wht=0xf4f4f2,top=0xdcc296;
  k.b(-0.9,0.9,0,0.8,0.725,0.75,top);
  [-0.78,0.78].forEach(x=>{k.b(x-0.03,x+0.03,0.04,0.76,0,0.03,wht);k.b(x-0.035,x+0.035,0.36,0.44,0.03,0.42,wht);k.b(x-0.025,x+0.025,0.375,0.425,0.42,0.7,wht);k.b(x-0.025,x+0.025,0.06,0.74,0.7,0.725,wht);});
  k.b(-0.78,0.78,0.38,0.42,0.67,0.71,wht);
  if(mon!==false){k.b(-0.35,0.35,0.06,0.09,0.75,1.12,0x1d1d1f);k.b(-0.05,0.05,0.09,0.2,0.75,0.78,0x2a2a2a);}
  k.b(-0.3,0.15,0.4,0.55,0.75,0.77,0x2a2a2a);k.b(0.25,0.33,0.42,0.52,0.75,0.765,0x2a2a2a);
}
function fGaming(k){
  const blk=0x222324,red=0xb3262d,cw=0.3;
  k.c(0,0,0.3,0,0.04,blk);k.c(0,0,0.025,0.04,0.46,0x6b6e72);
  k.b(-cw,cw,-cw,cw,0.46,0.56,blk);k.b(-cw*0.6,cw*0.6,-cw*0.85,cw*0.85,0.56,0.58,red);
  k.b(-cw,cw,cw-0.1,cw,0.56,1.38,blk);k.b(-cw*0.5,cw*0.5,cw-0.105,cw-0.1,0.7,1.32,red);
  [-cw-0.03,cw].forEach(x=>k.b(x,x+0.03,-cw*0.7,cw*0.5,0.68,0.72,blk));
}
function fBZ(k,fab,cu){
  k.b(-0.7,0.7,0,0.9,0,0.08,0x2a2a2a);k.b(-0.7,0.7,0,0.9,0.08,0.42,fab);
  k.b(-0.67,0.67,0.22,0.9,0.42,0.5,cu);k.b(-0.7,0.7,0,0.22,0.42,0.88,fab);
  [-0.64,0.02].forEach(x=>k.b(x,x+0.62,0.22,0.36,0.5,0.82,cu));
}
function fDressing(k){
  const m=0x4a4644,t=0.025,w=1.0,cw=0.45,dp=0.5,ht=2.05;
  [-w,-w+cw-t,w-cw,w-t].forEach(x=>k.b(x,x+t,0,dp,0,ht,m));
  k.b(-w,w,0,dp,ht-0.03,ht,m);
  [[-w,-w+cw],[w-cw,w]].forEach(c=>{k.b(c[0],c[1],0,dp,0,0.06,m);[0.45,0.8,1.15,1.5,1.85].forEach(y=>k.b(c[0],c[1],0,dp,y,y+0.025,m));k.b(c[0],c[1],0,0.015,0.06,ht-0.03,0x8a8580);});
  [1.15,1.95].forEach(y=>k.b(-w+cw,w-cw,dp/2-0.01,dp/2+0.01,y,y+0.02,0xb9bcbf));
  k.b(-w+cw,w-cw,dp-0.02,dp,0.05,ht-0.05,0x6b6866);
  [[-0.85,0.5,0xe6e1d8],[-0.85,0.85,0x6b6d70],[-0.85,1.2,0x3b6ea5],[0.7,0.5,0xffffff],[0.7,0.85,0xc65f37],[0.7,1.2,0x9db8aa]].forEach(p=>k.b(p[0]-0.12,p[0]+0.12,0.08,0.4,p[1],p[1]+0.16,p[2]));
}
function fBrimnes(k){
  const w=0.585;
  k.b(-w,w,0,0.5,0,1.9,0xf6f5f1);
  for(let i=0;i<3;i++){const x0=-w+i*0.39+0.006,x1=-w+(i+1)*0.39-0.006;k.b(x0,x1,0.5,0.515,0.08,1.86,0xfbfbf9);if(i===1)k.b(x0+0.04,x1-0.04,0.515,0.518,0.2,1.74,0xbfd3dc);const hx=i===0?x1-0.045:x0+0.045;k.b(hx-0.009,hx+0.009,0.515,0.527,0.9,1.15,0x9aa0a6);}
}
function fBed(k,head,cover,plaid,frame){
  const hw=0.82;
  k.b(-hw,hw,0,0.1,0,1.15,head||0xa49d99);
  [-1,1].forEach(i=>k.b(i*0.27-0.006,i*0.27+0.006,0.096,0.1,0.35,1.15,0x8f8884));
  k.b(-0.8,0.8,0.1,2.1,0.06,0.3,frame||0x3d3d3f);
  k.b(-0.785,0.785,0.115,2.085,0.3,0.52,0xf4f2ec);
  k.b(-0.8,0.8,0.65,2.1,0.52,0.56,cover||0xf7f7f5);k.b(-0.8,0.8,2.09,2.11,0.3,0.54,cover||0xf7f7f5);
  [-0.4,0.4].forEach(x=>k.b(x-0.34,x+0.34,0.12,0.48,0.52,0.64,0xffffff));
  if(plaid){k.b(-0.815,0.815,1.5,1.95,0.3,0.58,plaid);k.b(0.25,0.6,0.5,0.85,0.56,0.7,plaid);}
}
function fNight(k,c,lamp){
  k.b(-0.2,0.2,0,0.35,0.12,0.5,c||0xe9e4da);k.c(-0.16,0.31,0.015,0,0.12,0x3a3a3a,8);k.c(0.16,0.31,0.015,0,0.12,0x3a3a3a,8);k.c(-0.16,0.04,0.015,0,0.12,0x3a3a3a,8);k.c(0.16,0.04,0.015,0,0.12,0x3a3a3a,8);
  if(lamp!==false){k.c(0,0.17,0.07,0.5,0.52,0xcaa97c);k.c(0,0.17,0.012,0.52,0.72,0x3a3a3a,8);k.k(0,0.17,0.13,0.09,0.72,0.9,lamp||0xf3ead4);}
}
function fMetod(k,top){
  const ash=0xd9c9ab;
  k.b(-0.8,0.8,0.02,0.392,0,0.08,0x3a3a3a);k.b(-0.8,0.8,0,0.392,0.08,0.88,0xffffff);k.b(-0.8,0.8,0,0.41,0.88,0.91,top||0x3e4044);
  for(let u=0;u<2;u++)for(let d=0;d<2;d++){const x0=-0.8+u*0.8+0.005,x1=x0+0.79,y0=0.084+d*0.4,y1=y0+0.392;k.b(x0,x1,0.392,0.41,y0,y1,ash);k.b((x0+x1)/2-0.12,(x0+x1)/2+0.12,0.41,0.42,y1-0.06,y1-0.045,0x9aa0a6);}
}
function sofa(k,w,d,fab,cu,o){
  o=o||{};const al=o.l!==false?0.18:0,ar=o.r!==false?0.18:0,bh=o.bh||0.82,leg=o.leg||0x3a3a3a;
  k.b(-w/2,w/2,0,d,0,0.1,leg);k.b(-w/2,w/2,0,d,0.1,0.42,fab);
  k.b(-w/2,w/2,0,0.2,0.42,bh,fab);
  if(al)k.b(-w/2,-w/2+al,0.2,d,0.42,0.62,fab);
  if(ar)k.b(w/2-ar,w/2,0.2,d,0.42,0.62,fab);
  const n=Math.max(1,Math.round((w-al-ar)/0.7)),sw=(w-al-ar)/n;
  for(let i=0;i<n;i++){const x0=-w/2+al+i*sw+0.01,x1=x0+sw-0.02;k.b(x0,x1,0.2,d-0.02,0.42,0.5,cu);k.b(x0+0.03,x1-0.03,0.2,0.36,0.5,bh-0.04,cu);}
}
function chairL(k,x,z,dir,c,leg){
  const h=0.22,m=c||0x8b6a4a,lg=leg||0x5a4330;
  k.b(x-h,x+h,z-h,z+h,0.43,0.47,m);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>k.c(x+q[0]*(h-0.02),z+q[1]*(h-0.02),0.015,0,0.43,lg,8));
  if(dir==='N')k.b(x-h,x+h,z-h,z-h+0.03,0.47,0.86,m);
  if(dir==='S')k.b(x-h,x+h,z+h-0.03,z+h,0.47,0.86,m);
  if(dir==='W')k.b(x-h,x-h+0.03,z-h,z+h,0.47,0.86,m);
  if(dir==='E')k.b(x+h-0.03,x+h,z-h,z+h,0.47,0.86,m);
}
function tableR(k,w,d,top,leg,h){
  h=h||0.75;k.b(-w/2,w/2,-d/2,d/2,h-0.04,h,top);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>k.b(q[0]*(w/2-0.06)-0.025,q[0]*(w/2-0.06)+0.025,q[1]*(d/2-0.06)-0.025,q[1]*(d/2-0.06)+0.025,0,h-0.04,leg));
}
function shelves(k,w,d,h,n,c,books,back){
  const t=0.022;
  k.b(-w/2,-w/2+t,0,d,0,h,c);k.b(w/2-t,w/2,0,d,0,h,c);
  const cols=Math.max(1,Math.round(w/0.8));
  for(let i=1;i<cols;i++){const x=-w/2+i*w/cols;k.b(x-t/2,x+t/2,0,d,0,h,c);}
  for(let j=0;j<=n;j++){const y=j===n?h-t:0.04+j*(h-0.04)/n;k.b(-w/2,w/2,0,d,y,y+t,c);}
  if(back)k.b(-w/2,w/2,0,0.012,0,h,back);
  if(books){const r=rnd(Math.round(w*97+h*13+n)),pal=[0x3b6ea5,0xc65f37,0x4f8a45,0xd9a441,0x6b6d70,0x8b6a4a,0xe6e1d8,0x34495e,0xb3262d];
    for(let j=0;j<n;j++){const y=0.04+j*(h-0.04)/n+t;let x=-w/2+t+0.02;const lim=w/2-t-0.02;
      while(x<lim-0.05){const bw=0.025+r()*0.03,bh=Math.min(0.32,(h-0.04)/n-t-0.04)*(0.7+r()*0.3);if(r()<0.18){x+=0.08+r()*0.12;continue;}if(r()<0.06){k.c(x+0.05,d/2,0.045,y,y+bh*0.8,0x6f8f5a,10);x+=0.12;continue;}k.b(x,Math.min(lim,x+bw),d*0.15,d*0.9,y,y+bh,pal[Math.floor(r()*pal.length)]);x+=bw+0.003;}}}
}
function cab(k,w,d,h,c,fr,n,y0){
  y0=y0||0;k.b(-w/2,w/2,0,d,y0,h,c);n=n||Math.max(1,Math.round(w/0.6));
  for(let i=0;i<n;i++){const x0=-w/2+i*w/n+0.004,x1=x0+w/n-0.008;k.b(x0,x1,d,d+0.012,y0+0.02,h-0.02,fr||c);k.b(x1-0.06,x1-0.04,d+0.012,d+0.022,h-0.18,h-0.06,0x3a3a3a);}
}
function tv(k,w){k.b(-w/2,w/2,0,0.05,1.0,1.0+w*0.58,0x151617);k.b(-w/2+0.02,w/2-0.02,0.05,0.052,1.02,0.98+w*0.58,0x2a2f36);}
function plant(k,x,z,r,h,pot,leaf){
  pot=pot||0xc8b8a0;leaf=leaf||0x4f7a43;
  k.k(x,z,r*0.75,r,0,r*1.6,pot);
  const n=Math.max(3,Math.round(h*5));
  for(let i=0;i<n;i++){const a=i*2.4,rr=r*(0.6+0.8*((i*37)%10)/10),yy=r*1.6+(h-r*1.6)*(0.35+0.65*i/n);k.s(x+Math.cos(a)*rr*0.6,yy,z+Math.sin(a)*rr*0.6,r*(1.1-0.4*i/n)*0.9,i%2?leaf:0x3f6a36,1.25);}
  k.c(x,z,0.012,r*1.6,h*0.8,0x5a4330,6);
}
function fLamp(k,x,z,c){k.c(x,z,0.14,0,0.025,0x2a2a2a);k.c(x,z,0.012,0.025,1.45,0x2a2a2a,8);k.k(x,z,0.21,0.15,1.38,1.66,c||0xf3ead4);}
function rug(k,w,d,c,c2){k.b(-w/2,w/2,-d/2,d/2,0,0.008,c);if(c2)k.b(-w/2+0.08,w/2-0.08,-d/2+0.08,d/2-0.08,0.008,0.01,c2);}
function rugR(k,r,c){k.c(0,0,r,0,0.008,c,40);}
function pend(k,x,z,y,r,c){k.c(x,z,0.006,y+0.2,2.5,0x2a2a2a,6);k.k(x,z,r,0.05,y,y+0.2,c||0xe9d9b8);k.c(x,z,r*0.5,y-0.005,y+0.005,0xfff6dd);}
function frame(k,w,h,y,c,art){k.b(-w/2,w/2,0,0.025,y,y+h,c||0x2a2a2a);k.b(-w/2+0.03,w/2-0.03,0.025,0.03,y+0.03,y+h-0.03,art||0xe9e2d0);}
function sconce(k,x,y){k.b(x-0.04,x+0.04,0,0.03,y-0.06,y+0.06,0x2a2a2a);k.k(x,0.12,0.08,0.05,y,y+0.12,0xf3ead4);k.b(x-0.01,x+0.01,0.03,0.12,y,y+0.02,0x2a2a2a);}
function stool(k,x,z,h,c){k.c(x,z,0.18,h-0.05,h,c||0x8b6a4a);[0,1,2].forEach(i=>{const a=i*2.094;k.c(x+Math.cos(a)*0.13,z+Math.sin(a)*0.13,0.013,0,h-0.05,0x2a2a2a,8);});k.c(x,z,0.15,0.3,0.315,0x2a2a2a,24);}
function armchair(k,fab,cu,w){
  w=w||0.8;const h=w/2,a=w*0.17;
  [[-1,0.05],[1,0.05],[-1,w-0.05],[1,w-0.05]].forEach(q=>k.c(q[0]*(h-0.06),q[1],0.02,0,0.14,0x5a4330,8));
  k.b(-h,h,0,w,0.14,0.4,fab);k.b(-h+a,h-a,0.16,w-0.02,0.4,0.48,cu);k.b(-h,h,0,0.16,0.4,0.86,fab);
  [-h,h-a].forEach(x=>k.b(x,x+a,0.16,w,0.4,0.62,fab));
}
function cushionSeat(k,x0,x1,z0,z1,y,c){k.b(x0,x1,z0,z1,y,y+0.1,c);}
function tface(hor,c,a,b,t,side,y0,y1,mat){
  const o=side*(t/2+0.011);
  if(hor)box(X(a),Z(c)+o-0.004,X(b),Z(c)+o+0.004,y0,y1,mat,wallGroup);
  else box(X(c)+o-0.004,Z(a),X(c)+o+0.004,Z(b),y0,y1,mat,wallGroup);
}
function tmw(name,w,h){const m=tm(name,w,h);return m;}
function fMetodHaut(k){
  for(let u=0;u<2;u++){const x0=-0.8+u*0.8;k.b(x0+0.005,x0+0.795,0,0.35,1.45,2.25,0xffffff);for(let d=0;d<2;d++){const a=x0+d*0.4+0.008,b2=a+0.384;k.b(a,b2,0.35,0.37,1.452,2.248,0xd9c9ab);const hx=d?a+0.03:b2-0.03;k.b(hx-0.006,hx+0.006,0.37,0.38,1.47,1.62,0x9aa0a6);}}
}
function fElectro(k){
  k.b(-0.75,-0.27,0.04,0.38,0.91,1.2,0x2b2c2e);k.b(-0.72,-0.4,0.38,0.385,0.95,1.16,0x55606a);
  k.b(0.32,0.6,0.06,0.36,0.91,1.25,0x1d1d1f);k.c(0.0,0.2,0.07,0.91,1.12,0xb9bcbf);
}
function cuisine(){
  P('Cuisine : 2 METOD/MAXIMERA 80 × 39,2',furnGroup,516.6,199.6,'W',fMetod);
  P('Cuisine : électroménager posé',furnGroup,516.6,199.6,'W',fElectro);
  P('Cuisine : 2 METOD hauts',furnTall,516.6,199.6,'W',fMetodHaut);
}
function jardiniere(k,w,d,h,c,leaf){k.b(-w/2,w/2,0,d,0,h,c||0x5c6064);const n=Math.max(2,Math.round(w/0.25));for(let i=0;i<n;i++){const x=-w/2+(i+0.5)*w/n;k.s(x,h+0.08,d/2,Math.min(0.13,d/2.4),i%2?(leaf||0x5f8f4a):0x4a7a3c,1.1);}}
function bistro(k,c){k.c(0,0,0.3,0.71,0.74,c||0x2f5d50);k.c(0,0,0.02,0,0.71,0x2a2a2a,8);k.c(0,0,0.2,0,0.02,0x2a2a2a);}
function bchair(k,x,z,dir,c){chairL(k,x,z,dir,c||0x2f5d50,0x2f5d50);}
function ladder(k,w,h,c){[-w/2,w/2-0.03].forEach(x=>k.b(x,x+0.03,0.02,0.3,0,h,c));for(let y=0.3;y<h;y+=0.3)k.b(-w/2,w/2,0.15,0.17,y,y+0.025,c);}
function towels(k,w,y,cols,z0,z1){const n=cols.length,sw=w/n;cols.forEach((c,i)=>k.b(-w/2+i*sw+0.01,-w/2+(i+1)*sw-0.01,z0,z1,y,y+0.12,c));}
