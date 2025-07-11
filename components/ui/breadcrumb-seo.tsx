"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbSEO({ items, className = "" }: BreadcrumbProps) {
  // Immer Homepage als erstes Element hinzufügen
  const fullItems = [
    { name: "Home", url: "https://callflows.de" },
    ...items
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(fullItems);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <nav 
        aria-label="Breadcrumb" 
        className={`mb-8 ${className}`}
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {fullItems.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              
              {index === 0 ? (
                <Link 
                  href={item.url}
                  className="flex items-center hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <Home className="w-4 h-4 mr-1" />
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : index === fullItems.length - 1 ? (
                // Letztes Element - nicht verlinkt
                <span 
                  className="font-medium text-foreground"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              
              {index < fullItems.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 