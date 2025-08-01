"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInitializeSingleEscrowForm } from "../../hooks/single-release/initialize-single-escrow-form.hook";
import { useTabsContext } from "@/providers/tabs.provider";
import { InitializeSingleEscrowForm } from "../forms/single-release/InitializeSingleEscrowForm";
import { InitializeMultiEscrowForm } from "../forms/multi-release/InitializeMultiEscrowForm";
import { useInitializeMultiEscrowForm } from "../../hooks/multi-release/initialize-multi-escrow-form.hook";

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
  } = useInitializeSingleEscrowForm();

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
  } = useInitializeMultiEscrowForm();

  const handleLoadTemplate = () => {
    if (activeEscrowType === "single-release") {
      loadTemplate();
    } else {
      multiLoadTemplate();
    }
  };

  return (
    <div className="w-full">
      {/* Card wrapper - hidden on mobile, visible on desktop */}
      <Card className="hidden md:block border shadow-sm">
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

      {/* Mobile content - visible on mobile, hidden on desktop */}
      <div className="block md:hidden w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Deploy Endpoints</h2>
          <p className="text-muted-foreground">
            Deploy and initialize escrow contracts on the Stellar blockchain
          </p>
        </div>

        <div className="mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadTemplate}
            className="w-full mb-4"
          >
            Use Template
          </Button>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}
