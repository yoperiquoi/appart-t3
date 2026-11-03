let ALT=false;
const cm=v=>v*S/100;
const MC={};
function M(c){return typeof c==='number'?(MC[c]||(MC[c]=L(c))):c;}
function item(n,grp){const g=new THREE.Group();g.name=n;(grp||furnGroup).add(g);return g;}
function bx(g,x0,z0,x1,z1,y0,y1,c){pbox(Math.min(x0,x1),Math.min(z0,z1),Math.max(x0,x1),Math.max(z0,z1),Math.min(y0,y1),Math.max(y0,y1),M(c),g);}
function cy(g,cx,cz,r,y0,y1,c,n,r2){const m=new THREE.Mesh(new THREE.CylinderGeometry(r2===undefined?r:r2,r,y1-y0,n||24),M(c));m.position.set(X(cx),(y0+y1)/2,Z(cz));g.add(m);return m;}
function sp(g,cx,cz,y,r,c,sy){const m=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),M(c));m.position.set(X(cx),y,Z(cz));if(sy)m.scale.y=sy;g.add(m);return m;}
function disque(g,cx,cz,y,r,axe,ep,c){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,ep,32),M(c));m.position.set(X(cx),y,Z(cz));if(axe==='x')m.rotation.z=Math.PI/2;else m.rotation.x=Math.PI/2;g.add(m);return m;}
const ROT={S:0,E:Math.PI/2,N:Math.PI,W:-Math.PI/2};
function R(g,cx,cz,face){const s=new THREE.Group();s.position.set(X(cx),0,Z(cz));s.rotation.y=ROT[face||'S'];g.add(s);return s;}
function lb(s,u0,v0,u1,v1,y0,y1,c){bx(s,ox+u0,oz+v0,ox+u1,oz+v1,y0,y1,c);}
function lc(s,u,v,r,y0,y1,c,n,r2){return cy(s,ox+u,oz+v,r,y0,y1,c,n,r2);}
function lsp(s,u,v,y,r,c,sy){return sp(s,ox+u,oz+v,y,r,c,sy);}
function caisson(g,x0,z0,x1,z1,y0,y1,o){
  const e=0.8,face=o.face,f=o.f===undefined?o.c:o.f;
  let a=x0,b=z0,c=x1,d=z1;
  if(face==='N')b+=e;if(face==='S')d-=e;if(face==='W')a+=e;if(face==='E')c-=e;
  bx(g,a,b,c,d,y0,y1,o.c);
  if(!face)return;
  const pl=o.pl||0,hor=face==='N'||face==='S',a0=hor?x0:z0,a1=hor?x1:z1,n=o.n||1,r=o.r||1,w=(a1-a0)/n,hh=(y1-y0-pl)/r;
  for(let i=0;i<n;i++)for(let j=0;j<r;j++){
    const s0=a0+i*w+0.25,s1=a0+(i+1)*w-0.25,q0=y0+pl+j*hh+0.004,q1=y0+pl+(j+1)*hh-0.004;
    const p0=face==='N'?z0+0.3:face==='S'?z1-e:face==='W'?x0+0.3:x1-e,p1=face==='N'?z0+e:face==='S'?z1-0.3:face==='W'?x0+e:x1-0.3;
    const h0=face==='N'?z0:face==='S'?z1-0.3:face==='W'?x0:x1-0.3,h1=h0+0.3;
    const fc=Array.isArray(f)?f[(i+j)%f.length]:f;
    if(hor)bx(g,s0,p0,s1,p1,q0,q1,fc);else bx(g,p0,s0,p1,s1,q0,q1,fc);
    if(o.h!==undefined){
      const m=(s0+s1)/2,hw=Math.min(cm(6),(s1-s0)/4);
      let u0,u1,v0,v1;
      if(r>1||o.hz){u0=m-hw;u1=m+hw;v0=q1-0.07;v1=q1-0.05;}
      else{const side=i%2?s0+cm(4):s1-cm(4);u0=side-0.4;u1=side+0.4;v0=(q0+q1)/2-0.12;v1=(q0+q1)/2+0.12;if(y1>1.4){v0=Math.max(q0+0.1,0.95);v1=v0+0.3;}}
      if(hor)bx(g,u0,h0,u1,h1,v0,v1,o.h);else bx(g,h0,u0,h1,u1,v0,v1,o.h);
    }
  }
}
function livres(g,a0,a1,hor,d0,d1,y,hmax,seed,cols){
  const r=rnd(seed||11),pal=cols||[0x3b6ea5,0xc65f37,0x4f8a45,0xd9a441,0x6b6d70,0x8b6a4a,0xe6e1d8,0x34495e,0xb3262d];
  let a=a0+1;
  while(a<a1-2){
    const w=1+r()*2.2,h=Math.min(hmax,0.16+r()*0.12),dd=(d1-d0)*(0.6+r()*0.3);
    if(r()<0.18){a+=2+r()*5;continue;}
    if(a+w>a1-1)break;
    if(hor)bx(g,a,d0+0.5,a+w,d0+0.5+dd,y,y+h,pal[Math.floor(r()*pal.length)]);
    else bx(g,d0+0.5,a,d0+0.5+dd,a+w,y,y+h,pal[Math.floor(r()*pal.length)]);
    a+=w+0.15;
  }
}
function etag(g,x0,z0,x1,z1,y0,y1,lev,c,o){
  o=o||{};
  const hor=(x1-x0)>=(z1-z0),t=1.3;
  if(hor){[x0,x1-t].forEach(x=>bx(g,x,z0,x+t,z1,y0,y1,c));if(o.mid)for(let k=1;k<o.mid;k++){const x=x0+(x1-x0)*k/o.mid-t/2;bx(g,x,z0,x+t,z1,y0,y1,c);}}
  else{[z0,z1-t].forEach(z=>bx(g,x0,z,x1,z+t,y0,y1,c));if(o.mid)for(let k=1;k<o.mid;k++){const z=z0+(z1-z0)*k/o.mid-t/2;bx(g,x0,z,x1,z+t,y0,y1,c);}}
  lev.forEach(y=>bx(g,x0,z0,x1,z1,y,y+0.022,c));
  if(o.back){const b=o.back;if(b==='N')bx(g,x0,z0,x1,z0+0.5,y0,y1,c);if(b==='S')bx(g,x0,z1-0.5,x1,z1,y0,y1,c);if(b==='W')bx(g,x0,z0,x0+0.5,z1,y0,y1,c);if(b==='E')bx(g,x1-0.5,z0,x1,z1,y0,y1,c);}
  if(o.books){
    const sh=lev.slice(0,-1);
    sh.forEach((y,k)=>{if(o.skip&&o.skip.includes(k))return;const hm=(lev[k+1]-y)-0.04;if(hor)livres(g,x0+t,x1-t,true,z0+(o.back==='N'?0.5:0),z1-(o.back==='S'?0.5:0),y+0.022,hm,(o.seed||3)+k*7,o.pal);else livres(g,z0+t,z1-t,false,x0+(o.back==='W'?0.5:0),x1-(o.back==='E'?0.5:0),y+0.022,hm,(o.seed||3)+k*7,o.pal);});
  }
}
function literie(g,x0,z0,x1,z1,y,head,o){
  o=o||{};
  const du=o.duvet||0xf7f7f5,pc=o.pillow||0xffffff,ext=0.55*S,hor=head==='W'||head==='E';
  bx(g,x0+0.4,z0+0.4,x1-0.4,z1-0.4,y,y+0.2,0xf4f2ec);
  let a=x0,b=z0,c=x1,d=z1;
  if(head==='N')b+=ext;if(head==='S')d-=ext;if(head==='W')a+=ext;if(head==='E')c-=ext;
  bx(g,a,b,c,d,y+0.2,y+0.25,du);
  if(o.plaid){let p0=x0,p1=z0,p2=x1,p3=z1,k=0.45*S;if(head==='N')p1=z1-k;if(head==='S')p3=z0+k;if(head==='W')p0=x1-k;if(head==='E')p2=x0+k;bx(g,p0,p1,p2,p3,y+0.25,y+0.27,o.plaid);}
  const n=o.n||2;
  for(let i=0;i<n;i++){
    if(hor){const L0=z0+3+i*(z1-z0-6)/n,L1=z0+3+(i+1)*(z1-z0-6)/n-2,u0=head==='W'?x0+3:x1-0.38*S,u1=u0+0.35*S;bx(g,u0,L0,u1,L1,y+0.2,y+0.32,pc);}
    else{const L0=x0+3+i*(x1-x0-6)/n,L1=x0+3+(i+1)*(x1-x0-6)/n-2,v0=head==='N'?z0+3:z1-0.38*S,v1=v0+0.35*S;bx(g,L0,v0,L1,v1,y+0.2,y+0.32,pc);}
  }
}
function canape(g,x0,z0,x1,z1,back,fab,cush,o){
  o=o||{};
  const base=o.base===undefined?0x3a3a3a:o.base,yb=o.yb||0.1,ys=o.ys||0.42,yt=o.yt||0.82,bd=cm(o.bd||22),ad=cm(o.ad||18);
  bx(g,x0+1,z0+1,x1-1,z1-1,0,yb,base);
  bx(g,x0,z0,x1,z1,yb,ys-0.06,fab);
  let a=x0,b=z0,c=x1,d=z1;
  if(back==='N'){bx(g,x0,z0,x1,z0+bd,ys-0.06,yt,fab);b=z0+bd;}
  if(back==='S'){bx(g,x0,z1-bd,x1,z1,ys-0.06,yt,fab);d=z1-bd;}
  if(back==='W'){bx(g,x0,z0,x0+bd,z1,ys-0.06,yt,fab);a=x0+bd;}
  if(back==='E'){bx(g,x1-bd,z0,x1,z1,ys-0.06,yt,fab);c=x1-bd;}
  const hor=back==='N'||back==='S';
  if(o.arms!==false){
    if(hor){bx(g,x0,z0,x0+ad,z1,ys-0.06,ys+0.2,fab);bx(g,x1-ad,z0,x1,z1,ys-0.06,ys+0.2,fab);a=Math.max(a,x0+ad);c=Math.min(c,x1-ad);}
    else{bx(g,x0,z0,x1,z0+ad,ys-0.06,ys+0.2,fab);bx(g,x0,z1-ad,x1,z1,ys-0.06,ys+0.2,fab);b=Math.max(b,z0+ad);d=Math.min(d,z1-ad);}
  }
  const n=o.n||(hor?Math.max(1,Math.round((c-a)/(0.7*S))):Math.max(1,Math.round((d-b)/(0.7*S))));
  for(let i=0;i<n;i++){
    if(hor){const s0=a+i*(c-a)/n+0.3,s1=a+(i+1)*(c-a)/n-0.3;bx(g,s0,b,s1,d,ys-0.06,ys,cush);if(o.pc)bx(g,s0+2,back==='N'?b:d-cm(16),s1-2,back==='N'?b+cm(16):d,ys,ys+0.36,o.pc[i%o.pc.length]);}
    else{const s0=b+i*(d-b)/n+0.3,s1=b+(i+1)*(d-b)/n-0.3;bx(g,a,s0,c,s1,ys-0.06,ys,cush);if(o.pc)bx(g,back==='W'?a:c-cm(16),s0+2,back==='W'?a+cm(16):c,s1-2,ys,ys+0.36,o.pc[i%o.pc.length]);}
  }
}
function chaise(g,cx,cz,back,c,leg){
  const h=0.44*S/2,t=1.6;c=c||0x8b6a4a;leg=leg||0x5a4330;
  bx(g,cx-h,cz-h,cx+h,cz+h,0.43,0.47,c);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>{const x=cx+q[0]*h,z=cz+q[1]*h;bx(g,x-(q[0]>0?t:0),z-(q[1]>0?t:0),x+(q[0]<0?t:0),z+(q[1]<0?t:0),0,0.43,leg);});
  if(back==='N')bx(g,cx-h,cz-h,cx+h,cz-h+1.6,0.47,0.86,c);
  if(back==='S')bx(g,cx-h,cz+h-1.6,cx+h,cz+h,0.47,0.86,c);
  if(back==='W')bx(g,cx-h,cz-h,cx-h+1.6,cz+h,0.47,0.86,c);
  if(back==='E')bx(g,cx+h-1.6,cz-h,cx+h,cz+h,0.47,0.86,c);
}
function tabouret(g,cx,cz,h,c,leg){cy(g,cx,cz,0.17,h-0.04,h,c||0xcaa97c);cy(g,cx,cz,0.02,0,h-0.04,leg||0x2b2c2e);cy(g,cx,cz,0.15,0,0.02,leg||0x2b2c2e);cy(g,cx,cz,0.13,0.28,0.3,leg||0x2b2c2e);}
function plante(g,cx,cz,s,pot,leaf,y0){
  s=s||1;pot=pot||0xd8cfc0;leaf=leaf||0x4f8a45;y0=y0||0;
  cy(g,cx,cz,0.13*s,y0,y0+0.32*s,pot,20,0.15*s);
  cy(g,cx,cz,0.012,y0+0.3*s,y0+0.62*s,0x5a4330);
  sp(g,cx,cz,y0+0.72*s,0.24*s,leaf,1.2);
  sp(g,cx+0.06*S*s,cz-0.04*S*s,y0+0.92*s,0.17*s,0x5f9a4c);
  sp(g,cx-0.05*S*s,cz+0.05*S*s,y0+0.55*s,0.15*s,0x3f7a3a);
}
function herbe(g,cx,cz,y,r,c){cy(g,cx,cz,r*0.8,y,y+0.12,0xc9b48f,16,r);sp(g,cx,cz,y+0.18,r*0.95,c||0x5a9a48,0.8);}
function tapis(g,x0,z0,x1,z1,c,b){bx(g,x0,z0,x1,z1,0,0.003,c);if(b!==undefined)bx(g,x0+2,z0+2,x1-2,z1-2,0.003,0.004,b);}
function lampadaire(g,cx,cz,h,c){cy(g,cx,cz,0.14,0,0.02,0x2b2c2e);cy(g,cx,cz,0.012,0.02,h-0.25,0x2b2c2e);cy(g,cx,cz,0.17,h-0.25,h,c||0xf3ead4,24,0.11);}
function lampe(g,cx,cz,y,c){cy(g,cx,cz,0.06,y,y+0.02,0x3a3a3a);cy(g,cx,cz,0.01,y+0.02,y+0.24,0x3a3a3a);cy(g,cx,cz,0.1,y+0.24,y+0.4,c||0xf3ead4,20,0.07);}
function suspension(n,cx,cz,y,c,r){const g=item(n,furnTall);cy(g,cx,cz,0.006,y+0.15,H,0x222222);cy(g,cx,cz,r||0.18,y,y+0.15,c||0xf3ead4,24,(r||0.18)*0.3);return g;}
function tele(g,x0,z0,x1,z1,y0,y1){bx(g,x0,z0,x1,z1,y0,y1,0x151617);const hor=(x1-x0)>(z1-z0);if(hor)bx(g,x0+1,z0,x1-1,z1,y0+0.02,y1-0.02,0x2a2f36);else bx(g,x0,z0+1,x1,z1-1,y0+0.02,y1-0.02,0x2a2f36);}
function coussin(g,x0,z0,x1,z1,y,h,c){bx(g,x0,z0,x1,z1,y,y+h,c);}
function brimnesL(s){
  const w=cm(117),d=cm(50),pw=w/3;
  lb(s,-w/2,0,w/2,d-0.8,0,1.9,0xf6f5f1);
  for(let i=0;i<3;i++){const u0=-w/2+i*pw+0.4,u1=-w/2+(i+1)*pw-0.4;lb(s,u0,d-0.8,u1,d,0.08,1.86,i===1?0xbfd3dc:0xfbfbf9);const hu=i===0?u1-3:u0+3;lb(s,hu-0.6,d-0.2,hu+0.6,d,0.9,1.15,0x9aa0a6);}
  lb(s,-w/2,d-2,w/2,d-0.8,0,0.08,0xe4e2dc);
}
function dressingL(s,rideau){
  const w=cm(200),d=cm(50),ht=2.05,m=0x4a4644,t=1.7,cw=cm(45),c1=-w/2+cw,c2=w/2-cw;
  [-w/2,c1-t,c2,w/2-t].forEach(u=>lb(s,u,0,u+t,d,0,ht,m));
  lb(s,-w/2,0,w/2,d,ht-0.03,ht,m);
  [[-w/2,c1],[c2,w/2]].forEach(c=>{lb(s,c[0],0,c[1],d,0,0.06,m);[0.45,0.8,1.15,1.5,1.85].forEach(y=>lb(s,c[0],0,c[1],d,y,y+0.025,m));lb(s,c[0],0,c[1],1,0.06,ht-0.03,0x8a8580);});
  [1.15,1.95].forEach(y=>lb(s,c1,d/2-0.6,c2,d/2+0.6,y,y+0.02,0xb9bcbf));
  lb(s,c1+2,3,c2-2,d-4,1.0,1.9,0x6b7a86);
  lb(s,c1+2,3,c2-2,d-4,0.25,0.95,0x8a6f5a);
  if(rideau!==false)lb(s,c2-cm(25),d-1.5,c2,d,0.05,ht-0.05,0x6b6866);
}
function metodL(s){
  const w=cm(160),d=cm(39.2),kw=w/2,ash=0xd9c9ab;
  lb(s,-w/2,0,w/2,d-1.5,0,0.08,0x3a3a3a);
  lb(s,-w/2,0,w/2,d-1.5,0.08,0.88,0xffffff);
  lb(s,-w/2,0,w/2,d+1.2,0.88,0.91,0x3e4044);
  for(let u=0;u<2;u++)for(let k=0;k<2;k++){const u0=-w/2+u*kw+0.3,u1=-w/2+(u+1)*kw-0.3,y0=0.08+k*0.4+0.004,y1=y0+0.392;lb(s,u0,d-1.5,u1,d,y0,y1,ash);lb(s,(u0+u1)/2-8,d-0.3,(u0+u1)/2+8,d,y1-0.06,y1-0.045,0x9aa0a6);}
}
function metodHautL(s){
  const w=cm(160),d=cm(37),kw=w/2,ash=0xd9c9ab;
  lb(s,-w/2,0,w/2,d-1.5,1.45,2.25,0xffffff);
  for(let i=0;i<4;i++){const u0=-w/2+i*kw/2+0.3,u1=-w/2+(i+1)*kw/2-0.3,hu=i%2?u0+2.5:u1-2.5;lb(s,u0,d-1.5,u1,d,1.452,2.248,ash);lb(s,hu-0.4,d-0.3,hu+0.4,d,1.47,1.62,0x9aa0a6);}
}
function bureauL(s,top){
  const w=cm(180),d=cm(80),wht=0xf4f4f2,lu0=-w/2+cm(12),lu1=w/2-cm(12),mv=d/2;
  lb(s,-w/2,0,w/2,d,0.725,0.75,top||0xdcc296);
  [lu0,lu1].forEach(u=>{lb(s,u-2,3,u+2,d-3,0,0.03,wht);lb(s,u-2.4,mv-2.4,u+2.4,mv+2.4,0.03,0.42,wht);lb(s,u-1.7,mv-1.7,u+1.7,mv+1.7,0.42,0.7,wht);lb(s,u-1.5,4,u+1.5,d-4,0.7,0.725,wht);});
  lb(s,lu0,mv-1.2,lu1,mv+1.2,0.67,0.71,wht);
}
function gamingL(s){
  const blk=0x222324,red=0xb3262d,cw=0.3*S;
  lc(s,0,0,0.3,0,0.04,blk);lc(s,0,0,0.025,0.04,0.46,0x6b6e72);
  lb(s,-cw,-cw,cw,cw,0.46,0.56,blk);
  lb(s,-cw*0.6,-cw*0.85,cw*0.6,cw*0.85,0.56,0.58,red);
  lb(s,-cw,cw-0.1*S,cw,cw,0.56,1.38,blk);
  lb(s,-cw*0.5,cw-0.1*S-0.4,cw*0.5,cw-0.1*S,0.7,1.32,red);
  [-cw-2,cw].forEach(u=>lb(s,u,-cw*0.7,u+2,cw*0.5,0.68,0.72,blk));
}
function bzL(s,ouvert,fab,cu){
  const w=cm(140),d=cm(90);
  if(!ouvert){
    lb(s,-w/2,0,w/2,d,0,0.08,0x2a2a2a);lb(s,-w/2,0,w/2,d,0.08,0.42,fab);
    lb(s,-w/2+2,cm(22),w/2-2,d,0.42,0.5,cu);lb(s,-w/2,0,w/2,cm(22),0.42,0.88,fab);
    [-w/2+4,1].forEach(u=>lb(s,u,cm(22),u+w/2-5,cm(36),0.5,0.82,cu));
  }else{
    const dd=cm(205);
    lb(s,-w/2,0,w/2,dd,0,0.08,0x2a2a2a);lb(s,-w/2,0,w/2,dd,0.08,0.42,fab);
    lb(s,-w/2+1,cm(8),w/2-1,dd-1,0.42,0.5,0xf7f7f5);
    lb(s,-w/2+3,cm(10),-2,cm(45),0.5,0.62,0xffffff);lb(s,2,cm(10),w/2-3,cm(45),0.5,0.62,0xffffff);
  }
}
function litPossedeL(s,o){
  o=o||{};
  const bw=cm(160),bl=cm(200);
  lb(s,-bw/2,cm(6),bw/2,cm(6)+bl,0.06,0.3,0x3d3d3f);
  lb(s,-bw/2-2,0,bw/2+2,cm(6),0,1.15,0xa49d99);
  for(let i=1;i<3;i++)lb(s,-bw/2-2+i*(bw+4)/3-0.4,cm(6),-bw/2-2+i*(bw+4)/3+0.4,cm(6)+0.3,0.35,1.15,0x8f8884);
  literieL(s,-bw/2,cm(6),bw/2,cm(6)+bl,0.3,o);
}
function literieL(s,u0,v0,u1,v1,y,o){
  o=o||{};
  lb(s,u0+0.4,v0+0.4,u1-0.4,v1-0.4,y,y+0.2,0xf4f2ec);
  lb(s,u0,v0+0.55*S,u1,v1,y+0.2,y+0.25,o.duvet||0xf7f7f5);
  if(o.plaid)lb(s,u0-0.5,v1-0.45*S,u1+0.5,v1-0.1*S,y+0.25,y+0.27,o.plaid);
  lb(s,u0+3,v0+3,(u0+u1)/2-1,v0+0.38*S,y+0.2,y+0.32,o.pillow||0xffffff);
  lb(s,(u0+u1)/2+1,v0+3,u1-3,v0+0.38*S,y+0.2,y+0.32,o.pillow||0xffffff);
}
function meuble(n,grp,cx,cz,face,fn){const g=item(n,grp);const s=R(g,cx,cz,face);fn(s);return g;}
function tm2(name,w,h){const e=tex[name],t=e.t.clone();t.needsUpdate=true;t.repeat.set(w/e.m,h/(e.mz||e.m));return new THREE.MeshLambertMaterial({map:t});}
function sol(x0,y0,x1,y1,name){box(X(x0),Z(y0),X(x1),Z(y1),-0.06,0,tm2(name,(x1-x0)/S,(y1-y0)/S),floorGroup);}
function planches(base,cols,joint,n,jw,seed,grain){
  return mk(g=>{
    const r=rnd(seed||9),rh=256/n;
    for(let k=0;k<n;k++){
      let x=-r()*120;
      while(x<256){const l=90+r()*140;g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(x,k*rh,l,rh);
        if(grain){g.strokeStyle=grain;g.lineWidth=1;g.globalAlpha=0.35;for(let q=0;q<2;q++){const y=k*rh+3+r()*(rh-6);g.beginPath();g.moveTo(x,y);g.lineTo(x+l,y+(r()-0.5)*3);g.stroke();}g.globalAlpha=1;}
        g.fillStyle=joint;g.fillRect(x,k*rh,jw*0.6,rh);x+=l;}
      g.fillStyle=joint;g.fillRect(0,k*rh,256,jw);
    }
  });
}
function carreaux(nx,ny,cols,joint,jw,seed,vary){
  return mk(g=>{
    const r=rnd(seed||5),w=256/nx,h=256/ny;
    g.fillStyle=joint;g.fillRect(0,0,256,256);
    for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(i*w+jw/2,j*h+jw/2,w-jw,h-jw);if(vary){g.globalAlpha=0.18;g.fillStyle='#ffffff';g.fillRect(i*w+jw/2+2,j*h+jw/2+2,(w-jw)*0.4,(h-jw)*0.3);g.globalAlpha=1;}}
  });
}
function tachete(base,cols,n,smin,smax,seed){
  return mk(g=>{g.fillStyle=base;g.fillRect(0,0,256,256);const r=rnd(seed||13);for(let i=0;i<n;i++){g.fillStyle=cols[Math.floor(r()*cols.length)];const s=smin+r()*(smax-smin);g.beginPath();g.ellipse(r()*256,r()*256,s,s*(0.5+r()*0.5),r()*3,0,6.283);g.fill();}});
}
Object.assign(tex,{
  teck:{t:planches('#b98a57',['#b07f4d','#c39461','#a97646','#bd8e5a'],'#1d1b19',8,3,4,'#7a5532'),m:1.1},
  liege:{t:tachete('#c99a68',['#b5845a','#d8ad7c','#a8774c','#e0bb8c'],1400,1,3,8),m:0.6},
  marine:{t:carreaux(8,8,['#f4f2ec','#eeece5','#f7f6f1'],'#1f3550',4,6),m:0.8},
  beton:{t:mk(g=>{g.fillStyle='#bdbab3';g.fillRect(0,0,256,256);const r=rnd(17);for(let i=0;i<900;i++){g.fillStyle=r()<0.5?'rgba(150,146,138,0.25)':'rgba(220,218,212,0.3)';g.beginPath();g.arc(r()*256,r()*256,2+r()*9,0,6.283);g.fill();}g.strokeStyle='#8f8b83';g.lineWidth=2;g.strokeRect(0,0,256,256);g.beginPath();g.moveTo(128,0);g.lineTo(128,256);g.stroke();}),m:1.2,mz:1.2},
  zellige:{t:carreaux(4,4,['#3f7f6b','#4a8c77','#356f5d','#5a9a84','#2f6655'],'#d9d6cc',5,21,true),m:0.4},
  chevron:{t:mk(g=>{g.fillStyle='#5a4128';g.fillRect(0,0,256,256);const cols=['#c69a62','#bb8e57','#d2a76d','#b48650'],r=rnd(4);
    for(let row=-2;row<10;row++)for(let col=0;col<4;col++){const cx=col*64,cy=row*32;g.save();g.translate(cx+(col%2?0:0),cy);g.rotate(col%2?-0.785:0.785);g.fillStyle=cols[Math.floor(r()*4)];g.fillRect(-44,-10,88,20);g.restore();}}),m:0.9},
  hinoki:{t:planches('#e2c79c',['#e6cda4','#dcc093','#ead4ad','#d9bb8c'],'#b89a6c',6,1.5,12,'#c4a273'),m:1.2},
  tatami:{t:mk(g=>{for(let k=0;k<2;k++){g.fillStyle=k?'#cfc78f':'#c8c086';g.fillRect(k*128,0,128,256);g.strokeStyle='rgba(120,115,60,0.35)';g.lineWidth=1;for(let y=0;y<256;y+=3){g.beginPath();g.moveTo(k*128,y);g.lineTo(k*128+128,y);g.stroke();}g.fillStyle='#2f3b33';g.fillRect(k*128,0,7,256);g.fillRect(k*128+121,0,7,256);}}),m:1.8},
  ardoise:{t:carreaux(2,4,['#5b5f63','#54585c','#62666a','#4d5155'],'#2c2e30',3,31),m:1.2},
  galets:{t:tachete('#7c7f7a',['#a6a8a2','#8f928c','#c2c3bd','#6d706b','#b3b1a8'],520,4,9,27),m:0.5},
  terrazzo:{t:tachete('#ece7de',['#c9bfb0','#8f8a82','#d79a7a','#a7b8b0','#585b5f','#e3d2b8'],1600,1,4.5,19),m:1.2},
  damier:{t:carreaux(2,2,['#1e1f21','#f2f0ea'],'#bdbab3',2,1),m:0.5},
  damierN:{t:mk(g=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle=(i+j)%2?'#1e1f21':'#f2f0ea';g.fillRect(i*64,j*64,64,64);}g.strokeStyle='#9a978f';g.lineWidth=2;for(let k=0;k<=4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64,256);g.moveTo(0,k*64);g.lineTo(256,k*64);g.stroke();}}),m:0.8},
  metro:{t:mk(g=>{g.fillStyle='#c9c7c0';g.fillRect(0,0,256,256);for(let j=0;j<8;j++)for(let i=-1;i<4;i++){g.fillStyle='#f6f5f1';g.fillRect(i*64+(j%2?32:0)+2,j*32+2,60,28);}}),m:0.6},
  hexa:{t:mk(g=>{g.fillStyle='#e9e2d6';g.fillRect(0,0,256,256);const r=256/(4*Math.sqrt(3)),cols=['#b8603e','#c26c48','#ad5736','#c97a55'],q=rnd(41);for(let j=-1;j<8;j++)for(let i=-1;i<6;i++){const cx=i*Math.sqrt(3)*r+(j%2?Math.sqrt(3)*r/2:0),cyy=j*1.5*r*256/(6*r);g.fillStyle=cols[Math.floor(q()*4)];g.beginPath();for(let k=0;k<6;k++){const a=Math.PI/6+k*Math.PI/3;g.lineTo(cx+(r-2)*Math.cos(a),cyy+(r-2)*Math.sin(a)*256/(6*r));}g.closePath();g.fill();}}),m:0.6},
  bambou:{t:planches('#d7b77a',['#dcbd82','#d0ae70','#e2c58e'],'#a88a52',10,1,33,'#b8955a'),m:0.9},
  gravier:{t:tachete('#cfcac0',['#b9b4aa','#e3dfd6','#a8a399','#d9d4ca'],2600,1,2.4,51),m:0.5},
  lino:{t:tachete('#2f4a5f',['#3a5a72','#263d4f','#466a84'],900,1,3,61),m:0.8},
  moquette:{t:tachete('#7f8b7c',['#8b977f','#738070','#94a08c'],2200,0.8,1.8,71),m:0.5},
  ocre:{t:carreaux(2,2,['#d9a46a','#cf9a5f','#e0ad74','#d39f63'],'#f1ead8',4,81),m:0.4}
});
const ZONES=[
  ['Porte WC (ouverte)','q',176,565,40,1,-1],
  ['Porte SDB (ouverte)','q',247,565,43,1,-1],
  ['Porte chambre 1 (ouverte)','q',445,497,45,1,1],
  ['Porte chambre 2 (ouverte)','q',525,255,55,1,-1],
  ['Porte d\'entrée (débattement)','r',157,415,212,470,0,2.04],
  ['Porte-fenêtre ch. 2, vantail nord','q',713.2,160,30,-1,1],
  ['Porte-fenêtre ch. 2, vantail sud','q',713.2,220,30,-1,-1],
  ['Porte-fenêtre ch. 1, vantail nord','q',713.2,515,30,-1,1],
  ['Porte-fenêtre ch. 1, vantail sud','q',713.2,575,30,-1,-1],
  ['Fenêtre ch. 2 (ouvrant)','r',640,21.8,690,55,0.92,2.1],
  ['Fenêtre cuisine (ouvrant)','r',475,21.8,516.6,55,0.92,2.1],
  ['Lave-vaisselle ouvert','r',456,73,515,114,0,0.9],
  ['Porte du réfrigérateur','r',421,88,462,132,0,1.85],
  ['Hublot du lave-linge','r',240,622,285,650,0,0.85],
  ['Accès douche','r',360,575,387,645,0,2]
];
function metodPlusL(s){
  metodL(s);
  const w=cm(160),d=cm(39.2);
  lb(s,-w/2+2,1,-w/2+2+0.48*S,d-2,0.91,1.2,0x2b2c2e);
  lb(s,-w/2+2.4,d-2,-w/2+2+0.34*S,d-1.6,0.95,1.16,0x55606a);
  lb(s,w/2-0.32*S,4,w/2-2,d-5,0.91,1.25,0x1d1d1f);
  lc(s,w/2-0.62*S,d-12,0.07,0.91,1.12,0xb9bcbf);
}
function cuisineMetod(){
  meuble('METOD/MAXIMERA 2 × 80 (existants)',furnGroup,516.6,199.6,'W',metodPlusL);
  meuble('Meubles hauts METOD (existants)',furnTall,516.6,199.6,'W',metodHautL);
}
function etagereSdb(){
  const g=item('Étagère SDB bois 60 × 30',furnWall),z0=565+I*S/2,z1=z0+0.3*S,x0=296,x1=x0+0.6*S,wd=0xcaa97c;
  [x0,x1-2].forEach(x=>bx(g,x,z0,x+2,z1,0,1.8,wd));
  [0.15,0.5,0.85,1.2,1.55,1.78].forEach(y=>bx(g,x0,z0,x1,z1,y,y+0.02,wd));
  const tw=[0xffffff,0xe6e1d8,0x9db8aa,0xffffff,0x9db8aa,0xe6e1d8];
  [0.17,0.52].forEach((y,j)=>{for(let i=0;i<3;i++){const a=x0+3+i*(x1-x0-6)/3;bx(g,a,z0+2,a+(x1-x0-6)/3-1,z1-1,y,y+0.13,tw[j*3+i]);}});
  [[x0+5,0.87,0x3b82c4,0.14],[x0+12,0.87,0xffffff,0.18],[x0+20,0.87,0xd9a441,0.12],[x0+8,1.22,0xc65f37,0.1],[x0+18,1.22,0x8a8a88,0.22]].forEach(b=>bx(g,b[0],z0+6,b[0]+4,z0+10,b[1],b[1]+b[3],b[2]));
  bx(g,x0+4,z0+3,x1-4,z1-2,1.57,1.75,0xd8c7a8);
}
function etageresLinge(){
  const g=item('3 étagères au-dessus du lave-linge',furnTall),mx0=232+I*S/2+1,mx1=287,mz1=705-E*S/2,mz0=mz1-0.25*S,wd=0xcaa97c;
  [1.25,1.6,1.95].forEach((y,j)=>{
    bx(g,mx0,mz0,mx1,mz1,y,y+0.025,wd);
    [mx0+3,mx1-5].forEach(x=>bx(g,x,mz1-0.2*S,x+1.2,mz1,y-0.12,y,0x3a3a3a));
    [[0x3b82c4,0.24,7],[0xffffff,0.2,6],[0x9db8aa,0.16,5],[0xd9a441,0.22,6],[0xc65f37,0.14,5]].slice(j,j+3).forEach((b,i)=>bx(g,mx0+3+i*14,mz0+3,mx0+3+i*14+b[2],mz1-3,y+0.025,y+0.025+b[1],b[0]));
  });
}
