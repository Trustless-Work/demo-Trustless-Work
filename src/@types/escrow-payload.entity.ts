import type { Escrow, MilestoneStatus } from "./escrow.entity";

// Escrow's Payload
export type EscrowPayload = Omit<
  Escrow,
  "user" | "createdAt" | "updatedAt" | "id"
>;

export type InitializeEscrowPayload = Omit<
  EscrowPayload,
  "trustline" | "issuer"
> & {
  signer?: string;
  trustline: string;
  trustlineDecimals: number | undefined;
};

export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: MilestoneStatus;
  serviceProvider?: string;
};

export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

export type StartDisputePayload = Pick<Escrow, "contractId"> & {
  signer: string;
};

export type ResolveDisputePayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "disputeResolver">> & {
    approverFunds: string;
    serviceProviderFunds: string;
  };

export type FundEscrowPayload = Pick<Escrow, "amount" | "contractId"> & {
  signer: string;
};

export type GetEscrowPayload = Pick<Escrow, "contractId"> & {
  signer: string;
};

export type DistributeEscrowEarningsEscrowPayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "serviceProvider" | "releaseSigner">> & {
    signer: string;
  };

export type EditEscrowPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};

export type GetBalanceParams = {
  signer: string;
  addresses: string[];
};

export type EscrowPayloadService =
  | InitializeEscrowPayload
  | GetEscrowPayload
  | ChangeMilestoneStatusPayload
  | ChangeMilestoneFlagPayload
  | StartDisputePayload
  | ResolveDisputePayload
  | FundEscrowPayload
  | DistributeEscrowEarningsEscrowPayload
  | EditEscrowPayload;
