"use client";

import { useState } from "react";
import { useI18n, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  className?: string;
  variant?: "compact" | "full";
}

export function LanguageSelector({ className, variant = "compact" }: LanguageSelectorProps) {
  const { locale, setLocale, isLoading } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = SUPPORTED_LOCALES[locale];

  const handleLanguageChange = async (newLocale: Locale) => {
    await setLocale(newLocale);
    setIsOpen(false);
  };

  if (variant === "compact") {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 px-2 text-sm", className)}
            disabled={isLoading}
          >
            <span className="mr-1">{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {Object.entries(SUPPORTED_LOCALES).map(([code, language]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code as Locale)}
              className={cn(
                "flex items-center cursor-pointer",
                locale === code && "bg-accent"
              )}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("flex items-center gap-2", className)}
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            <span>{currentLanguage.flag}</span>
            <span>{currentLanguage.name}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(SUPPORTED_LOCALES).map(([code, language]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Locale)}
            className={cn(
              "flex items-center cursor-pointer",
              locale === code && "bg-accent"
            )}
          >
            <span className="mr-3 text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 