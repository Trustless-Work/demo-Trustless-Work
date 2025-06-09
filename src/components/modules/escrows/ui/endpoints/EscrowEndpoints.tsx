"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useTabsContext } from "@/providers/tabs.provider";
import { Button } from "@/components/ui/button";
import { EscrowTabs } from "../../../../tabs/EscrowTabs";

export function EscrowEndpoints() {
  const { resetEscrow } = useEscrowContext();
  const { setActiveTab } = useTabsContext();
  const { escrow } = useEscrowContext();

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3 flex justify-between gap-4">
        <div className="flex gap-2 flex-col">
          <CardTitle className="text-xl">Escrow Endpoints</CardTitle>
          <CardDescription>
            Manage escrow contracts, milestones, and funds
          </CardDescription>
        </div>

        {escrow && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              resetEscrow();
              setActiveTab("deploy");
            }}
            className="mb-4"
          >
            Reset Escrow
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <EscrowTabs />
      </CardContent>
    </Card>
  );
}
