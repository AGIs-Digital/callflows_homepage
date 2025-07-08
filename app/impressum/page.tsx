"use client";

import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";
import { ContactInfo } from "./components/contact-info";
import { CompanyInfo } from "./components/company-info";
import { useI18n } from "@/lib/i18n";

export default function ImpressumPage() {
  const { t } = useI18n();
  
  return (
    <LegalLayout 
      title={t('legal.impressum.title')}
      subtitle={t('legal.impressum.subtitle')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-8">
          {t('legal.impressum.intro')}
        </p>
        
        <LegalSection title={t('legal.impressum.tmgTitle')}>
          <CompanyInfo />
        </LegalSection>

        <LegalSection title={t('legal.impressum.contactTitle')}>
          <ContactInfo />
        </LegalSection>

        <LegalSection title={t('legal.impressum.vatTitle')}>
          <p className="text-gray-600 dark:text-gray-300">
            {t('legal.impressum.vatText')}<br />
            DE423151940
          </p>
        </LegalSection>

        <LegalSection title={t('legal.impressum.responsibleTitle')}>
          <p className="text-gray-600 dark:text-gray-300">
            {t('legal.impressum.responsibleText').split('\\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('legal.impressum.responsibleText').split('\\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </LegalSection>
        
        <LegalSection title={t('legal.impressum.disputeTitle')}>
          <p className="text-gray-600 dark:text-gray-300">
            {t('legal.impressum.disputeText1')} 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
            <br /><br />
            {t('legal.impressum.disputeText2')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {t('legal.impressum.disputeText3')}
          </p>
        </LegalSection>
        
        <LegalSection title={t('legal.impressum.liabilityTitle')}>
          <p className="text-gray-600 dark:text-gray-300">
            {t('legal.impressum.liabilityText1')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {t('legal.impressum.liabilityText2')}
          </p>
        </LegalSection>
      </div>
    </LegalLayout>
  );
}