import { isValidWallet } from "@/helpers/is-valid-wallet.helper";
import { z } from "zod";

export const formSchemaSingleRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  releaseSigner: z
    .string()
    .min(1, {
      message: "Release signer is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Release signer must be a valid wallet.",
    }),
});

export const formSchemaMultiRelease = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  releaseSigner: z
    .string()
    .min(1, {
      message: "Release signer is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Release signer must be a valid wallet.",
    }),
  milestoneIndex: z.string().min(1, "Milestone index is required"),
});
