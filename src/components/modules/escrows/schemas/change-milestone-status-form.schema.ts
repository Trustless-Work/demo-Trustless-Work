import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  milestoneIndex: z.string().min(1, "Milestone index is required"),
  newStatus: z.string().min(1, "New status is required"),
  serviceProvider: z.string().min(1, "Service provider address is required"),
  evidence: z.string().optional(),
});
