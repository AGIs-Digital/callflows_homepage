"use client";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { type BlogPost } from "@/lib/blog/blog-client";

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        // Lade alle Posts von der API (jetzt nur noch dynamische Posts)
        const response = await fetch('/api/blog/list');
        const data = await response.json();
        
        let posts: BlogPost[] = [];
        if (data.success && data.posts) {
          // Filtere nur veröffentlichte Posts
          const now = new Date();
          posts = data.posts
            .filter((post: BlogPost) => {
              if (post.status !== 'published') return false;
              const publishDate = new Date(post.publishedTime);
              return publishDate <= now;
            })
            .map((post: any) => ({
              slug: post.slug,
              title: post.title,
              description: post.description,
              publishedTime: post.publishedTime,
              author: post.author,
              image: post.image,
              status: post.status as 'published',
              category: post.category || 'Allgemein'
            }))
            .sort((a: BlogPost, b: BlogPost) => {
              // Sortiere nach Datum (neueste zuerst)
              const dateA = new Date(a.publishedTime).getTime();
              const dateB = new Date(b.publishedTime).getTime();
              return dateB - dateA;
            });
        }
        
        setAllPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setAllPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllPosts();
  }, []);
  
  return (
    <>
      <Head>
        <title>Blog | callflows</title>
        <meta name="description" content="Entdecken Sie Expertenwissen zu KI-Telefonie, Voice Agents und automatisierter Kundenkommunikation. Aktuelle Insights, Praxistipps und Trends zur Zukunft der intelligenten Telefonie von callflows." />
      </Head>
      <div className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Blog</h1>
          {isLoading && (
            <div className="text-sm text-muted-foreground">Lade Posts...</div>
          )}
        </div>
        
        {!isLoading && allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Noch keine Blog-Posts veröffentlicht.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {post.category && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Veröffentlicht
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.publishedTime}>
                  {new Date(post.publishedTime).toLocaleDateString('de-DE', {
                    day: 'numeric',
                    month: 'long', 
                    year: 'numeric'
                  })}
                </time>
              </div>
              
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            </Link>
          ))}
          </div>
        )}
      </div>
    </>
  );
} 