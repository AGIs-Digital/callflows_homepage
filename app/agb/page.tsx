"use client";

import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";
import { useI18n } from "@/lib/i18n";

export default function AGBPage() {
  const { t } = useI18n();
  
  return (
    <LegalLayout 
      title={t('legal.agb.title')}
      subtitle={t('legal.agb.subtitle')}
    >
      <LegalSection title={t('legal.agb.section1Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section1Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section2Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section2Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section3Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section3Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section4Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section4Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section5Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section5Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section6Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section6Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section7Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section7Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section8Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section8Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section9Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section9Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section10Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section10Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section11Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section11Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section12Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section12Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section13Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section13Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section14Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section14Content')}
        </p>
      </LegalSection>

      <LegalSection title={t('legal.agb.section15Title')}>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {t('legal.agb.section15Content')}
        </p>
      </LegalSection>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>{t('legal.agb.noteLabel')}</strong> {t('legal.agb.translationNote')}
          {/* In production, all 15 sections would be fully translated */}
        </p>
      </div>

    </LegalLayout>
  );
}