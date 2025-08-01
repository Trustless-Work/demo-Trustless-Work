"use client";

import {
  User,
  ChevronDown,
  Copy,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { useWalletContext } from "@/providers/wallet.provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useUtils } from "@/hooks/utils.hook";
import { formatAddress } from "@/helpers/format.helper";
import { openExplorer } from "@/helpers/utils.helper";

interface WalletButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const WalletButton = ({
  className,
  variant = "outline",
  size = "default",
}: WalletButtonProps) => {
  const { walletAddress, walletName } = useWalletContext();
  const [isOpen, setIsOpen] = useState(false);
  const { copyToClipboard, copied } = useUtils();

  const isConnected = !!walletAddress;

  if (!isConnected) {
    return (
      <Button
        variant={variant}
        size={size}
        disabled
        className={cn("flex items-center gap-2", className)}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">No Wallet</span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("flex items-center gap-2", className)}
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{walletName || "Wallet"}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{walletName || "Wallet"}</p>
          <p className="text-xs text-muted-foreground">
            {walletAddress ? formatAddress(walletAddress) : ""}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => copyToClipboard(walletAddress)}
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openExplorer(walletAddress)}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
