# Geheime Karte – Version 4.3

Eine lokale, offlinefähige Geburtstags-PWA mit Pergament-UI und individuell erzeugten Illustrationen. Statische HTML-/CSS-/JS-Dateien, keine Abhängigkeiten und kein Benutzerkonto.

## Online aktualisieren

ZIP entpacken. Den Inhalt (HTML, CSS, JS, Manifest, Icon und den vollständigen Ordner `assets`) im Hauptverzeichnis von `TimBrueckner-create/hp-birthdayparty` hochladen. Ordnerstruktur beibehalten, keine persönlichen Sicherungsdateien hochladen. GitHub Pages: `main` und `/ (root)`.

Auf dem iPhone die App nach erfolgtem Deployment schließen und bei Internet erneut öffnen. Falls noch das alte Menü erscheint, erneut schließen/öffnen: Der neue Service Worker übernimmt nach der Installation. Auf „Offline bereit“ warten. Websitedaten nicht löschen, wenn bestehende Stationen erhalten bleiben sollen.

## Spiel vorbereiten

1. App über Safari zum Home-Bildschirm hinzufügen und von dort starten.
2. Spielleitung → Stationen: eine Station wählen, Name/Hinweis/Rätsel/Lösung anpassen, vor Ort „Standort übernehmen“, optional Foto hinzufügen und speichern.
3. Eine bis zwölf Stationen sind möglich. Änderungen an der Route setzen nach Bestätigung den Schnitzeljagd-Fortschritt zurück.
4. Unter Verwaltung den Abschlusscode festlegen (Beispielwert `Hogwarts`).
5. Geschöpfe-Aufgaben vorbereiten: zwölf Spielmünzen verstecken, Spiel-Ei und Tuch für einen kurzen Parcours bereitstellen. Dies sind anpassungsbedürftige Beispielspiele; Kinderzahl, Alter und Geräteaufteilung sind noch offen.
6. Sicherung herunterladen. Sie enthält private Namen, Fotos und GPS-Fundorte; nicht ins öffentliche Repository hochladen. Bei mehreren Geräten vorher auf jedem Gerät importieren. Keine Live-Synchronisation.

## Spielen

- Hausauswahl: Vorname und drei Fragen. Die Spielleitung kann das Haus korrigieren. Keine automatische Gruppengrößen-Balancierung.
- Schnitzeljagd: „Spur aufnehmen“ startet Standortbeobachtung bei sichtbarer App. Standort-Fußspuren, Genauigkeitskreis und ungefähre Entfernung erscheinen. Der aktive Zielmarker bleibt zunächst verborgen, auch nach dem Lösen der vorherigen Station. Erst nach zwei verschiedenen, frischen GPS-Messungen innerhalb von 20 Metern (Genauigkeit höchstens ±20 m) wird er dauerhaft enthüllt. Vorher erscheinen nur Ortshinweis und qualitative Nähetexte, keine Meterzahl zum Ziel. Die Fundbestätigung verwendet den kleineren Wert aus eingestelltem Radius und 20 Metern; ein größerer Radius kann die Enthüllung nicht umgehen. Besuchte Orte bleiben sichtbar. Bei engerem Fundradius kann der Zielmarker bereits sichtbar sein, bevor das Stationsrätsel freigeschaltet wird.
- Bei Verlassen der Kartenansicht oder verborgenem Dokument pausiert die Suche. Keine Hintergrundortung, kein garantierter Zehn-Sekunden-Takt. Veraltete Positionen werden gekennzeichnet.
- Rätsel erscheinen nach bestätigtem Fundort. Beispielantworten: `Lumos` und `Alohomora`.
- Geschöpfe-Aufgaben: Timer und Bestätigung durch Spielleitung. Zwei Aufgaben liefern je eine Rune. Ein laufender Timer pausiert beim Verlassen; er überlebt keinen App-Neustart. Gesammelte Runen bleiben gespeichert.
- Schatzkammer: Alle Stations- und Geschöpfe-Runen plus Abschlusscode öffnen das digitale Siegel. Die reale Kiste öffnet die Spielleitung.

## Karte

