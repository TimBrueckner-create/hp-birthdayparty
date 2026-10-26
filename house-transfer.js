import {HOUSES} from './story.js';
export const HOUSE_TRANSFER_FORMAT='geheime-karte-haeuser-punkte';
export const HOUSE_TRANSFER_LIMIT=1024*1024;
const houses=new Set(HOUSES.map(h=>h.name));
function invalid(){throw Error('Ungültige Häuser-/Punktedatei. Bitte auf dem iPhone erneut exportieren.');}
function string(value,max){return typeof value==='string'&&value.trim().length>0&&value.length<=max&&!/[\u0000-\u001f]/.test(value);}
export function validateHouseTransfer(data){
 if(!data||data.format!==HOUSE_TRANSFER_FORMAT||data.version!==1)throw Error('Bitte eine Datei aus „Häuser und Punkte exportieren“ wählen. Eine vollständige Spielsicherung gehört in den anderen Import.');
 if(typeof data.exportedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(data.exportedAt)||!Number.isFinite(Date.parse(data.exportedAt)))invalid();
 if(!Array.isArray(data.members)||data.members.length>100||!Array.isArray(data.points)||data.points.length>3000)invalid();
 const ids=new Set();const members=data.members.map(m=>{if(!m||!string(m.id,100)||ids.has(m.id)||!string(m.name,50)||!houses.has(m.house))invalid();ids.add(m.id);return{id:m.id,name:m.name.trim(),house:m.house};});
 const pointIds=new Set();const points=data.points.map(p=>{if(!p||!string(p.id,100)||pointIds.has(p.id)||!houses.has(p.house)||!Number.isInteger(p.delta)||Math.abs(p.delta)>1000||typeof p.reason!=='string'||p.reason.length>200)invalid();pointIds.add(p.id);return{id:p.id,house:p.house,delta:p.delta,reason:p.reason};});
 return{format:HOUSE_TRANSFER_FORMAT,version:1,exportedAt:new Date(data.exportedAt).toISOString(),members,points};
}
export function createHouseTransfer(game,now=new Date()){
 return validateHouseTransfer({format:HOUSE_TRANSFER_FORMAT,version:1,exportedAt:now.toISOString(),members:game.members.map(m=>({id:m.id,name:m.name,house:m.house})),points:(game.points||[]).map(p=>({id:p.id,house:p.house,delta:p.delta,reason:p.reason}))});
}
export function applyHouseTransfer(game,input,now=new Date()){
 const data=validateHouseTransfer(input),next=structuredClone(game);
 next.members=data.members;next.points=data.points.map(p=>({...p,source:null}));
 next.houseTransfer={exportedAt:data.exportedAt,importedAt:now.toISOString()};
 return next;
}
