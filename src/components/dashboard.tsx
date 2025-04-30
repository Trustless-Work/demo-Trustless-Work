"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeployEndpoints } from "@/components/endpoints/deploy-endpoints";
import { EscrowEndpoints } from "@/components/endpoints/escrow-endpoints";
import { HelperEndpoints } from "@/components/endpoints/helper-endpoints";
import { ApiKeyBadge } from "@/components/api-key-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("deploy");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage escrow contracts and interact with the Stellar blockchain.
          </p>
        </div>
        <ApiKeyBadge />
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>
            Access and test various API endpoints for escrow management and
            blockchain operations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="deploy"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
              >
                Deploy
              </TabsTrigger>
              <TabsTrigger
                value="escrow"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
              >
                Escrows
              </TabsTrigger>
              <TabsTrigger
                value="helper"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none py-3"
              >
                Helpers
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="deploy" className="mt-0">
                <DeployEndpoints />
              </TabsContent>
              <TabsContent value="escrow" className="mt-0">
                <EscrowEndpoints />
              </TabsContent>
              <TabsContent value="helper" className="mt-0">
                <HelperEndpoints />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
