const M=v=>v*S;
const MT={};
function mt(c){if(c&&c.isMaterial)return c;if(!MT[c])MT[c]=L(c);return MT[c];}
function glow(c,k){return new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:k===undefined?0.55:k});}
function clear(c,o){return new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:o});}
let IT=null;
function item(n,grp){const g=new THREE.Group();g.userData.n=n;(grp||furnGroup).add(g);IT=g;return g;}
function b(x0,z0,x1,z1,y0,y1,c){if(x1<x0){const q=x0;x0=x1;x1=q;}if(z1<z0){const q=z0;z0=z1;z1=q;}box(X(x0),Z(z0),X(x1),Z(z1),y0,y1,mt(c),IT);}
function cy(cx,cz,r,y0,y1,c,rb,sg){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,rb===undefined?r:rb,y1-y0,sg||28),mt(c));m.position.set(X(cx),(y0+y1)/2,Z(cz));IT.add(m);return m;}
function sp(cx,y,cz,r,c,sy,sx,sz){const m=new THREE.Mesh(new THREE.SphereGeometry(r,22,16),mt(c));m.position.set(X(cx),y,Z(cz));m.scale.set(sx||1,sy||1,sz||sx||1);IT.add(m);return m;}
function tor(cx,y,cz,R,r,c,arc){const m=new THREE.Mesh(new THREE.TorusGeometry(R,r,10,32,arc||6.2832),mt(c));m.rotation.x=Math.PI/2;m.position.set(X(cx),y,Z(cz));IT.add(m);return m;}
const DIR={N:0,S:Math.PI,E:-Math.PI/2,W:Math.PI/2};
function rot(g,px,pz,a){const p=new THREE.Vector3(X(px),0,Z(pz));g.children.forEach(ch=>ch.position.sub(p));g.position.copy(p);g.rotation.y=a;}
function loc(n,grp,cx,cz,dir,fn){const g=item(n,grp);fn(cx,cz);rot(g,cx,cz,typeof dir==='number'?dir:DIR[dir]);return g;}
function sofa(n,cx,cz,w,d,dir,o){
  o=o||{};const W=M(w)/2,D=M(d)/2,ar=M(o.arm===undefined?0.18:o.arm),bk=M(o.bk||0.2),sh=o.seat||0.42,bh=o.back||0.8,ah=o.armH||0.6,lg=o.leg===undefined?0.08:o.leg;
  return loc(n,furnGroup,cx,cz,dir,(x,z)=>{
    if(lg>0){[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>b(x+q[0]*(W-3),z+q[1]*(D-3),x+q[0]*(W-3)-q[0]*2,z+q[1]*(D-3)-q[1]*2,0,lg,o.lc||0x3a3a3a));}
    b(x-W,z-D,x+W,z+D,lg,sh-0.08,o.c);
    b(x-W+ar,z-D+bk,x+W-ar,z+D,sh-0.08,sh,o.k||o.c);
    b(x-W,z-D,x+W,z-D+bk,sh-0.08,bh,o.c);
    if(ar>0){b(x-W,z-D,x-W+ar,z+D,sh-0.08,ah,o.c);b(x+W-ar,z-D,x+W,z+D,sh-0.08,ah,o.c);}
    if(o.pil)o.pil.forEach((p,i)=>{const n2=o.pil.length,s=(2*W-2*ar)/n2,a=x-W+ar+i*s;b(a+2,z-D+bk,a+s-2,z-D+bk+5,sh,sh+0.32,p);});
  });
}
function chair(n,cx,cz,dir,o){
  o=o||{};const h=M(o.w||0.45)/2,sh=o.seat||0.45,bh=o.back||0.85,t=1.8;
  return loc(n,furnGroup,cx,cz,dir,(x,z)=>{
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>b(x+q[0]*h,z+q[1]*h,x+q[0]*(h-t),z+q[1]*(h-t),0,q[1]<0&&o.round?bh-0.03:sh-0.04,o.l||o.c));
    b(x-h,z-h,x+h,z+h,sh-0.04,sh,o.s||o.c);
    if(o.round){const m=tor(x,bh-0.02,z,h/S*0.97,0.016,o.c,Math.PI);m.rotation.x=-Math.PI/2;}else if(o.back!==0)b(x-h,z-h,x+h,z-h+2,sh,bh,o.bc||o.c);
  });
}
function stool(n,cx,cz,r,h,c,lc){item(n);cy(cx,cz,r,h-0.05,h,c);cy(cx,cz,0.025,0.02,h-0.05,lc||0x2a2a2a);cy(cx,cz,r*0.8,0,0.02,lc||0x2a2a2a);}
function table(n,x0,z0,x1,z1,h,top,leg,o){
  o=o||{};item(n);const t=o.t||0.035,lw=o.lw||3,ins=o.ins===undefined?3:o.ins;b(x0,z0,x1,z1,h-t,h,top);
  if(o.trestle){[x0+ins+6,x1-ins-6].forEach(x=>{b(x-lw/2,z0+ins,x+lw/2,z1-ins,h-t-0.04,h-t,leg);b(x-lw/2,(z0+z1)/2-lw/2,x+lw/2,(z0+z1)/2+lw/2,0.05,h-t,leg);b(x-lw/2,z0+ins,x+lw/2,z1-ins,0,0.05,leg);});return;}
  [[x0+ins,z0+ins],[x1-ins-lw,z0+ins],[x0+ins,z1-ins-lw],[x1-ins-lw,z1-ins-lw]].forEach(p=>b(p[0],p[1],p[0]+lw,p[1]+lw,0,h-t,leg));
}
function rtable(n,cx,cz,r,h,top,leg,o){o=o||{};item(n);cy(cx,cz,r,h-(o.t||0.035),h,top,undefined,40);if(o.tulip){cy(cx,cz,0.06,0.04,h-0.035,leg,0.1);cy(cx,cz,r*0.5,0,0.04,leg,r*0.55);}else{cy(cx,cz,o.pr||0.05,0,h-0.035,leg);cy(cx,cz,o.br||r*0.42,0,0.03,leg);}}
function bed(n,cx,cz,w,l,dir,o){
  o=o||{};const W=M(w)/2,Lh=M(l)/2,fh=o.fh===undefined?0.3:o.fh,mh=fh+(o.mh||0.22),fr=M(o.fr||0.04);
  return loc(n,furnGroup,cx,cz,dir,(x,z)=>{
    b(x-W-fr,z-Lh,x+W+fr,z+Lh+fr,o.leg===undefined?0.04:o.leg,fh,o.frame);
    if(o.leg!==0)[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>b(x+q[0]*(W+fr-3),z+q[1]*(Lh-3),x+q[0]*(W+fr-5),z+q[1]*(Lh-5),0,o.leg===undefined?0.04:o.leg,o.lc||o.frame));
    b(x-W+1,z-Lh+1,x+W-1,z+Lh-1,fh,mh,0xf4f2ec);
    b(x-W,z-Lh+M(0.55),x+W,z+Lh+0.6,mh,mh+0.04,o.duvet||0xf7f7f5);
    b(x-W-0.6,z+Lh-3,x+W+0.6,z+Lh+0.6,fh+0.02,mh+0.04,o.duvet||0xf7f7f5);
    if(o.plaid){b(x-W-1,z+Lh-M(0.6),x+W+1,z+Lh-M(0.15),fh+0.03,mh+0.06,o.plaid);}
    b(x-W+4,z-Lh+M(0.1),x-2,z-Lh+M(0.46),mh,mh+0.12,o.pil||0xffffff);b(x+2,z-Lh+M(0.1),x+W-4,z-Lh+M(0.46),mh,mh+0.12,o.pil||0xffffff);
    if(o.pil2){b(x-W+8,z-Lh+M(0.4),x-4,z-Lh+M(0.52),mh+0.02,mh+0.3,o.pil2);b(x+4,z-Lh+M(0.4),x+W-8,z-Lh+M(0.52),mh+0.02,mh+0.3,o.pil2);}
    if(o.hb)b(x-W-fr-(o.hbx||0),z-Lh-M(o.hbd||0.08),x+W+fr+(o.hbx||0),z-Lh,0,o.hb,o.hbc||o.frame);
  });
}
function shelf(n,grp,x0,z0,x1,z1,h,lv,c,bk,o){
  o=o||{};item(n,grp);const alongX=(x1-x0)>=(z1-z0),t=o.t||1.4,nup=o.up||Math.max(2,Math.round((alongX?x1-x0:z1-z0)/M(0.8))+1);
  for(let i=0;i<nup;i++){const a=(alongX?x0:z0)+i*((alongX?x1-x0:z1-z0)-t)/(nup-1);if(alongX)b(a,z0,a+t,z1,0,h,o.uc||c);else b(x0,a,x1,a+t,0,h,o.uc||c);}
  lv.forEach(y=>b(x0,z0,x1,z1,y,y+(o.st||0.025),c));
  if(o.back)alongX?b(x0,o.backSide>0?z1-0.8:z0,x1,o.backSide>0?z1:z0+0.8,0,h,o.back):b(o.backSide>0?x1-0.8:x0,z0,o.backSide>0?x1:x0+0.8,z1,0,h,o.back);
  if(bk){const r=rnd(o.seed||11);lv.slice(0,-1).forEach((y,k)=>{if(o.skip&&o.skip.indexOf(k)>=0)return;const nxt=lv[k+1]-y-0.06;const len=alongX?x1-x0:z1-z0;let a=3;while(a<len-6){const w=1.6+r()*2.2,hh=Math.min(nxt,0.18+r()*0.14),col=bk[Math.floor(r()*bk.length)];if(r()<0.18){a+=5+r()*6;continue;}
    if(alongX)b(x0+a,z0+2,x0+a+w,z1-2,y+0.025,y+0.025+hh,col);else b(x0+2,z0+a,x1-2,z0+a+w,y+0.025,y+0.025+hh,col);a+=w+0.3;}});}
}
function cab(n,grp,x0,z0,x1,z1,y0,y1,c,o){
  o=o||{};item(n,grp);b(x0,z0,x1,z1,y0,y1,c);const f=o.f||'S',nd=o.nd||2,fc=o.fc||c,hc=o.hc===undefined?0x9aa0a6:o.hc,pl=o.plinth||0;
  if(pl)b(x0+(f==='W'?2:0),z0+(f==='N'?2:0),x1-(f==='E'?2:0),z1-(f==='S'?2:0),y0,y0+pl,o.pc||0x2a2a2a);
  const alongX=f==='N'||f==='S',a0=alongX?x0:z0,a1=alongX?x1:z1,s=(a1-a0)/nd,rows=o.rows||[[y0+pl+0.005,y1-0.005]];
  for(let i=0;i<nd;i++)rows.forEach((rw,j)=>{const p=a0+i*s+0.35,q=a0+(i+1)*s-0.35,col=Array.isArray(fc)?fc[(i+j)%fc.length]:fc;
    if(f==='S')b(p,z1,q,z1+0.8,rw[0],rw[1],col);if(f==='N')b(p,z0-0.8,q,z0,rw[0],rw[1],col);if(f==='E')b(x1,p,x1+0.8,q,rw[0],rw[1],col);if(f==='W')b(x0-0.8,p,x0,q,rw[0],rw[1],col);
    if(hc!==null){const hy=o.hy||Math.min(rw[1]-0.06,rw[0]+0.5*(rw[1]-rw[0])),m=(i%2?p+2.5:q-2.5),hh=o.hh||0.12;if(o.knob){if(f==='S')cy(m,z1+1.3,0.012,hy-0.012,hy+0.012,hc);}else{
    if(f==='S')b(m-0.5,z1+0.8,m+0.5,z1+1.6,hy-hh/2,hy+hh/2,hc);if(f==='N')b(m-0.5,z0-1.6,m+0.5,z0-0.8,hy-hh/2,hy+hh/2,hc);if(f==='E')b(x1+0.8,m-0.5,x1+1.6,m+0.5,hy-hh/2,hy+hh/2,hc);if(f==='W')b(x0-1.6,m-0.5,x0-0.8,m+0.5,hy-hh/2,hy+hh/2,hc);}}
  });
}
function plant(n,cx,cz,o){
  o=o||{};const g=item(n,o.grp||furnGroup),pr=o.r||0.18,ph=o.h||0.35,Hh=o.H||1.0,lc=o.lc||0x4f7f3f,k=o.k||'round',r=rnd(o.seed||Math.round(cx*7+cz));
  if(o.pot!==false){cy(cx,cz,pr,o.y||0,(o.y||0)+ph,o.pc||0xc77b4a,pr*(o.taper||0.82));cy(cx,cz,pr*0.92,(o.y||0)+ph-0.02,(o.y||0)+ph+0.005,0x3b2a1e);}
  const y0=(o.y||0)+ph;
  if(k==='round'){for(let i=0;i<7;i++)sp(cx+(r()-0.5)*M(pr*1.3),y0+(Hh-ph)*(0.35+r()*0.5),cz+(r()-0.5)*M(pr*1.3),pr*(0.7+r()*0.5),i%2?lc:o.lc2||lc);}
  if(k==='tall'){cy(cx,cz,0.015,y0,(o.y||0)+Hh*0.9,0x5a4330);for(let i=0;i<9;i++){const yy=y0+(Hh-ph)*(0.3+0.7*i/9);sp(cx+(r()-0.5)*M(0.4),yy,cz+(r()-0.5)*M(0.4),0.09+r()*0.08,i%2?lc:o.lc2||lc,1.6);}}
  if(k==='olive'){cy(cx,cz,0.03,y0,(o.y||0)+Hh*0.6,0x6b5a45,0.05);for(let i=0;i<8;i++)sp(cx+(r()-0.5)*M(0.55),(o.y||0)+Hh*(0.62+r()*0.3),cz+(r()-0.5)*M(0.55),0.16+r()*0.1,i%2?lc:o.lc2||lc,0.75);}
  if(k==='palm'){for(let i=0;i<9;i++){const a=i/9*6.283,len=0.35+r()*0.3;const m=sp(cx+Math.cos(a)*M(len*0.55),y0+(Hh-ph)*(0.5+r()*0.4),cz+Math.sin(a)*M(len*0.55),len*0.55,i%2?lc:o.lc2||lc,0.18,1);m.rotation.y=-a;m.rotation.z=0.5;}}
  if(k==='cactus'){cy(cx,cz,pr*0.45,y0,(o.y||0)+Hh,lc,pr*0.5);cy(cx+M(pr*0.55),cz,pr*0.22,y0+(Hh-ph)*0.35,y0+(Hh-ph)*0.75,lc);}
  if(k==='bamboo'){for(let i=0;i<7;i++){const dx=(r()-0.5)*M(pr*1.4),dz=(r()-0.5)*M(pr*1.4);cy(cx+dx,cz+dz,0.012,y0,(o.y||0)+Hh*(0.8+r()*0.2),0x8a9a4a);sp(cx+dx,(o.y||0)+Hh*(0.75+r()*0.2),cz+dz,0.12,lc,2.2,0.8);}}
  if(k==='pine'){const q=Hh/1.6;cy(cx,cz,0.035*q+0.005,y0,(o.y||0)+Hh*0.7,0x4a3a2a,0.05*q+0.006);[[0.25,0.45,0.2],[-0.2,0.62,0.16],[0.12,0.85,0.14],[-0.05,0.98,0.12]].forEach(p=>sp(cx+M(p[0]*q),(o.y||0)+Hh*p[1],cz+M(p[0]*0.6*q),p[2]*q,lc,0.5,1.4));}
  if(k==='trail'){for(let i=0;i<8;i++){const a=i/8*6.283;sp(cx+Math.cos(a)*M(pr*0.9),y0-0.05-r()*0.25,cz+Math.sin(a)*M(pr*0.9),0.06,lc,2.4);}sp(cx,y0+0.05,cz,pr*0.9,lc,0.6);}
  return g;
}
function pendant(n,cx,cz,y,o){
  o=o||{};item(n,furnTall);const k=o.k||'globe',r=o.r||0.2,c=o.c||0xf3ead4,top=y+(k==='globe'||k==='lantern'?r*(o.sy||1):(o.hh||0.25));
  cy(cx,cz,0.004,top,H,o.cord||0x222222);cy(cx,cz,0.04,H-0.02,H,o.cord||0x222222);
  if(k==='globe')sp(cx,y,cz,r,glow(c,o.e),o.sy||1);
  if(k==='lantern'){sp(cx,y,cz,r,glow(c,o.e),o.sy||1.3);if(o.rings)for(let i=-2;i<=2;i++)tor(cx,y+i*r*0.4,cz,r*Math.sqrt(1-Math.pow(i*0.3,2))*1.01,0.004,0xd8ccb0);}
  if(k==='cone'){cy(cx,cz,o.rt||0.03,y,top,c,r,32);cy(cx,cz,r*0.9,y-0.01,y,glow(0xfff4d8,0.9));}
  if(k==='drum'){cy(cx,cz,r,y,top,glow(c,o.e===undefined?0.35:o.e),r,32);}
  if(k==='dome'){const m=new THREE.Mesh(new THREE.SphereGeometry(r,24,12,0,6.2832,0,Math.PI/2),mt(c));m.position.set(X(cx),y,Z(cz));IT.add(m);cy(cx,cz,r*0.95,y-0.005,y,glow(0xfff1d0,0.9));}
  if(k==='tiers'){[0,1,2].forEach(i=>cy(cx,cz,r*(1-i*0.22),y+i*0.07,y+i*0.07+0.05,c,r*(1.1-i*0.22)));}
}
function flamp(n,cx,cz,h,o){
  o=o||{};item(n,o.grp||furnWall);const c=o.c||0xf3ead4,k=o.k||'cone',r=o.r||0.2;
  cy(cx,cz,o.br||0.14,0,0.025,o.lc||0x2a2a2a);cy(cx,cz,0.012,0.025,h-(k==='globe'?r:0.2),o.lc||0x2a2a2a);
  if(k==='cone')cy(cx,cz,r*0.65,h-0.28,h,glow(c,0.35),r);
  if(k==='globe')sp(cx,h-r,cz,r,glow(c,0.6));
  if(k==='lantern')sp(cx,h-r*1.3,cz,r,glow(c,0.6),1.3);
  if(k==='arc'){const dx=o.dx||0,dz=o.dz||0;b(cx,cz-0.6,cx+dx,cz+0.6+dz,h-0.02,h,o.lc||0x2a2a2a);const m=new THREE.Mesh(new THREE.SphereGeometry(r,22,12,0,6.2832,0,Math.PI/2),mt(c));m.position.set(X(cx+dx),h-0.25,Z(cz+dz));IT.add(m);cy(cx+dx,cz+dz,r*0.95,h-0.255,h-0.25,glow(0xfff1d0,0.9));}
}
function tlamp(n,cx,cz,y,o){o=o||{};item(n,o.grp||furnGroup);const c=o.c||0xf3ead4,r=o.r||0.1;if(o.k==='globe'){cy(cx,cz,r*0.5,y,y+0.08,o.bc||0xb08a4a);sp(cx,y+0.08+r,cz,r,glow(c,0.6));return;}if(o.k==='mush'){cy(cx,cz,0.02,y,y+(o.h||0.3)-0.05,o.bc||c);const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,10,0,6.2832,0,Math.PI/2),glow(c,0.45));m.position.set(X(cx),y+(o.h||0.3)-0.06,Z(cz));IT.add(m);cy(cx,cz,r*0.45,y,y+0.02,o.bc||c);return;}
  cy(cx,cz,r*0.6,y,y+0.03,o.bc||0x3a3a3a);cy(cx,cz,0.012,y+0.03,y+(o.h||0.4)-0.15,o.bc||0x3a3a3a);cy(cx,cz,r*0.75,y+(o.h||0.4)-0.17,y+(o.h||0.4),glow(c,0.35),r);}
