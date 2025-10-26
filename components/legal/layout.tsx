import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BreadcrumbSEO } from "@/components/ui/breadcrumb-seo";

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  breadcrumbName?: string;
  breadcrumbUrl?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, subtitle, breadcrumbName, breadcrumbUrl, children }: LegalLayoutProps) {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main className="pt-20 pb-16 bg-gradient-to-b from-primary/20 via-accent/50 to-secondary/65">
        <div className="container max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          {breadcrumbName && breadcrumbUrl && (
            <BreadcrumbSEO 
              items={[
                { name: breadcrumbName, url: breadcrumbUrl }
              ]}
            />
          )}
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">{title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
          <div className="space-y-8">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}