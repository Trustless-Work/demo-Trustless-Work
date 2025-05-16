/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { Escrow } from "@/@types/escrow.entity";
import { GetFormSchema } from "../schemas/update-escrow-form.schema";
import { getDefaultValues } from "../default-values/update-escrow.default-value";
import { UpdateEscrowResponse } from "@/@types/escrow-response.entity";
import { UpdateEscrowPayload } from "@/@types/escrow-payload.entity";

export const useUpdateEscrowForm = () => {
  const { escrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const { setEscrow } = useEscrowContext();
  const [response, setResponse] = useState<UpdateEscrowResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const formSchema = GetFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: getDefaultValues(
      walletAddress || "",
      (escrow as Escrow) || ({} as Escrow)
    ),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "escrow.milestones",
  });

  const onSubmit = async (payload: UpdateEscrowPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/update-escrow-by-contract-id",
        method: "put",
        returnEscrowDataIsRequired: false,
      })) as UpdateEscrowResponse;

      if (result.status === "SUCCESS") {
        const escrowUpdated = {
          ...escrow,
          ...payload.escrow,
          signer: payload.signer,
          contractId: payload.contractId,
        };

        setEscrow(escrowUpdated);
        setResponse(result);
        toast.info("Escrow Updated");
      }
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
