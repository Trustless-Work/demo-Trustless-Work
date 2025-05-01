import type { CreatedAt, UpdatedAt } from "./date.entity";
import { Trustline } from "./trustline.entity";

export type MilestoneStatus = "completed" | "approved" | "pending";

export type Milestone = {
  description: string;
  status?: MilestoneStatus;
  flag?: boolean;
};

export interface Escrow {
  title: string;
  description: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  contractId?: string;
  balance?: string;
  trustline?: Trustline;
  milestones: Milestone[];
  serviceProvider: string;
  engagementId: string;
  disputeResolver: string;
  amount: string;
  platformAddress: string;
  platformFee: string;
  approver: string;
  releaseSigner: string;
  issuer: string;
  disputeFlag?: boolean;
  releaseFlag?: boolean;
  resolvedFlag?: boolean;
  approverFunds?: string;
  receiverFunds?: string;
  receiver?: string;
  receiverMemo?: number;
  disputeStartedBy?: string;
}
