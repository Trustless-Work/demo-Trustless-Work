import http from "@/config/axios";
import { AxiosError } from "axios";
import { signTransaction } from "../../auth/lib/stellar-wallet-kit";
import { handleError } from "@/errors/utils/handle-errors";
import { WalletError } from "@/@types/errors.entity";
import { kit } from "@/config/wallet-kit";
import { EscrowRequestResponse } from "@/@types/escrow-response.entity";
import { EscrowPayloadService } from "@/@types/escrow-payload.entity";

interface EscrowServiceProps<T extends EscrowPayloadService> {
  payload: T;
  endpoint: string;
  method: "post" | "put" | "get";
  requiresSignature?: boolean;
  returnEscrowDataIsRequired?: boolean;
}

export const escrowService = async <T extends EscrowPayloadService>({
  payload,
  endpoint,
  method,
  requiresSignature = true,
  returnEscrowDataIsRequired = true,
}: EscrowServiceProps<T>): Promise<EscrowRequestResponse> => {
  try {
    if (!requiresSignature) {
      if (method === "get") {
        const { data } = await http.get<EscrowRequestResponse>(endpoint, {
          params: payload,
        });
        return data;
      }

      const { data } = await http[method]<EscrowRequestResponse>(
        endpoint,
        payload
      );
      return data;
    }

    const { address } = await kit.getAddress();

    let response;
    if (method === "get") {
      response = await http.get<EscrowRequestResponse>(endpoint, {
        params: payload,
      });
    } else {
      response = await http[method]<EscrowRequestResponse>(endpoint, payload);
    }

    const { unsignedTransaction } = response.data;

    if (!unsignedTransaction) {
      throw new Error("No unsigned transaction received from the server");
    }

    const signedTxXdr = await signTransaction({ unsignedTransaction, address });

    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
      returnEscrowDataIsRequired,
    });

    return tx.data;
  } catch (error: unknown) {
    const mappedError = handleError(error as AxiosError | WalletError);
    console.error("Error:", mappedError.message);
    throw new Error(mappedError.message);
  }
};
