import axios from 'axios';
import { chromium } from 'playwright';
import { SearchResult, SourceResult } from '@/lib/types/lead-scraping';

// Funktion zum Scrapen von Telefonnummern von der echten Website
async function scrapePhoneFromWebsite(url: string): Promise<string | undefined> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 });
    
    // Hole den gesamten Text der Seite
    const pageText = await page.textContent('body') || '';
    
    // Erweiterte Telefonnummer-Pattern
    const phonePatterns = [
      /(\+49[\s\-]?\d{2,5}[\s\-\/]?\d{3,8}[\s\-\/]?\d{0,8})/g,
      /(0\d{2,5}[\s\-\/]?\d{3,8}[\s\-\/]?\d{0,8})/g,
      /(\(\d{2,5}\)[\s\-]?\d{3,8}[\s\-]?\d{0,8})/g,
      /(Tel\.?:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
      /(Telefon:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
      /(Phone:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
      /(Fon:?\s*[\+\d\s\-\/\(\)]{8,20})/gi
    ];
    
    for (const pattern of phonePatterns) {
      const matches = pageText.match(pattern);
      if (matches && matches.length > 0) {
        let phone = matches[0].replace(/^(Tel\.?:?\s*|Telefon:?\s*|Phone:?\s*|Fon:?\s*)/i, '').trim();
        // Bereinige die Telefonnummer
        phone = phone.replace(/[^\d\+\(\)\-\s\/]/g, '').trim();
        if (phone.length >= 8) {
          await browser.close();
          return phone;
        }
      }
    }
  } catch (error) {
    console.log(`Could not scrape phone from ${url}:`, error);
  } finally {
    await browser.close();
  }
  
  return undefined;
}

export async function searchGoogle(query: string, apiKey: string, cseId: string): Promise<SourceResult> {
  try {
    console.log('Searching Google Custom Search for:', query);

    const results: SearchResult[] = [];
    
    // TESTING: Limit auf 10 Ergebnisse für Tests
    const maxPages = 1; // Nur erste Seite für Tests
    
    for (let page = 0; page < maxPages; page++) {
      const startIndex = page * 10 + 1;
      
      try {
        console.log(`Fetching Google results page ${page + 1}/${maxPages} (results ${startIndex}-${startIndex + 9})`);
        
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: apiKey,
            cx: cseId,
            q: query,
            num: 10,
            start: startIndex
          },
          timeout: 10000
        });

        if (!response.data.items || response.data.items.length === 0) {
          console.log(`No more results found at page ${page + 1}`);
          break; // Keine weiteren Ergebnisse
        }

        // Verarbeite alle 10 Ergebnisse für Tests (normalerweise nur 3 um Zeit zu sparen)
        const scrapingPromises = response.data.items.slice(0, 10).map(async (item: any) => {
        // Zuerst: Telefonnummer aus Snippet versuchen
        const text = `${item.snippet || ''} ${item.title || ''}`;
        const phonePatterns = [
          /(\+49[\s\-]?\d{2,5}[\s\-]?\d{3,8}[\s\-]?\d{0,8})/g,
          /(0\d{2,5}[\s\-\/]?\d{3,8}[\s\-\/]?\d{0,8})/g,
          /(\(\d{2,5}\)[\s\-]?\d{3,8}[\s\-]?\d{0,8})/g,
          /(Tel\.?:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
          /(Telefon:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
          /(Phone:?\s*[\+\d\s\-\/\(\)]{8,20})/gi
        ];
        
        let phone = undefined;
        for (const pattern of phonePatterns) {
          const matches = text.match(pattern);
          if (matches && matches.length > 0) {
            phone = matches[0].replace(/^(Tel\.?:?\s*|Telefon:?\s*|Phone:?\s*)/i, '').trim();
            break;
          }
        }
        
        // Falls keine Telefonnummer im Snippet: Von echter Website scrapen
        if (!phone && item.link) {
          console.log(`Scraping phone from website: ${item.link}`);
          phone = await scrapePhoneFromWebsite(item.link);
        }
        
        return {
          source: 'google' as const,
          companyName: item.title || 'Unbekannter Titel',
          phone: phone,
          url: item.link,
          description: item.snippet || undefined
        };
      });

              // Warte auf alle Scraping-Operationen
        const scrapedResults = await Promise.allSettled(scrapingPromises);
        
        scrapedResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          }
        });

        // Füge die restlichen Ergebnisse ohne Phone-Scraping hinzu
        for (let i = 3; i < response.data.items.length; i++) {
          const item = response.data.items[i];
          const text = `${item.snippet || ''} ${item.title || ''}`;
          
          let phone = undefined;
          const phonePatterns = [
            /(\+49[\s\-]?\d{2,5}[\s\-]?\d{3,8}[\s\-]?\d{0,8})/g,
            /(0\d{2,5}[\s\-\/]?\d{3,8}[\s\-\/]?\d{0,8})/g,
            /(\(\d{2,5}\)[\s\-]?\d{3,8}[\s\-]?\d{0,8})/g,
            /(Tel\.?:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
            /(Telefon:?\s*[\+\d\s\-\/\(\)]{8,20})/gi,
            /(Phone:?\s*[\+\d\s\-\/\(\)]{8,20})/gi
          ];
          
          for (const pattern of phonePatterns) {
            const matches = text.match(pattern);
            if (matches && matches.length > 0) {
              phone = matches[0].replace(/^(Tel\.?:?\s*|Telefon:?\s*|Phone:?\s*)/i, '').trim();
              break;
            }
          }
          
          results.push({
            source: 'google',
            companyName: item.title || 'Unbekannter Titel',
            phone: phone,
            url: item.link,
            description: item.snippet || undefined
          });
        }
        
      } catch (pageError: any) {
        console.log(`Error fetching Google page ${page + 1}:`, pageError.message || pageError);
        
        // Bei 400 Bad Request (API Limit erreicht): stop gracefully
        if (pageError.response?.status === 400) {
          console.log('Google API: Limit erreicht oder ungültige Parameter - stoppe Paginierung');
          break;
        }
        
        // Bei anderen Fehlern: stop auch (Sicherheit)
        console.log('Google API: Stoppe bei unbekanntem Fehler');
        break;
      }
    }

    console.log(`Google search completed: ${results.length} results`);
    return {
      source: 'google',
      results
    };

  } catch (error: any) {
    console.error('Google search error:', error);
    let errorMessage = 'API-Fehler';
    
    if (error.response?.status === 403) {
      errorMessage = 'API-Schlüssel ungültig oder Quota erschöpft';
    } else if (error.response?.status === 400) {
      errorMessage = 'Ungültige Anfrage oder CSE-ID';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Timeout beim API-Aufruf';
    }

    return {
      source: 'google',
      results: [],
      error: errorMessage
    };
  }
} 