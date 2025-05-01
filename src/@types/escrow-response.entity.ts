import type { Status } from "./http.entity";
import type { EscrowPayload } from "./escrow-payload.entity";

// Escrow's Response
export type EscrowRequestResponse = {
  status: Status;
  unsignedTransaction?: string;
};

export type InitializeEscrowResponse = {
  contract_id: string;
  escrow: EscrowPayload;
  message: string;
  status: Status;
};

export type EscrowResponse = {
  message: string;
  status: Status;
};

export type SendTransactionResponse = InitializeEscrowResponse & EscrowResponse;
