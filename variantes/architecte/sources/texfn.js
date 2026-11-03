function hexTile(g,w,h,r,cols,joint,jw){
  const px=w/4,py=h/8,rr=rnd(3);
  g.fillStyle=joint;g.fillRect(0,0,w,h);
  for(let j=-1;j<=8;j++)for(let i=-1;i<=4;i++){
    const cx=i*px+(j%2?px/2:0),cy=j*py,R=py/1.5;
    g.fillStyle=cols[Math.floor(rr()*cols.length)];g.beginPath();
    for(let a=0;a<6;a++){const t=Math.PI/6+a*Math.PI/3,x=cx+Math.cos(t)*(R-jw/2),y=cy+Math.sin(t)*(R-jw/2);a?g.lineTo(x,y):g.moveTo(x,y);}
    g.closePath();g.fill();
  }
}
function zel(g,cols,joint){
  const r=rnd(cols.length*7);g.fillStyle=joint;g.fillRect(0,0,256,256);
  for(let i=0;i<8;i++)for(let j=0;j<8;j++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(i*32+1.5,j*32+1.5,29,29);g.fillStyle='rgba(255,255,255,0.12)';g.fillRect(i*32+4,j*32+4,8+r()*10,4);}
}
function chev(g,cols,joint){
  const r=rnd(19);
  for(let b=0;b<4;b++){const x0=b*64,dir=b%2?1:-1;
    for(let y=-128;y<384;y+=32){g.fillStyle=cols[Math.floor(r()*cols.length)];g.beginPath();g.moveTo(x0,y);g.lineTo(x0+64,y+dir*64);g.lineTo(x0+64,y+dir*64+32);g.lineTo(x0,y+32);g.closePath();g.fill();g.strokeStyle=joint;g.lineWidth=1.2;g.stroke();}}
}
function grid4(g,cols,joint,w){
  const r=rnd(23);for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(i*64,j*64,64,64);}
  g.strokeStyle=joint;g.lineWidth=w;for(let k=0;k<=4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64,256);g.moveTo(0,k*64);g.lineTo(256,k*64);g.stroke();}
}
