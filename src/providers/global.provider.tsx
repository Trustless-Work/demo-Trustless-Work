import { ApiProvider } from "@/providers/api.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { EscrowProvider } from "./escrow.provider";
import { WalletProvider } from "./wallet.provider";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>
        <ApiProvider>
          <EscrowProvider>{children}</EscrowProvider>
        </ApiProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};
