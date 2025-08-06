import { z } from "zod";

export const getEscrowsByRoleSchema = z.object({
  role: z.enum([
    "approver",
    "platform",
    "receiver",
    "releaseSigner",
    "disputeResolver",
    "serviceProvider",
  ]),
  roleAddress: z.string().min(1, "Role address is required"),
  page: z.number().optional(),
  orderDirection: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["createdAt", "updatedAt", "amount"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  maxAmount: z.number().optional(),
  minAmount: z.number().optional(),
  isActive: z.boolean().optional(),
  title: z.string().optional(),
  engagementId: z.string().optional(),
  status: z
    .enum(["working", "pendingRelease", "released", "resolved", "inDispute"])
    .optional(),
  type: z.enum(["single-release", "multi-release"]).optional(),
  validateOnChain: z.boolean().optional(),
});
