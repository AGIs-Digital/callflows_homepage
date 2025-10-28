# Cloudflare Turnstile Setup

## Übersicht

**Cloudflare Turnstile** ist eine **DSGVO-konforme**, unsichtbare Alternative zu Google reCAPTCHA.

### Vorteile gegenüber reCAPTCHA

| Feature                | Turnstile           | reCAPTCHA v3        |
|------------------------|---------------------|---------------------|
| **DSGVO-konform**      | ✅ Ja               | ⚠️ Grauzone         |
| **Tracking**           | ❌ Nein             | ✅ Ja (Google)      |
| **Sichtbarkeit**       | 👻 Unsichtbar       | 👻 Unsichtbar       |
| **Preis**              | 💰 Free (1M/Monat)  | 💰 Free (1M/Monat)  |
| **Performance**        | 🚀 ~200ms           | 🐌 ~500ms           |
| **Bot-Detection**      | 🤖 KI-basiert       | 🤖 KI-basiert       |

---

## Setup (Schritt für Schritt)

### 1. Turnstile in Cloudflare aktivieren

1. **Cloudflare Dashboard** öffnen: https://dash.cloudflare.com/
2. **Turnstile** → **Add Site**
3. **Domain**: `callflows.de` (oder `*.callflows.de` für Subdomains)
4. **Widget Mode**: **Managed** (empfohlen)
   - Managed: Cloudflare entscheidet automatisch (unsichtbar → Challenge)
   - Non-Interactive: Immer unsichtbar
   - Invisible: Immer unsichtbar (veraltert, nutze Managed)
5. **Erstellen** → **Site Key** + **Secret Key** kopieren

### 2. Environment-Variablen setzen

```bash
# .env.local
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA... # Nur Server-seitig (n8n)
```

**Wichtig**: Site Key ist **public**, Secret Key ist **privat** (nur in n8n verwenden).

### 3. Widget aktivieren (optional)

Turnstile ist standardmäßig **deaktiviert**. Um es zu aktivieren:

```typescript
// components/widget-call/widget-call.tsx
const { startCall } = useWidgetCall({
  enableTurnstile: true, // Turnstile aktivieren
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
});
```

### 4. n8n-Workflow erweitern

**⚠️ Wichtig**: Der Turnstile-Addon wurde bereits korrigiert:
- ❌ **Nicht** `$now() + 3600000` verwenden (ergibt Unsinn)
- ✅ Redis-Value: `"turnstile_failed"` (simpler String)
- ✅ TTL: `3600` (1 Stunde)

In `docs/n8n-turnstile-verification-addon.json`:

```json
{
  "parameters": {
    "url": "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "secret",
          "value": "={{ $env.TURNSTILE_SECRET_KEY }}"
        },
        {
          "name": "response",
          "value": "={{ $json.metadata.turnstileToken }}"
        },
        {
          "name": "remoteip",
          "value": "={{ $('Extract IP & Metadata').item.json.ip }}"
        }
      ]
    },
    "options": {}
  },
  "id": "turnstile-verify",
  "name": "Turnstile: Verify Token",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "position": [450, 500]
}
```

Response-Check:

```json
{
  "parameters": {
    "conditions": {
      "conditions": [
        {
          "id": "success-check",
          "leftValue": "={{ $json.success }}",
          "rightValue": true,
          "operator": {
            "type": "boolean",
            "operation": "true"
          }
        }
      ]
    }
  },
  "id": "if-turnstile-valid",
  "name": "Turnstile Valid?",
  "type": "n8n-nodes-base.if",
  "typeVersion": 2,
  "position": [650, 500]
}
```

Wenn `success: false`:
- → Redis: Block IP (1h) mit `SET blocked:IP "turnstile_failed" EX 3600`
- → Log als "turnstile_failed" (Google Sheets)
- → Respond 403 Forbidden mit `retryAfter: 3600`

---

## Testing

### 1. Development-Mode (localhost)

Cloudflare bietet **Test-Keys** für localhost:

```bash
# .env.local (Development)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Wichtig**: Diese Keys **immer auf `success: true`** → für echte Tests auf Production testen.

### 2. Production-Test (callflows.de)

```bash
# Browser-Console (callflows.de)
# Widget öffnen → Network-Tab → POST /webhook/widget-call
# Payload prüfen:
{
  "metadata": {
    "turnstileToken": "0.AQAAA....", // Token vorhanden?
    ...
  }
}

# n8n-Execution öffnen → "Turnstile: Verify Token"
# Response prüfen:
{
  "success": true,
  "challenge_ts": "2025-10-28T10:30:00.000Z",
  "hostname": "callflows.de"
}
```

### 3. Force-Fail-Test (Bot-Simulation)

In Browser-Console:

```javascript
// Überschreibe Turnstile mit Fake-Token
localStorage.setItem('debug_turnstile', 'XXXX.FAIL.XXXX');
```

→ n8n sollte Request mit `403 Forbidden` ablehnen.

---

## Error-Handling

### Client-seitig (Widget)

```typescript
const { error } = useWidgetCall({ enableTurnstile: true });

