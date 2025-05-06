import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  disputeResolver: z.string().min(1, "Dispute resolver address is required"),
  approverFunds: z.string().min(1, "Approver funds is required"),
  receiverFunds: z.string().min(1, "Receiver funds is required"),
});
