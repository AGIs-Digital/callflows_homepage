export const config = {
  api: {
    contact: process.env.NEXT_PUBLIC_APP_URL + '/api/contact.php',
    timeout: 10000,
    retries: 2
  },
  logging: {
    enabled: true,
    path: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' 
      ? '/logs/contact-form/contact-form.log' 
      : '/logs/contact-form/staging-contact-form.log'
  }
} as const;