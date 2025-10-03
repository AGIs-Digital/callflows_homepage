import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

// Rate Limiting: Max 3 Anrufe pro 10 Minuten pro IP
const limiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 Minuten
  uniqueTokenPerInterval: 500, // Max 500 unique IPs pro Interval
});

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting prüfen
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
    
    try {
      await limiter.check(3, ip); // Max 3 Anfragen pro IP
    } catch {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie einige Minuten.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { phoneNumber, customerName, timestamp } = body;

    // Validierung
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return NextResponse.json(
        { error: 'Telefonnummer ist erforderlich' },
        { status: 400 }
      );
    }

    if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name ist erforderlich und muss mindestens 2 Zeichen haben' },
        { status: 400 }
      );
    }

    // Deutsche Telefonnummer validieren
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    const isValidGerman = /^\+49\d{10,11}$/.test(cleanNumber) || /^0\d{9,10}$/.test(cleanNumber);
    
    if (!isValidGerman) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige deutsche Telefonnummer ein' },
        { status: 400 }
      );
    }

    // Nummer normalisieren (zu +49 Format)
    let normalizedNumber = cleanNumber;
    if (cleanNumber.startsWith('0')) {
      normalizedNumber = '+49' + cleanNumber.slice(1);
    }

    // Webhook Payload für n8n → elevenlabs Integration
    const webhookPayload = {
      phoneNumber: normalizedNumber,
      customerName: customerName.trim(),
      timestamp: timestamp || new Date().toISOString(),
      source: 'callflows_website',
      callType: 'demo_call',
      userAgent: request.headers.get('user-agent'),
      ip: ip,
      // Zusätzliche Metadaten für n8n
      leadData: {
        name: customerName.trim(),
        phone: normalizedNumber,
        source: 'website_widget',
        campaign: 'ki_callflow_demo',
        requestedAt: new Date().toISOString()
      }
    };

    // n8n Webhook URL für Synthflow Integration
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
    const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;
    
    if (!N8N_WEBHOOK_URL) {
      // Development Mode: Simuliere erfolgreichen Anruf
      console.log('🔥 DEMO CALL TRIGGERED (DEV MODE):', webhookPayload);
      
      // Simuliere API Delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        success: true,
        message: `Demo-Anruf erfolgreich gestartet für ${customerName.trim()}`,
        callId: `demo_${Date.now()}`,
        estimatedCallTime: '30-60 Sekunden'
      });
    }

    // Production: n8n Webhook Call mit Query-Parametern
    const webhookUrl = new URL(N8N_WEBHOOK_URL);
    webhookUrl.searchParams.append('phone', normalizedNumber);
    webhookUrl.searchParams.append('name', customerName.trim());
    
    const webhookResponse = await fetch(webhookUrl.toString(), {
      method: 'GET', // n8n erwartet GET laut Screenshot
      headers: {
        'User-Agent': 'callflows-website/1.0',
        'X-Webhook-Source': 'callflows-widget',
        ...(N8N_WEBHOOK_SECRET && { 'Authorization': `Bearer ${N8N_WEBHOOK_SECRET}` })
      }
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed: ${webhookResponse.status}`);
    }

    const result = await webhookResponse.json();

    // Logging für Monitoring
    console.log(`✅ Call initiated for ${customerName.trim()} (${normalizedNumber}) at ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: `Anruf erfolgreich gestartet für ${customerName.trim()}`,
      callId: result.callId || `call_${Date.now()}`,
      estimatedCallTime: '30-60 Sekunden'
    });

  } catch (error) {
    console.error('❌ Call test error:', error);
    
    return NextResponse.json(
      { 
        error: 'Anruf konnte nicht gestartet werden. Bitte versuchen Sie es später erneut.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS für CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
