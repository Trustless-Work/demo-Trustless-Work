import { formSchema } from "../schemas/get-escrow-form.schema";
import { useWalletContext } from "@/providers/wallet.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEscrowPayload } from "@/@types/escrow-payload.entity";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";

export const useGetEscrowForm = () => {
  const { walletAddress } = useWalletContext();
  const { escrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
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
      const result = await escrowService({
        payload,
        endpoint: "/escrow/get-escrow-by-contract-id",
        method: "get",
        requiresSignature: false,
      });

      toast.info("Escrow Received");
      setResponse(result);
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
