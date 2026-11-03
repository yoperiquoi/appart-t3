const K=0.68,MC={};
function M(c){if(typeof c==='object')return c;if(!MC[c])MC[c]=L(c);return MC[c];}
function GL(c){return new THREE.MeshBasicMaterial({color:c});}
function TR(c,o){return new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:o});}
let PASS=[],ZONES=[];
function it(n,fn){const gs=[furnGroup,furnWall,furnTall],n0=gs.map(g=>g.children.length);fn();gs.forEach((g,i)=>g.children.slice(n0[i]).forEach(c=>{c.userData.it=n;}));}
function pass(n,x0,z0,x1,z1,min){PASS.push({n,x0,z0,x1,z1,min:min||80});}
function zone(n,x0,z0,x1,z1){ZONES.push({n,x0,z0,x1,z1});}
const DIR={S:0,N:Math.PI,E:Math.PI/2,W:-Math.PI/2};
function frame(cx,cz,W,D,ang,g){
  const grp=new THREE.Group();grp.position.set(X(cx),0,Z(cz));grp.rotation.y=ang;g.add(grp);
  const hu=W/2,hv=D/2;
  return {W,D,g:grp,
    b:(u0,v0,u1,v1,y0,y1,c)=>box(Math.min(u0,u1)/100-hu/100,Math.min(v0,v1)/100-hv/100,Math.max(u0,u1)/100-hu/100,Math.max(v0,v1)/100-hv/100,y0,y1,M(c),grp),
    c:(u,v,r,y0,y1,c,n)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r/100,r/100,y1-y0,n||24),M(c));m.position.set((u-hu)/100,(y0+y1)/2,(v-hv)/100);grp.add(m);return m;},
    s:(u,v,y,r,c,sy)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r/100,14,10),M(c));m.position.set((u-hu)/100,y,(v-hv)/100);if(sy)m.scale.y=sy;grp.add(m);return m;}
  };
}
function A(x0,z0,W,D,dir,g){const s=dir==='S'||dir==='N',w=(s?W:D)*K,d=(s?D:W)*K;return frame(x0+w/2,z0+d/2,W,D,DIR[dir],g||furnGroup);}
function AC(cx,cz,W,D,ang,g){return frame(cx,cz,W,D,ang,g||furnGroup);}
function ext(x0,z0,W,D,dir){const s=dir==='S'||dir==='N';return [x0+(s?W:D)*K,z0+(s?D:W)*K];}
function books(f,u0,u1,v0,v1,y,h,seed,cols){
  const r=rnd(seed),pal=cols||[0x3b5b7a,0xb4522f,0xd9a441,0x4f6f52,0x8a8a88,0xe8e2d4,0x6b3f3a,0x2f3b46];
  let u=u0+1;
  while(u<u1-3){const w=1.6+r()*2.6,hh=h*(0.62+r()*0.34);if(r()<0.12){u+=4+r()*6;continue;}f.b(u,v0,Math.min(u+w,u1-1),v1,y,y+hh,pal[Math.floor(r()*pal.length)]);u+=w+0.3;}
}
function shelf(f,o){
  o=o||{};const W=f.W,D=f.D,h=o.h||1.8,col=o.col||0xf3f2ee,t=2,n=o.n||5,back=o.back;
  f.b(0,0,t,D,0,h,col);f.b(W-t,0,W,D,0,h,col);
  if(back)f.b(t,0,W-t,1,0,h,back);
  const cols=o.cols||Math.max(1,Math.round(W/80));
  for(let i=1;i<cols;i++)f.b(i*W/cols-t/2,0,i*W/cols+t/2,D,0,h,col);
  for(let k=0;k<=n;k++){const y=o.y0!==undefined?o.y0+k*(h-o.y0)/n:k*h/n;f.b(t,0,W-t,D,Math.min(y,h-0.025),Math.min(y,h-0.025)+0.025,col);}
  if(o.books!==false)for(let k=0;k<n;k++){const y=(o.y0!==undefined?o.y0+k*(h-o.y0)/n:k*h/n)+0.025,hh=(h-(o.y0||0))/n-0.05;for(let i=0;i<cols;i++)if((k+i+(o.seed||0))%4!==3)books(f,i*W/cols+2,(i+1)*W/cols-2,2,Math.min(D-2,24),y,Math.min(hh,0.32),(o.seed||1)*31+k*7+i,o.pal);}
}
function cab(f,o){
  o=o||{};const W=f.W,D=f.D,h=o.h||0.75,col=o.col||0xf3f2ee,fr=o.front||col,n=o.n||Math.max(1,Math.round(W/60)),y0=o.y0||0,pl=o.plinth===undefined?0.08:o.plinth;
  if(pl)f.b(2,0,W-2,D-3,y0,y0+pl,o.pc||0x3a3a3a);
  f.b(0,0,W,D-1.5,y0+pl,y0+h,col);
  for(let i=0;i<n;i++){
    const a=i*W/n+0.3,b=(i+1)*W/n-0.3;
    if(o.drawers){const k=o.drawers;for(let j=0;j<k;j++){const ya=y0+pl+j*(h-pl)/k+0.004,yb=ya+(h-pl)/k-0.008;f.b(a,D-1.5,b,D,ya,yb,fr);f.b((a+b)/2-6,D,(a+b)/2+6,D+0.8,yb-0.05,yb-0.035,o.hc||0x9aa0a6);}}
    else{f.b(a,D-1.5,b,D,y0+pl+0.004,y0+h-0.004,fr);const hu=i%2?a+3:b-3;f.b(hu-0.6,D,hu+0.6,D+0.8,y0+h*0.45,y0+h*0.75,o.hc||0x9aa0a6);}
  }
  if(o.top)f.b(-0.5,-0.5,W+0.5,D+0.5,y0+h,y0+h+0.03,o.top);
}
function sofa(f,o){
  o=o||{};const W=f.W,D=f.D,ar=o.arm===undefined?16:o.arm,bk=o.back||20,sy=o.seat||0.42,ty=o.top||0.82,c=o.col,cu=o.cush||c,lg=o.leg||0x3a3a3a;
  f.b(3,3,W-3,D-3,0,0.08,lg);
  f.b(0,0,W,D,0.08,sy,c);
  f.b(ar,bk,W-ar,D-1,sy,sy+0.08,cu);
  f.b(0,0,W,bk,sy,ty,c);
  if(ar){f.b(0,0,ar,D,sy,sy+0.2,c);f.b(W-ar,0,W-ar+ar,D,sy,sy+0.2,c);}
  const n=Math.max(1,Math.round((W-2*ar)/70));
  for(let i=0;i<n;i++){const a=ar+i*(W-2*ar)/n+1,b=ar+(i+1)*(W-2*ar)/n-1;f.b(a,bk,b,bk+14,sy+0.08,ty-0.04,cu);}
  if(o.pil)o.pil.forEach((p,i)=>f.b(ar+4+i*44,bk+12,ar+44+i*44,bk+22,sy+0.08,sy+0.42,p));
}
function bed(f,o){
  o=o||{};const W=f.W,D=f.D,hh=o.hh||1.0,hd=o.hd||8;
  f.b(0,0,W,hd,0,hh,o.head||0xa49d99);
  f.b(1,hd,W-1,D,0.06,0.3,o.base||0x3d3d3f);
  if(o.legs!==false)[[4,hd+4],[W-6,hd+4],[4,D-6],[W-6,D-6]].forEach(p=>f.b(p[0],p[1],p[0]+2,p[1]+2,0,0.06,0x3a3a3a));
  f.b(2,hd+1,W-2,D-1,0.3,0.52,0xf4f2ec);
  f.b(0,hd+50,W,D+0.6,0.52,0.56,o.duvet||0xf7f7f5);
  f.b(-0.6,D-4,W+0.6,D+0.6,0.3,0.54,o.duvet||0xf7f7f5);
  f.b(5,hd+6,W/2-3,hd+40,0.52,0.64,o.pil||0xffffff);f.b(W/2+3,hd+6,W-5,hd+40,0.52,0.64,o.pil||0xffffff);
  if(o.plaid){f.b(-1,D-60,W+1,D-18,0.3,0.58,o.plaid);f.b(W-45,hd+12,W-12,hd+38,0.56,0.7,o.plaid);}
}
function table(f,o){
  o=o||{};const W=f.W,D=f.D,h=o.h||0.75,t=o.t||0.03,lg=o.leg||0x3a3a3a,lw=o.lw||4,ins=o.ins===undefined?4:o.ins;
  f.b(0,0,W,D,h-t,h,o.top||0xcaa97c);
  [[ins,ins],[W-ins-lw,ins],[ins,D-ins-lw],[W-ins-lw,D-ins-lw]].forEach(p=>f.b(p[0],p[1],p[0]+lw,p[1]+lw,0,h-t,lg));
}
function rtable(cx,cz,r,o){
  o=o||{};const f=AC(cx,cz,2*r,2*r,0),h=o.h||0.75;
  f.c(r,r,r,h-0.03,h,o.top||0xcaa97c,40);f.c(r,r,4,0,h-0.03,o.leg||0x3a3a3a);f.c(r,r,r*0.4,0,0.02,o.leg||0x3a3a3a);return f;
}
function chairF(f,o){
  o=o||{};const W=f.W,D=f.D,c=o.col||0x8b6a4a,lg=o.leg||0x5a4330,sh=o.sh||0.45;
  f.b(0,0,W,D,sh-0.04,sh,c);
  [[0,0],[W-2,0],[0,D-2],[W-2,D-2]].forEach(p=>f.b(p[0],p[1],p[0]+2,p[1]+2,0,sh-0.04,lg));
  f.b(0,0,W,2.5,sh,o.bh||0.86,c);
  if(o.cush)f.b(2,3,W-2,D-2,sh,sh+0.04,o.cush);
}
function chair(cx,cz,ang,o,g){const f=AC(cx,cz,(o&&o.w)||44,(o&&o.d)||46,ang,g);chairF(f,o);return f;}
function stool(cx,cz,o){const f=AC(cx,cz,36,36,0);f.c(18,18,17,(o&&o.h||0.65)-0.04,o&&o.h||0.65,(o&&o.col)||0x8b6a4a);f.c(18,18,2,0,(o&&o.h||0.65)-0.04,0x3a3a3a);f.c(18,18,14,0,0.02,0x3a3a3a);return f;}
function rug(x0,z0,x1,z1,col,col2){
  it('~tapis',()=>{box(X(x0),Z(z0),X(x1),Z(z1),0.001,0.011,M(col),furnGroup);if(col2)box(X(x0)+0.08,Z(z0)+0.08,X(x1)-0.08,Z(z1)-0.08,0.011,0.013,M(col2),furnGroup);});
}
function rrug(cx,cz,r,col,col2){it('~tapis',()=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r/100,r/100,0.01,40),M(col));m.position.set(X(cx),0.006,Z(cz));furnGroup.add(m);if(col2){const n=new THREE.Mesh(new THREE.CylinderGeometry(r/100-0.1,r/100-0.1,0.003,40),M(col2));n.position.set(X(cx),0.012,Z(cz));furnGroup.add(n);}});}
function plant(cx,cz,o){
  o=o||{};const r=o.r||18,h=o.h||1.4,f=AC(cx,cz,2*r,2*r,o.a||0),pot=o.pot||0xe8e2d4,ph=o.ph||Math.min(0.45,r/40),lf=o.leaf||0x4f7a43,lf2=o.leaf2||0x3d6636,k=o.k||'bush';
  f.c(r,r,r,0,ph,pot);f.c(r,r,r-1,ph-0.02,ph,0x4a3a2a);
  if(k==='bush'){const n=o.n||5,rr=rnd(o.seed||3);for(let i=0;i<n;i++){const a=i*2.4,d=r*0.45*rr();f.s(r+Math.cos(a)*d,r+Math.sin(a)*d,ph+(h-ph)*(0.35+0.6*i/n),r*(0.75+0.35*rr()),i%2?lf:lf2,1.1);}}
  if(k==='tree'){f.c(r,r,2,ph,h*0.62,0x6b5238);const rr=rnd(o.seed||5);for(let i=0;i<6;i++){const a=i*1.05;f.s(r+Math.cos(a)*r*0.8,r+Math.sin(a)*r*0.8,h*0.62+(h*0.3)*rr(),r*0.9,i%2?lf:lf2,0.8);}f.s(r,r,h*0.88,r*1.1,lf,0.8);}
  if(k==='tall'){const rr=rnd(o.seed||7);for(let i=0;i<7;i++){const a=i*0.9,d=r*0.5;const m=f.b(r+Math.cos(a)*d-3,r+Math.sin(a)*d-1,r+Math.cos(a)*d+3,r+Math.sin(a)*d+1,ph,ph+(h-ph)*(0.7+0.3*rr()),i%2?lf:lf2);}for(let i=0;i<7;i++){const a=i*0.9+0.4;f.s(r+Math.cos(a)*r*0.7,r+Math.sin(a)*r*0.7,ph+(h-ph)*(0.55+0.4*rr()),r*0.55,i%2?lf:lf2,1.6);}}
  return f;
}
function lampF(cx,cz,o){o=o||{};const f=AC(cx,cz,40,40,0);f.c(20,20,15,0,0.025,o.base||0x2b2b2b);f.c(20,20,1.2,0.025,o.h||1.55,o.base||0x2b2b2b);f.c(20,20,o.r||19,(o.h||1.55)-0.02,(o.h||1.55)+0.3,o.shade||GL(0xf6ecd2),28);return f;}
function lampT(f,u,v,y,o){o=o||{};f.c(u,v,6,y,y+0.02,o.base||0x3a3a3a);f.c(u,v,1,y+0.02,y+0.3,o.base||0x3a3a3a);f.c(u,v,o.r||11,y+0.26,y+0.44,o.shade||GL(0xf3ead4),20);}
function pend(cx,cz,o){o=o||{};const f=AC(cx,cz,60,60,o.a||0,furnTall),y=o.y||1.75,r=o.r||22;f.c(30,30,0.4,y+0.2,H,0x2b2b2b,6);if(o.k==='long'){f.b(30-(o.l||120)/2,30-6,30+(o.l||120)/2,30+6,y,y+0.08,o.col||0x2b2b2b);f.b(30-(o.l||120)/2+2,30-4,30+(o.l||120)/2-2,30+4,y-0.008,y,GL(0xfff3d6));}else{f.c(30,30,r,y,y+0.2,o.col||0x2b2b2b,28);f.c(30,30,r-1.5,y-0.006,y,GL(0xfff3d6),28);}return f;}
function tvF(f,o){o=o||{};const W=f.W,y=o.y0||0,h=o.h||0.72;f.b(0,0,W,4,y,y+h,0x151617);f.b(1.5,4,W-1.5,4.6,y+0.02,y+h-0.02,0x2a2f36);}
function frameArt(f,u0,u1,y0,y1,col,c2){f.b(u0,0,u1,2.5,y0,y1,0x2b2b2b);f.b(u0+2,2.5,u1-2,3,y0+0.03,y1-0.03,col);if(c2)f.b(u0+(u1-u0)*0.3,3,u1-(u1-u0)*0.25,3.3,y0+(y1-y0)*0.3,y1-(y1-y0)*0.25,c2);}
function deskF(f,o){
  o=o||{};const W=f.W,D=f.D,top=M(o.top||0xdcc296),wht=M(0xf4f4f2),h=o.h||0.75;
  f.b(0,0,W,D,h-0.025,h,top);
  [12,W-12].forEach(u=>{f.b(u-3,3,u+3,D-3,0,0.03,wht);f.b(u-3.5,D/2-3.5,u+3.5,D/2+3.5,0.03,h*0.56,wht);f.b(u-2.5,D/2-2.5,u+2.5,D/2+2.5,h*0.56,h-0.03,wht);f.b(u-2.2,4,u+2.2,D-4,h-0.05,h-0.025,wht);});
  f.b(12,D/2-1.8,W-12,D/2+1.8,h-0.08,h-0.04,wht);
  if(o.screen!==false){f.b(W/2-30,8,W/2+30,10,h+0.12,h+0.48,0x151617);f.b(W/2-4,10,W/2+4,16,h,h+0.14,0x3a3a3a);f.b(W/2-22,D-30,W/2+22,D-16,h,h+0.015,0x2b2c2e);}
}
function gamer(cx,cz,ang,g){
  const f=AC(cx,cz,62,62,ang,g),blk=0x222324,red=0xb3262d;
  f.c(31,31,30,0,0.04,blk);f.c(31,31,2.5,0.04,0.46,0x6b6e72);
  f.b(1,1,61,61,0.46,0.56,blk);f.b(13,5,49,57,0.56,0.58,red);
  f.b(1,0,61,9,0.56,1.38,blk);f.b(16,9,46,10,0.7,1.32,red);
  [0,59].forEach(u=>f.b(u,12,u+3,52,0.68,0.72,blk));return f;
}
function bzF(f,o){
  o=o||{};const W=f.W,D=f.D,fab=o.col||0x5f6368,cu=o.cush||0x737880;
  f.b(0,0,W,D,0,0.08,0x2a2a2a);f.b(0,0,W,D,0.08,0.42,fab);f.b(2,22,W-2,D,0.42,0.5,cu);f.b(0,0,W,22,0.42,0.88,fab);
  [4,W/2+1].forEach(u=>f.b(u,22,u+W/2-5,36,0.5,0.82,cu));
}
function dressingF(f,o){
  o=o||{};const W=f.W,D=f.D,ht=o.h||2.05,m=0x4a4644,t=2.5,cw=45,c1=cw,c2=W-cw;
  [0,c1-t,c2,W-t].forEach(u=>f.b(u,0,u+t,D,0,ht,m));
  f.b(0,0,W,D,ht-0.03,ht,m);
  [[0,c1],[c2,W]].forEach(c=>{f.b(c[0],0,c[1],D,0,0.06,m);[0.45,0.8,1.15,1.5,1.85].forEach(y=>f.b(c[0],0,c[1],D,y,y+0.025,m));f.b(c[0]+2,0,c[1]-2,1.5,0.06,ht-0.03,0x8a8580);books(f,c[0]+3,c[1]-3,4,D-6,0.825,0.25,c[0]+11,[0xe6e1d8,0x6b6d70,0x2f3b46,0xc9c3b6,0x8a8a88]);books(f,c[0]+3,c[1]-3,4,D-6,1.175,0.25,c[0]+23,[0xe6e1d8,0x6b6d70,0x2f3b46,0xc9c3b6,0x8a8a88]);});
  [1.15,1.95].forEach(y=>f.b(c1,D/2-1,c2,D/2+1,y,y+0.02,0xb9bcbf));
  const rr=rnd(9);for(let u=c1+4;u<c2-4;u+=5){f.b(u,D/2-20,u+1.2,D/2+20,1.15-0.7-rr()*0.25,1.13,[0x2f3b46,0xe8e2d4,0x6b6d70,0x8b6a4a,0x9db8aa][Math.floor(rr()*5)]);}
  f.b(c2-30,D-2,c2,D,0.05,ht-0.05,0x6b6866);
}
function brimnesF(f){
  const W=f.W,D=f.D,pw=W/3;
  f.b(0,0,W,D-1.5,0,1.9,0xf6f5f1);f.b(2,D-5,W-2,D-1.5,0,0.08,0xe4e2dc);
  for(let i=0;i<3;i++){const a=i*pw+0.4,b=(i+1)*pw-0.4;f.b(a,D-1.5,b,D,0.08,1.86,0xfbfbf9);if(i===1)f.b(a+3,D,b-3,D+0.2,0.2,1.74,0xbfd3dc);const hu=i===0?b-3:a+3;f.b(hu-0.6,D,hu+0.6,D+0.8,0.9,1.15,0x9aa0a6);}
}
function metodF(f,o){
  o=o||{};const W=f.W,D=f.D,ash=0xd9c9ab;
  f.b(1,0,W-1,D-2,0,0.08,0x3a3a3a);f.b(0,0,W,D-1.5,0.08,0.88,0xffffff);f.b(0,0,W,D+1.2,0.88,0.91,o.top||0x3e4044);
  for(let u=0;u<2;u++)for(let d=0;d<2;d++){const a=u*W/2+0.3,b=(u+1)*W/2-0.3,y0=0.084+d*0.4,y1=y0+0.392;f.b(a,D-1.5,b,D,y0,y1,ash);f.b((a+b)/2-8,D,(a+b)/2+8,D+0.8,y1-0.06,y1-0.045,0x9aa0a6);}
}
function metodHigh(f){const W=f.W,D=f.D,ash=0xd9c9ab;f.b(0,0,W,D-1.5,1.45,2.25,0xffffff);for(let i=0;i<4;i++){const a=i*W/4+0.3,b=(i+1)*W/4-0.3,hu=i%2?a+2.5:b-2.5;f.b(a,D-1.5,b,D,1.452,2.248,ash);f.b(hu-0.4,D,hu+0.4,D+0.8,1.47,1.62,0x9aa0a6);}}
function kitchenMetod(appl){
  it('METOD ×2 (tiroirs)',()=>{const f=A(489.9,145.2,160,39.2,'W');metodF(f);if(appl!==false){f.b(6,4,55,38,0.91,1.2,0x2b2c2e);f.b(125,4,152,30,0.91,1.25,0x1d1d1f);f.c(100,14,7,0.91,1.12,0xb9bcbf);}});
  it('METOD hauts',()=>{const f=A(491.4,145.2,160,37,'W',furnTall);metodHigh(f);});
}
function vase(f,u,v,y,c,h){f.c(u,v,4,y,y+(h||0.22),c||0xe8e2d4,14);f.s(u,v,y+(h||0.22)+0.06,7,0x6f8f5a,1);}
function pface2(hor,c,a,b,t,side,y0,y1,mat){const o=side*(t/2+0.017);if(hor)box(X(a),Z(c)+o-0.004,X(b),Z(c)+o+0.004,y0,y1,M(mat),paintGroup);else box(X(c)+o-0.004,Z(a),X(c)+o+0.004,Z(b),y0,y1,M(mat),paintGroup);}
const WALLS={
  ch2N:[true,15,523.4,713.2,E,1,[[640,690,'win']]],ch2W:[false,520,21.8,251.6,I,1,[]],ch2S:[true,255,523.4,713.2,I,-1,[[525,585,'door']]],ch2E:[false,720,21.8,251.6,E,-1,[[160,220,'pf']]],
  ch1N:[true,497,440.4,713.2,I,1,[[445,490,'door']]],ch1W:[false,437,500.4,698.2,I,1,[]],ch1S:[true,705,440.4,713.2,E,-1,[]],ch1E:[false,720,500.4,698.2,E,-1,[[515,575,'pf']]],
  sejS:[true,497,437,713.2,I,-1,[[445,490,'door']]],sejN:[true,255,520,713.2,I,1,[[525,585,'door']]],sejW1:[false,300,238.8,350,E,1,[]],sejW2:[false,300,350,412,I,1,[]],
  entW:[false,157,356.8,561.6,E,1,[[415,470,'door']]],entE:[false,300,412,561.6,I,-1,[[412,516,'open']]],entS:[true,565,163.8,296.6,I,-1,[[175,215,'door'],[245,290,'door']]],
  sdbN:[true,565,235.4,433.6,I,1,[[245,290,'door']]],wcN:[true,565,163.8,228.6,I,1,[[175,215,'door']]]
};
function paintW(k,col){const w=WALLS[k];paintWall(w[0],w[1],w[2],w[3],w[4],w[5],w[6].filter(o=>o[2]!=='open'),col);}
function texWall(k,mat,y1){const w=WALLS[k];let cur=w[2];w[6].forEach(o=>{if(o[0]>cur)pface2(w[0],w[1],cur,o[0],w[4],w[5],0,y1||H,mat);if(o[2]==='win')pface2(w[0],w[1],o[0],o[1],w[4],w[5],0,0.9,mat);cur=o[1];});if(w[3]>cur)pface2(w[0],w[1],cur,w[3],w[4],w[5],0,y1||H,mat);}
function sol(x0,z0,x1,z1,name,y){
  const t=tex[name],w=(x1-x0)/S,d=(z1-z0)/S,tt=t.t.clone();tt.needsUpdate=true;tt.repeat.set(w/t.m,d/(t.mz||t.m));
  if(t.rot){tt.center.set(0.5,0.5);tt.rotation=t.rot;}
  box(X(x0),Z(z0),X(x1),Z(z1),y?y[0]:-0.06,y?y[1]:0,new THREE.MeshLambertMaterial({map:tt}),floorGroup);
}
function sols(o){
  const R={sejour:[[360,15,520,232],[300,232,520,255],[300,255,720,497],[300,497,437,565]],entree:[[157,350,300,565]],sdb:[[232,565,437,705]],wc:[[157,565,232,705]],ch1:[[437,497,720,705]],ch2:[[520,15,720,255]],balcon:[[726.8,15,819,705]]};
  Object.keys(o).forEach(k=>R[k].forEach(r=>k==='balcon'?sol(r[0],r[1],r[2],r[3],o[k],[0,0.008]):sol(r[0],r[1],r[2],r[3],o[k])));
}
function hexTex(cols,joint,seed){
  const r=21.33,w=256,h=Math.round(Math.sqrt(3)*r*4);
  return mk((g)=>{g.fillStyle=joint;g.fillRect(0,0,w,h);const rr=rnd(seed),dy=Math.sqrt(3)*r;
    for(let i=-1;i<=8;i++)for(let j=-1;j<=4;j++){const cx=i*1.5*r,cy=j*dy+(i%2?dy/2:0);g.fillStyle=cols[((((i%8)+8)%8)*5+(((j%4)+4)%4)*3+(((i%8)+8)%8)*(((j%4)+4)%4)+seed)%cols.length];g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g.lineTo(cx+(r-1.6)*Math.cos(a),cy+(r-1.6)*Math.sin(a));}g.closePath();g.fill();}
  },w,h);
}
function noiseTex(base,cols,n,sz,seed,w,h){return mk((g,W,Hh)=>{g.fillStyle=base;g.fillRect(0,0,W,Hh);const r=rnd(seed);for(let i=0;i<n;i++){g.fillStyle=cols[Math.floor(r()*cols.length)];const s=sz*(0.4+r());g.fillRect(r()*W,r()*Hh,s,s*(0.6+r()*0.8));}},w,h);}
function zonesBase(){
  PASS=[];ZONES=[];
  zone('Porte d\'entrée (débattement)',163.8,415,218,470);zone('Porte WC (débattement)',176,525,216,561.6);zone('Porte SDB (débattement)',247,522,290,561.6);
  zone('Porte chambre 1 (débattement)',445,500.4,490,545);zone('Porte chambre 2 (débattement)',525,195,585,251.6);
  zone('Porte-fenêtre ch. 2 (intérieur)',658.8,160,713.2,220);zone('Porte-fenêtre ch. 2 (balcon)',726.8,160,781.2,220);
  zone('Porte-fenêtre ch. 1 (intérieur)',658.8,515,713.2,575);zone('Porte-fenêtre ch. 1 (balcon)',726.8,515,781.2,575);
  zone('Façades du placard couloir',300,480,437,520.8);zone('Portes du placard d\'entrée',172,412,297,446);zone('Lave-vaisselle ouvert',456,73,515,115);
  zone('Radiateur séjour (devant)',681,478,711,493.6);zone('Radiateur ch. 1 (devant)',664,500.4,694,515);zone('Radiateur ch. 2 (devant)',699,26,713.2,53);
}
function slant(f,u0,y0,u1,y1,v0,v1,t,c){const du=(u1-u0)/100,dy=y1-y0,m=new THREE.Mesh(new THREE.BoxGeometry(Math.hypot(du,dy),t,Math.abs(v1-v0)/100),M(c));m.position.set(((u0+u1)/2-f.W/2)/100,(y0+y1)/2,((v0+v1)/2-f.D/2)/100);m.rotation.z=Math.atan2(dy,du);f.g.add(m);return m;}
function plankTex(cols,joint,rows,seed,grain){return mk(g=>{const rh=256/rows,r=rnd(seed);for(let k=0;k<rows;k++){const off=Math.floor(r()*256);g.fillStyle=cols[k%cols.length];g.fillRect(0,k*rh,256,rh);g.fillStyle=cols[(k+2)%cols.length];g.fillRect(off,k*rh,256-off,rh);g.strokeStyle=grain||'rgba(90,60,30,0.22)';g.lineWidth=1;for(let i=0;i<3;i++){const y=k*rh+rh*(0.2+0.3*i);g.beginPath();g.moveTo(0,y);g.lineTo(256,y+(i%2?2:-2));g.stroke();}g.strokeStyle=joint;g.lineWidth=2;g.beginPath();g.moveTo(off,k*rh);g.lineTo(off,(k+1)*rh);g.moveTo(0,k*rh);g.lineTo(256,k*rh);g.stroke();}});}
function sqTex(n,cols,joint,jw,seed,gloss){return mk(g=>{const s=256/n,r=rnd(seed);g.fillStyle=joint;g.fillRect(0,0,256,256);for(let i=0;i<n;i++)for(let j=0;j<n;j++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(i*s+jw/2,j*s+jw/2,s-jw,s-jw);if(gloss){g.fillStyle='rgba(255,255,255,0.13)';g.fillRect(i*s+jw/2+2,j*s+jw/2+2,(s-jw)*0.45,(s-jw)*0.3);}}});}
function A3(x0,z0,W,D,dir){return {g:A(x0,z0,W,D,dir,furnGroup),w:A(x0,z0,W,D,dir,furnWall),t:A(x0,z0,W,D,dir,furnTall),W,D};}
function slantV(f,v0,y0,v1,y1,u0,u1,t,c){const dv=(v1-v0)/100,dy=y1-y0,m=new THREE.Mesh(new THREE.BoxGeometry(Math.abs(u1-u0)/100,t,Math.hypot(dv,dy)),M(c));m.position.set(((u0+u1)/2-f.W/2)/100,(y0+y1)/2,((v0+v1)/2-f.D/2)/100);m.rotation.x=-Math.atan2(dy,dv);f.g.add(m);return m;}
function faceTo(cx,cz,tx,tz){return Math.atan2(tx-cx,tz-cz);}
function chairsAround(cx,cz,r,n,a0,o){for(let k=0;k<n;k++){const a=a0+k*2*Math.PI/n,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;it('Chaise '+(k+1)+(o&&o.tag?' '+o.tag:''),()=>chair(x,z,faceTo(x,z,cx,cz),o));}}
function herringTex(cols,joint,seed){return mk(g=>{const r=rnd(seed);g.fillStyle=joint;g.fillRect(0,0,256,256);const cw=32;for(let c=0;c<8;c++){g.save();g.beginPath();g.rect(c*cw,0,cw,256);g.clip();const dir=c%2?1:-1;for(let k=-12;k<20;k++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.beginPath();const y=k*16;g.moveTo(c*cw,y);g.lineTo(c*cw+cw,y+dir*cw);g.lineTo(c*cw+cw,y+dir*cw+14.5);g.lineTo(c*cw,y+14.5);g.closePath();g.fill();}g.restore();}g.fillStyle=joint;for(let c=0;c<=8;c++)g.fillRect(c*cw-0.5,0,1,256);});}
function rugR(cx,cz,w,d,ang,col,col2){it('~tapis',()=>{const f=AC(cx,cz,w,d,ang);f.b(0,0,w,d,0.001,0.011,col);if(col2)f.b(8,8,w-8,d-8,0.011,0.013,col2);});}
function diamondTex(n,colsA,colsB,joint,jw,seed){return mk(g=>{const s=256/n,h=s/2;g.fillStyle=joint;g.fillRect(0,0,256,256);const d=(cx,cy,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(cx,cy-h+jw);g.lineTo(cx+h-jw,cy);g.lineTo(cx,cy+h-jw);g.lineTo(cx-h+jw,cy);g.closePath();g.fill();};for(let i=-1;i<=n;i++)for(let j=-1;j<=n;j++){const a=((i%n)+n)%n,b=((j%n)+n)%n;d(i*s,j*s,colsA[(a*3+b*5+seed)%colsA.length]);d(i*s+h,j*s+h,colsB[(a*5+b*3+seed)%colsB.length]);}});}
function stripeTex(w,cols,joint,seed){return mk(g=>{const n=Math.round(512/w),r=rnd(seed);for(let k=0;k<n;k++){g.fillStyle=cols[k%cols.length];g.beginPath();g.moveTo(k*w-256,0);g.lineTo(k*w+w-256,0);g.lineTo(k*w+w,256);g.lineTo(k*w,256);g.closePath();g.fill();g.beginPath();g.moveTo(k*w,0);g.lineTo(k*w+w,0);g.lineTo(k*w+w+256,256);g.lineTo(k*w+256,256);g.closePath();g.fill();}g.strokeStyle=joint;g.lineWidth=1.5;for(let k=0;k<=n;k++){[0,256].forEach(o=>{g.beginPath();g.moveTo(k*w-256+o,0);g.lineTo(k*w+o,256);g.stroke();});}g.strokeStyle='rgba(60,40,20,0.18)';g.lineWidth=1;for(let k=0;k<n;k++)for(let i=0;i<2;i++){const t=k*w+w*(0.3+0.4*i);g.beginPath();g.moveTo(t-256,0);g.lineTo(t,256);g.moveTo(t,0);g.lineTo(t+256,256);g.stroke();}});}
