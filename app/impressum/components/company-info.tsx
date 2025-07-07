export function CompanyInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">Unternehmen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          <strong className="text-primary">callflows</strong> ist eine Marke der Abeln Goltz GbR<br />
          Fenskestraße 9A<br />
          30165 Hannover<br />
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