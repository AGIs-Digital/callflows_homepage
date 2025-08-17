"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative w-9 h-9 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`${theme === "light" ? "Dunkles" : "Helles"} Design aktivieren`}
      title={`Zu ${theme === "light" ? "dunklem" : "hellem"} Design wechseln`}
    >
      <Sun className="h-5 w-5 absolute top-2 left-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="h-5 w-5 absolute top-2 left-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Design zwischen hell und dunkel umschalten</span>
    </button>
  );
}