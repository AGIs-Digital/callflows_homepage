import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../lib/email';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEmail() {
  console.log("🚀 Starte E-Mail-Test...");
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.de',
    port: 587,
    secure: true,
    auth: {
      user: 'info@callflows.de',
      pass: 'info@callflows.dePW25!'
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
      to: "kontakt@callflows.de",
      subject: "Callflows SMTP Test",
      html: emailTemplate(`
        <div class="header">
          <h1>SMTP-Test erfolgreich</h1>
        </div>
        <div class="content">
          <p>Die E-Mail-Konfiguration funktioniert korrekt.</p>
          <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
        </div>
      `)
    });

    console.log("✅ E-Mail erfolgreich gesendet!");
    console.log("📬 Message ID:", info.messageId);
    
  } catch (error) {
    console.error("\n❌ Fehler:", error);
    process.exit(1);
  }
}

testEmail();