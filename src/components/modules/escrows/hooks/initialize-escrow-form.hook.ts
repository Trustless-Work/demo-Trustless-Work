import { InitializeEscrowPayload } from "@/@types/escrow-payload.entity";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetFormSchema } from "../schemas/initialize-escrow-form.schema";
import { Escrow, Milestone } from "@/@types/escrow.entity";
import { toast } from "sonner";
import { useEscrowContext } from "@/providers/escrow.provider";
import { InitializeEscrowResponse } from "@/@types/escrow-response.entity";
import { useTabsContext } from "@/providers/tabs.provider";
import { escrowService } from "../services/escrow.service";

export const useInitializeEscrow = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { walletAddress } = useWalletContext();
  const formSchema = GetFormSchema();
  const { setEscrow } = useEscrowContext();
  const { setActiveTab } = useTabsContext();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engagementId: "",
      title: "",
      description: "",
      approver: "",
      serviceProvider: "",
      platformAddress: "",
      amount: "",
      platformFee: "",
      milestones: [{ description: "" }],
      releaseSigner: "",
      disputeResolver: "",
      receiver: "",
      receiverMemo: 0,
    },
    mode: "onChange",
  });

  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    form.setValue("milestones", [...currentMilestones, { description: "" }]);
  };

  const removeMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones");
    if (currentMilestones.length > 1) {
      form.setValue(
        "milestones",
        currentMilestones.filter((_, i) => i !== index)
      );
    }
  };

  const loadTemplate = () => {
    console.log("loadTemplate");

    form.setValue("title", "Sample TW Escrow");
    form.setValue(
      "description",
      "This is a sample TW escrow for testing purposes"
    );
    form.setValue("engagementId", "ENG12345");
    form.setValue("amount", "50");
    form.setValue("platformFee", "5");
    form.setValue("approver", walletAddress || "");
    form.setValue("serviceProvider", walletAddress || "");
    form.setValue("platformAddress", walletAddress || "");
    form.setValue("releaseSigner", walletAddress || "");
    form.setValue("disputeResolver", walletAddress || "");
    form.setValue("receiver", walletAddress || "");
    form.setValue("receiverMemo", 90909090);
    form.setValue("milestones", [
      { description: "Initial milestone" },
      { description: "Second milestone" },
      { description: "Final milestone" },
    ]);
  };

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const finalPayload: InitializeEscrowPayload = {
        ...payload,
        trustline: process.env.NEXT_PUBLIC_TRUSTLINE_ADDRESS || "",
        signer: walletAddress || "",
        trustlineDecimals: Number(
          process.env.NEXT_PUBLIC_TRUSTLINE_DECIMALS || 0
        ),
      };

      const result = (await escrowService({
        payload: finalPayload,
        endpoint: "/deployer/invoke-deployer-contract",
        method: "post",
      })) as InitializeEscrowResponse;

      if (result.status === "SUCCESS") {
        const escrow: Escrow = {
          contractId: result.contract_id,
          issuer: walletAddress || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          milestones: result.escrow.milestones.map((m: Milestone) => ({
            ...m,
            status: "pending",
          })),
          title: result.escrow.title,
          description: result.escrow.description,
          serviceProvider: result.escrow.serviceProvider,
          engagementId: result.escrow.engagementId,
          disputeResolver: result.escrow.disputeResolver,
          amount: result.escrow.amount,
          platformAddress: result.escrow.platformAddress,
          platformFee: result.escrow.platformFee,
          approver: result.escrow.approver,
          releaseSigner: result.escrow.releaseSigner,
          receiver: result.escrow.receiver,
          receiverMemo: result.escrow.receiverMemo,
        };

        setEscrow(escrow);
        setActiveTab("escrow");

        toast.info("Escrow Created");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    response,
    error,
    addMilestone,
    removeMilestone,
    loadTemplate,
    onSubmit,
  };
};
