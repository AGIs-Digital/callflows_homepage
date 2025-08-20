import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container py-16 max-w-4xl bg-gradient-to-b from-primary/20 via-primary/10 to-secondary/25">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>
        <div className="space-y-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}