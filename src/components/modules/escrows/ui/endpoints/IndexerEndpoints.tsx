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
import { GetEscrowsByContractIdsForm } from "../forms/GetEscrowsByContractIdsForm";

export function IndexerEndpoints() {
  const [activeTab, setActiveTab] = useState("get-escrows-by-signer");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Indexer Endpoints</CardTitle>
        <CardDescription>
          Utility endpoints for database interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="get-escrows-by-signer" className="flex-1">
              Get Escrows by Signer
            </TabsTrigger>
            <TabsTrigger value="get-escrows-by-role" className="flex-1">
              Get Escrows by Role
            </TabsTrigger>
            <TabsTrigger value="get-escrows-by-contract-ids" className="flex-1">
              Get Escrows by Contract IDs
              <GetEscrowsByContractIdsForm />
            </TabsTrigger>
          </TabsList>
          <div className="mt-2 pt-4 border-t">
            <TabsContent
              value="get-escrows-by-signer"
              className="flex justify-center mt-0"
            >
              {/* Get Escrows by Signer Form */}
            </TabsContent>
            <TabsContent
              value="get-escrows-by-role"
              className="flex justify-center mt-0"
            >
              {/* Get Escrows by Role Form */}
            </TabsContent>
            <TabsContent
              value="get-escrows-by-contract-ids"
              className="flex justify-center mt-0"
            >
              {/* Get Escrows by Contract IDs Form */}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
