import { ThemeProvider } from "@/providers/theme.provider";
import { EscrowProvider } from "./escrow.provider";
import { WalletProvider } from "./wallet.provider";
import { TabsProvider } from "./tabs.provider";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>
        <TabsProvider>
          <EscrowProvider>{children}</EscrowProvider>
        </TabsProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};
