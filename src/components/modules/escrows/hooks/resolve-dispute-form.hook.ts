import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { formSchema } from "../schemas/resolve-dispute-form.schema";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { ResolveDisputePayload } from "@/@types/escrows/escrow-payload.entity";
import { useWalletContext } from "@/providers/wallet.provider";
import { useResolveDispute, useSendTransaction } from "@trustless-work/hooks";
import { signTransaction } from "../../auth/helpers/stellar-wallet-kit.helper";
import { handleError } from "@/errors/utils/handle-errors";
import { AxiosError } from "axios";
import { WalletError } from "@/@types/errors.entity";

export const useResolveDisputeForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);
  const { walletAddress } = useWalletContext();
  const { resolveDispute } = useResolveDispute();
  const { sendTransaction } = useSendTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      disputeResolver: escrow?.roles.disputeResolver || "",
      approverFunds: "0",
      receiverFunds: "0",
    },
  });

  const onSubmit = async (payload: ResolveDisputePayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the resolveDispute function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await resolveDispute(payload);

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from resolveDispute response."
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
            resolvedFlag: true,
          },
          balance: (
            Number(escrow?.balance) -
            Number(payload.approverFunds) -
            Number(payload.receiverFunds)
          ).toString(),
        };

        setEscrow(escrowUpdated);

        toast.success("Dispute Resolved");
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
