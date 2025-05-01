import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiContext } from "@/providers/api.provider";
import { formSchema } from "../schemas/get-multiple-escrow-balances-form.schema";

export const useGetMultipleEscrowBalancesForm = () => {
  const { apiKey, baseUrl } = useApiContext();
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signer: walletAddress || "",
      addresses: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url = new URL(`${baseUrl}/helper/get-multiple-escrow-balance`);
      url.searchParams.append("signer", values.signer);
      values.addresses.forEach((addr) =>
        url.searchParams.append("addresses", addr.value)
      );

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to get escrow balances");
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

  return { form, loading, response, error, fields, append, remove, onSubmit };
};
