export function CompanyInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">Unternehmen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          <strong className="text-primary">callflows GmbH</strong><br />
          Am Roten Steine 1<br />
          31558 Hagenburg<br />
          Deutschland
        </p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Vertreten durch</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tom Abeln<br />
          Timo Goltz
        </p>
      </div>
    </div>
  );
}