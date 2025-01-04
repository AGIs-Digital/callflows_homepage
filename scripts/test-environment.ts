import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../lib/email';

// Umgebung aus Kommandozeilenargument
const env = process.argv[2] || 'local';
const envFile = env === 'local' ? '.env.local' : `.env.${env}`;

console.log(`🌍 Teste ${env.toUpperCase()} Umgebung`);
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

async function testEnvironment() {
  // Konfiguration anzeigen (ohne sensitive Daten)
  console.log("\n📋 Aktuelle Konfiguration:");
  console.log({
    environment: env,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_FROM,
    appUrl: process.env.NEXT_PUBLIC_APP_URL
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
    // SMTP-Verbindung testen
    await transporter.verify();
    console.log("\n✅ SMTP-Verbindung erfolgreich!");

    // Test-E-Mail senden
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "timo.goltz@gmail.com",
      subject: `[${env.toUpperCase()}] SMTP Test`,
      html: emailTemplate(`
        <div class="header">
          <h1>SMTP Test (${env})</h1>
        </div>
        <div class="content">
          <p>SMTP-Test in der ${env}-Umgebung erfolgreich.</p>
          <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
          <p>App URL: ${process.env.NEXT_PUBLIC_APP_URL}</p>
        </div>
      `)
    });

    console.log("\n✅ Test-E-Mail gesendet!");
    console.log("📧 Message-ID:", info.messageId);
  } catch (error) {
    console.error("\n❌ Fehler:", error);
    process.exit(1);
  }
}

testEnvironment();