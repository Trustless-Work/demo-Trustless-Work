import { formSchema } from "../schemas/get-escrow-form.schema";
import { useWalletContext } from "@/providers/wallet.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { handleError } from "@/errors/utils/handle-errors";
import { AxiosError } from "axios";
import { WalletError } from "@/@types/errors.entity";
import {
  SingleReleaseEscrow,
  MultiReleaseEscrow,
} from "@trustless-work/escrow/types";
import { useTabsContext } from "@/providers/tabs.provider";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";

export const useGetEscrowForm = () => {
  const { walletAddress } = useWalletContext();
  const { escrow, setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<
    SingleReleaseEscrow | MultiReleaseEscrow | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const { activeEscrowType } = useTabsContext();
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractIds: escrow?.contractId ? [{ value: escrow.contractId }] : [{ value: "" }],
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contractIds",
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Fetch the escrow data using the getEscrowByContractIds function
      const escrowData = await getEscrowByContractIds({
        contractIds: payload.contractIds.map(item => item.value),
        signer: payload.signer,
        validateOnChain: true
      });

      if (!escrowData) {
        throw new Error("No escrow data received");
      }

      // Handle the response based on whether it's an array or a single escrow
      const escrow = Array.isArray(escrowData) ? escrowData[0] : escrowData;

      if (!escrow) {
        throw new Error("Escrow not found");
      }

      // Update the escrow context with the fetched data
      setEscrow(escrow);
      setResponse(escrow);
      toast.success("Escrow data fetched successfully");
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error fetching escrow:", mappedError.message);
      setError(mappedError.message);
      toast.error(
        mappedError ? mappedError.message : "Failed to fetch escrow data"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit, fields, append, remove };
};
