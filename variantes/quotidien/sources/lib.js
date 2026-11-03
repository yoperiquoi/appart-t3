const Q={sx0:306.8,sx1:713.2,sz0:258.4,sz1:493.6,ax0:440.4,ax1:713.2,az0:500.4,az1:698.2,bx0:523.4,bx1:713.2,bz0:21.8,bz1:251.6,ex0:163.8,ex1:296.6,ez1:561.6,px0:726.8,px1:821};
const OPP={N:'S',S:'N',E:'W',W:'E'};
const COL={blanc:0xf6f5f1,chene:0xcaa97c,noyer:0x6b4a32,noir:0x2a2b2d,gris:0x8a8d90,anth:0x3d3f42,inox:0xb9bcbf,vert:0x4f8a45,feuille:0x5e8f45,feuille2:0x3f7a3a,terre:0xb8643f,lin:0xe9e2d3,draps:0xf7f6f2};
function piece(n,grp){const g=new THREE.Group();g.name=n;(grp||furnGroup).add(g);return g;}
function mat(c){return typeof c==='number'?L(c):c;}
function bx(g,x0,z0,x1,z1,y0,y1,c){pbox(x0,z0,x1,z1,y0,y1,mat(c),g);}
function br(g,r,y0,y1,c){pbox(r[0],r[1],r[2],r[3],y0,y1,mat(c),g);}
function cy(g,cx,cz,rm,y0,y1,c){cyl(cx,cz,rm,y0,y1,mat(c),g);}
function sph(g,cx,cz,y,rm,c,sy){const m=new THREE.Mesh(new THREE.SphereGeometry(rm,14,10),mat(c));m.position.set(X(cx),y,Z(cz));if(sy)m.scale.y=sy;g.add(m);}
function sub(r,f,t0,t1,o0,o1){
  const x0=r[0],z0=r[1],x1=r[2],z1=r[3];
  if(f==='N'||f==='S'){const a=x0+(x1-x0)*t0,b=x0+(x1-x0)*t1;return f==='N'?[a,z0-o1,b,z0-o0]:[a,z1+o0,b,z1+o1];}
  const a=z0+(z1-z0)*t0,b=z0+(z1-z0)*t1;return f==='W'?[x0-o1,a,x0-o0,b]:[x1+o0,a,x1+o1,b];
}
function wid(r,f){return f==='N'||f==='S'?r[2]-r[0]:r[3]-r[1];}
function dep(r,f){return f==='N'||f==='S'?r[3]-r[1]:r[2]-r[0];}
function band(r,f,a,b){return sub(r,f,0,1,-b,-a);}
function slice(r,f,t0,t1){return sub(r,f,t0,t1,-dep(r,f),0);}
function grab(n,grp,fn){const k=grp.children.length;fn();const g=piece(n,grp);grp.children.slice(k,grp.children.length-1).forEach(m=>{grp.remove(m);g.add(m);});return g;}
function cab(g,r,y0,y1,c,f,n,fc,hc){
  br(g,r,y0,y1,c);
  const w=wid(r,f),hy=y1-y0>1.3?[0.95,1.2]:[y1-0.13,y1-0.05];
  for(let i=0;i<n;i++){
    br(g,sub(r,f,i/n+0.5/w,(i+1)/n-0.5/w,0,0.8),y0+0.015,y1-0.015,fc===undefined?c:fc);
    const k=n===1?0.85:(i%2?i/n+2.5/w:(i+1)/n-2.5/w);
    br(g,sub(r,f,k-0.6/w,k+0.6/w,0.8,1.6),hy[0],hy[1],hc||0x8a8d90);
  }
}
function tiroirs(g,r,y0,y1,c,f,rows,fc,hc){
  br(g,r,y0,y1,c);
  const w=wid(r,f),h=(y1-y0)/rows;
  for(let j=0;j<rows;j++){
    br(g,sub(r,f,0.5/w,1-0.5/w,0,0.8),y0+j*h+0.008,y0+(j+1)*h-0.008,fc===undefined?c:fc);
    br(g,sub(r,f,0.5-6/w,0.5+6/w,0.8,1.6),y0+(j+1)*h-0.07,y0+(j+1)*h-0.05,hc||0x8a8d90);
  }
}
function etag(g,r,y1,c,f,lv,seed,fill){
  const w=wid(r,f),d=dep(r,f),rr=rnd(seed||11),pal=[0x3b6ea5,0xc65f37,0x4f8a45,0xd9a441,0x6b6d70,0x8b6a4a,0xe9e4da,0x9db8aa];
  [0,1-1.6/w].forEach(t=>br(g,slice(r,f,t,t+1.6/w),0,y1,c));
  br(g,band(r,f,d-0.8,d),0.02,y1,c);
  lv.forEach(y=>br(g,r,y,y+0.022,c));
  if(fill===0)return;
  lv.slice(0,-1).forEach((y,j)=>{
    const nx=lv[j+1]?Math.min(0.3,lv[j+1]-y-0.05):0.3;
    let t=2.5/w;
    while(t<1-4/w){
      const bw=(1.5+rr()*2.5)/w;
      if(rr()<(fill||0.7)){
        const hgt=nx*(0.6+rr()*0.4);
        br(g,sub(slice(r,f,t,Math.min(t+bw,1-2/w)),f,0,1,-(d-2),-1),y+0.022,y+0.022+hgt,pal[Math.floor(rr()*pal.length)]);
      }
      t+=bw+(rr()<0.15?6/w:0.3/w);
    }
  });
}
function lit(g,r,head,o){
  o=o||{};
  const hb=band(r,head,0,o.hbT||4),body=band(r,head,o.hbT||4,dep(r,head)),L2=dep(body,head),foot=OPP[head];
  br(g,body,0.06,0.3,o.cadre||0x3d3d3f);
  br(g,sub(body,head,0.01,0.99,-L2+1,-1),0.3,0.52,COL.draps);
  br(g,band(body,head,0.52*S,L2),0.52,0.57,o.couette||0xf7f7f5);
  br(g,band(body,foot,0,3),0.3,0.56,o.couette||0xf7f7f5);
  [[0.04,0.48],[0.52,0.96]].forEach(t=>br(g,slice(band(body,head,3,0.45*S),head,t[0],t[1]),0.52,0.64,0xffffff));
  if(o.plaid)br(g,band(body,foot,-0.5,0.5*S),0.3,0.6,o.plaid);
  if(o.coussin)br(g,slice(band(body,head,0.12*S,0.42*S),head,0.3,0.7),0.6,0.74,o.coussin);
  br(g,hb,0.06,o.hbH||1.0,o.tete||0xa49d99);
}
function canape(g,r,back,c,cc,arms,h){
  const w=wid(r,back),ab=0.17*S/w,bd=0.22*S;
  br(g,sub(r,back,0.01,0.99,-dep(r,back)+1,-1),0,0.07,0x2e2f31);
  br(g,r,0.07,0.42,c);
  const a0=arms==='a'||arms==='both'?ab:0,a1=arms==='b'||arms==='both'?ab:0;
  br(g,slice(band(r,back,bd,dep(r,back)),back,a0,1-a1),0.42,0.5,cc||c);
  br(g,band(r,back,0,bd),0.42,h||0.86,c);
  if(a0)br(g,slice(r,back,0,ab),0.42,0.64,c);
  if(a1)br(g,slice(r,back,1-ab,1),0.42,0.64,c);
  const n=Math.max(1,Math.round(w/S/0.7)),k=(1-a0-a1)/n;
  for(let i=0;i<n;i++)br(g,slice(band(r,back,bd-0.5,bd+0.14*S),back,a0+i*k+0.05*k,a0+(i+1)*k-0.05*k),0.5,0.82,cc||c);
}
function fauteuil(g,r,back,c,cc){canape(g,r,back,c,cc,'both',0.84);}
function table(g,r,h,top,leg,ep){
  br(g,r,h-(ep||0.03),h,top);
  const i=2.5,l=leg||0x5a4330;
  [[r[0]+i,r[1]+i],[r[2]-i-2.4,r[1]+i],[r[0]+i,r[3]-i-2.4],[r[2]-i-2.4,r[3]-i-2.4]].forEach(p=>bx(g,p[0],p[1],p[0]+2.4,p[1]+2.4,0,h-(ep||0.03),l));
}
function rond(g,cx,cz,rm,h,top,leg){cy(g,cx,cz,rm,h-0.03,h,top);cy(g,cx,cz,0.04,0,h-0.03,leg||0x5a4330);cy(g,cx,cz,0.22,0,0.02,leg||0x5a4330);}
function chaise(g,cx,cz,back,c,leg){
  const h=0.45*S/2,m=mat(c||0x8b6a4a),lg=mat(leg||0x5a4330),t=2;
  bx(g,cx-h,cz-h,cx+h,cz+h,0.43,0.47,m);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>bx(g,cx+q[0]*h-(q[0]>0?t:0),cz+q[1]*h-(q[1]>0?t:0),cx+q[0]*h+(q[0]<0?t:0),cz+q[1]*h+(q[1]<0?t:0),0,0.43,lg));
  const r=[cx-h,cz-h,cx+h,cz+h];br(g,band(r,back,0,2),0.47,0.88,m);
}
function tabouret(g,cx,cz,h,c){cy(g,cx,cz,0.17,h-0.04,h,c||COL.chene);cy(g,cx,cz,0.025,0,h-0.04,0x2a2b2d);cy(g,cx,cz,0.16,0.28,0.3,0x2a2b2d);cy(g,cx,cz,0.18,0,0.015,0x2a2b2d);}
function gamer(g,cx,cz,back){
  const cw=0.3*S,r=[cx-cw,cz-cw,cx+cw,cz+cw],blk=0x222324,red=0xb3262d;
  cy(g,cx,cz,0.3,0,0.04,blk);cy(g,cx,cz,0.025,0.04,0.46,0x6b6e72);
  br(g,r,0.46,0.56,blk);br(g,sub(r,back,0.2,0.8,-cw*1.6,-cw*0.3),0.56,0.58,red);
  br(g,band(r,back,0,0.1*S),0.56,1.38,blk);br(g,slice(band(r,back,0.1*S,0.1*S+0.4),back,0.25,0.75),0.7,1.32,red);
  [0,1].forEach(t=>br(g,slice(band(r,back,0.15*S,dep(r,back)*0.85),back,t?0.96:0,t?1:0.04),0.68,0.72,blk));
}
function bureau(g,r,f,top,pied,h){
  const hh=h||0.75;br(g,r,hh-0.025,hh,top||0xdcc296);
  const d=dep(r,f);
  [0.07,0.93].forEach(t=>{br(g,sub(slice(r,f,t-0.012,t+0.012),f,0,1,-d+3,-3),0,0.03,pied||0xf4f4f2);br(g,sub(slice(r,f,t-0.02,t+0.02),f,0,1,-d/2-2.2,-d/2+2.2),0.03,hh-0.025,pied||0xf4f4f2);});
}
function ecran(g,r,f,y0,y1){br(g,r,y0,y1,0x151617);br(g,band(r,f,0,0.6),y0+0.02,y1-0.02,0x2a2f36);}
function plante(g,cx,cz,rm,h,pot){
  cy(g,cx,cz,rm,0,h*0.28,pot||COL.terre);
  sph(g,cx,cz,h*0.62,rm*1.9,COL.feuille,1.25);sph(g,cx+rm*0.6*S,cz-rm*0.3*S,h*0.78,rm*1.3,COL.feuille2,1.2);sph(g,cx-rm*0.5*S,cz+rm*0.4*S,h*0.5,rm*1.3,0x6fa34e,1.1);
}
function lampadaire(g,cx,cz,h,c){cy(g,cx,cz,0.14,0,0.02,0x2a2b2d);cy(g,cx,cz,0.012,0.02,h-0.25,0x2a2b2d);cy(g,cx,cz,0.17,h-0.3,h,c||0xf3ead4);}
function lampe(g,cx,cz,y,c){cy(g,cx,cz,0.06,y,y+0.02,0x3a3a3a);cy(g,cx,cz,0.012,y+0.02,y+0.25,0x3a3a3a);cy(g,cx,cz,0.1,y+0.22,y+0.38,c||0xf3ead4);}
function suspension(n,cx,cz,y,rm,c){const g=piece(n,furnTall);cy(g,cx,cz,0.006,y+0.2,H,0x2a2b2d);cy(g,cx,cz,rm,y,y+0.2,c||0xd8c7a8);return g;}
function tapis(n,x0,z0,x1,z1,c,c2){const g=piece('~'+n);bx(g,x0,z0,x1,z1,0,0.012,c);if(c2)bx(g,x0+5,z0+5,x1-5,z1-5,0.012,0.014,c2);return g;}
function cadre(g,r,y0,y1,c){br(g,r,y0,y1,0x2a2b2d);}
function tri(g,r,f,cols){
  const c=cols||[0xe2b93b,0x4f8a45,0x6b6d70,0x8b6a4a],n=c.length;
  for(let i=0;i<n;i++){const s=slice(r,f,i/n+0.01,(i+1)/n-0.01);br(g,s,0,0.6,c[i]);br(g,s,0.6,0.64,0x2e2f31);br(g,sub(s,f,0.35,0.65,0,0.8),0.5,0.55,0x2e2f31);}
}
function etendoir(g,r,f,c){
  const w=wid(r,f),d=dep(r,f),m=c||0xd9dbdd,pal=[0xffffff,0x7fa6c9,0xe7b7a2,0x6b6d70,0xd9a441,0x9db8aa];
  [0.01,0.98].forEach(t=>[0.02,0.96].forEach(u=>br(g,sub(slice(r,f,t,t+0.012),f,0,1,-d*(u+0.02),-d*u),0,0.95,m)));
  for(let k=0;k<8;k++){const u=0.06+k*0.88/7;br(g,sub(slice(r,f,0.01,0.99),f,0,1,-d*u-0.4,-d*u+0.4),0.93,0.95,m);}
  const rr=rnd(17);
  for(let k=0;k<7;k++){const u=0.1+k*0.8/6,t0=0.04+rr()*0.3,t1=t0+0.2+rr()*0.35;br(g,sub(slice(r,f,t0,Math.min(t1,0.96)),f,0,1,-d*u-0.5,-d*u+0.5),0.55+rr()*0.15,0.93,pal[k%pal.length]);}
}
function patere(g,r,f,n,y){
  const pal=[0x3d4a5c,0xb08a5e,0x6b6d70,0x8a3b2e,0x4f6b52];
  const d=dep(r,f);br(g,band(r,f,d-1.2,d),y,y+0.08,COL.chene);
  for(let i=0;i<n;i++){const t=(i+0.5)/n;br(g,sub(r,f,t-0.06,t+0.06,-(d-1.2),0),y-0.75,y-0.02,pal[i%pal.length]);}
}
function bac(g,cx,cz,rm,y0,y1,c){cy(g,cx,cz,rm,y0,y1,c);cy(g,cx,cz,rm*0.85,y1-0.01,y1+0.005,0xf2efe8);}
function aromates(g,r,f,n){br(g,r,0,0.5,0x6b5a48);const w=wid(r,f),k=n||Math.max(2,Math.round(w/S/0.25));const rr=rnd(29);for(let i=0;i<k;i++){const s=slice(r,f,(i+0.1)/k,(i+0.9)/k);const cx=(s[0]+s[2])/2,cz=(s[1]+s[3])/2;sph(g,cx,cz,0.6,0.1+rr()*0.04,[COL.feuille,0x6fa34e,COL.feuille2,0x88b04b][i%4],1.3);}}
function hexT(cols,joint,seed,rp){
  return mk(g=>{
    const r=rp||21.333,hh=Math.sqrt(3)*r,rr=rnd(seed||13);
    g.fillStyle=joint;g.fillRect(0,0,256,256);
    for(let i=-1;i<=256/(1.5*r)+1;i++)for(let j=-1;j<=256/hh+1;j++){
      const cx=i*1.5*r,cz=j*hh+(i%2?hh/2:0);
      g.fillStyle=cols[Math.floor(rr()*cols.length)];g.beginPath();
      for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+(r-1.6)*Math.cos(a),cz+(r-1.6)*Math.sin(a));}
      g.closePath();g.fill();
    }
  });
}
function tuiles(cols,nx,ny,joint,jw,seed,stag){
  return mk(g=>{
    const rr=rnd(seed||9),tw=256/nx,th=256/ny;
    g.fillStyle=joint;g.fillRect(0,0,256,256);
    for(let j=0;j<ny;j++){const off=stag&&j%2?tw/2:0;for(let i=-1;i<nx;i++){g.fillStyle=cols[Math.floor(rr()*cols.length)];g.fillRect(i*tw+off+jw/2,j*th+jw/2,tw-jw,th-jw);}}
  });
}
function terrazzo(base,chips,joint,n,seed){
  return mk(g=>{
    g.fillStyle=base;g.fillRect(0,0,256,256);const rr=rnd(seed||31);
    for(let i=0;i<1400;i++){g.fillStyle=chips[Math.floor(rr()*chips.length)];const s=0.8+rr()*2.6;g.save();g.translate(rr()*256,rr()*256);g.rotate(rr()*3);g.fillRect(-s,-s*0.7,s*2,s*1.4);g.restore();}
    g.strokeStyle=joint;g.lineWidth=2;const k=256/n;
    for(let i=0;i<=n;i++){g.beginPath();g.moveTo(i*k,0);g.lineTo(i*k,256);g.moveTo(0,i*k);g.lineTo(256,i*k);g.stroke();}
  });
}
function batons(cols,joint,seed){
  return mk(g=>{
    const rr=rnd(seed||7),k=64,s=k/4;
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){
      const hor=(i+j)%2===0;
      for(let q=0;q<4;q++){g.fillStyle=cols[Math.floor(rr()*cols.length)];if(hor)g.fillRect(i*k,j*k+q*s,k,s);else g.fillRect(i*k+q*s,j*k,s,k);}
      g.strokeStyle=joint;g.lineWidth=1;
      for(let q=0;q<=4;q++){g.beginPath();if(hor){g.moveTo(i*k,j*k+q*s);g.lineTo(i*k+k,j*k+q*s);}else{g.moveTo(i*k+q*s,j*k);g.lineTo(i*k+q*s,j*k+k);}g.stroke();}
    }
  });
}
function ciment(c1,c2,c3,joint){
  return mk(g=>{
    const k=64;
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){
      const x=i*k,y=j*k;g.fillStyle=c1;g.fillRect(x,y,k,k);
      g.fillStyle=c2;[[0,0],[k,0],[0,k],[k,k]].forEach(p=>{g.beginPath();g.moveTo(x+p[0],y+p[1]);g.arc(x+p[0],y+p[1],k*0.42,0,Math.PI*2);g.fill();});
      g.fillStyle=c1;[[0,0],[k,0],[0,k],[k,k]].forEach(p=>{g.beginPath();g.arc(x+p[0],y+p[1],k*0.26,0,Math.PI*2);g.fill();});
      g.fillStyle=c3;g.beginPath();g.moveTo(x+k/2,y+k*0.3);g.lineTo(x+k*0.7,y+k/2);g.lineTo(x+k/2,y+k*0.7);g.lineTo(x+k*0.3,y+k/2);g.closePath();g.fill();
      g.strokeStyle=joint;g.lineWidth=1.5;g.strokeRect(x,y,k,k);
    }
  });
}
function bruit(base,pal,n,sz,seed){
  return mk(g=>{g.fillStyle=base;g.fillRect(0,0,256,256);const rr=rnd(seed||41);for(let i=0;i<n;i++){g.fillStyle=pal[Math.floor(rr()*pal.length)];const s=0.6+rr()*sz;g.fillRect(rr()*256,rr()*256,s,s);}});
}
function lames(cols,joint,n,seed){
  return mk(g=>{
    const rr=rnd(seed||3),h=256/n;
    for(let r=0;r<n;r++){const off=Math.floor(rr()*256);g.fillStyle=cols[r%cols.length];g.fillRect(0,r*h,off,h);g.fillStyle=cols[(r+2)%cols.length];g.fillRect(off,r*h,256-off,h);
      g.strokeStyle=joint;g.lineWidth=1.5;g.beginPath();g.moveTo(off,r*h);g.lineTo(off,(r+1)*h);g.moveTo(0,r*h);g.lineTo(256,r*h);g.stroke();
      g.strokeStyle='rgba(90,60,30,0.18)';g.lineWidth=1;for(let k=1;k<3;k++){g.beginPath();g.moveTo(0,r*h+k*h/3);g.lineTo(256,r*h+k*h/3+(k%2?1.5:-1.5));g.stroke();}}
  });
}
function sols(liste){liste.forEach(s=>floor(s[0],s[1],s[2],s[3],s[4]));}
const ZONES={sejour:[[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]],eau:[[157,565,232,705],[232,565,437,705]],ch1:[[437,497,720,705]],ch2:[[520,15,720,255]]};
function solZone(k,t){ZONES[k].forEach(r=>floor(r[0],r[1],r[2],r[3],t));}
function cuisineMetod(){
  const g=piece('METOD / MAXIMERA 2 × 80 cm'),gt=piece('METOD hauts 2 × 80 cm',furnTall);
  const kx1=520-I*S/2,kx0=kx1-0.392*S,kz1=254,kz0=kz1-1.6*S,kw=0.8*S,ash=L(0xd9c9ab);
  pbox(kx0+1.5,kz0+1,kx1,kz1-1,0,0.08,L(0x3a3a3a),g);
  pbox(kx0+1.5,kz0,kx1,kz1,0.08,0.88,white,g);
  pbox(kx0-1.2,kz0,kx1,kz1,0.88,0.91,slate,g);
  for(let u=0;u<2;u++)for(let d=0;d<2;d++){const z0=kz0+u*kw+0.3,z1=kz0+(u+1)*kw-0.3,y0=0.08+d*0.4+0.004,y1=y0+0.392;pbox(kx0,z0,kx0+1.5,z1,y0,y1,ash,g);pbox(kx0-0.8,(z0+z1)/2-8,kx0,(z0+z1)/2+8,y1-0.06,y1-0.045,L(0x9aa0a6),g);}
  pbox(kx0+2,kz0+4,kx1-1,kz0+4+0.48*S,0.91,1.2,L(0x2b2c2e),g);
  pbox(kx0+5,kz1-0.32*S,kx1-2,kz1-4,0.91,1.25,L(0x1d1d1f),g);
  cyl(kx0+12,kz1-0.62*S,0.07,0.91,1.12,inox,g);
  const wx0=kx1-0.37*S;
  pbox(wx0+1.5,kz0,kx1,kz1,1.45,2.25,white,gt);
  for(let i=0;i<4;i++){const z0=kz0+i*kw/2+0.3,z1=kz0+(i+1)*kw/2-0.3,hz=i%2?z0+2.5:z1-2.5;pbox(wx0,z0,wx0+1.5,z1,1.452,2.248,ash,gt);pbox(wx0-0.8,hz-0.4,wx0,hz+0.4,1.47,1.62,L(0x9aa0a6),gt);}
}
function chaussures(g,r,f,c){cab(g,r,0,1.0,c||COL.blanc,f,2,undefined);br(g,r,1.0,1.03,COL.chene);}
function lingeSDB(variante){
  const g=piece('Étagère SDB 0,60 × 0,30',furnWall),z0=565+I*S/2,z1=z0+0.3*S,x0=296,x1=x0+0.6*S,wd=L(0xcaa97c);
  [x0,x1-2].forEach(x=>pbox(x,z0,x+2,z1,0,1.8,wd,g));
  [0.15,0.5,0.85,1.2,1.55,1.78].forEach(y=>pbox(x0,z0,x1,z1,y,y+0.02,wd,g));
  const tw=[0xffffff,0xe6e1d8,0x9db8aa,0xffffff,0x9db8aa,0xe6e1d8];
  [0.17,0.52].forEach((y,j)=>{for(let i=0;i<3;i++){const a=x0+3+i*(x1-x0-6)/3;pbox(a,z0+2,a+(x1-x0-6)/3-1,z1-1,y,y+0.13,L(tw[j*3+i]),g);}});
  pbox(x0+4,z0+3,x1-4,z1-2,1.57,1.75,L(0xd8c7a8),g);
  if(variante==='etageres'){
    const t=piece('Étagères au-dessus du lave-linge',furnTall),mx0=232+I*S/2+1,mx1=287,mz1=705-E*S/2,mz0=mz1-0.25*S;
    [1.25,1.6,1.95].forEach((y,j)=>{pbox(mx0,mz0,mx1,mz1,y,y+0.025,wd,t);[[0x3b82c4,0.24,7],[0xffffff,0.2,6],[0x9db8aa,0.16,5]].forEach((b,i)=>pbox(mx0+3+i*14,mz0+3,mx0+3+i*14+b[2],mz1-3,y+0.025,y+0.025+b[1],L(b[0]),t));});
  }
}
function wcDeco(c){const g=piece('Étagère WC',furnTall),wx0=157+E*S/2,wx1=232-I*S/2,wz1=705-E*S/2;bx(g,wx0+2,wz1-0.22*S,wx1-2,wz1,1.32,1.35,c||COL.chene);bx(g,wx0+8,wz1-0.18*S,wx0+16,wz1-3,1.35,1.55,0x9db8aa);bx(g,wx0+22,wz1-0.18*S,wx0+30,wz1-3,1.35,1.47,0xffffff);plante(g,wx1-10,wz1-0.11*S,0.05,0.25,0xe9e4da);g.children.slice(-4).forEach(m=>m.position.y+=1.35);}
function mursPeints(){Object.assign(paintWalls,{
  sejS:paintWalls.sej,
  sejN:col=>paintWall(true,255,523.4,713.2,I,1,[[525,585,'door']],col),
  sejO:col=>{paintWall(false,300,258.4,350,E,1,[],col);paintWall(false,300,350,412,I,1,[],col);},
  ch1N:col=>paintWall(true,497,440.4,713.2,I,1,[[445,490,'door']],col),
  ch1O:col=>paintWall(false,437,500.4,698.2,I,1,[],col),
  ch2N:col=>paintWall(true,15,523.4,713.2,E,1,[[640,690,'win']],col),
  ch2S:col=>paintWall(true,255,523.4,713.2,I,-1,[[525,585,'door']],col),
  ch2E:col=>paintWall(false,720,21.8,251.6,E,-1,[[160,220,'pf']],col),
  entree:col=>paintWall(false,157,356.8,561.6,E,1,[[415,470,'door']],col),
  entreeS:col=>paintWall(true,565,163.8,296.6,I,-1,[[175,215,'door'],[245,290,'door']],col),
  wc:col=>paintWall(true,705,163.8,228.6,E,-1,[],col)
});}
function chambreClassique(zb,o){
  o=o||{};
  const ix0=437+I*S/2,ix1=720-E*S/2,iz1=705-E*S/2,dd=0.5*S,ad=0.5*S;
  grab('Dressing ouvert 2,00 × 0,50',furnWall,()=>dressing(ix0,552,552+2.0*S,dd,2.05));
  grab('Armoire BRIMNES 117 × 50',furnWall,()=>brimnes(ix1,zb));
  const g=piece('Lit 160 × 200 + chevets'),bw=1.6*S,bl=2.05*S,bx0=(ix0+dd+ix1-ad)/2-bw/2,bx1=bx0+bw;
  lit(g,[bx0,iz1-bl,bx1,iz1],'S',{plaid:o.plaid,coussin:o.coussin,tete:o.tete||0xa49d99,hbH:1.15});
  [bx0-5-0.4*S,bx1+5].forEach(nx=>{bx(g,nx,iz1-0.35*S,nx+0.4*S,iz1,0,0.5,0xe9e4da);lampe(g,nx+0.2*S,iz1-0.2*S,0.5);});
  return {bx0,bx1,bz0:iz1-bl};
}
function abri(z0,nord){
  const g=piece('Rangement de jardin 1,30 × 0,70 × 1,80'),sx0=723.8+3+3,sx1=sx0+1.3*S,sz0=z0,sz1=sz0+0.7*S,gr=L(0x4a4d50),gr2=L(0x5c6064);
  pbox(sx0,sz0,sx1,sz1,0,1.8,gr,g);pbox(sx0,sz0,sx1,sz1,1.8,1.86,gr2,g);
  [sx0+0.6,(sx0+sx1)/2+0.3].forEach(x=>pbox(x,nord?sz0-0.8:sz1,x+0.65*S-1,nord?sz0:sz1+0.8,0.05,1.75,gr2,g));
  return g;
}
function meubleBBQ(z0,bbq){
  const g=piece(bbq?'Meuble d’extérieur 0,75 × 0,50 + barbecue':'Meuble d’extérieur 0,75 × 0,50'),bx0=727.8,bx1=bx0+0.5*S,bz0=z0,bz1=z0+0.75*S;
  cab(g,[bx0,bz0,bx1,bz1],0,0.86,0x8a7a66,'E',2,0x9b8a74);bx(g,bx0,bz0,bx1+0.3,bz1,0.86,0.89,0x6d6f72);
  if(bbq){const m=(bz0+bz1)/2,c=(bx0+bx1)/2;bx(g,c-0.18*S,m-0.25*S,c+0.18*S,m+0.25*S,0.89,1.0,0x1e1f21);bx(g,c-0.16*S,m-0.23*S,c+0.16*S,m+0.23*S,1.0,1.1,0x2c2d30);}
  return g;
}
function tableBalcon(n,cz,cx,ch){
  const g=piece(n),tw=0.6*S,tl=1.1*S,tx0=cx-tw/2,tx1=cx+tw/2,tz0=cz-tl/2,tz1=cz+tl/2;
  table(g,[tx0,tz0,tx1,tz1],0.75,0xb08a5e,0x3a3d40);
  (ch||['W1','W2','N','S']).forEach(k=>{if(k==='W1')chaise(g,tx0-0.25*S,cz-0.3*S,'W');if(k==='W2')chaise(g,tx0-0.25*S,cz+0.3*S,'W');if(k==='N')chaise(g,cx,tz0-0.3*S,'N');if(k==='S')chaise(g,cx,tz1+0.3*S,'S');});
  return g;
}
function secheLinge(){
  const g=piece('Sèche-linge pompe à chaleur empilé + kit');
  bx(g,240,651,285,697,0.87,0.9,0xd9dbdd);bx(g,240,651,285,697,0.9,1.72,0xf6f6f6);cy(g,262.5,650,0.17,1.05,1.45,0xcfd3d6);bx(g,244,649.6,281,651,1.58,1.68,0x9aa0a6);
  return g;
}
function etendoirPlafond(n,r){const g=piece(n,furnTall);[0.1,0.3,0.5,0.7,0.9].forEach(t=>br(g,slice(r,'E',t-0.03,t+0.03),2.18,2.2,0xd9dbdd));[0.15,0.85].forEach(t=>br(g,slice(r,'N',t-0.04,t+0.04),2.2,2.24,0xcaa97c));br(g,sub(r,'E',0.25,0.45,-(r[2]-r[0])+3,-3),1.75,2.18,0x7fa6c9);br(g,sub(r,'E',0.55,0.7,-(r[2]-r[0])+3,-3),1.85,2.18,0xffffff);cy(g,(r[0]+r[2])/2,(r[1]+r[3])/2,0.004,2.24,H,0x8a8d90);return g;}
function litEscamotable(r,f,c){
  const g=piece('Armoire-lit escamotable 160 × 200 (fermée)');
  cab(g,r,0,2.2,c||0xe9e4da,f,2,0xf3efe6);
  br(g,band(r,f,0,1),0.05,0.45,0xcaa97c);
  return g;
}
function chambreCentree(o){
  const ix0=440.4,ix1=713.2,iz1=698.2,g=piece('Lit 160 × 200 + chevets'),bw=1.6*S,bl=2.05*S,bx0=o.x0,bx1=bx0+bw;
  lit(g,[bx0,iz1-bl,bx1,iz1],'S',{plaid:o.plaid,coussin:o.coussin,tete:o.tete||0xa49d99,hbH:1.15});
  [[bx0-2-0.35*S,0.35],[bx1+2,0.35]].forEach(p=>{bx(g,p[0],iz1-0.32*S,p[0]+p[1]*S,iz1,0,0.5,o.chevet||0xe9e4da);lampe(g,p[0]+p[1]*S/2,iz1-0.17*S,0.5);});
  return {bx0,bx1,bz0:iz1-bl};
}
