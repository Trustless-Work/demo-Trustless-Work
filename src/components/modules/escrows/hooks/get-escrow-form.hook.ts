import { formSchema } from "../schemas/get-escrow-form.schema";
import { useWalletContext } from "@/providers/wallet.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEscrowPayload } from "@/@types/escrows/escrow-payload.entity";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow } from "@/@types/escrows/escrow.entity";

export const useGetEscrowForm = () => {
  const { walletAddress } = useWalletContext();
  const { escrow, setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Escrow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: GetEscrowPayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an Escrow
       */
      const escrow = (await escrowService.execute({
        payload,
        endpoint: "/escrow/get-escrow-by-contract-id",
        method: "get",
        requiresSignature: false,
      })) as Escrow;

      /**
       * @Responses:
       * escrow !== null
       * - Escrow received successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * escrow === null
       * - Show an error toast
       */
      if (escrow) {
        setEscrow({ ...escrow, contractId: payload.contractId });
        setResponse(escrow);
        toast.info("Escrow Received");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit };
};
