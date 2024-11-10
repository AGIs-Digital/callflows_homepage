import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../lib/email';

// Lade .env.local aus dem Root-Verzeichnis
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEmail() {
  console.log("🚀 Starte E-Mail-Test...");
  
  // Debug: Zeige geladene Umgebungsvariablen
  console.log("📧 E-Mail-Konfiguration:");
  console.log({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("\n🔄 Teste SMTP-Verbindung...");
    await transporter.verify();
    console.log("✅ SMTP-Verbindung erfolgreich!");

    console.log("\n📨 Sende Test-E-Mail...");
    const info = await transporter.sendMail({
      from: '"Callflows" <noreply@callflows.de>',
      to: "timo.goltz@gmail.com",
      subject: "Callflows Test E-Mail",
      html: emailTemplate(`
        <div class="header">
          <h1>Test E-Mail von Callflows</h1>
        </div>
        <div class="content">
          <p>Wenn Sie diese E-Mail sehen, funktioniert das E-Mail-System korrekt.</p>
          <p>Zeitstempel: ${new Date().toLocaleString()}</p>
          <center>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">
              Zur Website
            </a>
          </center>
        </div>
      `)
    });

    console.log("✅ E-Mail erfolgreich gesendet!");
    console.log("📬 Message ID:", info.messageId);
    console.log("📧 Gesendet an:", info.envelope.to.join(", "));
    
  } catch (error) {
    console.error("\n❌ Fehler aufgetreten:");
    console.error(error);
    
    if (typeof error === 'object' && error !== null) {
      const err = error as { code?: string };
      if (err.code === 'EAUTH') {
        console.error("\n⚠️ Authentifizierungsfehler - Überprüfen Sie Benutzername und Passwort");
      } else if (err.code === 'ESOCKET') {
        console.error("\n⚠️ Verbindungsfehler - Überprüfen Sie Host und Port");
      }
    }
  }
}

testEmail();
