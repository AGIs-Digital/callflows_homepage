import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AGBPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>§1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen Geschäftsbeziehungen 
            zwischen der Callflows GmbH (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Nutzer").
          </p>

          <h2>§2 Vertragsgegenstand</h2>
          <p>
            Gegenstand des Vertrages ist die Nutzung der KI-gestützten Outbound-Call-Lösung "Callflows" gemäß der 
            jeweiligen aktuellen Produktbeschreibung.
          </p>

          <h2>§3 Vertragsschluss</h2>
          <p>
            Der Vertrag kommt durch die Annahme des Kundenantrags durch den Anbieter zustande. Die Annahme erfolgt durch 
            ausdrückliche Erklärung, Auftragsbestätigung oder durch Freischaltung des Zugangs zur Software.
          </p>

          <h2>§4 Leistungsumfang</h2>
          <p>
            Der Anbieter stellt dem Nutzer die Software als Cloud-Lösung zur Verfügung. Der konkrete Funktionsumfang 
            richtet sich nach dem gewählten Tarif.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}