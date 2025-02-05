import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";

export default function AGBPage() {
  return (
    <LegalLayout 
      title="Allgemeine Geschäftsbedingungen"
      subtitle="Vertragliche Grundlagen unserer Zusammenarbeit"
    >
      <LegalSection title="1. Begriffsdefinitionen">
        <p className="text-gray-600 dark:text-gray-300">
          Im Sinne dieser AGB gelten folgende Definitionen:<br /><br />
          „Anbieter" bezeichnet die Abeln Goltz GbR, handelnd unter der Marke callflows, mit Sitz in Adalbert-Stifter Straße 14, 30655 Hannover.<br /><br />
          „Kunde" bezeichnet ausschließlich Unternehmer im Sinne des § 14 BGB, also natürliche oder juristische Personen, die den Dienst zu gewerblichen oder beruflichen Zwecken nutzen. Verbraucher im Sinne des § 13 BGB sind von der Nutzung ausgeschlossen.<br /><br />
          „Dienste" bezeichnet alle durch callflows angebotenen und bereitgestellten Leistungen im Bereich der KI-gestützten Telefonautomation.<br /><br />
          „Vertrag" bezeichnet die Vereinbarung zwischen dem Anbieter und dem Kunden zur Nutzung der Dienste von callflows.<br /><br />
          „Drittanbieter" bezeichnet externe Dienstleister, deren Technologien oder Plattformen in die Dienste von callflows integriert sind, insbesondere Synthflow AI.<br /><br />
          „Nutzerinhalte" bezeichnet alle vom Kunden über die Dienste von callflows erstellten, übermittelten oder gespeicherten Daten, einschließlich Gesprächsprotokolle und Transkriptionen.
        </p>
      </LegalSection>

      <LegalSection title="2. Geltungsbereich">
        <p className="text-gray-600 dark:text-gray-300">
          Diese AGB regeln die Nutzung der durch callflows bereitgestellten Dienstleistungen. callflows ist eine Marke der Abeln Goltz GbR, Adalbert-Stifter Straße 14, 30655 Hannover. Sie gelten für alle Verträge zwischen der Abeln Goltz GbR ("Anbieter") und den Nutzern ("Kunden"). Mit der Nutzung der angebotenen Dienstleistungen erkennt der Kunde diese AGB an.
        </p>
      </LegalSection>

      <LegalSection title="3. Leistungsbeschreibung">
        <p className="text-gray-600 dark:text-gray-300">
          callflows bietet eine cloudbasierte KI-Telefonagentenlösung an, die Unternehmen bei der Automatisierung von Kommunikationsprozessen unterstützt. Die Dienste basieren auf einer Whitelabel-Integration eines Drittanbieters. Der Kunde erhält Zugang zu verschiedenen Servicepaketen mit definierten Nutzungskontingenten. Die genauen Leistungsmerkmale ergeben sich aus den jeweiligen Tarifbeschreibungen.
        </p>
      </LegalSection>

      <LegalSection title="4. Vertragslaufzeit und Kündigung">
        <p className="text-gray-600 dark:text-gray-300">
          Der Vertrag wird auf unbestimmte Zeit geschlossen und verlängert sich automatisch um jeweils einen weiteren Monat, sofern keine Kündigung erfolgt.<br /><br />
          Der Kunde kann das Abonnement jederzeit bis zum Tag vor der nächsten automatischen Verlängerung kündigen.<br /><br />
          Die Kündigung kann auf zwei Arten erfolgen:<br />
          1. Direkt über Stripe durch Deaktivierung des Abonnements.<br />
          2. Schriftlich per E-Mail an den Support von callflows (info@callflows.de).<br /><br />
          Nach einer Kündigung bleibt der Zugang bis zum Ende des bereits bezahlten Abrechnungszeitraums bestehen.<br /><br />
          Es erfolgt keine Erstattung für ungenutzte Tage innerhalb des Abrechnungszeitraums.<br /><br />
          callflows behält sich das Recht vor, den Vertrag aus wichtigem Grund fristlos zu kündigen, insbesondere bei:<br />
          • Verstoß gegen diese AGB, insbesondere durch missbräuchliche oder rechtswidrige Nutzung der Dienste<br />
          • Zahlungsverzug, sofern dieser nicht innerhalb von 7 Tagen nach Mahnung behoben wird<br />
          • Manipulation oder unerlaubte technische Änderungen am Service<br /><br />
          callflows kann den Vertrag mit einer Frist von 30 Tagen zum Monatsende kündigen. Die Kündigung erfolgt per E-Mail an die beim Kunden hinterlegte Adresse.
        </p>
      </LegalSection>

      <LegalSection title="5. Preise und Zahlungsmodalitäten">
        <p className="text-gray-600 dark:text-gray-300">
          Die aktuellen Preise und Tarifoptionen sind auf der Website des Anbieters einsehbar.<br /><br />
          Die Abrechnung erfolgt monatlich im Voraus über den Zahlungsdienstleister Stripe.<br /><br />
          Bei Zahlungsverzug hat der Kunde nach Mahnung 7 Tage Zeit, die ausstehende Zahlung nachzuholen.<br /><br />
          callflows behält sich das Recht vor, bei Nichtzahlung den Zugang zum Service zu sperren und den Vertrag zu kündigen.<br /><br />
          Es erfolgt grundsätzlich keine Rückerstattung für bereits geleistete Zahlungen.<br /><br />
          Preisänderungen werden dem Kunden mindestens 30 Tage im Voraus mitgeteilt.<br /><br />
          Bei einer Preisänderung hat der Kunde das Recht, den Vertrag außerordentlich zu kündigen.
        </p>
      </LegalSection>

      <LegalSection title="6. Minutenpakete & zusätzliche Minutenabrechnung">
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Flexible Nutzung & Abrechnung:</strong><br />
          Kunden haben die Möglichkeit, zusätzlich zu ihrem Monatsabo Minutenpakete zu buchen. Diese Minutenpakete bieten günstigere Minutenpreise im Vergleich zur minutengenauen Abrechnung.<br /><br />
          Falls der Kunde kein Minutenpaket bucht, werden über das inkludierte Minutenkontingent hinausgehende Gesprächsminuten automatisch minutengenau zu 0,99 €/Minute abgerechnet.<br /><br />
          <strong>Gültigkeit & Verbrauchsreihenfolge:</strong><br />
          Minutenpakete sind zeitlich unbefristet und bleiben gültig, bis sie vollständig verbraucht wurden. Dabei werden die Minuten in einer festen Reihenfolge genutzt: Zunächst wird das im Monatsabo enthaltene Minutenkontingent aufgebraucht, anschließend greifen bereits gebuchte Minutenpakete. Falls ein Kunde mehrere Minutenpakete erworben hat, werden diese in der Reihenfolge ihres Kaufs verbraucht, wobei die ältesten Pakete zuerst genutzt werden.<br /><br />
          <strong>Stapelung & Übertragbarkeit:</strong><br />
          Kunden haben die Möglichkeit, mehrere Minutenpakete gleichzeitig zu kaufen, diese zu stapeln und flexibel in beliebiger Reihenfolge zu verbrauchen. Nicht genutzte Minutenpakete werden automatisch in den nächsten Monat übertragen und verfallen nicht, solange das Abonnement aktiv bleibt.<br /><br />
          <strong>Kündigung & Verfall von Minuten:</strong><br />
          Bei einer Kündigung des Abonnements verfallen jedoch alle nicht genutzten Minutenpakete mit sofortiger Wirkung. Eine Erstattung für ungenutzte Minuten erfolgt nicht. Minutenpakete müssen stets manuell gebucht werden, eine automatische Aufladung ist nicht vorgesehen.<br /><br />
          <strong>Preisänderungen & Transparenz:</strong><br />
          Die Preise für Minutenpakete können sich ändern. Kunden werden über Preisänderungen mindestens 30 Tage im Voraus per E-Mail oder über die Website informiert. Änderungen gelten jedoch nur für neu erworbene Minutenpakete – bereits gekaufte Pakete behalten ihre ursprünglichen Konditionen.<br /><br />
          <strong>Einsatzbereiche:</strong><br />
          Minutenpakete können für sämtliche Anrufe, sowohl Inbound als auch Outbound, genutzt werden. Es gibt keine weiteren Einschränkungen, abgesehen von den allgemeinen Nutzungsbedingungen des Services.
        </p>
      </LegalSection>

      <LegalSection title="7. Rechnungsstellung & Reklamationen">
        <p className="text-gray-600 dark:text-gray-300">
          Die Zahlungsabwicklung erfolgt über Stripe, wodurch Kunden automatisch eine Rechnung erhalten.<br /><br />
          Sollte die erhaltene Rechnung nicht passend sein, kann der Kunde eine Korrektur per E-Mail an info@callflows.de anfordern. Der Anbieter wird prüfen, ob eine Anpassung möglich ist.<br /><br />
          Falls der Kunde ein Problem mit einer Rechnung identifiziert, hat er 14 Tage nach Rechnungsstellung Zeit, diese zu reklamieren. Nach Ablauf dieser Frist gilt die Rechnung als akzeptiert.<br /><br />
          Reklamationen sind ausschließlich per E-Mail an info@callflows.de einzureichen.
        </p>
      </LegalSection>

      <LegalSection title="8. Kein Widerrufsrecht">
        <p className="text-gray-600 dark:text-gray-300">
          Da unser Dienst ausschließlich für Unternehmer (§ 14 BGB) bestimmt ist, besteht kein gesetzliches Widerrufsrecht. Ein freiwilliges Widerrufsrecht wird nicht gewährt.
        </p>
      </LegalSection>

      <LegalSection title="9. Datenschutzverstöße & Verantwortung des Kunden">
        <p className="text-gray-600 dark:text-gray-300">
          Der Kunde verpflichtet sich, alle datenschutzrechtlichen Vorgaben (einschließlich DSGVO) einzuhalten.<br /><br />
          Sollte es zu Verstößen kommen, stellt der Kunde callflows von sämtlichen Ansprüchen Dritter frei.<br /><br />
          callflows behält sich das Recht vor, den Zugang zum Dienst zu sperren oder den Vertrag fristlos zu kündigen, falls der Kunde wiederholt oder schwerwiegend gegen Datenschutzvorgaben verstößt.
        </p>
      </LegalSection>

      <LegalSection title="10. Nutzungsbedingungen & Pflichten des Kunden">
        <p className="text-gray-600 dark:text-gray-300">
          <strong>a) Erlaubte und verbotene Nutzung</strong><br />
          Der Kunde darf die Dienste von callflows ausschließlich für legale und rechtmäßige Zwecke nutzen.<br /><br />
          <strong>b) Einhaltung der Datenschutzvorgaben (DSGVO & Hinweispflicht)</strong><br />
          Der Kunde ist selbst verantwortlich, dass er alle gesetzlichen Datenschutzvorgaben einhält.<br /><br />
          <strong>c) Sperrung oder Kündigung des Accounts bei Verstößen</strong><br />
          callflows behält sich das Recht vor, Konten ohne Vorankündigung zu sperren oder zu kündigen, wenn Kunden gegen diese AGB verstoßen.
        </p>
      </LegalSection>

      <LegalSection title="11. Haftung & Gewährleistung">
        <p className="text-gray-600 dark:text-gray-300">
          callflows übernimmt keine Haftung für Schäden, die durch fehlerhafte oder unvollständige Gesprächsergebnisse entstehen.<br /><br />
          Die Haftung ist auf den Betrag begrenzt, den der Kunde für die Nutzung der Dienste in den letzten sechs (6) Monaten gezahlt hat.<br /><br />
          callflows haftet nicht für Verzögerungen oder Leistungsausfälle, die durch Umstände verursacht werden, die außerhalb der Kontrolle von callflows liegen. Dazu gehören insbesondere:<br /><br />
          • Höhere Gewalt (z. B. Naturkatastrophen, Pandemien, Streiks, behördliche Anordnungen)<br />
          • Technische Ausfälle von Drittanbietern wie Synthflow AI<br />
          • Cyberangriffe, Stromausfälle oder Serverprobleme<br /><br />
          In diesen Fällen besteht kein Anspruch auf Schadensersatz oder Vertragsfortführung. Sollte ein solcher Ausfall länger als 30 Tage andauern, haben sowohl callflows als auch der Kunde das Recht, den Vertrag außerordentlich zu kündigen.
        </p>
      </LegalSection>

      <LegalSection title="12. Geistiges Eigentum & Datenschutz">
        <p className="text-gray-600 dark:text-gray-300">
          callflows behält sich das Recht vor, Nutzerdaten ausschließlich zur Verbesserung des Service zu nutzen. Eine kommerzielle Nutzung ist ausgeschlossen. Kunden dürfen generierte Inhalte frei verwenden, tragen jedoch die alleinige Verantwortung für deren rechtmäßige Nutzung.
        </p>
      </LegalSection>

      <LegalSection title="13. Drittanbieter & externe Dienste">
        <p className="text-gray-600 dark:text-gray-300">
          callflows basiert auf der Whitelabel-Technologie von Synthflow AI.<br /><br />
          Falls Synthflow den Betrieb einstellt oder es zu schwerwiegenden technischen Problemen kommt, behält sich callflows das Recht zur außerordentlichen Kündigung aller betroffenen Verträge vor. callflows übernimmt keine Haftung für Ausfälle oder Einschränkungen durch Synthflow.
        </p>
      </LegalSection>

      <LegalSection title="14. Änderungen der AGB">
        <p className="text-gray-600 dark:text-gray-300">
          callflows behält sich das Recht vor, diese AGB jederzeit anzupassen. Änderungen werden dem Kunden mindestens 14 Tage im Voraus mitgeteilt.
        </p>
      </LegalSection>

      <LegalSection title="15. Gerichtsstand & anwendbares Recht">
        <p className="text-gray-600 dark:text-gray-300">
          Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Hannover.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}