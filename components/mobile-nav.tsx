"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Schließt das Menü bei Routenwechsel
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menü öffnen</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col gap-6 py-6">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleLinkClick("/")}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary text-left",
                  pathname === "/" ? "text-primary" : "text-foreground/60"
                )}
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick("/pricing")}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary text-left",
                  pathname === "/pricing" ? "text-primary" : "text-foreground/60"
                )}
              >
                Preise
              </button>
              <button
                onClick={() => handleLinkClick("/blog")}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary text-left",
                  pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
                )}
              >
                Blog
              </button>
              <button
                onClick={() => handleLinkClick("/#about")}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary text-left",
                  pathname === "/#about" ? "text-primary" : "text-foreground/60"
                )}
              >
                Über uns
              </button>
              <button
                onClick={() => handleLinkClick("/kontakt")}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary text-left",
                  pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
                )}
              >
                Kontakt
              </button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
} 