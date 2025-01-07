# realzins
Voraussetzungen
Installierte Software:
Node.js (mindestens Version 16.x oder höher)
Ein beliebiger Texteditor (z. B. Visual Studio Code)
Git (optional, falls du das Projekt aus einem Repository klonst)
Projektverzeichnis:
Stelle sicher, dass du alle Dateien des Projekts lokal verfügbar hast:
backend.js
script.js
index.html
style.css
Realzinsen.json
Alle anderen benötigten Dateien (z. B. Bilder im public-Ordner)
Schritt 1: Projektverzeichnis öffnen
Öffne das Terminal oder die Eingabeaufforderung und navigiere in das Verzeichnis, in dem sich die Applikation befindet:

cd /path/to/your/project
Schritt 2: Abhängigkeiten installieren
Installiere die benötigten Node.js-Module, indem du im Projektverzeichnis folgenden Befehl ausführst:

npm install
Dies installiert alle Abhängigkeiten, die in der package.json definiert sind (z. B. express).

Schritt 3: Backend-Server starten
Starte den Node.js-Server, der die Applikation bereitstellt:

node backend.js
Nach erfolgreichem Start des Servers sollte im Terminal die folgende Meldung erscheinen:

Server läuft auf http://localhost:3000
Schritt 4: Applikation im Browser öffnen
Öffne einen Browser deiner Wahl (z. B. Chrome oder Firefox) und gib folgende URL ein:

http://localhost:3000
Hier kannst du die Applikation nutzen und testen.

Zusätzliche Hinweise
Fehlerbehebung:
Falls ein Modul wie express nicht gefunden wird, stelle sicher, dass alle Abhängigkeiten korrekt installiert wurden. Du kannst erneut ausführen:
npm install
Änderungen am Code:
Wenn du Änderungen am Code vornimmst (z. B. in backend.js), musst du den Server neu starten:
Ctrl + C  # Server stoppen
node backend.js  # Server erneut starten
Daten speichern:
Die Spielergebnisse werden in der Datei Realzinsen.json gespeichert.
Optional: Deployment
Falls du die Applikation online zugänglich machen möchtest, kannst du Plattformen wie Heroku, Render oder Vercel verwenden.