function rug(n,x0,z0,x1,z1,c,o){o=o||{};const g=item(n,furnGroup);g.userData.rug=1;const mat=o.tex?tm(o.tex,(x1-x0)/S,(z1-z0)/S):c;b(x0,z0,x1,z1,0,o.h||0.012,mat);if(o.border)b(x0+M(o.bw||0.06),z0+M(o.bw||0.06),x1-M(o.bw||0.06),z1-M(o.bw||0.06),o.h||0.012,(o.h||0.012)+0.002,o.border);return g;}
function rrug(n,cx,cz,r,c,o){o=o||{};const g=item(n,furnGroup);g.userData.rug=1;cy(cx,cz,r,0,o.h||0.014,c,undefined,48);if(o.ring)o.ring.forEach((q,i)=>cy(cx,cz,q[0],(o.h||0.014),(o.h||0.014)+0.002*(i+1),q[1],undefined,48));return g;}
function curtain(n,hor,c,a,b0,t,side,col,op,o){o=o||{};item(n,tallGroup);const off=side*(t/2+0.02+(o.off||0)),m=clear(col,op===undefined?0.92:op),y1=o.y1||2.35,f=o.folds||Math.max(2,Math.round((b0-a)/5));for(let i=0;i<f;i++){const p=a+i*(b0-a)/f,q=a+(i+1)*(b0-a)/f,d=i%2?0.025:0.045;if(hor)box(X(p),Z(c)+off-(side>0?0:d),X(q),Z(c)+off+(side>0?d:0),o.y0||0.02,y1,m,IT);else box(X(c)+off-(side>0?0:d),Z(p),X(c)+off+(side>0?d:0),Z(q),o.y0||0.02,y1,m,IT);}
  if(o.rod!==false){if(hor)box(X(o.ra||a)-0.05,Z(c)+off-0.01,X(o.rb||b0)+0.05,Z(c)+off+0.01+(side>0?0.05:0),y1,y1+0.02,mt(o.rc||0x2a2a2a),IT);else box(X(c)+off-0.01-(side>0?0:0.05),Z(o.ra||a)-0.05,X(c)+off+0.01+(side>0?0.05:0),Z(o.rb||b0)+0.05,y1,y1+0.02,mt(o.rc||0x2a2a2a),IT);}}
