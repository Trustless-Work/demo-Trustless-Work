import { ApiProvider } from "@/providers/api.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { EscrowProvider } from "./escrow.provider";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ApiProvider>
        <EscrowProvider>{children}</EscrowProvider>
      </ApiProvider>
    </ThemeProvider>
  );
};
