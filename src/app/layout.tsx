import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/providers/global.provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trustless Work Demo",
  description: "Demo for Trustless Work API",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GlobalProvider>
          <div className="min-h-screen">
            <div className="flex-1 space-y-4 px-4 h-full">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
