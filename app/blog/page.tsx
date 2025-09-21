import Link from "next/link";
import Image from "next/image";
import { loadExistingBlogPosts } from "@/lib/blog/blog-generator";
import { generateMetadata } from "@/lib/seo/metadata";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";

// Generate metadata for SEO
export const metadata = generateMetadata({
  title: 'Blog - KI-Telefonie Expertenwissen',
  description: 'Entdecken Sie Expertenwissen zu KI-Telefonie, Voice Agents und automatisierter Kundenkommunikation. Aktuelle Insights, Praxistipps und Trends zur Zukunft der intelligenten Telefonie von callflows.',
  path: '/blog',
  keywords: [
    'KI Telefonie Blog', 
    'Voice Agent Tipps', 
    'Automatisierte Telefonie Guide', 
    'KI Kundenservice Best Practices',
    'KI Telefonie Trends',
    'Voice Agent Implementierung'
  ],
});

export default async function BlogPage() {
  let allPosts: any[] = [];
  
  try {
    // Lade alle Posts zur Build-Zeit (Server-Side)
    const posts = await loadExistingBlogPosts();
    
    if (posts) {
      // Filtere nur veröffentlichte Posts
      const now = new Date();
      allPosts = posts
        .filter((post: any) => {
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
        .sort((a: any, b: any) => {
          // Sortiere nach Datum (neueste zuerst)
          const dateA = new Date(a.publishedTime).getTime();
          const dateB = new Date(b.publishedTime).getTime();
          return dateB - dateA;
        });
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    allPosts = [];
  }
  
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-primary/20 via-accent/50 to-secondary/65">
      <div className="container max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <BreadcrumbSEO 
          items={[
            { name: "Blog", url: "https://callflows.de/blog" }
          ]}
        />
        
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent backdrop-blur-sm bg-white/10 px-8 py-4 rounded-2xl border border-white/20 shadow-lg">
            Blog
          </h1>
        </div>
      
      {allPosts.length === 0 ? (
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
    </div>
  );
} 