if (error === 'TURNSTILE_FAILED') {
  // Zeige Fehlermeldung
  alert('Bot-Prüfung fehlgeschlagen. Bitte Browser aktualisieren.');
}
```

### Server-seitig (n8n)

Turnstile kann folgende Fehler zurückgeben:

| Error Code                     | Bedeutung                          | Aktion                    |
|--------------------------------|------------------------------------|---------------------------|
| `missing-input-secret`         | Secret-Key fehlt                   | Env-Var prüfen            |
| `invalid-input-secret`         | Secret-Key ungültig                | Key in Cloudflare prüfen  |
| `missing-input-response`       | Token fehlt                        | Widget-Bug (Frontend)     |
| `invalid-input-response`       | Token ungültig/abgelaufen          | User wiederholen lassen   |
| `timeout-or-duplicate`         | Token bereits verwendet            | User wiederholen lassen   |
| `internal-error`               | Cloudflare-Fehler                  | Retry (exponential backoff)|

---

## Performance-Optimierung

### Lazy-Loading

Turnstile-Script nur laden, wenn Widget geöffnet wird:

```typescript
// hooks/use-turnstile.ts (bereits implementiert)
useEffect(() => {
  if (!window.turnstile) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}, []);
```

### Token-Caching (nicht empfohlen)

Token sind **5 Minuten gültig**. Du könntest Token in `sessionStorage` cachen, aber:
- ⚠️ Security-Risk (Token-Replay-Attacken)
- ⚠️ Cloudflare erkennt Token-Reuse → `timeout-or-duplicate`

**Empfehlung**: Für jeden Call neuen Token generieren.

---

## Monitoring

### Turnstile-Dashboard (Cloudflare)

https://dash.cloudflare.com/?to=/:account/turnstile

Zeigt:
- **Requests/Tag**
- **Success Rate** (sollte > 95% sein)
- **Challenge Rate** (wie oft interaktive Challenge angezeigt wird)
- **Bot-Score-Verteilung**

### n8n-Logging

In n8n-Workflow:

```json
{
  "node": "Log Turnstile Stats",
  "type": "n8n-nodes-base.set",
  "parameters": {
    "assignments": {
      "assignments": [
        {
          "name": "turnstile_success",
          "value": "={{ $json.success }}"
        },
        {
          "name": "turnstile_challenge_ts",
          "value": "={{ $json.challenge_ts }}"
        },
        {
          "name": "turnstile_hostname",
          "value": "={{ $json.hostname }}"
        }
      ]
    }
  }
}
```

→ Zu Google Sheets loggen für Analyse.

---

## Kosten

| Requests/Monat | Cloudflare Turnstile | Google reCAPTCHA |
|----------------|----------------------|------------------|
| 0 - 1M         | 0 €                  | 0 €              |
| 1M - 10M       | 20 €                 | 200 €            |
| 10M+           | Custom Pricing       | Custom Pricing   |

**Für callflows**: ~1k Requests/Monat → **0 €**

---

## Migration von reCAPTCHA zu Turnstile

Falls du bereits reCAPTCHA nutzt:

1. **Parallel-Betrieb**: Beide Systeme gleichzeitig testen
2. **A/B-Test**: 50% Turnstile, 50% reCAPTCHA
3. **Success-Rate vergleichen**
4. **Vollständiger Umstieg** nach 1-2 Wochen

```typescript
const isTestGroup = Math.random() < 0.5;

const { startCall } = useWidgetCall({
  enableTurnstile: isTestGroup,
  enableRecaptcha: !isTestGroup
});
```

---

## FAQ

### Warum sehe ich manchmal eine Challenge?

Turnstile-Mode "Managed" zeigt interaktive Challenge bei:
- VPN/Proxy-Nutzung
- Verdächtigem Browser-Verhalten
- IP-Reputation < 50

→ Wenn > 10% der User eine Challenge sehen: Mode auf "Non-Interactive" ändern.

### Funktioniert Turnstile ohne Cloudflare-Proxy?

**Ja!** Turnstile ist **unabhängig** vom Cloudflare-Proxy. Du kannst es auch mit ionos-Webhosting nutzen.

### DSGVO-Anforderungen

Turnstile ist DSGVO-konform, aber du solltest in deiner Datenschutzerklärung erwähnen:

> Zum Schutz vor Spam und Missbrauch nutzen wir Cloudflare Turnstile. Dabei werden keine personenbezogenen Daten an Dritte übermittelt. Weitere Infos: https://www.cloudflare.com/products/turnstile/

---

## Next Steps

1. ✅ **Turnstile in Cloudflare aktivieren**
2. ✅ **Site Key + Secret Key kopieren**
3. ✅ **Environment-Variablen setzen**
4. ⏳ **n8n-Workflow erweitern** (Token-Verification)
5. ⏳ **Production testen** (callflows.de)
6. ⏳ **Success-Rate überwachen** (Cloudflare Dashboard)

---

## Support

- Cloudflare Turnstile Docs: https://developers.cloudflare.com/turnstile/
- n8n-Integration Beispiele: https://community.n8n.io/
- **Timo**: Falls Token-Verification in n8n nicht funktioniert → Execution-Logs teilen.

