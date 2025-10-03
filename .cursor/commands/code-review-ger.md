Überprüfe die Änderungen auf @branch:

- Überlege, wie die Daten im System fließen. Erkläre neue Muster, falls sie existieren, und warum.
- Gab es Änderungen, die die Infrastruktur beeinflussen könnten?
- Betrachte leere, Lade-, Fehler- und Offline-Zustände.
- Überprüfe Frontend-Änderungen auf Barrierefreiheit (Tastaturnavigation, Fokus-Management, ARIA-Rollen, Farbkontraste).
- Wenn sich öffentliche APIs geändert haben, stelle Rückwärtskompatibilität sicher (oder erhöhe die API-Version).
- Haben wir unnötige Abhängigkeiten hinzugefügt? Falls es eine große Abhängigkeit gibt, könnten wir eine minimalere Inline-Version nutzen?
- Haben wir Qualitätstests hinzugefügt? Bevorzuge weniger, dafür hochwertige Tests. Integrationstests für Nutzerflows sind vorzuziehen.
- Gab es Schemaänderungen, die eine Datenbankmigration erfordern könnten?
- Änderungen an Authentifizierungsflüssen oder Berechtigungen? Führe /security-review aus.
- Falls Feature Flags eingerichtet sind: erfordert diese Änderung ein neues Flag?
- Falls i18n eingerichtet ist: wurden die Strings lokalisiert und neue Routen internationalisiert?
- Gibt es Stellen, an denen wir Caching einsetzen sollten?
- Fehlen uns kritische Barrierefreiheits-Checks oder Logging bei Backend-Änderungen?