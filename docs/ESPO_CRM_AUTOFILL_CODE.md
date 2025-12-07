# EspoCRM Login Auto-Fill Code

## Übersicht
Dieser Code muss auf der EspoCRM-Login-Seite eingefügt werden, um das Username-Feld automatisch auszufüllen. 

**WICHTIG:** Der Username wird jetzt im `localStorage` gespeichert (nicht mehr als Query-Parameter), um Endlosschleifen zu vermeiden.

## Einfügen des Codes

### Option 1: Direkt in die Login-Template-Datei
Füge den folgenden Code in die EspoCRM-Login-Template-Datei ein (normalerweise `client/custom/src/views/user/login.tpl` oder ähnlich):

```javascript
<script>
(function() {
  'use strict';
  
  // Warte, bis das DOM vollständig geladen ist
  function fillUsernameField() {
    // Lese Username aus Cookie oder localStorage (wird von callflows.de gesetzt)
    let username = null;
    
    // Versuche zuerst Cookie zu lesen (funktioniert über Subdomains)
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }
    
    try {
      // Versuche Cookie zu lesen
      const cookieUsername = getCookie('callflows_username');
      const cookieTimestamp = getCookie('callflows_username_timestamp');
      
      if (cookieUsername && cookieTimestamp) {
        const age = Date.now() - parseInt(cookieTimestamp, 10);
        if (age < 5 * 60 * 1000) { // 5 Minuten
          username = decodeURIComponent(cookieUsername);
          // Lösche Cookie nach dem Auslesen (einmalige Verwendung)
          document.cookie = 'callflows_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.callflows.de;';
          document.cookie = 'callflows_username_timestamp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.callflows.de;';
        }
      }
      
      // Fallback: localStorage (falls Cookie nicht funktioniert)
      if (!username) {
        const storedUsername = localStorage.getItem('callflows_username');
        const storedTimestamp = localStorage.getItem('callflows_username_timestamp');
        
        if (storedUsername && storedTimestamp) {
          const age = Date.now() - parseInt(storedTimestamp, 10);
          if (age < 5 * 60 * 1000) {
            username = storedUsername;
            localStorage.removeItem('callflows_username');
            localStorage.removeItem('callflows_username_timestamp');
          }
        }
      }
    } catch (e) {
      // Cookie/localStorage nicht verfügbar - Fallback zu Query-Parameter
      const urlParams = new URLSearchParams(window.location.search);
      username = urlParams.get('username');
      if (username) {
        username = decodeURIComponent(username);
      }
    }
    
    if (!username) {
      return; // Kein Username vorhanden
    }
    
    // Versuche verschiedene Feld-Selektoren
    // Basierend auf Screenshot: #field-userName ist das Hauptfeld
    const selectors = [
      '#field-userName',
      'input[name="username"]',
      'input[id*="userName"]',
      'input[id*="username"]',
      'input[autocomplete="username"]',
      'input.form-control[name="username"]'
    ];
    
    let field = null;
    for (const selector of selectors) {
      field = document.querySelector(selector);
      if (field && field instanceof HTMLInputElement) {
        break;
      }
    }
    
    if (field && field instanceof HTMLInputElement) {
      // Fülle das Feld aus
      field.value = username;
      field.focus();
      
      // Trigger Events für EspoCRM (falls benötigt)
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
      field.dispatchEvent(new Event('blur', { bubbles: true }));
      
      return true;
    }
    
    return false;
  }
  
  // Versuche sofort das Feld auszufüllen
  if (fillUsernameField()) {
    return; // Erfolgreich ausgefüllt
  }
  
  // Falls noch nicht gefüllt, warte auf DOM-Update
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillUsernameField);
  }
  
  // Fallback: Nach kurzer Verzögerung (für langsame Seiten)
  setTimeout(fillUsernameField, 100);
  setTimeout(fillUsernameField, 500);
  setTimeout(fillUsernameField, 1000);
})();
</script>
```

### Option 2: Als Custom JavaScript-Datei
Erstelle eine neue Datei `client/custom/src/js/login-autofill.js` mit folgendem Inhalt:

```javascript
(function() {
  'use strict';
  
  function fillUsernameField() {
    let username = null;
    
    try {
      const storedUsername = localStorage.getItem('callflows_username');
      const storedTimestamp = localStorage.getItem('callflows_username_timestamp');
      
      if (storedUsername && storedTimestamp) {
        const age = Date.now() - parseInt(storedTimestamp, 10);
        if (age < 5 * 60 * 1000) {
          username = storedUsername;
          localStorage.removeItem('callflows_username');
          localStorage.removeItem('callflows_username_timestamp');
        }
      }
    } catch (e) {
      const urlParams = new URLSearchParams(window.location.search);
      username = urlParams.get('username');
      if (username) {
        username = decodeURIComponent(username);
      }
    }
    
    if (!username) {
      return;
    }
    
    const selectors = [
      '#field-userName',
      'input[name="username"]',
      'input[id*="userName"]',
      'input[autocomplete="username"]'
    ];
    
    for (const selector of selectors) {
      const field = document.querySelector(selector);
      if (field && field instanceof HTMLInputElement) {
        field.value = username;
        field.focus();
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillUsernameField);
  } else {
    fillUsernameField();
  }
  
  setTimeout(fillUsernameField, 500);
  setTimeout(fillUsernameField, 1000);
})();
```

Dann in der Login-Template-Datei einbinden:

```html
<script src="client/custom/src/js/login-autofill.js"></script>
```

## Funktionsweise

1. **localStorage lesen**: Der Code liest den `callflows_username` aus dem localStorage (wird von callflows.de gesetzt)
2. **Zeitstempel prüfen**: Prüft, ob der Username nicht älter als 5 Minuten ist
3. **Feld finden**: Sucht nach dem Username-Feld mit verschiedenen Selektoren
4. **Feld ausfüllen**: Setzt den Wert und fokussiert das Feld
5. **Events triggern**: Löst Input- und Change-Events aus, damit EspoCRM die Änderung erkennt
6. **Aufräumen**: Entfernt den Username aus localStorage nach dem Auslesen (einmalige Verwendung)

## Unterstützte URLs

- Admin-Login: `https://app.callflows.de/`
- Customer-Portal: `https://app.callflows.de/portal/user/`

**Wichtig:** Die URLs enthalten KEINE Query-Parameter mehr. Der Username wird über localStorage übertragen.

## Sicherheit

- Der Username wird nach 5 Minuten automatisch ungültig
- Der Username wird nach dem Auslesen aus localStorage entfernt (einmalige Verwendung)
- Fallback zu Query-Parameter, falls localStorage nicht verfügbar ist
- Der Code ist in einer IIFE (Immediately Invoked Function Expression) gekapselt, um Namespace-Konflikte zu vermeiden

## Testing

Nach dem Einfügen des Codes:
1. Öffne `https://callflows.de/login` und gib eine E-Mail ein
2. Klicke auf "Weiter zum Portal"
3. Du wirst zu `https://app.callflows.de/` (oder `/portal/user/`) weitergeleitet
4. Das Username-Feld sollte automatisch mit der eingegebenen E-Mail ausgefüllt sein

## Vorteile dieser Lösung

- ✅ **Keine Endlosschleifen**: Keine Query-Parameter mehr, die immer wieder angehängt werden
- ✅ **Saubere URLs**: Die EspoCRM-URLs bleiben sauber ohne Parameter
- ✅ **Sicher**: Username wird nach einmaliger Verwendung gelöscht
- ✅ **Zeitbegrenzt**: Username ist nur 5 Minuten gültig
