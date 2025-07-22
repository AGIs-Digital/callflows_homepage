import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, saveUploadedImage } from '@/lib/blog/blog-generator';
import fs from 'fs';
import path from 'path';

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Form-Daten extrahieren
    const originalSlug = formData.get('originalSlug') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const publishedTime = formData.get('publishedTime') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const imageFile = formData.get('image') as File;

    // Validierung
    if (!originalSlug || !title || !description || !publishedTime || !author || !content || !slug) {
      return NextResponse.json(
        { success: false, message: 'Alle Pflichtfelder müssen ausgefüllt sein.' },
        { status: 400 }
      );
    }

    // Prüfen ob der ursprüngliche Blog-Post existiert
    const originalBlogDir = path.join(process.cwd(), 'app/blog', originalSlug);
    if (!fs.existsSync(originalBlogDir)) {
      return NextResponse.json(
        { success: false, message: 'Ursprünglicher Blog-Post nicht gefunden.' },
        { status: 404 }
      );
    }

    // Wenn sich der Slug geändert hat, prüfen ob der neue bereits existiert
    if (originalSlug !== slug) {
      const newBlogDir = path.join(process.cwd(), 'app/blog', slug);
      if (fs.existsSync(newBlogDir)) {
        return NextResponse.json(
          { success: false, message: `Ein Blog-Post mit dem Slug "${slug}" existiert bereits.` },
          { status: 400 }
        );
      }
    }

    // Bild-Pfad bestimmen
    let imagePath = `/images/blog/${slug}.png`; // Default
    
    // Wenn neues Bild hochgeladen wurde
    if (imageFile && imageFile.size > 0) {
      imagePath = await saveUploadedImage(imageFile, slug);
    } else {
      // Versuche das alte Bild zu verwenden, falls vorhanden
      const oldImageFormats = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
      let foundOldImage = false;
      
      for (const format of oldImageFormats) {
        const oldImagePath = path.join(process.cwd(), 'public/images/blog', `${originalSlug}.${format}`);
        if (fs.existsSync(oldImagePath)) {
          // Wenn sich der Slug geändert hat, Bild umbenennen
          if (originalSlug !== slug) {
            const newImagePath = path.join(process.cwd(), 'public/images/blog', `${slug}.${format}`);
            fs.copyFileSync(oldImagePath, newImagePath);
            imagePath = `/images/blog/${slug}.${format}`;
          } else {
            imagePath = `/images/blog/${originalSlug}.${format}`;
          }
          foundOldImage = true;
          break;
        }
      }
      
      if (!foundOldImage) {
        imagePath = `/images/blog/${slug}.png`; // Fallback
      }
    }

    // Alten Blog-Post löschen
    fs.rmSync(originalBlogDir, { recursive: true, force: true });

    // Wenn sich der Slug geändert hat und ein neues Bild vorhanden ist, alte Bilder löschen
    if (originalSlug !== slug && imageFile && imageFile.size > 0) {
      const oldImageFormats = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
      oldImageFormats.forEach(format => {
        const oldImagePath = path.join(process.cwd(), 'public/images/blog', `${originalSlug}.${format}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      });
    }

    // Neuen Blog-Post erstellen
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
      return NextResponse.json({
        success: true,
        message: `Blog-Post "${title}" wurde erfolgreich aktualisiert.`,
        slug: result.slug
      });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { success: false, message: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Blog Update API is running' },
    { status: 200 }
  );
} 