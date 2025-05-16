import { Status } from "../http.entity";
import type { EscrowPayload } from "./escrow-payload.entity";

// Escrow's Response like fund, release, change, etc ...
export type EscrowRequestResponse = {
  status: Status;
  unsignedTransaction?: string;
};

// Initialize Escrow Response
export type InitializeEscrowResponse = {
  contractId: string;
  escrow: EscrowPayload;
  message: string;
  status: Status;
};

// Update Escrow Response
export type UpdateEscrowResponse = InitializeEscrowResponse;