function books(x0,z0,x1,z1,y,hmax,cols,seed){const r=rnd(seed||5),alongX=(x1-x0)>=(z1-z0),len=alongX?x1-x0:z1-z0;let a=1;while(a<len-2){const w=1.4+r()*2,hh=hmax*(0.65+r()*0.35),col=cols[Math.floor(r()*cols.length)];if(alongX)b(x0+a,z0,x0+a+w,z1,y,y+hh,col);else b(x0,z0+a,x1,z0+a+w,y,y+hh,col);a+=w+0.25;}}
function pf2(hor,c,a,b0,t,side,y0,y1,mat,off){if(b0-a<=0.01||y1-y0<=0.001)return;const o=side*(t/2+(off||0.017)),m=typeof mat==='function'?mat((b0-a)/S,y1-y0,a,y0):mt(mat);if(hor)box(X(a),Z(c)+o-0.004,X(b0),Z(c)+o+0.004,y0,y1,m,paintGroup);else box(X(c)+o-0.004,Z(a),X(c)+o+0.004,Z(b0),y0,y1,m,paintGroup);}
function pw(wd,mat,y0,y1,off){const hor=wd[0],c=wd[1],a0=wd[2],a1=wd[3],t=wd[4],side=wd[5],ops=wd[6]||[];y0=y0||0;y1=y1===undefined?H:y1;let cur=a0;ops.forEach(o=>{pf2(hor,c,cur,o[0],t,side,y0,y1,mat,off);const top=o[2]==='pf'?2.2:2.1;if(o[2]==='win')pf2(hor,c,o[0],o[1],t,side,y0,Math.min(y1,0.9),mat,off);pf2(hor,c,o[0],o[1],t,side,Math.max(y0,top),y1,mat,off);cur=o[1];});pf2(hor,c,cur,a1,t,side,y0,y1,mat,off);}
const WL={
 sej:{n:[true,255,516.6,713.2,I,1,[[525,585,'door']]],e:[false,720,258.4,493.6,E,-1,[[275,455,'pf']]],s:[true,497,437,713.2,I,-1,[[445,490,'door']]],s2:[false,437,497,520.8,I,-1,[]],w1:[false,300,238.8,350,E,1,[]],w2:[false,300,350,412,I,1,[]],nk:[true,232,306.8,360,E,1,[]]},
 cui:{w:[false,360,21.8,232,E,1,[]],n:[true,15,366.8,516.6,E,1,[[475,520,'win']]],e:[false,520,21.8,255,I,-1,[]]},
 ch1:{n:[true,497,440.4,713.2,I,1,[[445,490,'door']]],e:[false,720,500.4,698.2,E,-1,[[515,575,'pf']]],s:[true,705,440.4,713.2,E,-1,[]],w:[false,437,500.4,698.2,I,1,[]]},
 ch2:{n:[true,15,523.4,713.2,E,1,[[640,690,'win']]],e:[false,720,21.8,251.6,E,-1,[[160,220,'pf']]],s:[true,255,523.4,713.2,I,-1,[[525,585,'door']]],w:[false,520,21.8,251.6,I,1,[]]},
 ent:{w:[false,157,356.8,561.6,E,1,[[415,470,'door']]],n:[true,350,163.8,300,E,1,[]],e2:[false,300,516,561.6,I,-1,[]],s:[true,565,163.8,300,I,-1,[[175,215,'door'],[245,290,'door']]]},
 sdb:{n:[true,565,235.4,433.6,I,1,[[245,290,'door']]],s:[true,705,235.4,433.6,E,-1,[]],w:[false,232,568.4,698.2,I,1,[]],e:[false,437,568.4,698.2,I,-1,[]]},
 wc:{n:[true,565,163.8,228.6,I,1,[[175,215,'door']]],s:[true,705,163.8,228.6,E,-1,[]],w:[false,157,568.4,698.2,E,1,[]],e:[false,232,568.4,698.2,I,-1,[]]}
};
function room(r,mat,y0,y1,only){Object.keys(WL[r]).forEach(k=>{if(!only||only.indexOf(k)>=0)pw(WL[r][k],mat,y0,y1);});}
function wtex(name,o){return (w,h)=>{const T=tex[name],t=T.t.clone();t.needsUpdate=true;t.repeat.set(w/T.m,h/(T.mh||T.m));return new THREE.MeshLambertMaterial({map:t,color:o||0xffffff});};}
function panel(hor,c,a,b0,t,side,y0,y1,mat,off){pf2(hor,c,a,b0,t,side,y0,y1,mat,off||0.03);}
function frame(hor,c,a,b0,t,side,y0,y1,fc,ic){pf2(hor,c,a,b0,t,side,y0,y1,fc,0.028);pf2(hor,c,a+1.2,b0-1.2,t,side,y0+0.03,y1-0.03,ic,0.036);}
function fl(x0,z0,x1,z1,name){const T=tex[name],w=(x1-x0)/S,d=(z1-z0)/S,t=T.t.clone();t.needsUpdate=true;t.repeat.set(w/T.m,d/(T.mh||T.m));t.offset.set(X(x0)/T.m,-Z(z1)/(T.mh||T.m));box(X(x0),Z(z0),X(x1),Z(z1),-0.06,0,new THREE.MeshLambertMaterial({map:t}),floorGroup);}
const TZ=[[360,15,520,232],[300,232,520,255],[300,255,720,497],[157,350,300,565],[300,497,437,565]];
function basePro(o){
  shell();kitchen();bathroom();
  rad(497,681,711,I,-1,true,0.12,0.95);rad(497,664,694,I,1,true,0.12,0.9);radV(720,26,53,E,-1,0.12,0.95);
  pbox(819,15,826,705,1.1,1.16,L(0x6a6e73),fixGroup);
  pbox(821,15,825,705,0,1.1,o.reed||tm('reed',9.7,1.1),fixGroup);
  [[15,160],[220,275],[455,515],[575,705]].forEach(r=>faceV(720,r[0],r[1],E,1,0,H,tm('clad',(r[1]-r[0])/S,H)));
  wall('h',497,437,720,I,[{a:445,b:490,k:'open'}]);leaf(445,497,45,'S');
  wall('v',437,497,565,I,[]);wall('v',300,350,412,I,[]);wall('v',300,516,565,I,[]);
  wall('h',565,157,437,I,[{a:175,b:215,k:'open'},{a:245,b:290,k:'open'}]);
  leaf(176,565,40,'N');leaf(247,565,43,'N');
  closet(300,524.2,437,565,o.closet?mt(o.closet):closetMat);
  const pl=o.pl||[0xc65f37,0xd2704a,0x8f4326];
  pbox(300,520.8,437,524.2,2.38,H,mt(pl[2]),wallGroup);
  pbox(300,520.8,437,524.2,0,0.04,L(0x8c8f93),wallGroup);
  const w=137/3+4;
  for(let i=0;i<3;i++){const x0=300+i*(137-w)/2,mid=i===1,z0=mid?521.2:522.7,z1=mid?522.6:524.0;pbox(x0,z0,x0+w,z1,0.04,2.38,typeof pl[0]==='function'?pl[0](w/S,2.34):mt(mid?pl[1]:pl[0]),wallGroup);pbox(x0+w-6,z0-0.6,x0+w-4.5,z0,0.95,1.3,mt(o.plh||0x3a3a3a),wallGroup);}
}
function metod(fr,top,grp){
  const kx1=520-I*S/2,kx0=kx1-0.392*S,kz1=254,kz0=kz1-1.6*S,kw=0.8*S;
  item('METOD bas 2 × 80',grp);
  b(kx0+1.5,kz0+1,kx1,kz1-1,0,0.08,0x3a3a3a);b(kx0+1.5,kz0,kx1,kz1,0.08,0.88,0xffffff);b(kx0-1.2,kz0,kx1,kz1,0.88,0.91,top);
  for(let u=0;u<2;u++)for(let d=0;d<2;d++){const z0=kz0+u*kw+0.3,z1=kz0+(u+1)*kw-0.3,y0=0.08+d*0.4+0.004,y1=y0+0.392;b(kx0,z0,kx0+1.5,z1,y0,y1,fr);b(kx0-0.8,(z0+z1)/2-8,kx0,(z0+z1)/2+8,y1-0.06,y1-0.045,0x9aa0a6);}
  return {kx0,kx1,kz0,kz1};
}
function setUI(P){
  document.title='Appartement T3 · '+P.name;
  document.querySelector('.brand b').textContent=P.name;
  document.querySelector('.brand small').textContent='Proposition '+P.num+' · le décorateur aux styles marqués';
  document.getElementById('legP').innerHTML=P.legend.map(k=>'<span class="key"><i style="background:#'+k[0].toString(16).padStart(6,'0')+(k[1]?';border-color:#'+k[1].toString(16).padStart(6,'0'):'')+'"></i>'+k[2]+'</span>').join('');
  document.getElementById('m-projet').textContent=P.short;
}
function planter(n,x0,z0,x1,z1,h,c,o){
  o=o||{};item(n,o.grp||furnGroup);b(x0,z0,x1,z1,0,h,c);b(x0+1,z0+1,x1-1,z1-1,h,h+0.005,0x3b2a1e);
  const r=rnd(o.seed||Math.round(x0+z1)),alongX=(x1-x0)>(z1-z0),len=alongX?x1-x0:z1-z0,k=o.k||'round',cnt=o.n||Math.max(2,Math.round(len/M(0.3)));
  for(let i=0;i<cnt;i++){const a=(i+0.5)/cnt*len,cx=alongX?x0+a:(x0+x1)/2,cz=alongX?(z0+z1)/2:z0+a,lc=(o.lc2&&i%2)?o.lc2:o.lc||0x4f7f3f;
    if(k==='bamboo'){cy(cx,cz,0.012,h,h+(o.H||1.6)*(0.8+r()*0.2),0x8a9a4a);sp(cx,h+(o.H||1.6)*(0.7+r()*0.2),cz,0.14,lc,2.4,0.8);sp(cx,h+(o.H||1.6)*0.45,cz,0.11,lc,1.8,0.7);}
    else if(k==='grass'){sp(cx,h+0.1,cz,0.13,lc,1.2);}
    else if(k==='tree'){if(i===Math.floor(cnt/2)){cy(cx,cz,0.035,h,h+(o.H||1.4)*0.7,0x4a3a2a,0.05);[[0.12,0.75,0.17],[-0.1,0.85,0.15],[0.03,1.0,0.18]].forEach(p=>sp(cx+M(p[0]),h+(o.H||1.4)*p[1],cz+M(p[0]*0.8),p[2]*(o.ts||1),lc,0.6,1.2));}else sp(cx,h+0.08,cz,0.12,o.lc2||lc,0.8);}
    else if(k==='flowers'){sp(cx,h+0.12,cz,0.12,lc,1);[0,1,2].forEach(j=>sp(cx+(r()-0.5)*8,h+0.2+r()*0.08,cz+(r()-0.5)*8,0.035,o.fc?o.fc[Math.floor(r()*o.fc.length)]:0xd9a441));}
    else sp(cx,h+(o.H||0.4)*0.5,cz,0.13+r()*0.06,lc,1.1);}
}
function canvasMat(w,h,draw){const pw=256,ph=Math.max(16,Math.round(256*h/w)),c=document.createElement('canvas');c.width=pw;c.height=ph;draw(c.getContext('2d'),pw,ph,pw/w);return new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(c)});}
function archTex(bg,fg,aw,ah,o){o=o||{};return (w,h,a)=>canvasMat(w,h,(g,pw,ph,k)=>{g.fillStyle=bg;g.fillRect(0,0,pw,ph);const ax=(o.px!==undefined?(o.px-a)/S:(o.cx===undefined?w/2:o.cx))*k,r=aw*k/2,top=ph-ah*k+r;
  const path=(rr,dy)=>{g.beginPath();g.moveTo(ax-rr,ph);g.lineTo(ax-rr,top+dy);g.arc(ax,top+dy,rr,Math.PI,0);g.lineTo(ax+rr,ph);g.closePath();};
  if(o.rim){g.fillStyle=o.rim;path(r+0.05*k,0);g.fill();}g.fillStyle=fg;path(r,0);g.fill();if(o.inner){g.fillStyle=o.inner;path(r-0.12*k,0.0);g.fill();}});}
