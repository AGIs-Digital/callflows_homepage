import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | callflows",
  description: "Entdecken Sie Expertenwissen zu KI-Telefonie, Voice Agents und automatisierter Kundenkommunikation. Aktuelle Insights, Praxistipps und Trends zur Zukunft der intelligenten Telefonie von callflows."
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  
  return (
    <div className="container py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
    </div>
  );
} 