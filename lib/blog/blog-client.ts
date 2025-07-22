// Client-Side Blog System für Static Export
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedTime: string;
  author: string;
  image: string;
  status: 'draft' | 'scheduled' | 'published';
  category?: string;
}

// Alle Blog-Posts werden jetzt dynamisch als TSX-Dateien verwaltet
// Das statische Array wurde entfernt - alle Posts sind über das Admin-Interface verwaltbar
export const BLOG_POSTS: BlogPost[] = [];

/**
 * Lädt alle verfügbaren Blog-Posts (Client-Side)
 * @deprecated Alle Posts sind jetzt dynamisch - verwende die API-Route /api/blog/list
 */
export function getAllBlogPosts(): BlogPost[] {
  console.warn('getAllBlogPosts() is deprecated - all posts are now dynamic');
  return [];
}

/**
 * Lädt nur veröffentlichte Blog-Posts
 * @deprecated Alle Posts sind jetzt dynamisch - verwende die API-Route /api/blog/list  
 */
export function getPublishedBlogPosts(): BlogPost[] {
  console.warn('getPublishedBlogPosts() is deprecated - all posts are now dynamic');
  return [];
}

/**
 * Lädt einen einzelnen Blog-Post by Slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

/**
 * Aktualisiert die Blog-Posts (wird vom Admin-System verwendet)
 * Diese Funktion würde in einer echten Implementierung die Datei neu schreiben
 */
export function updateBlogPosts(newPosts: BlogPost[]): void {
  // In einer echten Implementierung würde das die blog-client.ts Datei neu generieren
  console.log('Blog posts would be updated:', newPosts);
} 