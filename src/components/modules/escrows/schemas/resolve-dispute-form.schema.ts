import { isValidWallet } from "@/helpers/is-valid-wallet.helper";
import { z } from "zod";

export const formSchemaSingleRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  disputeResolver: z
    .string()
    .min(1, {
      message: "Dispute resolver is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Dispute resolver must be a valid wallet.",
    }),
  approverFunds: z.string().min(1, "Approver funds is required"),
  receiverFunds: z.string().min(1, "Receiver funds is required"),
});

export const formSchemaMultiRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  disputeResolver: z
    .string()
    .min(1, {
      message: "Dispute resolver is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Dispute resolver must be a valid wallet.",
    }),
  milestoneIndex: z.string().min(1, "Milestone index is required"),
  approverFunds: z.string().min(1, "Approver funds is required"),
  receiverFunds: z.string().min(1, "Receiver funds is required"),
});
