import { z } from "zod";
import { GetFormSchema } from "../schemas/update-escrow-form.schema";
import { Escrow } from "@/@types/escrows/escrow.entity";

type FormValues = z.infer<ReturnType<typeof GetFormSchema>>;

export const getDefaultValues = (
  walletAddress: string,
  escrow: Escrow
): FormValues => ({
  signer: walletAddress || "",
  contractId: escrow?.contractId || "",
  escrow: {
    title: escrow?.title || "",
    engagementId: escrow?.engagementId || "",
    description: escrow?.description || "",
    amount: escrow?.amount.toString() || "",
    platformFee: (Number(escrow?.platformFee) / 100).toString() || "",
    receiverMemo: escrow?.receiverMemo || 0,
    roles: {
      approver: escrow?.roles.approver || "",
      serviceProvider: escrow?.roles.serviceProvider || "",
      platformAddress: escrow?.roles.platformAddress || "",
      releaseSigner: escrow?.roles.releaseSigner || "",
      disputeResolver: escrow?.roles.disputeResolver || "",
      receiver: escrow?.roles.receiver || "",
    },
    trustline: {
      address: escrow?.trustline.address || "",
      decimals: escrow?.trustline.decimals || 10000000,
    },
    milestones: escrow?.milestones || [
      { description: "", status: "pending", evidence: "", approvedFlag: false },
    ],
  },
});
