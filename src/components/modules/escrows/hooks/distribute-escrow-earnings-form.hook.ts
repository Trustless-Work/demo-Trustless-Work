import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/distribute-escrow-earnings-form.schema";
import { escrowService } from "../services/escrow.service";
import { Escrow } from "@/@types/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrow-response.entity";

export const useDistributeEscrowEarningsForm = () => {
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

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResponse(null);

    try {
      const result = (await escrowService({
        payload,
        endpoint: "/escrow/distribute-escrow-earnings",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          flags: {
            releaseFlag: true,
          },
        };

        setEscrow(escrowUpdated);

        toast.info("The escrow has been released");
        setResponse(result);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, onSubmit };
};
