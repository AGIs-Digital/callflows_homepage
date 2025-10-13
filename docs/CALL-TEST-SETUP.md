# Call-Test Widget Setup

## Architektur

```
Widget (Frontend) 
  → /api/call-test.php (PHP-Bridge mit Security)
    → n8n Webhook (geheim)
      → ElevenLabs API
```

## Server-Setup (Wichtig!)

### 1. Umgebungsvariablen setzen

Auf deinem Server (nicht in Git!) müssen folgende Umgebungsvariablen gesetzt werden:

```bash
# .htaccess oder Server-Konfiguration
SetEnv N8N_WEBHOOK_URL "https://dein-n8n-server.de/webhook/abc-xyz-123"
SetEnv N8N_WEBHOOK_SECRET "dein-geheimer-token-hier"
```

**Alternative: PHP-Datei** (außerhalb von public/)
```php
// /config/env.php (nicht public zugänglich!)
<?php
putenv('N8N_WEBHOOK_URL=https://dein-n8n-server.de/webhook/abc-xyz-123');
putenv('N8N_WEBHOOK_SECRET=dein-geheimer-token-hier');
?>
```

Dann in `call-test.php` einbinden:
```php
require_once __DIR__ . '/../../config/env.php';
```

### 2. Berechtigungen setzen

```bash
chmod 644 public/api/call-test.php
chmod 666 public/api/call_test_rate_limit.json  # wird automatisch erstellt
chmod 666 public/api/call-test.log              # wird automatisch erstellt
```

### 3. n8n Webhook konfigurieren

In deinem n8n Workflow:

**Webhook-Node Einstellungen:**
- HTTP Method: `POST`
- Path: `/webhook/dein-custom-path`
- Authentication: `Header Auth`
  - Header Name: `Authorization`
  - Header Value: `Bearer dein-geheimer-token-hier`

**Webhook empfängt:**
```json
{
  "customer_name": "Max Mustermann",
  "customer_phone": "+4915212345678"
}
```

**In n8n verwendest du:**
- `{{ $json.customer_name }}`
- `{{ $json.customer_phone }}`

## Security Features

✅ **Rate Limiting**: 3 Calls pro 10 Minuten pro IP  
✅ **Telefonnummer-Validierung**: E.164 Standard (international)  
✅ **Name-Validierung**: 2-100 Zeichen  
✅ **Webhook-URL versteckt**: Nur auf Server sichtbar  
✅ **CORS-Schutz**: Nur callflows.de Domains erlaubt  
✅ **Logging**: Alle Requests werden protokolliert  
✅ **Spam-Schutz**: Server-seitige Validierung  

## Monitoring

**Log-Datei überwachen:**
```bash
tail -f public/api/call-test.log
```

**Rate-Limit Cache prüfen:**
```bash
cat public/api/call_test_rate_limit.json
```

## Development Mode

Falls `N8N_WEBHOOK_URL` nicht gesetzt ist:
- Simuliert erfolgreichen Call
- Loggt Request als `[DEV]`
- Gibt Mock-Response zurück

**Tipp:** Setze Env-Vars nur in Production, dann funktioniert Dev-Mode automatisch!

## Error Handling

**429 Too Many Requests**
→ Rate Limit überschritten (10 Minuten warten)

**400 Bad Request**
→ Ungültige Telefonnummer oder Name

**500 Internal Server Error**
→ n8n Webhook nicht erreichbar (Log prüfen!)

## Testing

**Lokaler Test:**
```bash
curl -X POST https://callflows.de/api/call-test.php \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+4915212345678",
    "customerName": "Test User"
  }'
```

**Erwartete Response:**
```json
{
  "success": true,
  "message": "Anruf erfolgreich gestartet für Test User",
  "callId": "call_1697123456",
  "estimatedCallTime": "30-60 Sekunden"
}
```

