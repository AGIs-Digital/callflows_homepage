export function ContactInfo() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-2">Telefon</h3>
        <p className="text-gray-600 dark:text-gray-300">+49 155 60106486</p>
      </div>
      <div>
        <h3 className="font-medium mb-2">E-Mail</h3>
        <p className="text-gray-600 dark:text-gray-300">info@callflows.de</p>
      </div>
    </div>
  );
}