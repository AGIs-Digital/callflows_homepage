# Environment Variables

## Frontend (Next.js)

```bash
# .env.local (Git-Ignored, niemals committen!)

# n8n Webhook URL (Production)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://YOUR-N8N-INSTANCE.app.n8n.cloud/webhook/widget-call

# Cloudflare Turnstile (optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...

# Development Mode
NODE_ENV=development
```

### Wichtig

- `NEXT_PUBLIC_*` = Im Browser sichtbar (Client-seitig)
- Secrets (API Keys, Passwörter) **NIEMALS** mit `NEXT_PUBLIC_` prefix!

---

## Backend (n8n)

In n8n: **Settings** → **Environments**

```bash
# Cloudflare Turnstile Secret (Server-seitig)
TURNSTILE_SECRET_KEY=0x4AAAAAAA...

# Redis Connection (Upstash)
REDIS_URL=rediss://default:PASSWORD@ENDPOINT:PORT

# IPInfo.io API Key (optional)
IPINFO_TOKEN=YOUR_IPINFO_TOKEN

# OpenAI API Key (GPT-4o)
OPENAI_API_KEY=sk-...

# SMTP Credentials (bereits in n8n-Credentials, aber falls benötigt)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=security@callflows.de
SMTP_PASSWORD=APP_PASSWORD
```

### Zugriff in n8n

```javascript
// In n8n-Nodes:
{{ $env.TURNSTILE_SECRET_KEY }}
{{ $env.REDIS_URL }}
{{ $env.IPINFO_TOKEN }}
{{ $env.OPENAI_API_KEY }}
```

---

## Security Best Practices

1. **Niemals Secrets in Git committen**
   - `.env.local` ist in `.gitignore`
   - Keys regelmäßig rotieren

2. **Separate Keys für Dev/Staging/Production**
   ```bash
   # .env.development
   NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/...
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA # Test-Key

   # .env.production
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.callflows.de/webhook/...
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA... # Production-Key
   ```

3. **Key-Rotation-Schedule**
   - Turnstile Keys: Alle 90 Tage
   - OpenAI Keys: Alle 180 Tage
   - SMTP-Passwörter: Alle 365 Tage

---

## Testing

### Development (localhost)

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/widget-call
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

→ Turnstile-Test-Key gibt immer `success: true`.

### Staging (Preview-Deployments)

```bash
# .env.staging
NODE_ENV=production
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-staging.callflows.de/webhook/widget-call
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA... # Staging-Key
```

### Production (callflows.de)

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.callflows.de/webhook/widget-call
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA... # Production-Key
```

---

## Troubleshooting

### Fehler: "Webhook URL not configured"

**Lösung**: `.env.local` erstellen und `NEXT_PUBLIC_N8N_WEBHOOK_URL` setzen.

### Fehler: "Turnstile not ready"

**Lösung**: 
1. Check ob `NEXT_PUBLIC_TURNSTILE_SITE_KEY` gesetzt ist
2. Browser-Console prüfen: `window.turnstile` vorhanden?
3. Falls nicht: Script-Blocking durch Ad-Blocker?

### Fehler: "TURNSTILE_SECRET_KEY not found" (n8n)

**Lösung**: In n8n → Settings → Environments → `TURNSTILE_SECRET_KEY` hinzufügen.

---

## Deployment-Checklist

- [ ] `.env.local` erstellt (niemals committen!)
- [ ] `NEXT_PUBLIC_N8N_WEBHOOK_URL` gesetzt
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` gesetzt (optional)
- [ ] n8n-Environment-Variablen konfiguriert
- [ ] Test-Request gesendet (Happy Path)
- [ ] Spam-Request gesendet (sollte geblockt werden)

