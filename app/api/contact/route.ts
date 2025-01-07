import { NextResponse } from 'next/server';
import { emailTransporter, emailTemplate } from '@/lib/email-config';
import { contactFormSchema } from '@/lib/validations/contact';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  logger.init();
  logger.log('🔍 Starte Kontaktformular-Verarbeitung');
  
  try {
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_FROM: process.env.SMTP_FROM,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL
    };
    
    logger.log('📧 Environment:', envInfo);

    const data = await request.json();
    logger.log('📝 Empfangene Daten:', data);
    
    const validationResult = contactFormSchema.safeParse(data);
    if (!validationResult.success) {
      logger.log('❌ Validierungsfehler:', validationResult.error);
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten' },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    logger.log('✅ Validierte Daten:', validatedData);

    try {
      logger.log('🔄 Teste SMTP-Verbindung...');
      await emailTransporter.verify();
      logger.log('✅ SMTP-Verbindung erfolgreich');
    } catch (verifyError) {
      logger.log('❌ SMTP-Verbindungsfehler:', verifyError);
      throw verifyError;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: validatedData.email,
      subject: `Neue Kontaktanfrage${validatedData.source ? ` (${validatedData.source})` : ''}`,
      html: emailTemplate(validatedData)
    };

    logger.log('📧 Sende E-Mail mit Optionen:', mailOptions);
    
    const info = await emailTransporter.sendMail(mailOptions);
    logger.log('✅ E-Mail erfolgreich gesendet:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    logger.log('❌ Fehler beim E-Mail-Versand:', error);
    return NextResponse.json(
      { error: 'Beim Senden ist ein Fehler aufgetreten' },
      { status: 500 }
    );
  }
} 