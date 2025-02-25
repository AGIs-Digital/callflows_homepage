interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "Meine Anforderungen haben sich geändert, kann ich den Agenten anpassen lassen?",
    answer: "Ja, entweder indem neue Agenten in das Team integriert oder bestehende angepasst werden. Für die Konfiguration berechnen wir nur den Zeitaufwand."
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer: "Nein, unsere Preise sind transparent. Sie zahlen nur für das gewählte Paket und optional für zusätzliche Anrufvolumen oder Funktionen und Anpassungen, die Sie explizit buchen."
  },
  {
    question: "Kann ich das Paket später upgraden?",
    answer: "Ja, Sie können jederzeit auf ein höheres Paket upgraden. Die Preisdifferenz wird anteilig berechnet und Ihre bestehenden Daten werden nahtlos übernommen."
  },
  {
    question: "Wie werden die Anrufe abgerechnet?",
    answer: "Die Anrufe werden pro Minute sekundengenauabgerechnet. Sollte das Volumen der Pakete überschritten werden, wird jede angefangene Minute pay-as-you-go je 0,99 € /Minute am Ende des Monats in Rechnung gestellt."
  },
  {
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer: "Wir akzeptieren alle gängigen Kreditkarten, SEPA-Lastschrift und Überweisung. Für Enterprise-Kunden bieten wir auch individuelle Zahlungskonditionen."
  },
  {
    question: "Was passiert wenn ich nicht alle Minuten aufbrauche?",
    answer: "Nicht verbrauchte Minuten der Pakete verfallen zum nächsten Abrechnungszeitpunkt. Über Zusatzpakete gekaufte Minuten können nicht verfallen. Sie werden in den nächsten Monat übertragen."
  },
  {
    question: "Was passiert wenn meine Minuten aufgebraucht sind?",
    answer: "Der Betrieb läuft solange weiter, bis Sie Ihre Agenten deaktivieren. Sind alle Minuten aufgebraucht, wird jede weitere angefangene Minute in Rechnung gestellt."
  },
  {
    question: "Gibt es Rabatte für Non-Profit Organisationen?",
    answer: "Ja, wir bieten spezielle Konditionen für Non-Profit Organisationen. Kontaktieren Sie uns für weitere Informationen."
  }
];