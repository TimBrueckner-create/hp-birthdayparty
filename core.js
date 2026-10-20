export const MAP={south:51.084,north:51.0888,west:13.696,east:13.705,width:1000,height:849};
export function distance(a,b){const r=x=>x*Math.PI/180;const h=Math.sin(r(b.lat-a.lat)/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(r(b.lon-a.lon)/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));}
export function project(p){return{x:(p.lon-MAP.west)/(MAP.east-MAP.west)*1000,y:(MAP.north-p.lat)/(MAP.north-MAP.south)*849};}
export function unproject(p){return{lon:MAP.west+p.x/1000*(MAP.east-MAP.west),lat:MAP.north-p.y/849*(MAP.north-MAP.south)};}
export function inMap(p){return p.lat>=MAP.south&&p.lat<=MAP.north&&p.lon>=MAP.west&&p.lon<=MAP.east;}
export function validPoint(p){return !!p&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&Math.abs(p.lat)<=90&&Math.abs(p.lon)<=180;}
export function normalize(s){return s.normalize('NFKC').trim().toLocaleLowerCase('de');}
export function proximity(p,target,radius){if(!validPoint(p)||!validPoint(target))return{state:'missing'};const meters=distance(p,target);if(!Number.isFinite(p.accuracy)||p.accuracy>Math.min(radius,60))return{state:'inaccurate',meters};return{state:meters<=radius?'inside':meters<=Math.max(150,radius*3)?'near':'far',meters};}
export const freshProgress=()=>({step:0,arrived:false,creatures:[],vault:false});
export const defaultStations=()=>[{title:'Das verborgene Licht',hint:'Sucht den Ort auf eurem Foto. Die Spielleitung legt den ersten Fundort fest.',question:'Welcher Zauber bringt Licht ins Dunkel?',answer:'Lumos',radius:50,point:null,photo:null},{title:'Der flüsternde Hain',hint:'Folgt der nächsten Spur. Die Spielleitung legt den zweiten Fundort fest.',question:'Welcher Zauberspruch öffnet verschlossene Türen?',answer:'Alohomora',radius:50,point:null,photo:null}];
export function validateStations(list){if(!Array.isArray(list)||list.length<1||list.length>12)throw Error('Bitte 1 bis 12 Stationen verwenden.');return list.map((s,i)=>{for(const k of ['title','hint','question','answer'])if(typeof s[k]!=='string'||!s[k].trim()||s[k].length>2000)throw Error(`Station ${i+1}: Texte und Lösung prüfen.`);if(!Number.isFinite(s.radius)||s.radius<10||s.radius>500)throw Error(`Station ${i+1}: Radius muss 10–500 m betragen.`);if(s.point!==null&&!validPoint(s.point))throw Error('Ungültiger Standort.');if(s.photo!==null&&(typeof s.photo!=='string'||!s.photo.startsWith('data:image/jpeg;base64,')||s.photo.length>5000000))throw Error('Ungültiges Foto.');return{title:s.title.trim(),hint:s.hint.trim(),question:s.question.trim(),answer:s.answer.trim(),radius:s.radius,point:s.point&&{lat:s.point.lat,lon:s.point.lon},photo:s.photo};});}
export function validProgress(p,count){return p&&Number.isInteger(p.step)&&p.step>=0&&p.step<=count&&typeof p.arrived==='boolean';}
// Require two distinct, recent and accurate measurements; reset on gaps/errors.
export class ArrivalGate{
 constructor(){this.reset();}
 reset(){this.count=0;this.timestamp=0;}
 update(p,target,radius,timestamp,now=Date.now()){
  const result=proximity(p,target,radius);
  if(!Number.isFinite(timestamp)||now-timestamp>30000||timestamp>now+5000){this.reset();return{...result,arrived:false,stale:true};}
  if(timestamp<=this.timestamp)return{...result,arrived:false,duplicate:true};
  if(timestamp-this.timestamp>30000)this.count=0;
  this.timestamp=timestamp;
  this.count=result.state==='inside'?this.count+1:0;
  return{...result,arrived:this.count>=2};
 }
}
