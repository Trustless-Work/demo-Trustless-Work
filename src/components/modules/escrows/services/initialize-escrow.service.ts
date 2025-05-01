import { InitializeEscrowPayload } from "@/@types/escrow-payload.entity";
import http from "@/config/axios";
import { AxiosError } from "axios";
import { signTransaction } from "../../auth/lib/stellar-wallet-kit";
import { handleError } from "@/errors/utils/handle-errors";
import { WalletError } from "@/@types/errors.entity";
import { kit } from "@/config/wallet-kit";

export const initializeEscrow = async (payload: InitializeEscrowPayload) => {
  try {
    const { address } = await kit.getAddress();

    const response = await http.post(
      "/deployer/invoke-deployer-contract",
      payload
    );

    const { unsignedTransaction } = response.data;

    const signedTxXdr = await signTransaction({ unsignedTransaction, address });

    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
      returnEscrowDataIsRequired: true,
    });

    const { data } = tx;

    return data;
  } catch (error: unknown) {
    const mappedError = handleError(error as AxiosError | WalletError);
    console.error("Error:", mappedError.message);
    throw new Error(mappedError.message);
  }
};
