"use client";

import { Button } from "@/components/ui/button";
import { InitializeEscrowForm } from "../forms/InitializeEscrowForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInitializeEscrow } from "../../hooks/initialize-escrow.hook";

export function DeployEndpoints() {
  const {
    loadTemplate,
    form,
    loading,
    response,
    error,
    addMilestone,
    removeMilestone,
    onSubmit,
  } = useInitializeEscrow();

  const handleLoadTemplate = () => {
    loadTemplate();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3 flex justify-between gap-4">
        <div className="flex gap-2 flex-col">
          <CardTitle className="text-xl">Deploy Endpoints</CardTitle>
          <CardDescription>
            Deploy and initialize escrow contracts on the Stellar blockchain
          </CardDescription>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleLoadTemplate}
          className="mb-4"
        >
          Use Template
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <InitializeEscrowForm
          form={form}
          onSubmit={onSubmit}
          addMilestone={addMilestone}
          removeMilestone={removeMilestone}
          loading={loading}
          response={response}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
