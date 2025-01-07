import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { transporter, emailTemplate } from "@/lib/email";

const getSubject = (source: string) => {
  switch (source) {
    case 'inbound':
      return 'Kontaktformular: Inbound Paket Anfrage';
    case 'outbound':
      return 'Kontaktformular: Outbound Paket Anfrage';
    case 'enterprise':
      return 'Kontaktformular: Enterprise Paket Anfrage';
    default:
      return 'Kontaktformular: Allgemeine Anfrage';
  }
};

export async function POST(request: Request) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP-Konfiguration fehlt');
    return NextResponse.json(
      { error: 'Server-Konfigurationsfehler' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    const logPrefix = `[Contact Form ${process.env.NEXT_PUBLIC_ENVIRONMENT}]`;
    console.log(logPrefix, new Date().toISOString(), 'Received form data:', data);

    const validationResult = contactFormSchema.safeParse(data);
    
    if (!validationResult.success) {
      console.error(logPrefix, new Date().toISOString(), 'Validation error:', validationResult.error);
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    console.log('[Contact Form]', new Date().toISOString(), 'Sending email with data:', validatedData);
    
    const sourceText = validatedData.source 
      ? `\nQuelle: ${validatedData.source}` 
      : '';

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: getSubject(validatedData.source || ''),
      html: emailTemplate(`
        <div class="header">
          <h1>Neue Kontaktanfrage</h1>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>E-Mail:</strong> ${validatedData.email}</p>
          <p><strong>Telefon:</strong> ${validatedData.phone || 'Nicht angegeben'}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          ${sourceText ? `<p><strong>Quelle:</strong> ${validatedData.source}</p>` : ''}
        </div>
      `),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('[Contact Form]', new Date().toISOString(), 'Email sent successfully');
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('[Contact Form]', new Date().toISOString(), 'SMTP-Fehler:', JSON.stringify(emailError, null, 2));
      return NextResponse.json(
        { error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Formular-Fehler:', JSON.stringify(error, null, 2));
    
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