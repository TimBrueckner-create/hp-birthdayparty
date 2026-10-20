# Die geheime Karte – Technikprobe

Zwei Stationen für eine magische Geburtstags-Schnitzeljagd. Statische PWA ohne externe Bibliotheken und ohne Serverdatenbank.

## Start auf dem iPhone

1. Die veröffentlichte HTTPS-Adresse in Safari öffnen, zum Home-Bildschirm hinzufügen und von dort starten.
2. Auf „Offline bereit“ warten.
3. Unter „Vorbereitung“ zwei Stationen anlegen: vor Ort GPS übernehmen, optional Foto wählen, Texte/Lösung und Radius anpassen, speichern.
4. Flugmodus aktivieren, WLAN ausschalten, Standortdienste eingeschaltet lassen. App schließen und wieder öffnen.
5. Erste Station aufsuchen, Standort prüfen, „Lumos“ lösen. Zweite Station mit „Alohomora“ abschließen.
6. Nach Station 1 die App neu starten: Station 2 muss weiterhin aktiv sein.

Ohne GPS können beide Orte unter „Spielleitung“ manuell bestätigt werden. Demo enthält keine echten Koordinaten. Reale GPS- und iPhone-Offlinetests stehen aus.

## Daten und Grenzen

Vorbereitung, verkleinerte Fotos und Spielstand liegen in IndexedDB auf dem jeweiligen Gerät. Kein Upload dieser Inhalte, keine Synchronisierung. Fotos werden als JPEG neu gerendert. Antworten liegen im Browser; die Spielleitung ist kein gesicherter Adminbereich. Lokale Daten können durch Löschen der Websitedaten oder Browser-Speicherbereinigung verloren gehen.

GPS wird nur auf Knopfdruck gelesen. Eine Messung wird nur bei einer Genauigkeit innerhalb des gewählten Zielradius akzeptiert. Bei schlechtem Empfang manuell freigeben. Keine Navigation, Hintergrundortung oder Live-Karte.

Offline-Dateien werden durch einen Service Worker mit eigenem Cache und Scope gespeichert. Bei Änderungen an App-Dateien die Cache-Version in sw.js erhöhen.

## Lokale Vorschau

Im übergeordneten Verzeichnis `python3 -m http.server 8765` starten und `/schnitzeljagd-test/` öffnen. Für den iPhone-Praxistest die veröffentlichte HTTPS-Adresse verwenden.
