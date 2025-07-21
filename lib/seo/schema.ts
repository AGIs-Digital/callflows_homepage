import { Organization, WithContext, Product, FAQPage, Question, Answer, SoftwareApplication, Service, LocalBusiness, Review, AggregateRating } from 'schema-dts';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://callflows.de/#organization',
    name: 'callflows',
    legalName: 'callflows GmbH',
    url: 'https://callflows.de',
    logo: 'https://callflows.de/images/callflows_brand_no_claim.png',
    image: 'https://callflows.de/images/callflows_brand_no_claim.png',
    description: 'callflows entwickelt KI-gestützte Voice Agents für automatisierte Kundenkommunikation. Wir ermöglichen Unternehmen effiziente Telefonie durch künstliche Intelligenz.',
    slogan: 'Kommunikation mit KI - Automatisierte Telefonie mit künstlicher Intelligenz',
    foundingDate: '2023',

    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 10
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fenskestraße 9A',
      addressLocality: 'Hannover',
      addressRegion: 'Niedersachsen',
      postalCode: '30165',
      addressCountry: 'DE',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+49 511 1665 3388',
        contactType: 'customer service',
        email: 'info@callflows.de',
        availableLanguage: ['German', 'English'],
        areaServed: 'DE'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'sales@callflows.de',
        availableLanguage: ['German', 'English'],
        areaServed: 'DE'
      }
    ],
    sameAs: [
      'https://linkedin.com/company/callflows',
      'https://twitter.com/callflows',
    ],
    keywords: 'KI Telefonie, Telefon KI, Voice Agent, KI-Voice-Agents, Automatisierte Telefonie, Künstliche Intelligenz Telefon, Sprachassistent, AI Telefonie',
    vatID: 'DE123456789', // Anpassen wenn verfügbar
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland'
    },
    knowsAbout: ['Künstliche Intelligenz', 'Voice Technology', 'Automatisierte Telefonie', 'Customer Service Automation', 'Speech Recognition', 'Natural Language Processing'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KI Voice Agent Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'KI Voice Agents',
            description: 'Automatisierte Kundenkommunikation mit künstlicher Intelligenz'
          }
        }
      ]
    }
  };
}

export function generateProductSchema(): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'callflows KI-Voice-Agents',
    description: 'KI-gestützte Voice Agents für automatisierte Kundenkommunikation. Optimieren Sie Ihren Kundenservice, Vertrieb und Support mit intelligenten Sprachassistenten.',
    brand: {
      '@type': 'Brand',
      name: 'callflows'
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0.99',
      highPrice: '1.09',
      priceCurrency: 'EUR',
      offerCount: 3,
      offers: [
        {
          '@type': 'Offer',
          name: 'Entlastung',
          description: 'Unterstützung im Tagesgeschäft mit 1.000 Freiminuten',
          price: '1.09',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/pricing'
        },
        {
          '@type': 'Offer',
          name: 'Wachstum',
          description: 'Umsatz & Expansion mit 2.000 Freiminuten',
          price: '0.99',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/pricing'
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          description: 'Maßgeschneiderte Lösungen für Unternehmen',
          price: 'Auf Anfrage',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/pricing'
        }
      ]
    },
    category: 'Software > Künstliche Intelligenz > Sprachassistenten',
    keywords: 'KI Telefonie, Telefon KI, Voice Agent, KI-Voice-Agents, Automatisierte Telefonie'
  };
}

export function generateFAQSchema(): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist ein KI-Voice-Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein KI-Voice-Agent ist ein intelligenter Sprachassistent, der auf künstlicher Intelligenz basiert und in der Lage ist, Telefongespräche zu führen, Kundenanfragen zu beantworten und Prozesse zu automatisieren.'
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
        name: 'Für welche Unternehmen eignet sich ein KI-Voice-Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KI-Voice-Agents eignen sich für Unternehmen jeder Größe, die ihre Kundenkommunikation effizienter gestalten möchten. Besonders geeignet sind sie für Kundenservice, Vertrieb, Marketing und HR-Prozesse.'
        }
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein KI-Voice-Agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Kosten für einen KI-Voice-Agent bei callflows basieren auf einem minutenbasierten Abrechnungsmodell. Die Preise variieren je nach Paket und Minutenvolumen.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kann ein KI-Voice-Agent in bestehende Systeme integriert werden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die KI-Voice-Agents von callflows können nahtlos in bestehende CRM-Systeme, Kalendersysteme und andere Geschäftsanwendungen integriert werden, um einen reibungslosen Informationsaustausch zu gewährleisten.'
        }
      }
    ]
  };
}

