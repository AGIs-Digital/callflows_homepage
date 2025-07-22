import { NextResponse } from 'next/server';
import { loadExistingBlogPosts } from '@/lib/blog/blog-generator';

export async function GET() {
  try {
    const posts = await loadExistingBlogPosts();
    
    return NextResponse.json({
      success: true,
      posts
    });
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Fehler beim Laden der Blog-Posts.' },
      { status: 500 }
    );
  }
} 