"use client";

import { InitializeEscrowForm } from "../forms/InitializeEscrowForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeployEndpoints() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Deploy Endpoints</CardTitle>
        <CardDescription>
          Deploy and initialize escrow contracts on the Stellar blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <InitializeEscrowForm />
      </CardContent>
    </Card>
  );
}
