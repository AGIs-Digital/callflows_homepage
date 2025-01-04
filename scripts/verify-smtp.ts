import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../lib/email';

// Lade Umgebungsvariablen
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verifySmtpConfig() {
  console.log("\n🔍 SMTP-Konfiguration testen");
  console.log("================================");
  
  // Überprüfe erforderliche Umgebungsvariablen
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error("❌ Fehlende Umgebungsvariablen:", missingVars.join(", "));
    process.exit(1);
  }

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
    // Test 1: SMTP-Verbindung
    console.log("\n🔄 Test 1: SMTP-Verbindung prüfen...");
    await transporter.verify();
    console.log("✅ SMTP-Verbindung erfolgreich!");

    // Test 2: Test-E-Mail senden
    console.log("\n🔄 Test 2: Test-E-Mail senden...");
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "timo.goltz@gmail.com", // Bitte ändern Sie diese E-Mail-Adresse
      subject: "Callflows SMTP Test",
      html: emailTemplate(`
        <div class="header">
          <h1>SMTP Test erfolgreich</h1>
        </div>
        <div class="content">
          <p>Diese E-Mail bestätigt die korrekte SMTP-Konfiguration.</p>
          <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
        </div>
      `)
    });

    console.log("\n✅ Test-E-Mail erfolgreich gesendet!");
    console.log("📧 Message-ID:", info.messageId);
    console.log("📬 Empfänger:", info.envelope.to.join(", "));

  } catch (error) {
    console.error("\n❌ Fehler aufgetreten:");
    
    if (error instanceof Error) {
      console.error(`Fehlertyp: ${error.name}`);
      console.error(`Fehlermeldung: ${error.message}`);
      
      if ('code' in error) {
        const errorCode = (error as any).code;
        switch(errorCode) {
          case 'EAUTH':
            console.error("\n⚠️ Authentifizierungsfehler - Überprüfen Sie Benutzername und Passwort");
            break;
          case 'ESOCKET':
            console.error("\n⚠️ Verbindungsfehler - Überprüfen Sie Host und Port");
            break;
          case 'ECONNECTION':
            console.error("\n⚠️ Verbindungsfehler - Server nicht erreichbar");
            break;
          default:
            console.error(`\n⚠️ Unbekannter Fehler (Code: ${errorCode})`);
        }
      }
    }
    
    process.exit(1);
  }
}

verifySmtpConfig(); 