import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
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

export const emailTemplate = (content: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflows.de';
  
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .logo {
      text-align: center;
      padding: 20px 0;
    }
    .logo img {
      width: 180px;
      height: auto;
    }
    .header {
      background-color: #DEF0F2;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #ffffff;
      padding: 40px;
      border: 1px solid #e5e7eb;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #00A6C0;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 500;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding: 20px;
      color: #6b7280;
      font-size: 0.875rem;
    }
    h1 {
      color: #00A6C0;
      font-weight: 700;
      font-size: 24px;
      margin: 0;
    }
    p {
      color: #4B5563;
      font-size: 16px;
      margin: 16px 0;
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      margin: 0 10px;
      text-decoration: none;
    }
    .address {
      margin-top: 20px;
      font-size: 12px;
      color: #9CA3AF;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="${baseUrl}/images/callflows_brand_small.png" alt="Callflows Logo" style="width: 180px; height: auto;">
    </div>
    ${content}
    <div class="footer">
       <div class="social-links">
        <a href="https://linkedin.com/company/callflows" target="_blank">
          <img src="${baseUrl}/images/linkedin.png" alt="LinkedIn" width="24" style="width: 24px;">
        </a>
        <a href="https://twitter.com/callflows" target="_blank">
          <img src="${baseUrl}/images/twitter.png" alt="Twitter" width="24" style="width: 24px;">
        </a>
      </div>
      <div class="address">
        <p>© ${new Date().getFullYear()} Callflows</p>
        <p>
          Adalbert-Stifter-Straße 14 • 30655 Hannover<br>
          Tel: +49 (0) 155 60106486 • E-Mail: info@callflows.de
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: '"Callflows" <noreply@callflows.de>',
    to: email,
    subject: "E-Mail Adresse bestätigen",
    html: emailTemplate(`
      <div class="header">
        <h1>Willkommen bei Callflows!</h1>
      </div>
      <div class="content">
        <p>Bitte bestätigen Sie Ihre E-Mail-Adresse durch Klick auf den folgenden Button:</p>
        <center>
          <a href="${verificationUrl}" class="button">E-Mail bestätigen</a>
        </center>
      </div>
    `)
  });
};

const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: '"Callflows" <noreply@callflows.de>',
    to: email,
    subject: "Passwort zurücksetzen",
    html: emailTemplate(`
      <div class="header">
        <h1>Passwort zurücksetzen</h1>
      </div>
      <div class="content">
        <p>Klicken Sie auf den folgenden Button um Ihr Passwort zurückzusetzen:</p>
        <center>
          <a href="${resetUrl}" class="button">Passwort zurücksetzen</a>
        </center>
        <p>Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.</p>
      </div>
    `)
  });
};
