import {
  SingleReleaseEscrow,
  MultiReleaseEscrow,
  InitializeSingleReleaseEscrowResponse,
  InitializeMultiReleaseEscrowResponse,
  UpdateSingleReleaseEscrowResponse,
  UpdateMultiReleaseEscrowResponse,
  MultiReleaseMilestone,
  SingleReleaseMilestone,
} from "@trustless-work/escrow/types";

/**
 * Builds a Single Release Escrow object from an InitializeSingleReleaseEscrowResponse, this structure is
 * used to create a new escrow based on the Escrow's entity
 */
export const buildSingleEscrowFromResponse = (
  result:
    | InitializeSingleReleaseEscrowResponse
    | UpdateSingleReleaseEscrowResponse,
  walletAddress: string
): SingleReleaseEscrow => ({
  contractId: result.contractId,
  signer: walletAddress || "",
  balance: "0",
  engagementId: result.escrow.engagementId,
  title: result.escrow.title,
  description: result.escrow.description,
  amount: result.escrow.amount,
  platformFee: result.escrow.platformFee,
  receiverMemo: result.escrow.receiverMemo ?? 0,
  roles: {
    approver: result.escrow.roles.approver,
    serviceProvider: result.escrow.roles.serviceProvider,
    platformAddress: result.escrow.roles.platformAddress,
    releaseSigner: result.escrow.roles.releaseSigner,
    disputeResolver: result.escrow.roles.disputeResolver,
    receiver: result.escrow.roles.receiver,
  },
  flags: {
    disputed: false,
    released: false,
    resolved: false,
  },
  trustline: {
    address: result.escrow.trustline.address,
    decimals: result.escrow.trustline.decimals,
  },
  milestones: result.escrow.milestones.map((m: SingleReleaseMilestone) => ({
    description: m.description,
    evidence: "",
    approved: false,
    status: "pending",
  })),
});

/**
 * Builds a Multi Release Escrow object from an InitializeMultiReleaseEscrowResponse, this structure is
 * used to create a new escrow based on the Escrow's entity
 */
export const buildMultiEscrowFromResponse = (
  result:
    | InitializeMultiReleaseEscrowResponse
    | UpdateMultiReleaseEscrowResponse,
  walletAddress: string
): MultiReleaseEscrow => ({
  contractId: result.contractId,
  signer: walletAddress || "",
  balance: "0",
  engagementId: result.escrow.engagementId,
  title: result.escrow.title,
  description: result.escrow.description,
  platformFee: result.escrow.platformFee,
  receiverMemo: result.escrow.receiverMemo ?? 0,
  roles: {
    approver: result.escrow.roles.approver,
    serviceProvider: result.escrow.roles.serviceProvider,
    platformAddress: result.escrow.roles.platformAddress,
    releaseSigner: result.escrow.roles.releaseSigner,
    disputeResolver: result.escrow.roles.disputeResolver,
    receiver: result.escrow.roles.receiver,
  },
  trustline: {
    address: result.escrow.trustline.address,
    decimals: result.escrow.trustline.decimals,
  },
  milestones: result.escrow.milestones.map((m: MultiReleaseMilestone) => ({
    description: m.description,
    evidence: "",
    amount: m.amount,
    flags: {
      approved: false,
      disputed: false,
      released: false,
      resolved: false,
    },
  })),
});
