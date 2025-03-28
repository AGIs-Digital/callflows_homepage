export function BlogSchema({ 
  title, 
  description, 
  datePublished, 
  author, 
  imageUrl 
}: { 
  title: string; 
  description: string; 
  datePublished: string; 
  author: string; 
  imageUrl: string; 
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": `https://callflows.de${imageUrl}`,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "callflows",
      "logo": {
        "@type": "ImageObject",
        "url": "https://callflows.de/images/logo.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 