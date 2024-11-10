export function CompanyInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">Unternehmen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Abeln Goltz GbR<br />
          Adalbert-Stifter-Straße 14<br />
          30655 Hannover
        </p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Vertreten durch</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tom Niclas Abeln<br />
          Timo Goltz
        </p>
      </div>
    </div>
  );
}