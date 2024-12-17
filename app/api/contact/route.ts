import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailTemplate } from "@/lib/email";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // Send email using the template
    await transporter.sendMail({
      from: `"Callflows Website" <${process.env.SMTP_USER}>`,
      to: "kontakt@callflows.de",
      subject: "Neue Kontaktanfrage von der Website",
      html: emailTemplate(`
        <div class="header">
          <h1>Neue Kontaktanfrage</h1>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          <p><strong>Nachricht:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `)
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Callflows" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Ihre Anfrage bei Callflows",
      html: emailTemplate(`
        <div class="header">
          <h1>Vielen Dank für Ihre Anfrage</h1>
        </div>
        <div class="content">
          <p>Sehr geehrte(r) ${name},</p>
          <p>vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
          <p>Mit freundlichen Grüßen<br>Ihr Callflows Team</p>
        </div>
      `)
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}