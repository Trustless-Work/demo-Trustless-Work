"use client";

import { Button } from "@/components/ui/button";
import { InitializeSingleEscrowForm } from "../forms/InitializeSingleEscrowForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInitializeSingleEscrow } from "../../hooks/initialize-single-escrow-form.hook";
import { useInitializeMultiEscrow } from "../../hooks/initialize-multi-escrow-form.hook";
import { useTabsContext } from "@/providers/tabs.provider";
import { InitializeMultiEscrowForm } from "../forms/InitializeMultiEscrowForm";

export function DeployEndpoints() {
  const { activeEscrowType } = useTabsContext();

  const {
    form,
    onSubmit,
    loading,
    response,
    currentStep,
    addMilestone,
    removeMilestone,
    loadTemplate,
    nextStep,
    prevStep,
  } = useInitializeSingleEscrow();

  const {
    form: multiForm,
    onSubmit: multiOnSubmit,
    loading: multiLoading,
    response: multiResponse,
    currentStep: multiCurrentStep,
    addMilestone: multiAddMilestone,
    removeMilestone: multiRemoveMilestone,
    loadTemplate: multiLoadTemplate,
    nextStep: multiNextStep,
    prevStep: multiPrevStep,
  } = useInitializeMultiEscrow();

  const handleLoadTemplate = () => {
    if (activeEscrowType === "single-release") {
      loadTemplate();
    } else {
      multiLoadTemplate();
    }
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
        {activeEscrowType === "single-release" ? (
          <InitializeSingleEscrowForm
            form={form}
            onSubmit={onSubmit}
            loading={loading}
            response={response}
            currentStep={currentStep}
            addMilestone={addMilestone}
            removeMilestone={removeMilestone}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ) : (
          <InitializeMultiEscrowForm
            form={multiForm}
            onSubmit={multiOnSubmit}
            loading={multiLoading}
            response={multiResponse}
            currentStep={multiCurrentStep}
            addMilestone={multiAddMilestone}
            removeMilestone={multiRemoveMilestone}
            nextStep={multiNextStep}
            prevStep={multiPrevStep}
          />
        )}
      </CardContent>
    </Card>
  );
}
