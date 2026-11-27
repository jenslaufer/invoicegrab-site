# InvoiceGrab — Häufige Fragen

InvoiceGrab ist eine Browser-Erweiterung für Chrome und Firefox, die alle Rechnungen deiner amazon.de-Bestellungen eines Zeitraums auf einmal als PDF herunterlädt. Produktseite: https://invoicegrab.de/

## Gibt es bei Amazon einen Sammel-Download für alle Rechnungen?

Für private Konten nicht. Dort lädst du jede Rechnung einzeln über „Meine Bestellungen“. Amazon Business hat unter „Meine Rechnungen“ einen Sammel-Download als ZIP. Für private amazon.de-Konten lädt InvoiceGrab alle Rechnungen eines Zeitraums in einem Lauf.

## Wo finde ich die Rechnung in der Amazon-App?

Menü oder Profil → „Meine Bestellungen“ → Bestellung → „Bestelldetails“ → „Rechnung anzeigen“. Fehlt der Link, öffne amazon.de im Browser als Desktop-Website.

## Kann ich alle Amazon-Rechnungen auf einmal herunterladen?

Ja, mit InvoiceGrab. Du wählst einen Zeitraum — ein Jahr, ein Quartal oder freie Daten — und die Erweiterung lädt die Rechnungs-PDFs aller Bestellungen darin in einem Durchgang als ZIP. In der kostenlosen Version sind es 5 Rechnungen pro Lauf, mit PRO unbegrenzt.

## Funktioniert InvoiceGrab auch in Firefox?

Ja. InvoiceGrab gibt es im [Chrome Web Store](https://chromewebstore.google.com/detail/gkjglloohfeojkcflpafcahfkabdflom) und bei [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/invoicegrab-amazon-rechnungen-/), jeweils für den Browser am Rechner.

## Sind die Dateinamen GoBD-konform?

Ja, die Benennung: Die Dateien heißen `JJJJ-MM-TT_Bestellnr_Betrag.pdf` — chronologisch sortierbar, eindeutig einer Bestellung zugeordnet und ohne manuelles Umbenennen archivierbar. Die GoBD-Konformität deiner Ablage hängt zusätzlich an deinem Archivsystem — die Benennung ist der Teil, den InvoiceGrab übernimmt.

## Funktioniert InvoiceGrab mit amazon.com oder anderen Marktplätzen?

Nein. Unterstützt wird ausschließlich amazon.de. Weitere Marktplätze stehen auf der Roadmap.

## Was passiert mit Bestellungen ohne hinterlegte Rechnung?

Sie werden übersprungen und in der `zusammenfassung.txt` namentlich ausgewiesen. InvoiceGrab fordert keine fehlenden Rechnungen bei Marketplace-Händlern an — aber du siehst, welche fehlen.

## Brauche ich meine Amazon-Zugangsdaten?

Nein. InvoiceGrab läuft in deinem Browser und nutzt die Sitzung, in der du ohnehin angemeldet bist. Es gibt kein Login-Feld und keinen Upload.

## Kann ich die Belege nach DATEV übernehmen?

Ja, über die `index.csv` im ZIP. Sie enthält Belegdatum, Belegnummer, Netto, USt-Betrag, USt-Satz, Brutto, Währung und Dateiname — die Spalten, die eine Buchungsvorlage braucht. Gemischte Steuersätze stehen als Splitbuchung.

## Was kostet InvoiceGrab?

Die kostenlose Version bleibt dauerhaft kostenlos und lädt 5 Rechnungen pro Lauf. PRO kostet 19 €/Jahr und hebt die Begrenzung auf.
