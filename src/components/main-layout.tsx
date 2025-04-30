"use client";

import type React from "react";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            <MobileNav />
            <span className="hidden md:inline-block font-bold text-xl">
              Trustless Work API
            </span>
          </div>
          <div className="flex items-center gap-4">
            <MainNav />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto">{children}</div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Trustless Work API. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
