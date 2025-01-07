import { NextResponse } from 'next/server';
import { emailTransporter, emailTemplate } from '@/lib/email-config';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  console.log('🔍 Starte Kontaktformular-Verarbeitung');
  
  try {
    // Log environment
    console.log('📧 Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_FROM: process.env.SMTP_FROM,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL
    });

    const data = await request.json();
    console.log('📝 Empfangene Daten:', data);
    
    const validationResult = contactFormSchema.safeParse(data);
    if (!validationResult.success) {
      console.error('❌ Validierungsfehler:', validationResult.error);
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten' },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    console.log('✅ Validierte Daten:', validatedData);

    // Test SMTP connection
    try {
      console.log('🔄 Teste SMTP-Verbindung...');
      await emailTransporter.verify();
      console.log('✅ SMTP-Verbindung erfolgreich');
    } catch (verifyError) {
      console.error('❌ SMTP-Verbindungsfehler:', verifyError);
      throw verifyError;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: validatedData.email,
      subject: `Neue Kontaktanfrage${validatedData.source ? ` (${validatedData.source})` : ''}`,
      html: emailTemplate(validatedData)
    };

    console.log('📧 Sende E-Mail mit Optionen:', mailOptions);
    
    const info = await emailTransporter.sendMail(mailOptions);
    console.log('✅ E-Mail erfolgreich gesendet:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return NextResponse.json({ 
      success: true,
      messageId: info.messageId 
    });
    
  } catch (error) {
    console.error('❌ Fehler beim E-Mail-Versand:', error);
    // Log full error details
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    return NextResponse.json(
      { error: 'Beim Senden ist ein Fehler aufgetreten' },
      { status: 500 }
    );
  }
} 