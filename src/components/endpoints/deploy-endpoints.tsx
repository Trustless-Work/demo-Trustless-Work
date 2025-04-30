"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InitializeEscrowForm } from "@/components/forms/initialize-escrow-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeployEndpoints() {
  const [activeTab, setActiveTab] = useState("initialize-escrow");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-xl">Deploy Endpoints</CardTitle>
        <CardDescription>
          Deploy and initialize escrow contracts on the Stellar blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <InitializeEscrowForm onEscrowInitialized={() => {}} />
      </CardContent>
    </Card>
  );
}
