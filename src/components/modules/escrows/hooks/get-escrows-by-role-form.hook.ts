"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { handleError } from "@/errors/utils/handle-errors";
import { AxiosError } from "axios";
import { WalletError } from "@/@types/errors.entity";
import { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { useGetEscrowsFromIndexerByRole } from "@trustless-work/escrow/hooks";
import { useTabsContext } from "@/providers/tabs.provider";
import { getEscrowsByRoleSchema } from "../schemas/get-escrows-by-role-form.schema";

export const useGetEscrowsByRoleForm = () => {
  const { activeEscrowType } = useTabsContext();
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] =
    useState<GetEscrowsFromIndexerResponse | null>(null);

  const form = useForm<z.infer<typeof getEscrowsByRoleSchema>>({
    resolver: zodResolver(getEscrowsByRoleSchema),
    defaultValues: {
      role: "approver",
      roleAddress: "",
      page: 1,
      orderDirection: "desc",
      orderBy: "createdAt",
      validateOnChain: true,
      type: activeEscrowType,
    },
  });

  const onSubmit = async (data: z.infer<typeof getEscrowsByRoleSchema>) => {
    setLoading(true);
    try {
      // Filter out undefined values to match the expected API parameters
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      );

      const payload = {
        ...filteredData,
        type: activeEscrowType,
      } as Parameters<typeof getEscrowsByRole>[0];

      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrowsByRole function
       * - The result will be escrows
       */
      const escrows = await getEscrowsByRole(payload);

      if (!escrows) {
        throw new Error("Escrows not found");
      }

      /**
       * @Responses:
       * escrows !== null
       * - Escrows received successfully
       * - Show a success toast
       *
       * escrows === null
       * - Show an error toast
       */
      if (escrows) {
        // Handle array response
        if (Array.isArray(escrows)) {
          setResponse(escrows[0] || null);
        } else {
          setResponse(escrows);
        }
        toast.success("Escrows Received");
      }
    } catch (error) {
      const mapped = handleError(error as AxiosError | WalletError);
      toast.error(mapped.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, onSubmit };
};