// LLM-optimiertes Service Schema
export function generateServiceSchema(): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://callflows.de/#service',
    name: 'KI Voice Agents für automatisierte Telefonie',
    description: 'Professionelle KI-gestützte Voice Agents die Ihre Kundenkommunikation automatisieren. Ideal für Kundenservice, Terminbuchungen, Lead-Qualifizierung und Support.',
    provider: {
      '@id': 'https://callflows.de/#organization'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland'
    },
    serviceType: 'Künstliche Intelligenz Telefonie',
    category: 'Software as a Service (SaaS)',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KI Voice Agent Pakete',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Entlastung',
          description: 'Unterstützung im Tagesgeschäft mit 1.000 Freiminuten',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '1.09',
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: false
          }
        },
        {
          '@type': 'Offer',
          name: 'Wachstum', 
          description: 'Umsatz & Expansion mit 2.000 Freiminuten',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0.99',
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: false
          }
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          description: 'Maßgeschneiderte Lösungen für Unternehmen',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: 'Auf Anfrage',
            priceCurrency: 'EUR'
          }
        }
      ]
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Unternehmen, KMU, Startups, Callcenter'
    }
  };
}

// Software Application Schema für bessere Kategorisierung
export function generateSoftwareSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://callflows.de/#software',
    name: 'callflows KI Voice Agent Platform',
    description: 'Cloud-basierte Plattform für KI-gestützte Voice Agents. Automatisieren Sie Ihre Telefonie mit künstlicher Intelligenz.',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Customer Relationship Management, Artificial Intelligence, Voice Technology',
    operatingSystem: 'Cloud-based',
    offers: {
      '@type': 'Offer',
      price: '0.99',
      priceCurrency: 'EUR',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://callflows.de/pricing'
    },
    publisher: {
      '@id': 'https://callflows.de/#organization'
    },
    softwareVersion: '2024',
    releaseNotes: 'Erweiterte KI-Funktionen, verbesserte Spracherkennung, neue Integrationen',
    featureList: [
      'Natürliche Sprachverarbeitung',
      'Automatische Anrufannahme',
      'CRM Integration',
      'Terminbuchung',
      'Lead Qualifizierung',
      'Mehrsprachiger Support',
      'Real-time Analytics',
      'API Schnittstellen'
    ],
    screenshot: 'https://callflows.de/images/dashboard.png',
    softwareHelp: {
      '@type': 'CreativeWork',
      name: 'FAQ',
      url: 'https://callflows.de/faq'
    },
    downloadUrl: 'https://callflows.de/kontakt',
    installUrl: 'https://callflows.de/kontakt'
  };
}

// Local Business Schema für lokale Suche
export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://callflows.de/#localbusiness',
    name: 'callflows - KI Voice Agents Hannover',
    description: 'Spezialist für KI-gestützte Voice Agents in Hannover. Wir automatisieren Ihre Kundenkommunikation mit modernster künstlicher Intelligenz.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fenskestraße 9A',
      addressLocality: 'Hannover',
      addressRegion: 'Niedersachsen',
      postalCode: '30165',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3759,
      longitude: 9.7320
    },
    telephone: '+49 511 1665 3388',
    email: 'info@callflows.de',
    url: 'https://callflows.de',
    logo: 'https://callflows.de/images/callflows_brand_no_claim.png',
    image: 'https://callflows.de/images/callflows_brand_no_claim.png',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bank transfer, Credit Card',
    openingHours: 'Mo-Fr 09:00-18:00',
    areaServed: [
      {
        '@type': 'City',
        name: 'Hannover'
      },
      {
        '@type': 'State', 
        name: 'Niedersachsen'
      },
      {
        '@type': 'Country',
        name: 'Deutschland'
      }
    ],
    knowsAbout: [
      'KI Telefonie',
      'Voice Agents', 
      'Automatisierte Kundenkommunikation',
      'Künstliche Intelligenz',
      'Spracherkennung',
      'Customer Service Automation'
    ],
    slogan: 'Kommunikation mit KI - Automatisierte Telefonie mit künstlicher Intelligenz'
  };
}

// Breadcrumb Schema für bessere Navigation
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}