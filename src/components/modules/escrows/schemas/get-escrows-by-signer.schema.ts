import { z } from "zod";

export const formSchema = z.object({
  // Required field
  signer: z.string().min(1, "Signer Address is required"),

  // Optional fields
  page: z.number().min(1).optional(),
  orderDirection: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["createdAt", "updatedAt", "amount"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  maxAmount: z.number().min(0).optional(),
  minAmount: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  title: z.string().optional(),
  engagementId: z.string().optional(),
  status: z
    .enum(["pending", "active", "complete", "disputed", "cancelled"])
    .optional(),
  validateOnChain: z.boolean().optional(),
  type: z.enum(["single-release", "multi-release"]).optional(),
});
