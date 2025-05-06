import { z } from "zod";
import { GetFormSchema } from "../schemas/initialize-escrow-form.schema";

type FormValues = z.infer<ReturnType<typeof GetFormSchema>>;

export const getDefaultValues = (walletAddress: string): FormValues => ({
  signer: walletAddress || "",
  engagementId: "",
  title: "",
  description: "",
  amount: "",
  platformFee: "",
  receiverMemo: 0,
  roles: {
    approver: "",
    serviceProvider: "",
    platformAddress: "",
    releaseSigner: "",
    disputeResolver: "",
    receiver: "",
  },
  trustline: {
    address: "",
    decimals: 10000000,
  },
  milestones: [
    { description: "", status: "pending", evidence: "", approvedFlag: false },
  ],
});
