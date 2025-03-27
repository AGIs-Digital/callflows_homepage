"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/pricing" ? "text-primary" : "text-foreground/60"
              )}
            >
              Preise
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
              )}
            >
              Blog
            </Link>
            <Link
              href="/#about"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/#about" ? "text-primary" : "text-foreground/60"
              )}
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
              )}
            >
              Kontakt
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-primary"
            >
              Login
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
} 