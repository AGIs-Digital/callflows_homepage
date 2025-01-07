import { config } from '@/lib/config';
import type { ContactFormData } from '@/lib/validations/contact';

export async function submitContactForm(data: ContactFormData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

  try {
    const response = await fetch(config.api.contact, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Submission failed');
    }

    return await response.json();
  } catch (error) {
    console.error('[Contact Form Error]:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}