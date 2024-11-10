import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: '"Callflows" <noreply@callflows.de>',
    to: email,
    subject: "E-Mail Adresse bestätigen",
    html: `
      <h1>Willkommen bei Callflows!</h1>
      <p>Bitte bestätigen Sie Ihre E-Mail-Adresse durch Klick auf den folgenden Link:</p>
      <a href="${verificationUrl}">E-Mail bestätigen</a>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: '"Callflows" <noreply@callflows.de>',
    to: email,
    subject: "Passwort zurücksetzen",
    html: `
      <h1>Passwort zurücksetzen</h1>
      <p>Klicken Sie auf den folgenden Link um Ihr Passwort zurückzusetzen:</p>
      <a href="${resetUrl}">Passwort zurücksetzen</a>
    `,
  });
}
