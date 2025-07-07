import { Organization, WithContext, Product, FAQPage, Question, Answer } from 'schema-dts';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'callflows',
    url: 'https://callflows.de',
    logo: 'https://callflows.de/images/callflows_brand_no_claim.png',
    description: 'KI-gestützte Voice Agents für automatisierte Kundenkommunikation',
    slogan: 'Kommunikation mit KI - Automatisierte Telefonie mit künstlicher Intelligenz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fenskestraße 9A',
      addressLocality: 'Hannover',
      postalCode: '30165',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49 511 1665 3388',
      contactType: 'customer service',
      email: 'info@callflows.de',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [
      'https://linkedin.com/company/callflows',
      'https://twitter.com/callflows',
    ],
    keywords: 'KI Telefonie, Telefon KI, Voice Agent, KI Voice Agent, Automatisierte Telefonie, Künstliche Intelligenz Telefon',
  };
}

export function generateProductSchema(): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'callflows KI Voice Agent',
    description: 'KI-gestützte Voice Agents für automatisierte Kundenkommunikation. Optimieren Sie Ihren Kundenservice, Vertrieb und Support mit intelligenten Sprachassistenten.',
    brand: {
      '@type': 'Brand',
      name: 'callflows'
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0.63',
      highPrice: '0.99',
      priceCurrency: 'EUR',
      offerCount: 4,
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '0.89',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/preise'
        },
        {
          '@type': 'Offer',
          name: 'Professional',
          price: '0.79',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/preise'
        },
        {
          '@type': 'Offer',
          name: 'Corporate',
          price: '0.69',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/preise'
        }
      ]
    },
    category: 'Software > Künstliche Intelligenz > Sprachassistenten',
    keywords: 'KI Telefonie, Telefon KI, Voice Agent, KI Voice Agent, Automatisierte Telefonie'
  };
}

export function generateFAQSchema(): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist ein KI Voice Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein KI Voice Agent ist ein intelligenter Sprachassistent, der auf künstlicher Intelligenz basiert und in der Lage ist, Telefongespräche zu führen, Kundenanfragen zu beantworten und Prozesse zu automatisieren.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie funktioniert die Telefon KI von callflows?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Telefon KI von callflows nutzt fortschrittliche künstliche Intelligenz, um natürliche Gespräche zu führen. Sie versteht Anliegen, kann Termine buchen, Informationen geben und komplexe Aufgaben erledigen - alles über das Telefon.'
        }
      },
      {
        '@type': 'Question',
        name: 'Für welche Unternehmen eignet sich ein KI Voice Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KI Voice Agents eignen sich für Unternehmen jeder Größe, die ihre Kundenkommunikation effizienter gestalten möchten. Besonders geeignet sind sie für Kundenservice, Vertrieb, Marketing und HR-Prozesse.'
        }
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein KI Voice Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Kosten für einen KI Voice Agent bei callflows basieren auf einem minutenbasierten Abrechnungsmodell. Die Preise variieren je nach Paket und Minutenvolumen.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kann ein KI Voice Agent in bestehende Systeme integriert werden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die KI Voice Agents von callflows können nahtlos in bestehende CRM-Systeme, Kalendersysteme und andere Geschäftsanwendungen integriert werden, um einen reibungslosen Informationsaustausch zu gewährleisten.'
        }
      }
    ]
  };
}