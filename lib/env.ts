import { z } from 'zod';

const envSchema = z.object({
  CONTACT_EMAIL: z.string().email(),
  // Zoho SMTP Configuration
  ZOHO_SMTP_HOST: z.string().min(1),
  ZOHO_SMTP_PORT: z.string().min(1),
  ZOHO_SMTP_USER: z.string().email(),
  ZOHO_SMTP_PASS: z.string().min(1),
});

export const env = envSchema.parse({
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  ZOHO_SMTP_HOST: process.env.ZOHO_SMTP_HOST,
  ZOHO_SMTP_PORT: process.env.ZOHO_SMTP_PORT,
  ZOHO_SMTP_USER: process.env.ZOHO_SMTP_USER,
  ZOHO_SMTP_PASS: process.env.ZOHO_SMTP_PASS,
});