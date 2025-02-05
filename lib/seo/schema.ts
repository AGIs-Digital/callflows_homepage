import { Organization, WithContext } from 'schema-dts';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'callflows',
    url: 'https://callflows.de',
    logo: 'https://callflows.de/images/callflows_brand_no_claim.png',
    description: 'KI-gestützte Voice Agents für automatisierte Kommunikation',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adalbert-Stifter-Straße 14',
      addressLocality: 'Hannover',
      postalCode: '30655',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-155-60106486',
      contactType: 'customer service',
      email: 'info@callflows.de',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [
      'https://linkedin.com/company/callflows',
      'https://twitter.com/callflows',
    ],
  };
}