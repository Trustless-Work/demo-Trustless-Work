import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer address is required"),
  amount: z.number().min(1, {
    message: "Amount is required.",
  }),
});
