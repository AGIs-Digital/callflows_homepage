import { NextResponse } from 'next/server';
import { emailTransporter, emailTemplate } from '@/lib/email-config';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validiere die Eingabedaten
    const validationResult = contactFormSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten' },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    
    // Sende E-Mail
    await emailTransporter.sendMail({
      from: {
        name: 'Callflows Kontaktformular',
        address: 'noreply@callflows.de'
      },
      to: 'kontakt@callflows.de',
      replyTo: validatedData.email,
      subject: `Neue Kontaktanfrage${validatedData.source ? ` (${validatedData.source})` : ''}`,
      html: emailTemplate(validatedData)
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Kontaktformular Fehler:', error);
    return NextResponse.json(
      { error: 'Beim Senden ist ein Fehler aufgetreten' },
      { status: 500 }
    );
  }
} 