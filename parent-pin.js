export function validPin(pin){return /^\d{4,8}$/.test(pin);}
const hex=bytes=>Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
export async function derivePin(pin,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);const bytes=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:Uint8Array.from(salt),iterations:100000},key,256);return hex(new Uint8Array(bytes));}
export async function createPin(pin){if(!validPin(pin))throw Error('Bitte 4 bis 8 Ziffern verwenden.');const salt=Array.from(crypto.getRandomValues(new Uint8Array(16)));return{salt,hash:await derivePin(pin,salt)};}
export async function checkPin(pin,record){if(!validPin(pin)||!record||!Array.isArray(record.salt)||typeof record.hash!=='string')return false;return await derivePin(pin,record.salt)===record.hash;}
