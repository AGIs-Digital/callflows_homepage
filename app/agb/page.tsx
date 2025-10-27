import { AGBContent } from "./agb-content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: 'AGB - Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen der callflows GmbH für KI-Telefonie und Voice Agent Services. Transparente Vertragsbedingungen für unsere Dienstleistungen.',
  path: '/agb',
  keywords: [
    'AGB callflows',
    'Geschäftsbedingungen KI Telefonie',
    'AGB Voice Agent',
    'Vertragsbedingungen',
    'Nutzungsbedingungen'
  ]
});

export default function AGBPage() {
  return <AGBContent />;
}