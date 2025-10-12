# 📝 Outlook-Signatur für SMTP-E-Mails einrichten

## ⚠️ Das Problem mit Outlook-Signaturen

Wenn E-Mails via SMTP (z.B. über Nodemailer) gesendet werden, fügt Outlook **automatisch KEINE Signatur** hinzu. Signaturen werden nur bei E-Mails angehängt, die direkt über den Outlook-Client gesendet werden.

## 🎯 Lösungen

### Lösung 1: Exchange Transport Rule (Empfohlen für professionelle Umgebungen)

Eine **Transport Rule** fügt automatisch eine Signatur an ALLE ausgehenden E-Mails an – egal ob über SMTP, Outlook oder andere Clients.

#### Schritt-für-Schritt-Anleitung:

1. **Exchange Admin Center öffnen**
   - Gehe zu [https://admin.exchange.microsoft.com](https://admin.exchange.microsoft.com)
   - Melde dich mit deinem Admin-Account an

2. **Transport Rule erstellen**
   - Navigiere zu **"Nachrichtenfluss"** → **"Regeln"**
   - Klicke auf **"+ Regel hinzufügen"** → **"Neue Regel erstellen"**

3. **Regel konfigurieren**

   **Name:** `Signatur für info@callflows.de hinzufügen`

   **Bedingungen:**
   ```
   Anwenden auf: Der Absender ist
   Wert: info@callflows.de
   ```

   **Aktionen:**
   ```
   Folgende Aktion ausführen: Einen Haftungsausschluss anhängen
   Position: Haftungsausschluss anhängen
   Text: [Deine Signatur - siehe unten]
   Fallback: Umschließen (wenn Signatur nicht hinzugefügt werden kann)
   ```

4. **Signatur-HTML einfügen**

   Kopiere deine Signatur als HTML. Beispiel:

   ```html
   <br>
   <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
       <tr>
           <td style="padding-right: 20px; border-right: 2px solid #004AAD;">
               <strong style="font-size: 14px; color: #004AAD;">Timo Mustermann</strong><br>
               <span style="color: #666;">Geschäftsführer</span>
           </td>
           <td style="padding-left: 20px;">
               <strong>callflows.de</strong><br>
               KI-Telefonie für moderne Unternehmen<br>
               <a href="mailto:info@callflows.de" style="color: #004AAD;">info@callflows.de</a><br>
               <a href="https://www.callflows.de" style="color: #004AAD;">www.callflows.de</a><br>
               Tel: +49 (0) 123 456789
           </td>
       </tr>
   </table>
   ```

5. **Regel speichern und aktivieren**
   - Klicke auf **"Speichern"**
   - Die Regel ist sofort aktiv

#### Vorteile:
✅ Funktioniert für **alle** E-Mails (SMTP, Outlook, Mobile)  
✅ Zentral verwaltet – eine Änderung gilt für alle  
✅ Keine Code-Änderungen notwendig  
✅ Professionell und konsistent  

---

### Lösung 2: Signatur direkt im Code (Schnelle Lösung)

Wenn du keine Exchange Admin-Rechte hast oder eine schnelle Lösung brauchst, kannst du die Signatur direkt im HTML-Template einbauen.

#### Anleitung:

1. **Öffne:** `app/api/contact/route.ts`

2. **Suche nach:** (Zeile ~210)
   ```javascript
   <td style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
   ```

3. **Füge VOR dem `</table>` (am Ende des Body) folgendes ein:**

   ```javascript
   <tr>
       <td style="padding: 40px 20px 20px 20px;">
           <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 2px solid #004AAD; padding-top: 20px;">
               <tr>
                   <td style="padding: 20px;">
                       <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #333;">
                           <tr>
                               <td style="padding-right: 20px; border-right: 2px solid #004AAD; vertical-align: top;">
                                   <strong style="font-size: 15px; color: #004AAD;">Timo Mustermann</strong><br>
                                   <span style="color: #666; font-size: 12px;">Geschäftsführer</span>
                               </td>
                               <td style="padding-left: 20px; vertical-align: top;">
                                   <strong style="color: #004AAD;">callflows.de</strong><br>
                                   <span style="color: #666; font-size: 12px;">KI-Telefonie für moderne Unternehmen</span><br><br>
                                   <a href="mailto:info@callflows.de" style="color: #004AAD; text-decoration: none;">info@callflows.de</a><br>
                                   <a href="https://www.callflows.de" style="color: #004AAD; text-decoration: none;">www.callflows.de</a><br>
                                   <span style="color: #666;">Tel: +49 (0) 123 456789</span>
                               </td>
                           </tr>
                       </table>
                   </td>
               </tr>
           </table>
       </td>
   </tr>
   ```

4. **Passe die Daten an:**
   - Name: `Timo Mustermann`
   - Position: `Geschäftsführer`
   - E-Mail: `info@callflows.de`
   - Telefon: `+49 (0) 123 456789`
   - Website: `www.callflows.de`

#### Vorteile:
✅ Sofort verfügbar  
✅ Keine Admin-Rechte nötig  
✅ Volle Kontrolle über Design  

#### Nachteile:
❌ Muss bei Änderungen im Code angepasst werden  
❌ Nicht zentral verwaltet  

---

### Lösung 3: Dynamische Signatur aus Umgebungsvariablen

Für mehr Flexibilität kannst du die Signatur-Daten in Umgebungsvariablen auslagern.

#### Schritt 1: Umgebungsvariablen setzen

```env
EMAIL_SIGNATURE_NAME=Timo Mustermann
EMAIL_SIGNATURE_TITLE=Geschäftsführer
EMAIL_SIGNATURE_EMAIL=info@callflows.de
EMAIL_SIGNATURE_PHONE=+49 (0) 123 456789
EMAIL_SIGNATURE_WEBSITE=www.callflows.de
```

#### Schritt 2: Code anpassen

In `app/api/contact/route.ts`:

```typescript
// Nach Zeile 123 (nach recipientEmail)
const signatureHTML = process.env.EMAIL_SIGNATURE_NAME ? `
<tr>
    <td style="padding: 40px 20px 20px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 2px solid #004AAD; padding-top: 20px;">
            <tr>
                <td style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #333;">
                        <tr>
                            <td style="padding-right: 20px; border-right: 2px solid #004AAD; vertical-align: top;">
                                <strong style="font-size: 15px; color: #004AAD;">${process.env.EMAIL_SIGNATURE_NAME}</strong><br>
                                <span style="color: #666; font-size: 12px;">${process.env.EMAIL_SIGNATURE_TITLE}</span>
                            </td>
                            <td style="padding-left: 20px; vertical-align: top;">
                                <strong style="color: #004AAD;">callflows.de</strong><br>
                                <span style="color: #666; font-size: 12px;">KI-Telefonie für moderne Unternehmen</span><br><br>
                                <a href="mailto:${process.env.EMAIL_SIGNATURE_EMAIL}" style="color: #004AAD; text-decoration: none;">${process.env.EMAIL_SIGNATURE_EMAIL}</a><br>
                                <a href="https://${process.env.EMAIL_SIGNATURE_WEBSITE}" style="color: #004AAD; text-decoration: none;">${process.env.EMAIL_SIGNATURE_WEBSITE}</a><br>
                                <span style="color: #666;">Tel: ${process.env.EMAIL_SIGNATURE_PHONE}</span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </td>
</tr>
` : '';
```

Dann im HTML-Template VOR `</table>` einfügen:

```javascript
${signatureHTML}
    </table>
</body>
</html>`;
```

---

## 🧪 Signatur testen

### Test 1: Sende Test-E-Mail
1. Gehe auf deine Website: `https://callflows.de/kontakt`
2. Fülle das Kontaktformular aus
3. Sende ab

### Test 2: Prüfe E-Mail
1. Öffne dein E-Mail-Postfach
2. Prüfe, ob die E-Mail als **HTML** ankommt (nicht Plain-Text)
3. Prüfe, ob die **Signatur** am Ende der E-Mail erscheint
4. Prüfe, ob die **Formatierung** korrekt ist

### Test 3: Verschiedene E-Mail-Clients
- ✅ Outlook Desktop
- ✅ Outlook Web (office.com)
- ✅ Gmail (Web & Mobile)
- ✅ Apple Mail
- ✅ Thunderbird

---

## 📐 Outlook-Signatur-Best-Practices

### 1. Verwende Table-basiertes Layout
- Outlook unterstützt nur eingeschränkt CSS
- Verwende `<table>` statt `<div>` für Layout
- Inline-Styles statt externe CSS-Dateien

### 2. Vermeide diese Dinge
- ❌ Bilder mit relativen Pfaden → Verwende absolute URLs
- ❌ CSS-Klassen → Verwende Inline-Styles
- ❌ JavaScript → Wird nicht unterstützt
- ❌ Webfonts → Bleib bei Standard-Fonts

### 3. Optimale Größe
- Max. Breite: 600px
- Max. Höhe: 150px
- Bilder max. 50KB

### 4. Bilder einbinden
Falls du ein Logo in der Signatur möchtest:

```html
<img src="https://callflows.de/images/logo.png" 
     alt="callflows.de Logo" 
     width="120" 
     height="40" 
     style="display: block; border: 0;">
```

**Wichtig:** Bilder müssen **öffentlich zugänglich** sein (HTTPS-URL)!

---

## 🛠️ Signatur-Generator-Tools

Falls du keine Lust hast, HTML zu schreiben:

1. **[HubSpot Email Signature Generator](https://www.hubspot.com/email-signature-generator)** (kostenlos)
2. **[MySignature](https://www.mysignature.io/)** (kostenlos + Premium)
3. **[WiseStamp](https://www.wisestamp.com/)** (Premium)

Kopiere den generierten HTML-Code und füge ihn in den Transport Rule oder im Code ein.

---

## ✅ Checkliste

- [ ] Exchange Transport Rule erstellt ODER Signatur im Code eingefügt
- [ ] Signatur-Daten (Name, Titel, E-Mail, Telefon) angepasst
- [ ] Test-E-Mail gesendet
- [ ] E-Mail kommt als HTML an (nicht Plain-Text)
- [ ] Signatur wird korrekt angezeigt
- [ ] Formatierung ist korrekt in Outlook, Gmail & Co.

---

**Hinweis:** Exchange Transport Rules haben eine Priorität und werden in der Reihenfolge ausgeführt, wie sie erstellt wurden. Falls du mehrere Regeln hast, achte auf die Reihenfolge!

