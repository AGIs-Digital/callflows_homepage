import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, saveUploadedImage } from '@/lib/blog/blog-generator';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Form-Daten extrahieren
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const publishedTime = formData.get('publishedTime') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const imageFile = formData.get('image') as File;

    // Validierung
    if (!title || !description || !publishedTime || !author || !content || !slug) {
      return NextResponse.json(
        { success: false, message: 'Alle Pflichtfelder müssen ausgefüllt sein.' },
        { status: 400 }
      );
    }

    // Bild speichern (falls vorhanden)
    let imagePath = `/images/blog/${slug}.webp`; // Default
    if (imageFile && imageFile.size > 0) {
      imagePath = await saveUploadedImage(imageFile, slug);
    }

    // Blog-Post erstellen
    const result = await createBlogPost({
      title,
      description,
      publishedTime,
      author,
      content,
      slug,
      imagePath
    });

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Blog Creation API is running' },
    { status: 200 }
  );
} 