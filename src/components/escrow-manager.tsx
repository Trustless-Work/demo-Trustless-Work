"use client";

import { useState } from "react";
import { InitializeEscrowForm } from "@/components/forms/initialize-escrow-form";
import { EscrowDashboard } from "@/components/escrow-dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Escrow } from "@/@types/escrow.entity";

export function EscrowManager() {
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [activeTab, setActiveTab] = useState("initialize");

  const handleEscrowInitialized = (newEscrow: Escrow) => {
    setEscrow(newEscrow);
    setActiveTab("manage");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Escrow Management</CardTitle>
        <CardDescription>
          Initialize and manage escrow contracts on the Stellar blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="initialize">Initialize Escrow</TabsTrigger>
            <TabsTrigger value="manage" disabled={!escrow}>
              Manage Escrow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="initialize" className="mt-6">
            <InitializeEscrowForm
              onEscrowInitialized={handleEscrowInitialized}
            />
          </TabsContent>
          <TabsContent value="manage" className="mt-6">
            {escrow && <EscrowDashboard escrow={escrow} />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
