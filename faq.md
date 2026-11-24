# InvoiceGrab — Häufige Fragen

InvoiceGrab ist eine Chrome-Erweiterung, die alle Rechnungen deiner amazon.de-Bestellungen eines Zeitraums auf einmal als PDF herunterlädt. Produktseite: https://jenslaufer.com/invoicegrab-site/

## Kann ich alle Amazon-Rechnungen auf einmal herunterladen?

Ja. Du wählst einen Zeitraum — ein Jahr, ein Quartal oder freie Daten — und InvoiceGrab lädt die Rechnungs-PDFs aller Bestellungen darin in einem Durchgang als ZIP. In der kostenlosen Version sind es 5 Rechnungen pro Lauf, mit PRO unbegrenzt.

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

Die kostenlose Version bleibt dauerhaft kostenlos und lädt 5 Rechnungen pro Lauf. PRO kostet 19 €/Jahr oder 3 €/Monat und hebt die Begrenzung auf.
