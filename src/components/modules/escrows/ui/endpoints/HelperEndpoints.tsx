"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetMultipleEscrowBalanceForm } from "../forms/GetMultipleEscrowBalanceForm";

export function HelperEndpoints() {
  const [activeTab, setActiveTab] = useState("get-multiple-escrow-balance");

  return (
    <div className="w-full">
      {/* Card wrapper - hidden on mobile, visible on desktop */}
      <Card className="hidden md:block border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Helper Endpoints</CardTitle>
          <CardDescription>
            Utility endpoints for blockchain interactions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full mb-4">
              <TabsTrigger
                value="get-multiple-escrow-balance"
                className="flex-1"
              >
                Get Balances
              </TabsTrigger>
            </TabsList>
            <div className="mt-2 pt-4 border-t">
              <TabsContent
                value="get-multiple-escrow-balance"
                className="flex justify-center mt-0"
              >
                <GetMultipleEscrowBalanceForm />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Mobile content - visible on mobile, hidden on desktop */}
      <div className="block md:hidden w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Helper Endpoints</h2>
          <p className="text-muted-foreground">
            Utility endpoints for blockchain interactions
          </p>
        </div>

        <div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full mb-4">
              <TabsTrigger
                value="get-multiple-escrow-balance"
                className="flex-1"
              >
                Get Balances
              </TabsTrigger>
            </TabsList>
            <div className="mt-2 pt-4 border-t">
              <TabsContent
                value="get-multiple-escrow-balance"
                className="flex justify-center mt-0"
              >
                <GetMultipleEscrowBalanceForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
