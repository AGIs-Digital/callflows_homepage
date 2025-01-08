import { z } from 'zod';

const envSchema = z.object({
  SENDGRID_API_KEY: z.string().min(1),
  SENDGRID_FROM_EMAIL: z.string().email(),
  SENDGRID_TEMPLATE_ID: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
});

export const env = envSchema.parse({
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
});