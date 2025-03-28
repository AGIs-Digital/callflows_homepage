import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Autoren-Liste mit gleichmäßiger Verteilung
const authors = [
  "Tom Abeln",
  "Timo Goltz",
  "Sarah Müller",
  "Markus Weber",
  "Julia Schmidt"
];

// Startdatum und Enddatum für die Verteilung
const startDate = new Date('2023-01-05');
const endDate = new Date('2025-01-29');

// Funktion zum Generieren eines zufälligen Datums zwischen Start- und Enddatum
function getRandomDateBetween(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Funktion zum Formatieren eines Datums als ISO-String (YYYY-MM-DDT10:00:00Z)
function formatDateForMetadata(date: Date): string {
  return `${date.toISOString().split('T')[0]}T10:00:00Z`;
}

// Funktion zum Generieren eines modifiedTime-Datums (3-7 Tage nach publishedTime)
function generateModifiedTime(publishDate: Date): string {
  const daysToAdd = 3 + Math.floor(Math.random() * 5); // 3-7 Tage
  const modifiedDate = new Date(publishDate);
  modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
  return `${modifiedDate.toISOString().split('T')[0]}T14:30:00Z`;
}

async function updateBlogMetadata() {
  // Finde alle Blog-Post-Dateien
  const blogFiles = await glob('app/blog/*/page.tsx');
  
  // Sortiere die Dateien, um eine konsistente Reihenfolge zu haben
  blogFiles.sort();
  
  // Generiere gleichmäßig verteilte Daten
  const totalPosts = blogFiles.length;
  const timeSpan = endDate.getTime() - startDate.getTime();
  const interval = timeSpan / (totalPosts - 1);
  
  // Aktualisiere jede Datei
  blogFiles.forEach((filePath, index) => {
    // Lese den Dateiinhalt
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Berechne das Veröffentlichungsdatum für diesen Post
    const publishDate = new Date(startDate.getTime() + interval * index);
    const publishedTime = formatDateForMetadata(publishDate);
    const modifiedTime = generateModifiedTime(publishDate);
    
    // Wähle einen Autor basierend auf dem Index
    const author = authors[index % authors.length];
    
    // Aktualisiere publishedTime, modifiedTime und author
    let updatedContent = content
      .replace(/publishedTime: "([^"]+)"/, `publishedTime: "${publishedTime}"`)
      .replace(/modifiedTime: "([^"]+)"/, `modifiedTime: "${modifiedTime}"`)
      .replace(/authors: \["([^"]+)"\]/, `authors: ["${author}"]`);
    
    // Aktualisiere auch die Anzeige des Autors und Datums im JSX
    updatedContent = updatedContent
      .replace(/<span>([^<]+)<\/span>(?=\s*<span className="mx-2">\•<\/span>\s*<time)/, `<span>${author}</span>`)
      .replace(/<time dateTime="([^"]+)">([^<]+)<\/time>/, 
               `<time dateTime="${publishedTime}">${new Date(publishedTime).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</time>`);
    
    // Schreibe die aktualisierte Datei
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    console.log(`Aktualisiert: ${filePath}`);
    console.log(`  Autor: ${author}`);
    console.log(`  Veröffentlicht: ${publishedTime}`);
    console.log(`  Geändert: ${modifiedTime}`);
    console.log('---');
  });
  
  console.log(`${blogFiles.length} Blog-Dateien wurden aktualisiert.`);
}

// Führe die Funktion aus
updateBlogMetadata().catch(console.error); 