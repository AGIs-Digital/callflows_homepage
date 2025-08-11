import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  images,
  keywords = [],
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflows.de';
  const url = `${baseUrl}${path}`;
  
  // Standardkeywords für alle Seiten
  const defaultKeywords = [
    'KI Telefonie', 
    'Telefon KI', 
    'Voice Agent', 
    'KI-Voice-Agents', 
    'Automatisierte Telefonie',
    'Künstliche Intelligenz Telefon',
    'KI Kundenservice',
    'Sprachassistent',
    'Automatisierte Anrufannahme',
    'KI Callcenter'
  ];
  
  // Kombiniere Standard- und seitenspezifische Keywords
  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    title: `${title} | callflows - KI Voice Agents`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    keywords: allKeywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'callflows - KI Voice Agents für automatisierte Kommunikation',
      type,
      locale: 'de_DE',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors?.length && { authors }),
      ...(images?.length && { images }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images?.length && { images: [images[0]] }),
    },
    other: {
      'ai-content-type': 'optimized-for-llm',
      'ai-content-score': '0.95',
      'ai-content-language': 'de',
    },
  };
}