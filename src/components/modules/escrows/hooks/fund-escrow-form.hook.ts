import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/fund-escrow-form.schema";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow } from "@/@types/escrow.entity";
import { EscrowRequestResponse } from "@/@types/escrow-response.entity";
import { FundEscrowPayload } from "@/@types/escrow-payload.entity";

export const useFundEscrowForm = () => {
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
      amount: escrow?.amount?.toString() || "1000",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: FundEscrowPayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = (await escrowService({
        payload,
        endpoint: "/escrow/fund-escrow",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          balance:
            escrow?.balance && Number(escrow.balance) > 0
              ? (Number(escrow.balance) + Number(payload.amount)).toString()
              : payload.amount,
        };

        setEscrow(escrowUpdated);

        toast.info("Escrow Funded");
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

  return { form, loading, response, error, onSubmit };
};