Eigene lokale SVG-Karte aus OpenStreetMap-Vektordaten, abgerufen 20.10.2026. Gebiet um Peschelstraße/Wächterstraße in Dresden-Kaditz, einschließlich Ranke- und Baudissinstraße. Keine persönlichen Stationen vorkonfiguriert; die Zuordnung der früher erwähnten „Bautzener Straße“ ist noch zu bestätigen.

Nordorientierte lokale equirektanguläre Projektion; Grenzen in `assets/map-meta.json` und `core.js` identisch. Verschieben, Zweifinger-Zoom und Zoomknöpfe. Kein Routing und keine Verkehrsinformationen. Punkte außerhalb der Karte werden als außerhalb gekennzeichnet, Entfernungsprüfung funktioniert unabhängig davon.

Kartendaten © OpenStreetMap-Mitwirkende, ODbL 1.0: https://www.openstreetmap.org/copyright . Die Karte ist eine angepasste Darstellung dieser Daten. Quelldaten und Generator liegen im Entwicklungsprojekt unter `design/osm-source.xml` und `scripts/build_map.py`; zum Weitergeben der Daten gelten die ODbL-Bedingungen: https://opendatacommons.org/licenses/odbl/1-0/ .

## Speicherung und Offline

IndexedDB-Datenbank `geheime-karte-v1`, Datenobjekt `game`; frühe Zwei-Stationen-Spielstände werden übernommen. Fotos werden auf maximal 1200 Pixel verkleinert und als JPEG neu gerendert. Kein Upload, keine Analytics. Browser können lokale Daten bei Speicherdruck entfernen; Sicherung verwenden.

Service Worker speichert das App-Paket einschließlich Grafiken und Karte. Cache-Namen enthalten die App-Scope-URL, damit Kopien in anderen Verzeichnissen nicht gegenseitig gelöscht werden. Bei Änderungen an öffentlichen Dateien die Cache-Version in `sw.js` erhöhen.

## Prüfen

Im Projektstamm: `node --test tests/core.test.mjs`. Lokale Vorschau über `python3 -m http.server 8767`, dann `/schnitzeljagd-test/`.

Geprüft: Syntax, geografische Projektion, Ankunftsfilter, Importvalidierung; Browserdurchlauf von beiden Stationsrätseln über Geschöpfe bis Finale, Persistenz nach Neuladen. Echter iPhone-GPS-Test und Offlinebetrieb unter iOS müssen vor der Feier draußen geprüft werden. Ein ausgeschalteter Entwicklungsserver prüft den Cache, ersetzt aber keinen iPhone-Praxistest.

## Eltern-PIN

Vor der Übergabe an Kinder die Spielleitung öffnen und selbst eine PIN mit 4 bis 8 Ziffern zweimal eingeben. Sie wird als gesalzener PBKDF2-Prüfwert auf diesem Gerät gespeichert, nicht im Spielbackup. Beim Verlassen der Spielleitung und beim Ausblenden der App wird erneut gesperrt. Die PIN kann innerhalb des entsperrten Verwaltungsbereichs geändert werden. Sicherungen enthalten keine PIN; auf einem anderen Gerät ist eine eigene PIN einzurichten.

Die Sperre verhindert gewöhnliches Öffnen durch Kinder. Sie ist keine serverseitige Autorisierung; wer technisch die lokalen Daten oder den Code untersucht, kann die Bedienbarriere umgehen. Vergessene PINs haben aktuell keine Wiederherstellungsfunktion. Deshalb gut merken und vor Änderungen an Websitedaten eine Sicherung behalten.

## Bestehende Station weiterbearbeiten

Spielleitung öffnen, Eltern-PIN eingeben, „Stationen“ wählen und unter „Gespeicherte Station bearbeiten“ den Eintrag auswählen. Texte, Foto und Fundort anpassen und mit „Änderungen speichern“ erneut speichern. Die Statuszeile bestätigt den Erfolg dauerhaft; die Station bleibt ausgewählt. „Änderungen verwerfen“ lädt den zuletzt gespeicherten Zustand. Ohne tatsächliche Änderungen wird beim Speichern kein Spielstand zurückgesetzt. Bei geänderter Route und laufendem Spiel erfolgt weiterhin eine Rückfrage.
