import { useApiContext } from "@/providers/api.provider";
import { formSchema } from "../schemas/get-escrow-form.schema";
import { useWalletContext } from "@/providers/wallet.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useGetEscrowForm = () => {
  const { apiKey, baseUrl } = useApiContext();
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

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url = new URL(`${baseUrl}/escrow/get-escrow-by-contract-id`);
      url.searchParams.append("contractId", formData.contractId);
      url.searchParams.append("signer", formData.signer);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get escrow");
      }

      setResponse(data);
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
