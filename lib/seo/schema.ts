import { Organization, WithContext, Product, FAQPage, Question, Answer, SoftwareApplication, Service, LocalBusiness, Review, AggregateRating } from 'schema-dts';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://callflows.de/#organization',
    name: 'callflows',
    legalName: 'callflows GmbH',
    url: 'https://callflows.de',
    logo: 'https://callflows.de/images/callflows_brand_no_claim.webp',
    image: 'https://callflows.de/images/callflows_brand_no_claim.webp',
    description: 'callflows entwickelt KI‑callflows für automatisierte Kundenkommunikation. Ein KI‑callflow orchestriert Stimme, Logik, Daten und Aktionen über den gesamten Prozess – Ende‑zu‑Ende.',
    slogan: 'KI‑callflows – natürliche Dialoge + echte Prozesslogik',
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
    keywords: 'KI‑callflow, KI‑callflows, Conversational Automation, Telefon‑KI, Voice Agent, Callflow, Automatisierte Kundenkommunikation',
    vatID: 'DE123456789', // Anpassen wenn verfügbar
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland'
    },
    knowsAbout: ['KI‑callflows', 'Conversational Automation', 'Automatisierte Telefonie', 'Customer Service Automation', 'Speech Recognition', 'Natural Language Processing'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KI‑callflow Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'KI‑callflows',
            description: 'Ende‑zu‑Ende automatisierte Kundenkommunikation: Stimme, Logik, Daten & Aktionen orchestriert'
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
    name: 'callflows KI‑callflows',
    description: 'KI‑callflows für automatisierte Kundenkommunikation: Lernfähige Gesprächs- und Prozessflüsse inkl. Validierung, Integrationen und Automationen.',
    brand: {
      '@type': 'Brand',
      name: 'callflows',
      url: 'https://callflows.de'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'callflows',
      url: 'https://callflows.de'
    },
    url: 'https://callflows.de',
    image: 'https://callflows.de/images/callflows_brand_no_claim.webp',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0.89',
      highPrice: '0.99',
      priceCurrency: 'EUR',
      offerCount: 3,
      offers: [
        {
          '@type': 'Offer',
          name: 'Entlastung',
          description: 'Unterstützung im Tagesgeschäft mit 1.000 KI-Minuten',
          price: '0.99',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: 'https://callflows.de/pricing'
        },
        {
          '@type': 'Offer',
          name: 'Wachstum',
          description: 'Umsatz & Expansion mit 2.000 KI-Minuten',
          price: '0.89',
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
    category: 'Software > Künstliche Intelligenz > Conversational Automation',
    keywords: 'KI‑callflow, KI‑callflows, Telefon‑KI, Conversational Automation, Callflow',
    sku: 'CALLFLOWS-AI-CALLFLOWS-2025',
    mpn: 'CF-AICF-2025',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 127
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Thomas Weber'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: 'Die KI-Voice-Agents von callflows haben unseren Kundenservice revolutioniert. 24/7 Verfügbarkeit und die natürliche Sprachverarbeitung überzeugen unsere Kunden täglich.',
        datePublished: '2025-01-15'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Müller'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: 'Seit der Implementierung haben wir 40% mehr qualifizierte Leads. Die Integration war einfach und der Support ausgezeichnet.',
        datePublished: '2025-02-08'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Dr. Michael Schmidt'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 4,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: 'Sehr gute Lösung für unser Gesundheitszentrum. DSGVO-konform und die Patienten sind mit der automatisierten Terminbuchung sehr zufrieden.',
        datePublished: '2025-03-22'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Lisa Hoffmann'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: 'Die Voice Agents verstehen sogar komplexe Anfragen und können eigenständig Lösungen anbieten. ROI war bereits nach 3 Monaten erreicht.',
        datePublished: '2025-04-10'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Alexander Koch'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: 'Perfekt für unser E-Commerce Business. Die KI übernimmt Bestellanfragen, Reklamationen und Produktberatung - und das rund um die Uhr.',
        datePublished: '2025-05-03'
      }
    ]
  };
}

export function generateFAQSchema(): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Was ist ein Callflow?', acceptedAnswer: { '@type': 'Answer', text: 'Ein Callflow ist ein statischer, menügesteuerter Ablauf eines Telefongesprächs – ohne echtes Sprachverständnis.' }},
      { '@type': 'Question', name: 'Was ist ein KI‑callflow?', acceptedAnswer: { '@type': 'Answer', text: 'Ein KI‑callflow ist ein lernfähiger Gesprächs‑ und Prozessfluss. Er versteht Anliegen, führt Dialoge, validiert Daten und integriert sich in Ihre Systeme (CRM, Kalender, Datenbanken).'}},
      { '@type': 'Question', name: 'Unterschied KI‑callflow vs. Callflow?', acceptedAnswer: { '@type': 'Answer', text: 'Klassischer Callflow: starr, DT‑MF‑Menüs. KI‑callflow: dynamisch, intent‑basiert, mit Automationen und Integrationen – ein End‑to‑End Conversational Process.'}},
      { '@type': 'Question', name: 'Wie läuft die Einführung ab?', acceptedAnswer: { '@type': 'Answer', text: 'Prototyp → Pilotmonat mit wöchentlichem Monitoring & Feintuning → Go‑Live mit sekundengenauer Abrechnung.'}},
      { '@type': 'Question', name: 'Welche Integrationen sind möglich?', acceptedAnswer: { '@type': 'Answer', text: 'CRM/Helpdesk, Kalender, Datenbanken, Webhooks/REST‑APIs – Lesen/Schreiben von Daten, Auslösen von Prozessen.'}}
    ]
  };
}

// LLM-optimiertes Service Schema
export function generateServiceSchema(): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://callflows.de/#service',
    name: 'KI‑callflows für automatisierte Kundenkommunikation',
    description: 'KI‑callflows orchestrieren Stimme, Logik, Daten & Aktionen – Ihr Conversation Flow Ende‑zu‑Ende mit Integrationen in CRM/ERP/Helpdesk.',
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
          description: 'Unterstützung im Tagesgeschäft mit 1.000 KI-Minuten',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0.99',
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: false
          }
        },
        {
          '@type': 'Offer',
          name: 'Wachstum', 
          description: 'Umsatz & Expansion mit 2.000 KI-Minuten',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0.89',
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
    name: 'callflows KI‑callflow Platform',
    description: 'Cloud‑Plattform zum Modellieren, Betreiben und Optimieren von KI‑callflows (Dialoge, Validierungen, Integrationen, Automationen).',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Customer Relationship Management, Artificial Intelligence, Voice Technology',
    operatingSystem: 'Cloud-based',
    offers: {
      '@type': 'Offer',
      price: '0.89',
      priceCurrency: 'EUR',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://callflows.de/pricing'
    },
    publisher: {
      '@id': 'https://callflows.de/#organization'
    },
    softwareVersion: '2025',
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
    screenshot: 'https://callflows.de/images/dashboard.webp',
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
    description: 'Spezialist für KI Voice Agents in Hannover. Wir automatisieren Ihre Kundenkommunikation mit modernster künstlicher Intelligenz.',
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
    logo: 'https://callflows.de/images/callflows_brand_no_claim.webp',
    image: 'https://callflows.de/images/callflows_brand_no_claim.webp',
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