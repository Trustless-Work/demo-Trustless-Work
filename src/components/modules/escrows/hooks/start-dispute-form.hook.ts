import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas/start-dispute-form.schema";
import { escrowService } from "../services/escrow.service";
import { Escrow } from "@/@types/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrow-response.entity";
import { StartDisputePayload } from "@/@types/escrow-payload.entity";

export const useStartDisputeForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: StartDisputePayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/change-dispute-flag",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          flags: {
            disputeFlag: true,
          },
        };

        setEscrow(escrowUpdated);

        toast.info("Dispute Started");
        setResponse(result);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit };
};
