import nodemailer from 'nodemailer';

export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.ionos.de',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});

export const emailTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6C0;">Neue Kontaktanfrage</h2>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
        <p><strong>Nachricht:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
        ${data.source ? `<p><strong>Quelle:</strong> ${data.source}</p>` : ''}
      </div>
    </div>
  `;
}; 