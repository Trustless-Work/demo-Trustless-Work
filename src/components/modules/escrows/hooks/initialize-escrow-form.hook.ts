import { InitializeEscrowPayload } from "@/@types/escrow-payload.entity";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetFormSchema } from "../schemas/initialize-escrow-form.schema";
import { Escrow } from "@/@types/escrow.entity";
import { toast } from "sonner";
import { useEscrowContext } from "@/providers/escrow.provider";
import { InitializeEscrowResponse } from "@/@types/escrow-response.entity";
import { useTabsContext } from "@/providers/tabs.provider";
import { escrowService } from "../services/escrow.service";
import { trustlines } from "../constants/trustline.constant";
import { Trustline } from "@/@types/trustline.entity";
import { z } from "zod";
import { Resolver } from "react-hook-form";
import { getDefaultValues } from "../default-values/initialize-escrow.default-values";

type FormValues = z.infer<ReturnType<typeof GetFormSchema>>;

export const useInitializeEscrow = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { walletAddress } = useWalletContext();
  const { setEscrow } = useEscrowContext();
  const { setActiveTab } = useTabsContext();
  const formSchema = GetFormSchema();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: getDefaultValues(walletAddress || ""),
    mode: "onChange",
  });

  const trustlinesOptions = trustlines.map((trustline: Trustline) => ({
    value: trustline.address,
    label: trustline.name,
  }));

  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    form.setValue("milestones", [
      ...currentMilestones,
      { description: "", status: "pending", evidence: "", approvedFlag: false },
    ]);
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
    form.setValue("title", "Sample TW Escrow");
    form.setValue(
      "description",
      "This is a sample TW escrow for testing purposes"
    );
    form.setValue("engagementId", "ENG12345");
    form.setValue("amount", "50");
    form.setValue("platformFee", "5");
    form.setValue("roles.approver", walletAddress || "");
    form.setValue("roles.serviceProvider", walletAddress || "");
    form.setValue("roles.platformAddress", walletAddress || "");
    form.setValue("roles.releaseSigner", walletAddress || "");
    form.setValue("roles.disputeResolver", walletAddress || "");
    form.setValue("roles.receiver", walletAddress || "");
    form.setValue("receiverMemo", 90909090);
    form.setValue(
      "trustline.address",
      trustlines.find((t) => t.name === "USDC")?.address || ""
    );
    form.setValue("milestones", [
      {
        description: "Initial milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
      {
        description: "Second milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
      {
        description: "Final milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
    ]);
  };

  const onSubmit = async (payload: FormValues) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const finalPayload: InitializeEscrowPayload = {
        ...payload,
        receiverMemo: payload.receiverMemo ?? 0,
      };

      const result = (await escrowService({
        payload: finalPayload,
        endpoint: "/deployer/invoke-deployer-contract",
        method: "post",
      })) as InitializeEscrowResponse;

      if (result.status === "SUCCESS") {
        const escrow: Escrow = {
          contractId: result.contractId,
          signer: walletAddress || "",
          engagementId: result.escrow.engagementId,
          title: result.escrow.title,
          description: result.escrow.description,
          amount: result.escrow.amount,
          platformFee: result.escrow.platformFee,
          receiverMemo: result.escrow.receiverMemo ?? 0,
          roles: {
            approver: result.escrow.roles.approver,
            serviceProvider: result.escrow.roles.serviceProvider,
            platformAddress: result.escrow.roles.platformAddress,
            releaseSigner: result.escrow.roles.releaseSigner,
            disputeResolver: result.escrow.roles.disputeResolver,
            receiver: result.escrow.roles.receiver,
          },
          flags: {
            disputeFlag: false,
            releaseFlag: false,
            resolvedFlag: false,
          },
          trustline: {
            address: result.escrow.trustline.address,
            decimals: result.escrow.trustline.decimals,
          },
          milestones: result.escrow.milestones.map((m) => ({
            description: m.description,
            status: "pending",
            evidence: "",
            approvedFlag: false,
          })),
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
    trustlinesOptions,
    addMilestone,
    removeMilestone,
    loadTemplate,
    onSubmit,
  };
};
