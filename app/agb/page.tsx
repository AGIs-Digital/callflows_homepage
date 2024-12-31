import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";

export default function AGBPage() {
  return (
    <LegalLayout 
      title="Allgemeine Geschäftsbedingungen"
      subtitle="Vertragliche Grundlagen unserer Zusammenarbeit"
    >
      <LegalSection title="§1 Geltungsbereich">
            <p className="text-gray-600 dark:text-gray-300">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen Geschäftsbeziehungen 
            zwischen der Callflows GmbH (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Nutzer").
            </p>
      </LegalSection>

      <LegalSection title="§2 Vertragsgegenstand">
            <p className="text-gray-600 dark:text-gray-300">
            Gegenstand des Vertrages ist die Nutzung der KI-gestützten Outbound-Call-Lösung "Callflows" gemäß der 
            jeweiligen aktuellen Produktbeschreibung.
            </p>
      </LegalSection>

      <LegalSection title="§3 Vertragsschluss">
            <p className="text-gray-600 dark:text-gray-300">
            Der Vertrag kommt durch die Annahme des Kundenantrags durch den Anbieter zustande. Die Annahme erfolgt durch 
            ausdrückliche Erklärung, Auftragsbestätigung oder durch Freischaltung des Zugangs zur Software.
            </p>
      </LegalSection>

      <LegalSection title="§4 Leistungsumfang">
            <p className="text-gray-600 dark:text-gray-300">
            Der Anbieter stellt dem Nutzer die Software als Cloud-Lösung zur Verfügung. Der konkrete Funktionsumfang 
            richtet sich nach dem gewählten Tarif.
            </p>
      </LegalSection>
    </LegalLayout>
  );
}