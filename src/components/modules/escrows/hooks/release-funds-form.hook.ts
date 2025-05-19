import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/release-funds-form.schema";
import { escrowService } from "../services/escrow.service";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { ReleaseFundsEscrowPayload } from "@/@types/escrows/escrow-payload.entity";

export const useReleaseFundsForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      releaseSigner: escrow?.roles.releaseSigner || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: ReleaseFundsEscrowPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an EscrowRequestResponse
       */
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/release-funds",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      /**
       * @Responses:
       * result.status === "SUCCESS"
       * - Escrow updated successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * result.status !== "SUCCESS"
       * - Show an error toast
       */
      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          flags: {
            releaseFlag: true,
          },
          balance: "0",
        };

        setEscrow(escrowUpdated);

        toast.info("The escrow has been released");
        setResponse(result);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, onSubmit };
};
