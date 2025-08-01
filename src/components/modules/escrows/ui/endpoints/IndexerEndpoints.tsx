"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const tabOptions = [
    {
      value: "get-escrows-by-signer",
      label: "Get Escrows by Signer",
    },
    {
      value: "get-escrows-by-role",
      label: "Get Escrows by Role",
    },
    {
      value: "get-escrows-by-contract-ids",
      label: "Get Escrows by Contract IDs",
    },
  ];

  const renderContent = () => (
    <div className="mt-2 pt-4 border-t">
      {activeTab === "get-escrows-by-signer" && (
        <div className="flex justify-center mt-0">
          {/* Get Escrows by Signer Form */}
        </div>
      )}
      {activeTab === "get-escrows-by-role" && (
        <div className="flex justify-center mt-0">
          {/* Get Escrows by Role Form */}
        </div>
      )}
      {activeTab === "get-escrows-by-contract-ids" && (
        <div className="flex justify-center mt-0">
          <GetEscrowsByContractIdsForm />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Card wrapper - hidden on mobile, visible on desktop */}
      <Card className="hidden md:block border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Indexer Endpoints</CardTitle>
          <CardDescription>
            Utility endpoints for database interactions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full mb-4">
              <TabsTrigger value="get-escrows-by-signer" className="flex-1">
                Get Escrows by Signer
              </TabsTrigger>
              <TabsTrigger value="get-escrows-by-role" className="flex-1">
                Get Escrows by Role
              </TabsTrigger>
              <TabsTrigger
                value="get-escrows-by-contract-ids"
                className="flex-1"
              >
                Get Escrows by Contract IDs
              </TabsTrigger>
            </TabsList>
            {renderContent()}
          </Tabs>
        </CardContent>
      </Card>

      {/* Mobile content - visible on mobile, hidden on desktop */}
      <div className="block md:hidden w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Indexer Endpoints</h2>
          <p className="text-muted-foreground">
            Utility endpoints for database interactions
          </p>
        </div>

        <div>
          <div className="mb-4">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
