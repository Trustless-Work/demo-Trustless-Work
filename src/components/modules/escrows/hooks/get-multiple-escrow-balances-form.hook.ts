import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/get-multiple-escrow-balances-form.schema";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { GetBalanceParams } from "@/@types/escrow-payload.entity";

type FormData = z.infer<typeof formSchema>;

export const useGetMultipleEscrowBalancesForm = () => {
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const form = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResponse(null);

    const transformedData: GetBalanceParams = {
      addresses: data.addresses.map((a) => a.value),
      signer: data.signer,
    };

    try {
      const result = await escrowService({
        payload: transformedData,
        endpoint: "/helper/get-multiple-escrow-balance",
        method: "get",
        requiresSignature: false,
        returnEscrowDataIsRequired: false,
      });

      toast.info("Escrow Balances Received");
      setResponse(result);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, fields, append, remove, onSubmit };
};
