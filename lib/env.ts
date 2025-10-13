import { z } from 'zod';

const envSchema = z.object({
  CONTACT_EMAIL: z.string().email(),
  // Microsoft SMTP Configuration
  MICROSOFT_SMTP_HOST: z.string().min(1),
  MICROSOFT_SMTP_PORT: z.string().min(1),
  MICROSOFT_SMTP_USER: z.string().email(),
  MICROSOFT_SMTP_PASS: z.string().min(1),
});

export const env = envSchema.parse({
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  MICROSOFT_SMTP_HOST: process.env.MICROSOFT_SMTP_HOST,
  MICROSOFT_SMTP_PORT: process.env.MICROSOFT_SMTP_PORT,
  MICROSOFT_SMTP_USER: process.env.MICROSOFT_SMTP_USER,
  MICROSOFT_SMTP_PASS: process.env.MICROSOFT_SMTP_PASS,
});