interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">{title}</h2>
      <div className="bg-warm-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}