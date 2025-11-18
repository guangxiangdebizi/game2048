const size=4
const prob4=0.1
const boardEl=document.getElementById('board')
const scoreEl=document.getElementById('score')
const bestEl=document.getElementById('best')
const newBtn=document.getElementById('newGame')
const overlay=document.getElementById('overlay')
const overlayText=document.getElementById('overlayText')
const keepGoing=document.getElementById('keepGoing')
const restart=document.getElementById('restart')
let tiles=[]
let score=0
let best=Number(localStorage.getItem('best')||0)
let keepPlaying=false
let idSeq=1
bestEl.textContent=String(best)

function initCells(){boardEl.innerHTML='';for(let i=0;i<size*size;i++){const c=document.createElement('div');c.className='cell';boardEl.appendChild(c)}const t=document.createElement('div');t.className='tiles';boardEl.appendChild(t)}
function posToXY(r,c){const gap=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap'))||12;const W=boardEl.clientWidth;const cell=(W-gap*3)/4;const x=c*(cell+gap);const y=r*(cell+gap);return{ x, y }}
function tileEl(tile){let el=document.querySelector(`[data-id="${tile.id}"]`);if(!el){el=document.createElement('div');el.className='tile new';el.dataset.id=String(tile.id);const span=document.createElement('span');span.textContent=String(tile.value);el.appendChild(span);boardEl.querySelector('.tiles').appendChild(el)}el.className=`tile tile-${tile.value}${tile.merged?' merge':''}`;el.firstChild.textContent=String(tile.value);const {x,y}=posToXY(tile.r,tile.c);el.style.transform=`translate(${x}px,${y}px)`;return el}
function emptyCells(){const used=new Set(tiles.map(t=>t.r*size+t.c));const res=[];for(let i=0;i<size*size;i++){if(!used.has(i))res.push(i)}return res}
function spawn(){const spaces=emptyCells();if(spaces.length===0)return false;const idx=spaces[Math.floor(Math.random()*spaces.length)];const r=Math.floor(idx/size);const c=idx%size;const v=Math.random()<prob4?4:2;tiles.push({id:idSeq++,value:v,r,c,merged:false});tileEl(tiles[tiles.length-1]);return true}
function canMove(){if(emptyCells().length>0)return true;for(let r=0;r<size;r++)for(let c=0;c<size;c++){const v=at(r,c);if(r+1<size&&at(r+1,c)===v)return true;if(c+1<size&&at(r,c+1)===v)return true}return false}
function at(r,c){const t=tiles.find(x=>x.r===r&&x.c===c);return t?t.value:0}
function beep(){try{const a=new (window.AudioContext||window.webkitAudioContext)();const o=a.createOscillator();const g=a.createGain();o.type='sine';o.frequency.value=880;g.gain.value=.06;o.connect(g);g.connect(a.destination);o.start();setTimeout(()=>{o.stop();a.close()},120)}catch(e){} }
function vibrate(ms){if(navigator.vibrate)navigator.vibrate(ms)}
function updateScore(add){if(add>0){score+=add;scoreEl.textContent=String(score);if(score>best){best=score;bestEl.textContent=String(best);localStorage.setItem('best',String(best))}}
}
function reset(){tiles=[];score=0;scoreEl.textContent='0';keepPlaying=false;overlay.classList.add('hidden');initCells();spawn();spawn()}
function move(dir){tiles.forEach(t=>t.merged=false);let moved=false;let gain=0
if(dir==='left'||dir==='right'){
  for(let r=0;r<size;r++){
    const line=tiles.filter(t=>t.r===r).sort((a,b)=>a.c-b.c)
    const ordered=dir==='left'?line:[...line].reverse()
    const compact=ordered.map(t=>t)
    const result=[]
    for(let i=0;i<compact.length;i++){
      const a=compact[i]
      if(!a)continue
      const b=compact[i+1]
      if(b&&b.value===a.value){result.push({v:a.value*2,from:[a,b]});i++}else{result.push({v:a.value,from:[a]})}
    }
    let pos=0
    for(const rItem of result){for(const f of rItem.from){const nc=dir==='left'?pos:(size-1-pos);if(f.c!==nc)moved=true;f.c=nc;f.r=r}pos++}
    for(const rItem of result){if(rItem.from.length===2){const [a,b]=rItem.from;tiles=tiles.filter(x=>x!==b);a.value=rItem.v;a.merged=true;gain+=rItem.v}}
  }
}
if(dir==='up'||dir==='down'){
  for(let c=0;c<size;c++){
    const line=tiles.filter(t=>t.c===c).sort((a,b)=>a.r-b.r)
    const ordered=dir==='up'?line:[...line].reverse()
    const compact=ordered.map(t=>t)
    const result=[]
    for(let i=0;i<compact.length;i++){
      const a=compact[i]
      if(!a)continue
      const b=compact[i+1]
      if(b&&b.value===a.value){result.push({v:a.value*2,from:[a,b]});i++}else{result.push({v:a.value,from:[a]})}
    }
    let pos=0
    for(const rItem of result){for(const f of rItem.from){const nr=dir==='up'?pos:(size-1-pos);if(f.r!==nr)moved=true;f.r=nr;f.c=c}pos++}
    for(const rItem of result){if(rItem.from.length===2){const [a,b]=rItem.from;tiles=tiles.filter(x=>x!==b);a.value=rItem.v;a.merged=true;gain+=rItem.v}}
  }
}
if(moved){if(gain>0){updateScore(gain);beep()}animate();spawn();vibrate(12);if(tiles.some(t=>t.value>=2048)&&!keepPlaying){overlayText.textContent='达成 2048！';overlay.classList.remove('hidden')}else if(!canMove()){overlayText.textContent='没有可移动的步数';overlay.classList.remove('hidden')}}}
function animate(){tiles.forEach(tile=>tileEl(tile))}
function onKey(e){const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};const d=m[e.key];if(d){e.preventDefault();move(d)}}
function onTouch(){let sx=0,sy=0,sw=false;boardEl.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;sw=true},{passive:true});boardEl.addEventListener('touchmove',e=>{}, {passive:true});boardEl.addEventListener('touchend',e=>{if(!sw)return;sw=false;const t=e.changedTouches[0];const dx=t.clientX-sx;const dy=t.clientY-sy;const ax=Math.abs(dx),ay=Math.abs(dy);if(Math.max(ax,ay)<20)return;if(ax>ay){move(dx>0?'right':'left')}else{move(dy>0?'down':'up')}})
}
newBtn.addEventListener('click',reset)
restart.addEventListener('click',reset)
keepGoing.addEventListener('click',()=>{keepPlaying=true;overlay.classList.add('hidden')})
window.addEventListener('resize',()=>animate())
document.addEventListener('keydown',onKey)
initCells()
spawn()
spawn()
onTouch()