function gaming(cx,cz,dir){
  return loc('Siège gaming existant',furnGroup,cx,cz,dir||'S',(x,z)=>{const cw=0.3*S,blk=0x222324,red=0xb3262d;
    cy(x,z,0.3,0,0.04,blk);cy(x,z,0.025,0.04,0.46,0x6b6e72);b(x-cw,z-cw,x+cw,z+cw,0.46,0.56,blk);b(x-cw*0.6,z-cw*0.85,x+cw*0.6,z+cw*0.85,0.56,0.58,red);
    b(x-cw,z-cw,x+cw,z-cw+0.1*S,0.56,1.38,blk);b(x-cw*0.5,z-cw+0.1*S,x+cw*0.5,z-cw+0.1*S+0.4,0.7,1.32,red);[x-cw-2,x+cw].forEach(xx=>b(xx,z-cw*0.5,xx+2,z+cw*0.7,0.68,0.72,blk));});
}
function desk180(x0,z0,top,leg){item('Bureau 180 × 80 existant');const x1=x0+M(1.8),z1=z0+M(0.8);b(x0,z0,x1,z1,0.725,0.75,top||0xdcc296);const lg=leg||0xf4f4f2,m=(z0+z1)/2;[x0+8,x1-8].forEach(x=>{b(x-2,z0+3,x+2,z1-3,0,0.03,lg);b(x-2.4,m-2.4,x+2.4,m+2.4,0.03,0.42,lg);b(x-1.7,m-1.7,x+1.7,m+1.7,0.42,0.7,lg);b(x-1.5,z0+4,x+1.5,z1-4,0.7,0.725,lg);});}
