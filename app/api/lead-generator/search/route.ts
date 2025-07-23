import { NextRequest, NextResponse } from 'next/server';
import { LeadSearchConfig, SearchResult, SourceResult } from '@/lib/types/lead-scraping';
import { searchGoogle } from '../sources/google';
import { search11880 } from '../sources/11880';

// Intelligente Duplikatentfernung
function removeDuplicates(results: SearchResult[]): SearchResult[] {
  const seen = new Map<string, SearchResult>();
  
  for (const result of results) {
    // Firmenname normalisieren für Vergleich
    const normalizedName = result.companyName
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Sonderzeichen entfernen
      .replace(/\s+/g, ' ') // Mehrfache Leerzeichen
      .replace(/\b(gmbh|ag|ug|kg|ohg|e\.?k\.?|mbh|inc|ltd|llc)\b/g, '') // Rechtsformen entfernen
      .trim();
    
    // URL normalisieren
    const normalizedUrl = result.url ? 
      result.url.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';
    
    // Telefonnummer normalisieren  
    const normalizedPhone = result.phone ?
      result.phone.replace(/[\s\-\/\(\)]/g, '').replace(/^\+49/, '0') : '';
    
    // Unique Key erstellen (Kombination aus Name, URL, Phone)
    const uniqueKey = `${normalizedName}|${normalizedUrl}|${normalizedPhone}`;
    
    // Prüfe auf Duplikate
    if (seen.has(uniqueKey)) {
      const existing = seen.get(uniqueKey)!;
      
      // Behalte das Ergebnis mit den meisten Informationen
      const newScore = scoreResult(result);
      const existingScore = scoreResult(existing);
      
      if (newScore > existingScore) {
        seen.set(uniqueKey, result);
      }
    } else {
      seen.set(uniqueKey, result);
    }
  }
  
  return Array.from(seen.values());
}

// Bewertung eines Ergebnisses basierend auf verfügbaren Informationen
function scoreResult(result: SearchResult): number {
  let score = 0;
  
  if (result.companyName && result.companyName.length > 3) score += 2;
  if (result.phone && result.phone.length > 6) score += 3; // Telefon ist sehr wichtig
  if (result.url && result.url.length > 10) score += 2;
  if (result.description && result.description.length > 20) score += 1;
  
  // Bonus für deutsche Quellen
  if (result.source === '11880') {
    score += 1;
  }
  
  return score;
}

export async function POST(request: NextRequest) {
  try {
    const config: LeadSearchConfig = await request.json();

    if (!config.query?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Suchanfrage ist erforderlich.' },
        { status: 400 }
      );
    }

    console.log(`Starting parallel search for: "${config.query}"`);

    // Parallele Suche in allen verfügbaren Quellen
    const searchPromises: Promise<SourceResult>[] = [];
    const errors: string[] = [];

    // Google Custom Search (verwende Environment Variables)
    let googleApiKey = process.env.GOOGLE_API_KEY;
    let googleCseId = process.env.GOOGLE_CSE_ID;
    
    // TEMPORÄRER FALLBACK: Falls .env.local nicht geladen wird
    if (!googleApiKey || !googleCseId) {
      console.log('Trying hardcoded fallback for Google credentials...');
      googleApiKey = 'AIzaSyDYOSjzT84kXkOILP_s8L1c4Td0JFThUwo';
      googleCseId = 'a72a1990010cb4262';
    }
    
    console.log('Environment Check:', {
      hasGoogleApiKey: !!googleApiKey,
      hasGoogleCseId: !!googleCseId,
      googleApiKeyLength: googleApiKey?.length || 0,
      googleCseIdLength: googleCseId?.length || 0,
      processEnvKeys: Object.keys(process.env).filter(key => key.includes('GOOGLE')),
      nodeEnv: process.env.NODE_ENV
    });
    
    if (googleApiKey && googleCseId) {
      console.log('Google API: Starting search with credentials');
      searchPromises.push(searchGoogle(config.query, googleApiKey, googleCseId));
    } else {
      console.error('Google API: Still no credentials available');
      errors.push('Google API: Keine gültigen Credentials verfügbar');
    }

    // Bing Search entfernt - war nicht zuverlässig genug

    // 11880 (immer versuchen, AGB werden intern geprüft)
    searchPromises.push(search11880(config.query));

    if (searchPromises.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Mindestens eine Datenquelle muss verfügbar sein.' },
        { status: 400 }
      );
    }

    // Alle Suchanfragen parallel ausführen
    const results = await Promise.allSettled(searchPromises);

    const allResults: SearchResult[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const sourceResult = result.value;
        if (sourceResult.error) {
          errors.push(`${sourceResult.source}: ${sourceResult.error}`);
        } else {
          allResults.push(...sourceResult.results);
        }
      } else {
        const sources = ['google', 'bing', 'opencorporates', 'wlw', '11880', 'handelsregister'];
        errors.push(`${sources[index] || 'Unbekannte Quelle'}: ${result.reason?.message || 'Unbekannter Fehler'}`);
      }
    });

    console.log(`Search completed. Found ${allResults.length} raw results with ${errors.length} errors.`);

    // Intelligente Duplikatentfernung
    const uniqueResults = removeDuplicates(allResults);
    console.log(`After deduplication: ${uniqueResults.length} unique results (removed ${allResults.length - uniqueResults.length} duplicates)`);

    return NextResponse.json({
      success: true,
      results: uniqueResults,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Lead search error:', error);
    return NextResponse.json(
      { success: false, message: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Lead Generator Search API is running' },
    { status: 200 }
  );
} 