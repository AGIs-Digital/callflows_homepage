import { config } from '@/lib/config';
import type { ContactFormData } from '@/lib/validations/contact';

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function submitContactForm(data: ContactFormData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

  try {
    const response = await fetch(`${API_URL}/api/contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal,
      credentials: 'same-origin'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Submission failed');
    }

    return await response.json();
  } catch (error) {
    console.error('[Contact Form Error]:', error instanceof Error ? error.message : error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}