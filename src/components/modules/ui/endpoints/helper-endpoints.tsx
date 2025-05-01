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
import { SendTransactionForm } from "@/components/modules/ui/forms/send-transaction-form";
import { GetMultipleEscrowBalanceForm } from "@/components/modules/ui/forms/get-multiple-escrow-balance-form";

export function HelperEndpoints() {
  const [activeTab, setActiveTab] = useState("set-trustline");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Helper Endpoints</CardTitle>
        <CardDescription>
          Utility endpoints for blockchain interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="set-trustline" className="flex-1">
              Set Trustline
            </TabsTrigger>
            <TabsTrigger value="send-transaction" className="flex-1">
              Send Transaction
            </TabsTrigger>
            <TabsTrigger value="get-multiple-escrow-balance" className="flex-1">
              Get Balances
            </TabsTrigger>
          </TabsList>
          <div className="mt-2 pt-4 border-t">
            <TabsContent value="send-transaction" className="mt-0">
              <SendTransactionForm />
            </TabsContent>
            <TabsContent value="get-multiple-escrow-balance" className="mt-0">
              <GetMultipleEscrowBalanceForm />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
