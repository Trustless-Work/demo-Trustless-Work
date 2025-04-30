import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ApiProvider } from "@/lib/hooks/use-api"
import { EscrowProvider } from "@/lib/hooks/use-escrow"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trustless Work API",
  description: "Interface for Trustless Work API",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ApiProvider>
            <EscrowProvider>{children}</EscrowProvider>
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
