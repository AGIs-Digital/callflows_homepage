import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Lade Umgebungsvariablen
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSMTP() {
  console.log('🔍 SMTP-Konfiguration testen');
  console.log('================================');
  
  // Zeige Konfiguration (ohne Passwort)
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('From:', process.env.SMTP_FROM);
  console.log('To:', process.env.CONTACT_EMAIL);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    },
    debug: true,
    logger: true
  });

  try {
    console.log('\n1️⃣ Teste SMTP-Verbindung...');
    await transporter.verify();
    console.log('✅ SMTP-Verbindung erfolgreich!');

    console.log('\n2️⃣ Sende Test-E-Mail...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: 'SMTP Test',
      text: 'Dies ist eine Test-E-Mail um die SMTP-Konfiguration zu überprüfen.',
      html: `
        <h1>SMTP Test</h1>
        <p>Dies ist eine Test-E-Mail um die SMTP-Konfiguration zu überprüfen.</p>
        <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
      `
    });

    console.log('✅ E-Mail erfolgreich gesendet!');
    console.log('MessageId:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error('❌ Fehler:', error);
    process.exit(1);
  }
}

testSMTP().catch(console.error); 