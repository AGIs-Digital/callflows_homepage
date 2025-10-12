import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import nodemailer from 'nodemailer';

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  planType?: string;
  userAgent?: string;
  timestamp?: number;
}

// Rate Limiting: Max 3 Nachrichten pro 15 Minuten pro IP
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 Minuten
  uniqueTokenPerInterval: 500,
});

// Spam-Detection: Einfache Keyword-Liste
const spamKeywords = [
  'viagra', 'cialis', 'casino', 'lottery', 'winner',
  'click here', 'buy now', 'limited time', 'act now',
  'crypto', 'bitcoin', 'investment opportunity'
];

function detectSpam(text: string): boolean {
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

// Validierung
function validateContactData(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
    return { valid: false, error: 'Name muss zwischen 2 und 100 Zeichen lang sein' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: 'Ungültige E-Mail-Adresse' };
  }

  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 2000) {
    return { valid: false, error: 'Nachricht muss zwischen 10 und 2000 Zeichen lang sein' };
  }

  // Spam-Detection
  const fullText = `${data.name} ${data.email} ${data.message}`;
  if (detectSpam(fullText)) {
    return { valid: false, error: 'Ihre Nachricht wurde als Spam erkannt' };
  }

  return { valid: true };
}

// E-Mail-Transporter mit Microsoft SMTP oder Fallback
function createMailTransporter() {
  const smtpConfig = {
    host: process.env.MICROSOFT_SMTP_HOST,
    port: parseInt(process.env.MICROSOFT_SMTP_PORT || '587'),
    secure: false, // true für Port 465, false für andere Ports
    auth: {
      user: process.env.MICROSOFT_SMTP_USER,
      pass: process.env.MICROSOFT_SMTP_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  };

  // Prüfe ob SMTP konfiguriert ist
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.warn('⚠️ SMTP nicht konfiguriert, verwende Test-Modus');
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }

  return nodemailer.createTransport(smtpConfig);
}

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting prüfen
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
    
    try {
      await limiter.check(3, ip);
    } catch {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie 15 Minuten bevor Sie erneut senden.' },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();
    
    // Validierung
    const validation = validateContactData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Subject basierend auf Source
    const subjectMap: Record<string, string> = {
      starter: 'Anfrage Starter-Paket',
      business: 'Anfrage Business-Paket',
      enterprise: 'Anfrage Enterprise-Paket',
      pilot: 'Anfrage Pilot-Projekt',
      contact: 'Neue Kontaktanfrage'
    };
    
    const subject = subjectMap[data.source || 'contact'] || 'Neue Kontaktanfrage';
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@callflows.de';

    // HTML E-Mail Template
    const htmlContent = `
<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${subject}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #004AAD;">
                <h1 style="color: #FFFFFF; margin: 0; font-size: 24px;">${subject}</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #004AAD; margin-top: 0; margin-bottom: 30px; font-size: 20px;">Neue Anfrage über callflows.de</h2>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <strong style="color: #004AAD;">Name:</strong>
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        ${data.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <strong style="color: #004AAD;">E-Mail:</strong>
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <a href="mailto:${data.email}" style="color: #004AAD; text-decoration: none;">${data.email}</a>
                                    </td>
                                </tr>
                                ${data.phone ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <strong style="color: #004AAD;">Telefon:</strong>
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <a href="tel:${data.phone}" style="color: #004AAD; text-decoration: none;">${data.phone}</a>
                                    </td>
                                </tr>
                                ` : ''}
                                ${data.planType ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <strong style="color: #004AAD;">Paket:</strong>
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        ${data.planType}
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td colspan="2" style="padding-top: 20px;">
                                        <strong style="color: #004AAD; display: block; margin-bottom: 10px;">Nachricht:</strong>
                                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-line; line-height: 1.6;">
${data.message}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top: 30px; padding: 15px; background-color: #FFB703; border-radius: 4px; text-align: center;">
                                <span style="color: #333; font-weight: bold; font-size: 14px;">
                                    ${subject}
                                </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 5px 0;">Diese E-Mail wurde über das Kontaktformular auf callflows.de gesendet</p>
                <p style="margin: 5px 0;">IP: ${ip}</p>
                <p style="margin: 5px 0;">${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

    // E-Mail senden
    const transporter = createMailTransporter();
    
    // Verwende info@callflows.de als Absender (muss mit SMTP-Auth übereinstimmen)
    const senderEmail = process.env.MICROSOFT_SMTP_USER || 'info@callflows.de';
    
    const mailOptions = {
      from: `"callflows.de Kontaktformular" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `${subject} - ${data.name}`,
      html: htmlContent,
      text: `
${subject}

Name: ${data.name}
E-Mail: ${data.email}
${data.phone ? `Telefon: ${data.phone}` : ''}
${data.planType ? `Paket: ${data.planType}` : ''}

Nachricht:
${data.message}

---
Gesendet über callflows.de am ${new Date().toLocaleString('de-DE')}
IP: ${ip}
      `.trim(),
      // Explizite Headers für HTML-E-Mails + Outlook-Kompatibilität
      headers: {
        'X-Mailer': 'callflows.de Contact Form',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'normal'
      }
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ E-Mail erfolgreich versendet:', info.messageId);
      
      return NextResponse.json({ 
        success: true,
        message: 'Nachricht erfolgreich gesendet'
      });
    } catch (emailError) {
      console.error('❌ E-Mail-Versand fehlgeschlagen:', emailError);
      
      // Fallback: Log zur manuellen Bearbeitung
      console.error('📧 KONTAKT-ANFRAGE (NICHT GESENDET):', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message.substring(0, 100) + '...',
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json(
        { error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

