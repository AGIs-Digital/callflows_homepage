import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { rateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations/contact';
import { env } from '@/lib/env';

// SendGrid Setup
sgMail.setApiKey(env.SENDGRID_API_KEY);

// Rate Limiter: 5 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    // Rate Limiting Check
    try {
      await limiter.check(5, 'CONTACT_FORM');
    } catch {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Email Template
    const msg = {
      to: env.CONTACT_EMAIL,
      from: {
        email: env.SENDGRID_FROM_EMAIL,
        name: 'callflows Kontaktformular'
      },
      replyTo: validatedData.email,
      templateId: env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || 'Nicht angegeben',
        message: validatedData.message,
        source: validatedData.source || 'Kontaktformular',
        timestamp: new Date().toLocaleString('de-DE')
      }
    };

    // Send email
    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}