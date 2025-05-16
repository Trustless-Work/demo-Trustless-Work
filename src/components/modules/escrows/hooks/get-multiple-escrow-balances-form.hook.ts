import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/get-multiple-escrow-balances-form.schema";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { GetBalanceParams } from "@/@types/escrows/escrow-payload.entity";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";

type FormData = z.infer<typeof formSchema>;

export const useGetMultipleEscrowBalancesForm = () => {
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

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

  const onSubmit = async (payload: FormData) => {
    setLoading(true);
    setResponse(null);

    const transformedData: GetBalanceParams = {
      addresses: payload.addresses.map((a) => a.value),
      signer: payload.signer,
    };

    try {
      const result = (await escrowService.execute({
        payload: transformedData,
        endpoint: "/helper/get-multiple-escrow-balance",
        method: "get",
        requiresSignature: false,
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

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
