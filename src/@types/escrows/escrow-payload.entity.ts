import type { Escrow } from "./escrow.entity";

// Payload base
export type EscrowPayload = Escrow;

// Initialize Escrow Payload
export type InitializeEscrowPayload = Omit<EscrowPayload, "contractId"> & {};

// Change Milestone Status Payload
export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: string;
  evidence?: string;
  serviceProvider?: string;
};

// Change Milestone Flag Payload
export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

// Start Dispute Payload
export type StartDisputePayload = {
  contractId: string;
  signer: string;
};

// Resolve Dispute Payload
export type ResolveDisputePayload = {
  contractId: string;
  disputeResolver?: string;
  approverFunds: string;
  receiverFunds: string;
};

// Fund Escrow Payload
export type FundEscrowPayload = {
  amount: string;
  contractId: string;
  signer: string;
};

// Get Escrow Payload
export type GetEscrowPayload = {
  contractId: string;
  signer: string;
};

// Release Funds Escrow Payload
export type ReleaseFundsEscrowPayload = {
  contractId: string;
  serviceProvider?: string;
  releaseSigner?: string;
  signer: string;
};

// Update Escrow Payload
export type UpdateEscrowPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};

// Get Balance Params
export type GetBalanceParams = {
  signer: string;
  addresses: string[];
};

// Escrow Payload Service
export type EscrowPayloadService =
  | Escrow
  | InitializeEscrowPayload
  | GetEscrowPayload
  | ChangeMilestoneStatusPayload
  | ChangeMilestoneFlagPayload
  | StartDisputePayload
  | ResolveDisputePayload
  | FundEscrowPayload
  | ReleaseFundsEscrowPayload
  | UpdateEscrowPayload
  | GetBalanceParams;
