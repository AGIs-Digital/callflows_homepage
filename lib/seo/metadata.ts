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
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflows.de';
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} | callflows`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'callflows',
      type,
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