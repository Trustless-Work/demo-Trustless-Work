import { Trustline } from "../trustline.entity";

// Milestone
export type Milestone = {
  description: string;
  status: string;
  evidence: string;
  approvedFlag: boolean;
};

// Roles
export type Roles = {
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  releaseSigner: string;
  disputeResolver: string;
  receiver: string;
};

// Flags
export type Flags = {
  disputeFlag?: boolean;
  releaseFlag?: boolean;
  resolvedFlag?: boolean;
};

// Escrow
export interface Escrow {
  signer?: string;
  contractId?: string;
  engagementId: string;
  title: string;
  roles: Roles;
  description: string;
  amount: string;
  platformFee: string;
  balance?: string;
  milestones: Milestone[];
  flags?: Flags;
  trustline: Trustline;
  receiverMemo: number;
}
