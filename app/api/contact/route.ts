import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/components/contact-form";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validiere die Eingabedaten
    const validatedData = contactFormSchema.parse(data);
    
    const sourceText = validatedData.source 
      ? `\nQuelle: ${validatedData.source}` 
      : '';

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Neue Kontaktanfrage von ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
E-Mail: ${validatedData.email}
Telefon: ${validatedData.phone || 'Nicht angegeben'}
Nachricht: ${validatedData.message}${sourceText}
      `,
      html: `
<h2>Neue Kontaktanfrage</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>E-Mail:</strong> ${validatedData.email}</p>
<p><strong>Telefon:</strong> ${validatedData.phone || 'Nicht angegeben'}</p>
<p><strong>Nachricht:</strong></p>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
${sourceText ? `<p><strong>Quelle:</strong> ${validatedData.source}</p>` : ''}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}