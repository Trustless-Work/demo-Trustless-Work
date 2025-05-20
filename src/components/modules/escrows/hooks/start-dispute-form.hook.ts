import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas/start-dispute-form.schema";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { StartDisputePayload } from "@/@types/escrows/escrow-payload.entity";
import { useSendTransaction, useStartDispute } from "@trustless-work/hooks";
import { signTransaction } from "../../auth/helpers/stellar-wallet-kit.helper";
import { handleError } from "@/errors/utils/handle-errors";
import { AxiosError } from "axios";
import { WalletError } from "@/@types/errors.entity";

export const useStartDisputeForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);
  const { startDispute, error } = useStartDispute();
  const { sendTransaction } = useSendTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: StartDisputePayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the startDispute function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await startDispute(payload);

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from startDispute response."
        );
      }

      /**
       * @Note:
       * - We need to sign the transaction using your private key
       * - The result will be a signed transaction
       */
      const signedXdr = await signTransaction({
        unsignedTransaction,
        address: walletAddress || "",
      });

      if (!signedXdr) {
        throw new Error("Signed transaction is missing.");
      }

      /**
       * @Note:
       * - We need to send the signed transaction to the API
       * - The data will be an SendTransactionResponse
       */
      const data = await sendTransaction({
        signedXdr,
        returnEscrowDataIsRequired: false,
      });

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow updated successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * data.status !== "SUCCESS"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          flags: {
            disputeFlag: true,
          },
        };

        setEscrow(escrowUpdated);

        toast.success("Dispute Started");
        setResponse(data);
      }
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error:", mappedError.message);

      toast.error(
        mappedError ? mappedError.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, onSubmit };
};
