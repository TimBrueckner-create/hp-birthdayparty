// Home navigation is derived from saved campaign state; no parallel progress.
export function homeState(game){
 const p=game.progress||{},count=(p.awards||[]).length,members=game.members||[],legacy=game.routeId!=='hogwarts';
 const done=!legacy&&p.vault&&!p.pending;
 const active=!legacy&&!done&&Boolean(p.started||p.arrived||p.pending||p.step>0);
 const first=!legacy&&!active&&!done&&!members.length;
 return{active,done,first,ready:!legacy&&!active&&!done&&members.length>0,
 heading:legacy?'Eure Karte wartet.':done?'Hogwarts ist vereint.':active?'Willkommen zurück.':'Euer Abenteuer beginnt.',
 subtitle:legacy?'Eure bisherigen Stationen sind erhalten.':done?'Vier Häuser. Gemeinsam geschafft.':active?'Eure nächste Spur wartet.':'Vier Häuser. Ein gemeinsames Geheimnis.',
 action:done?'Zur Schatzkammer':active?'Abenteuer fortsetzen':'Die erste Spur öffnen',
 detail:done?'Euer gemeinsamer Erfolg':p.pending?'Geschafft · Eure Belohnung wartet':p.arrived?'Ort gefunden · Das Rätsel wartet':active?`Spur ${Math.min((p.step||0)+1,game.stations.length)} · Die Suche geht weiter`:'Eure Geschichte beginnt',
 house:members.length?`${members.length} Kinder · Häuser eingeteilt`:'Findet euren Platz in Hogwarts',
 hunt:legacy?'Bisherige Teststationen erhalten':p.pending?'Aufgabe geschafft · Belohnung ansehen':done?'Alle Hausviertel gefunden':active?`${count} von 4 Hausvierteln gefunden`:'Folgt den verborgenen Spuren',
 vault:done?'Das Geheimnis ist gelöst':count>=4?'Vier Hausviertel · Bereit fürs Finale':count?`Noch ${4-count} Hausviertel fehlen`:'Das Geheimnis der vier Häuser'};
}
