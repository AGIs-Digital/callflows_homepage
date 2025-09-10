// KI-Telefonie Keywords basierend auf Marktanalyse
export const KI_TELEFONIE_KEYWORDS = {
  // Primäre High-Volume Keywords
  primary: [
    "KI Telefonie",              // ~1,300 Suchen/Monat
    "KI Telefonassistent",       // ~800 Suchen/Monat  
    "automatisierte Telefonie",   // ~600 Suchen/Monat
    "Voice Bot",                 // ~2,100 Suchen/Monat
    "Telefon Bot",               // ~400 Suchen/Monat
    "KI Anrufbeantworter",       // ~200 Suchen/Monat
  ],
  
  // Long-Tail Keywords (hohe Conversion)
  longTail: [
    "KI für Kundenservice",               // ~300 Suchen/Monat
    "automatische Anrufbearbeitung",      // ~150 Suchen/Monat
    "KI Callcenter Software",            // ~200 Suchen/Monat
    "intelligente Telefonanlage",         // ~100 Suchen/Monat
    "KI basierte Kundenkommunikation",   // ~80 Suchen/Monat
    "automatisierte Terminvereinbarung", // ~250 Suchen/Monat
  ],
  
  // Lokale Keywords (DACH-Region)
  local: [
    "KI Telefonie Deutschland",
    "Voice Agent Deutschland", 
    "KI Anrufe automatisieren",
    "Telefonie Automatisierung Deutschland",
  ],
  
  // Intent-basierte Keywords
  kaufAbsicht: [
    "KI Telefonie kaufen",
    "Voice Bot Software Preis",
    "KI Telefonassistent Kosten",
    "automatisierte Telefonie Anbieter",
    "KI Callcenter Lösung",
  ],
  
  // Problem-orientierte Keywords
  problemOriented: [
    "zu viele Anrufe bewältigen",
    "Kundenservice automatisieren",
    "Telefonkosten reduzieren",
    "24/7 Kundenbetreuung",
    "Mitarbeiter entlasten Telefon",
  ],
  
  // Branchenspezifische Keywords
  branche: [
    "KI Telefonie Immobilien",
    "automatisierte Anrufe Versicherung", 
    "Voice Bot Personaldienstleister",
    "KI Callcenter Gesundheitswesen",
    "Telefonie Automatisierung Einzelhandel",
  ],
  
  // Technische Keywords
  technical: [
    "Speech-to-Text Telefonie",
    "Text-to-Speech KI",
    "Natural Language Processing Telefon",
    "Conversational AI Telefonie",
    "Voice Recognition Software",
  ]
};

// Suchvolumen-Bewertung
export const KEYWORD_METRICS = {
  "KI Telefonie": { volume: 1300, difficulty: 65, cpc: 2.80 },
  "Voice Bot": { volume: 2100, difficulty: 72, cpc: 1.90 },
  "KI Telefonassistent": { volume: 800, difficulty: 58, cpc: 3.20 },
  "automatisierte Telefonie": { volume: 600, difficulty: 55, cpc: 2.40 },
  "KI für Kundenservice": { volume: 300, difficulty: 45, cpc: 4.10 },
  "automatische Anrufbearbeitung": { volume: 150, difficulty: 40, cpc: 3.80 },
};

// Konkurrenz-Analyse (Top 3 Ranking-Faktoren)
export const COMPETITOR_KEYWORDS = {
  strengths: [
    "KI‑callflow",           // Dein Unique Brand Term
    "ohne Vertragslaufzeit", // Dein USP
    "minutenbasierte Abrechnung", // Dein Preismodell
  ],
  
  gaps: [
    "KI Telefonie Software",     // Konkurrenz stark
    "Voice Bot Deutschland",     // Lokale Konkurrenz
    "Callcenter Automatisierung", // Breiter Markt
  ],
  
  opportunities: [
    "KI Telefonie Mittelstand",     // Wenig Konkurrenz
    "Voice Agent ohne Abo",         // Dein USP
    "Pay per Use Telefonie",        // Innovatives Modell
    "KI Anrufe B2B",               // Zielgruppe spezifisch
  ]
};
