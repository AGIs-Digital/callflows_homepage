import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export function generateMetadata({ title, description, path }: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflows.de';
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} | Callflows`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Callflows',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}