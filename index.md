# Amazon Rechnungen herunterladen – einzeln oder alle auf einmal

Stand: 27. November 2026 · von Jens Laufer

Kurz: Melde dich auf amazon.de an, öffne „Meine Bestellungen“, klicke bei der Bestellung auf „Rechnung“ und wähle die Rechnung aus. Die PDF öffnet sich im Browser – speichern, fertig. Einen Sammel-Download für Privatkonten hat Amazon nicht. Alle Rechnungen eines Zeitraums auf einmal lädt die Browser-Erweiterung InvoiceGrab als ZIP.

- Chrome: [Chrome Web Store](https://chromewebstore.google.com/detail/gkjglloohfeojkcflpafcahfkabdflom)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/invoicegrab-amazon-rechnungen-/)
- Kostenlos: 5 Rechnungen pro Lauf. PRO 19 €/Jahr.

## Amazon-Rechnung am PC herunterladen

1. amazon.de öffnen und anmelden.
2. Oben rechts „Konto und Listen“ → „Meine Bestellungen“.
3. Zeitraum über dem Bestellverlauf wählen, Bestellung suchen.
4. Bei der Bestellung auf „Rechnung“ klicken (je nach Ansicht „Rechnung anzeigen“ oder „Rechnung drucken/herunterladen“) und die Rechnung wählen.
5. PDF speichern und eindeutig benennen, etwa Datum, Bestellnummer, Betrag.

Teillieferungen bekommen je eine eigene Rechnung. Lade alle, sonst passt die Summe nicht zur Abbuchung.

## Amazon-Rechnung am iPhone oder in der App

Menü (☰) oder Profil → „Meine Bestellungen“ → Bestellung → „Bestelldetails“ → „Rechnung anzeigen“ bzw. „Rechnung herunterladen“. Auf dem iPhone über Teilen → „In Dateien sichern“ speichern. Fehlt der Link, amazon.de in Safari als Desktop-Website öffnen und wie am PC vorgehen. Rechnungen erscheinen oft erst nach dem Versand. InvoiceGrab läuft nur in Chrome und Firefox am Rechner, nicht auf dem iPhone.

## Amazon Business: Rechnungen gesammelt herunterladen

Amazon Business hat einen eigenen Bereich „Meine Rechnungen“ mit Sammel-Download als ZIP. Zugriff haben Administratoren und die Rolle „Buchhaltung und Finanzen“. InvoiceGrab ist für private amazon.de-Konten gebaut und bietet keinen Business-Sammelabruf.

## Rechnung fehlt? Nur eine Bestellübersicht?

- Noch nicht versandt: Amazon stellt die Rechnung mit dem Versand aus.
- Marketplace-Händler: Der Händler stellt die Rechnung. Lädt er sie nicht hoch, gibt es nur eine Bestellübersicht. Anfordern über „Verkäufer kontaktieren“.
- Storniert oder digital: keine Rechnung bzw. an anderer Stelle.

Die Bestellübersicht ist keine Rechnung. Für den Vorsteuerabzug zählt die Rechnung des Verkäufers. Fehlt eine Rechnung zu einer Bestellung, die Amazon selbst verkauft hat, hilft der Amazon-Kundenservice. Ausführlich: [Amazon-Rechnung fehlt](https://invoicegrab.de/amazon-rechnung-fehlt.md)

## Alle Amazon-Rechnungen auf einmal herunterladen

Für private Konten hat Amazon keinen Sammel-Download. InvoiceGrab öffnet deine Bestellseite, lädt die Rechnungs-PDFs eines Zeitraums und legt sie als ZIP in den Download-Ordner. Benannt nach GoBD-Schema, mit einem CSV-Index, den dein Steuerberater direkt lesen kann. Jens Laufer hat damit seine eigenen 336 Amazon-Rechnungen von 2019 bis 2026 in einem Lauf geladen.

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

[Datenschutzerklärung](https://invoicegrab.de/privacy.html) · [Impressum](https://invoicegrab.de/impressum.html) · [Häufige Fragen](https://invoicegrab.de/faq.md) · [Ratgeber](https://invoicegrab.de/ratgeber.md)

Von Jens Laufer, Solytics GmbH · jens.laufer@solytics.de
