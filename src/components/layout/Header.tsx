"use client";

import Image from "next/image";
import { ThemeToggle } from "../utils/theme-toggle";
import { Button } from "../ui/button";
import { LogOut, LogIn } from "lucide-react";
import { useWallet } from "../modules/auth/hooks/wallet.hook";
import { useWalletContext } from "@/providers/wallet.provider";
import { WalletButton } from "../utils/wallet-button";

export const Header = () => {
  const { walletAddress } = useWalletContext();
  const { handleDisconnect, handleConnect } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Image
            src="/logo.png"
            alt="Trustless Work Logo"
            width={70}
            height={70}
          />
          <p className="text-xl font-bold hidden md:block">
            Trustless Work{" "}
            <span className="text-muted-foreground/80 text-base italic">
              Testnet Demo
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletButton />

          {walletAddress ? (
            <Button variant="outline" onClick={handleDisconnect}>
              <LogOut /> <span className="hidden sm:inline">Disconnect</span>
            </Button>
          ) : (
            <Button variant="outline" onClick={handleConnect}>
              <LogIn /> <span className="hidden sm:inline">Connect</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
