import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
  image: string;
  category?: string;
};

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const blogDir = path.join(process.cwd(), 'app/blog');
  
  // Alle Unterverzeichnisse im Blog-Verzeichnis finden (außer page.tsx)
  const directories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const posts: BlogPost[] = [];
  
  for (const slug of directories) {
    const filePath = path.join(blogDir, slug, 'page.tsx');
    
    // Prüfen, ob die Datei existiert
    if (!fs.existsSync(filePath)) continue;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Verbesserte Metadaten-Extraktion mit robusteren Regex-Mustern
    const titleMatch = fileContent.match(/title: ["'](.+?)["']/);
    const descriptionMatch = fileContent.match(/description: ["'](.+?)["']/);
    const publishedTimeMatch = fileContent.match(/publishedTime: ["'](.+?)["']/);
    const modifiedTimeMatch = fileContent.match(/modifiedTime: ["'](.+?)["']/);
    const authorsMatch = fileContent.match(/authors: \[\s*["'](.+?)["']/);
    const imagesMatch = fileContent.match(/url: ["'](.+?)["']/);
    const categoryMatch = fileContent.match(/keywords: \[\s*["'](.+?)["']/); // Verwende das erste Keyword als Kategorie
    
    if (titleMatch && descriptionMatch && publishedTimeMatch) {
      posts.push({
        slug,
        title: titleMatch[1],
        description: descriptionMatch[1],
        publishedTime: publishedTimeMatch[1],
        modifiedTime: modifiedTimeMatch ? modifiedTimeMatch[1] : publishedTimeMatch[1],
        author: authorsMatch ? authorsMatch[1] : "Team callflows",
        image: imagesMatch ? imagesMatch[1] : "/images/blog/default.png",
        category: categoryMatch ? categoryMatch[1].split(',')[0].trim() : undefined
      });
    }
  }
  
  return posts;
});

export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  const now = new Date();
  
  // Filtere nur Artikel, deren Veröffentlichungsdatum in der Vergangenheit liegt
  const publishedPosts = allPosts.filter(post => {
    const publishDate = new Date(post.publishedTime);
    return publishDate <= now;
  });
  
  // Sortiere nach Datum (neueste zuerst)
  return publishedPosts.sort((a, b) => {
    const dateA = new Date(a.publishedTime).getTime();
    const dateB = new Date(b.publishedTime).getTime();
    return dateB - dateA;
  });
});