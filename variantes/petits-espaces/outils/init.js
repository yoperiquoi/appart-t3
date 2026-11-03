(function(){
  document.querySelector('.brand b').textContent=PROP.titre;
  document.querySelector('.brand small').textContent='Petits espaces · '+PROP.sous;
  document.getElementById('legP').innerHTML=PROP.legende.map(k=>'<span class="key"><i style="background:'+k[0]+';border-color:'+(k[1]||k[0])+'"></i>'+k[2]+'</span>').join('');
  const furn=document.getElementById('b-furn'),b=document.createElement('button');
  b.id='b-alt';b.className='chip';b.setAttribute('aria-pressed','false');b.textContent=PROP.alt[0];b.title=PROP.alt[1];
  furn.after(b);
  b.onclick=()=>{ALT=!ALT;b.classList.toggle('on',ALT);b.setAttribute('aria-pressed',ALT);setMode('projet');};
  document.querySelector('.hint').textContent='Glisser pour tourner · molette pour zoomer · « '+PROP.alt[0]+' » montre les meubles transformés';
})();
function initPaints(){
  const o=document.querySelector('#paintRow .opts');
  o.innerHTML=Object.keys(PAINTS).map(k=>'<button data-p="'+k+'">'+PAINTS[k].b+'</button>').join('');
}
