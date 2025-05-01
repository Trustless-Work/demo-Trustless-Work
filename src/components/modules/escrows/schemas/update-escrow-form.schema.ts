import { z } from "zod";

const milestoneSchema = z.object({
  description: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
});

export const formSchema = z.object({
  contractId: z.string().optional(),
  signer: z.string().optional(),
  escrow: z.object({
    title: z.string(),
    engagementId: z.string(),
    description: z.string(),
    approver: z.string(),
    serviceProvider: z.string(),
    platformAddress: z.string(),
    amount: z.string(),
    platformFee: z.string(),
    milestones: z.array(milestoneSchema).min(1),
    releaseSigner: z.string(),
    disputeResolver: z.string(),
    receiver: z.string(),
    receiverMemo: z.number().optional(),
    trustline: z.string().optional(),
    trustlineDecimals: z.number().optional(),
  }),
});
