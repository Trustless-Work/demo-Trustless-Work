"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWalletContext } from "@/providers/wallet.provider";
import { MainTabs } from "../../../../tabs/MainTabs";
import { ConnectWalletWarning } from "../ConnectWalletWarning";
import { EscrowTypeTabs } from "../../../../tabs/EscrowTypeTabs";

export function Dashboard() {
  const { walletAddress } = useWalletContext();

  return (
    <div className="space-y-8">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <h1 className="text-2xl font-bold mb-4">Escrow Types</h1>
          <EscrowTypeTabs />
        </CardHeader>
        <CardContent className="px-0">
          {walletAddress ? <MainTabs /> : <ConnectWalletWarning />}
        </CardContent>
      </Card>
    </div>
  );
}
