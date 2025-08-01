import { useWalletContext } from "@/providers/wallet.provider";
import { useTabsContext } from "@/providers/tabs.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { handleError } from "@/errors/utils/handle-errors";
import { AxiosError } from "axios";
import { WalletError } from "@/@types/errors.entity";
import { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { useGetEscrowsFromIndexerBySigner } from "@trustless-work/escrow/hooks";
import { formSchema } from "../schemas/get-escrows-by-signer.schema";

export const useGetEscrowsBySignerForm = () => {
  const { walletAddress } = useWalletContext();
  const { activeEscrowType } = useTabsContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] =
    useState<GetEscrowsFromIndexerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getEscrowsBySigner } = useGetEscrowsFromIndexerBySigner();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signer: walletAddress || "Connect your wallet to get your address",
      page: 1,
      orderDirection: "desc",
      orderBy: "createdAt",
      validateOnChain: true,
      type: activeEscrowType,
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Build filters object removing empty fields
      const filters: any = {
        signer: payload.signer,
        validateOnChain: payload.validateOnChain,
        type: payload.type || activeEscrowType,
      };

      // Add optional fields only if they have values
      if (payload.page !== undefined) filters.page = payload.page;
      if (payload.orderDirection)
        filters.orderDirection = payload.orderDirection;
      if (payload.orderBy) filters.orderBy = payload.orderBy;
      if (payload.startDate) filters.startDate = payload.startDate;
      if (payload.endDate) filters.endDate = payload.endDate;
      if (payload.maxAmount !== undefined)
        filters.maxAmount = payload.maxAmount;
      if (payload.minAmount !== undefined)
        filters.minAmount = payload.minAmount;
      if (payload.isActive !== undefined) filters.isActive = payload.isActive;
      if (payload.title) filters.title = payload.title;
      if (payload.engagementId) filters.engagementId = payload.engagementId;
      if (payload.status) filters.status = payload.status;

      const escrowData = await getEscrowsBySigner(filters);

      if (!escrowData) {
        throw new Error("No escrow data received");
      }

      setResponse(escrowData);
      toast.success("Escrow data fetched successfully");
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error fetching escrows:", mappedError.message);
      setError(mappedError.message);
      toast.error(
        mappedError ? mappedError.message : "Failed to fetch escrow data",
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit };
};
