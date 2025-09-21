"use client";

import { LegalSection } from "@/components/legal/section";
import { LegalLayout } from "@/components/legal/layout";
import { useI18n } from "@/lib/i18n";
import Head from "next/head";

export default function DatenschutzPage() {
  const { t, tArray } = useI18n();
  
  return (
    <>
      <Head>
        <title>Datenschutz bei KI-Telefonie und Voice Agents | callflows</title>
        <meta name="description" content="Erfahren Sie, wie callflows Datenschutz und DSGVO-Konformität bei KI-Telefonie gewährleistet. Alle Informationen zu Datenverarbeitung, Speicherung und Ihren Rechten." />
      </Head>
      <LegalLayout
        title={t('legal.datenschutz.title')}
        subtitle={t('legal.datenschutz.subtitle')}
        breadcrumbName="Datenschutz"
        breadcrumbUrl="https://callflows.de/datenschutz"
      >
        <div>
          <p className="text-lg text-muted-foreground mb-8">
            {t('legal.datenschutz.intro')}
          </p>
          
          <LegalSection title={t('legal.datenschutz.introduction.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.introduction.content')}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.responsible.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.responsible.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.responsible.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.dataCollection.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.dataCollection.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.dataCollection.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.purpose.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.purpose.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.purpose.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.thirdParties.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.thirdParties.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.thirdParties.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.retention.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.retention.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.retention.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.rights.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.rights.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.rights.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.cookies.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.cookies.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.cookies.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.security.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.security.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.security.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.transfer.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.transfer.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.transfer.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.changes.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.changes.content')}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.contact.title')}>
            <p className="text-gray-600 dark:text-gray-300">
              {t('legal.datenschutz.contact.content').split('\\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('legal.datenschutz.contact.content').split('\\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection title={t('legal.datenschutz.aiSecurity.title')}>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {t('legal.datenschutz.aiSecurity.content')}
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
              {tArray('legal.datenschutz.aiSecurity.list').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </LegalSection>
        </div>
      </LegalLayout>
    </>
  );
}