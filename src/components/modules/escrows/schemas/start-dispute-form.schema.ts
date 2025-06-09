import { z } from "zod";

export const formSchemaSingleRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer address is required"),
});

export const formSchemaMultiRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer address is required"),
  milestoneIndex: z.string().min(1, "Milestone index is required"),
});
