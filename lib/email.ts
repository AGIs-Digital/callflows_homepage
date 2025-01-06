import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // IONOS requires SSL/TLS
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
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="${baseUrl}/images/callflows_brand_small.png" alt="Callflows Logo" style="width: 180px; height: auto;">
    </div>
    ${content}
    <div class="footer">
      <p>© ${new Date().getFullYear()} Callflows</p>
      <p>
        Adalbert-Stifter-Straße 14 • 30655 Hannover<br>
        Tel: +49 (0) 155 60106486 • E-Mail: info@callflows.de
      </p>
    </div>
  </div>
</body>
</html>
`;
};