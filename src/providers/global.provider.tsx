"use client";

import { ThemeProvider } from "@/providers/theme.provider";
import { EscrowProvider } from "./escrow.provider";
import { WalletProvider } from "./wallet.provider";
import { TabsProvider } from "./tabs.provider";
import { TrustlessWorkProvider } from "@trustless-work/hooks";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>
        <TrustlessWorkProvider
          baseURL="https://dev.api.trustlesswork.com"
          apiKey={process.env.NEXT_PUBLIC_API_KEY || ""}
        >
          <TabsProvider>
            <EscrowProvider>{children}</EscrowProvider>
          </TabsProvider>
        </TrustlessWorkProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};
