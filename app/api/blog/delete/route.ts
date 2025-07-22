import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug ist erforderlich.' },
        { status: 400 }
      );
    }

    // Blog-Post-Verzeichnis löschen
    const blogDir = path.join(process.cwd(), 'app/blog', slug);
    
    if (!fs.existsSync(blogDir)) {
      return NextResponse.json(
        { success: false, message: 'Blog-Post nicht gefunden.' },
        { status: 404 }
      );
    }

    // Verzeichnis und alle Inhalte löschen
    fs.rmSync(blogDir, { recursive: true, force: true });

    // Blog-Bild löschen (falls vorhanden)
    const imagePath = path.join(process.cwd(), 'public/images/blog', `${slug}.png`);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Auch andere Bildformate prüfen
    const imageFormats = ['jpg', 'jpeg', 'webp', 'gif'];
    imageFormats.forEach(format => {
      const altImagePath = path.join(process.cwd(), 'public/images/blog', `${slug}.${format}`);
      if (fs.existsSync(altImagePath)) {
        fs.unlinkSync(altImagePath);
      }
    });

    return NextResponse.json({
      success: true,
      message: `Blog-Post "${slug}" wurde erfolgreich gelöscht.`
    });

  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json(
      { success: false, message: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Blog Delete API is running' },
    { status: 200 }
  );
} 