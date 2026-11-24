# InvoiceGrab — Amazon Rechnungen herunterladen, alle auf einmal

InvoiceGrab ist eine Chrome-Erweiterung, die alle Rechnungen deiner amazon.de-Bestellungen eines Zeitraums auf einmal als PDF herunterlädt — für alle, die ihre Amazon-Belege für Buchhaltung oder Steuerberater sammeln.

Zeitraum wählen, ein Klick: alle Rechnungs-PDFs deiner amazon.de-Bestellungen landen als ZIP im Download-Ordner. Benannt nach GoBD-Schema, mit einem CSV-Index, den dein Steuerberater direkt lesen kann.

- Installieren: [Chrome Web Store](https://chromewebstore.google.com/detail/gkjglloohfeojkcflpafcahfkabdflom)
- Kostenlos: 5 Rechnungen pro Lauf. PRO 19 €/Jahr.
- Läuft in deinem Browser mit deiner bestehenden Amazon-Anmeldung — keine Zugangsdaten, kein Upload, kein Server.

## Von Hand vs. mit InvoiceGrab

Von Hand, pro Beleg: Bestellung öffnen, Rechnung suchen (mal beim Händler, mal bei Amazon), PDF speichern und umbenennen, am Ende zählen, ob etwas fehlt.

Mit InvoiceGrab: Symbol anklicken, Zeitraum wählen, „Rechnungen als ZIP laden“. Das ZIP mit PDFs und `index.csv` liegt im Download-Ordner, die Zusammenfassung sagt, was fehlt.

## Was du bekommst

- **Ein Lauf statt fünfzig Klicks.** Das Panel öffnet sich direkt auf deiner Bestellseite. Zeitraum als Jahr, Quartal oder freies Datum. Der Fortschritt läuft sichtbar mit.
- **Prüfungsfest benannt.** Jede Datei heißt `JJJJ-MM-TT_Bestellnr_Betrag.pdf` — sortierbar, eindeutig, ohne Nacharbeit.
- **Netto, USt-Betrag und USt-Satz je Beleg.** Aus der Rechnung gelesen, nicht geschätzt. Gemischte Sätze (19 % und 7 % in einer Bestellung) stehen als Splitbuchung in der `index.csv`: Belegdatum; Belegnummer; Netto; USt-Betrag; USt-Satz; Brutto; Währung; Dateiname.
- **Vollständigkeit, nicht Stichprobe.** Die `zusammenfassung.txt` im ZIP zeigt pro Monat Bestellungen und gefundene Rechnungen, nennt Monate ohne Beleg und listet übersprungene Bestellungen.

## Preis

| Plan | Preis | Umfang |
|---|---|---|
| Free | kostenlos, dauerhaft, ohne Konto | 5 Rechnungen pro Lauf, GoBD-Dateinamen und `index.csv` |
| Pro | 19 €/Jahr | unbegrenzt Rechnungen pro Lauf, ganze Jahre in einem Durchgang; Zahlung über ExtensionPay/Stripe |

## Datenschutz

InvoiceGrab hat keinen Server. Der Lauf passiert im Browser, in deiner bereits angemeldeten Amazon-Sitzung. Die Erweiterung fragt keine Zugangsdaten ab, lädt nichts hoch und liest außerhalb eines von dir gestarteten Laufs nichts.

- **storage** — Einstellungen und Lizenzstatus, lokal im Browser
- **downloads** — legt das fertige ZIP im Download-Ordner ab
- **www.amazon.de** — liest während eines Laufs deine eigenen Bestell- und Rechnungsseiten. Keine anderen Websites.

[Datenschutzerklärung](https://invoicegrab.de/privacy.html) · [Häufige Fragen](https://invoicegrab.de/faq.md)

Von Jens Laufer · jenslaufer@gmail.com
