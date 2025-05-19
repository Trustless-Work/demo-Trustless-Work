/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { formSchema } from "../schemas/update-escrow-form.schema";
import { UpdateEscrowResponse } from "@/@types/escrows/escrow-response.entity";
import { UpdateEscrowPayload } from "@/@types/escrows/escrow-payload.entity";

export const useUpdateEscrowForm = () => {
  const { escrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const { setEscrow } = useEscrowContext();
  const [response, setResponse] = useState<UpdateEscrowResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      signer: walletAddress || "",
      contractId: escrow?.contractId || "",
      escrow: {
        title: escrow?.title || "",
        engagementId: escrow?.engagementId || "",
        description: escrow?.description || "",
        amount: escrow?.amount.toString() || "",
        platformFee: (Number(escrow?.platformFee) / 100).toString() || "",
        receiverMemo: escrow?.receiverMemo || 0,
        roles: {
          approver: escrow?.roles.approver || "",
          serviceProvider: escrow?.roles.serviceProvider || "",
          platformAddress: escrow?.roles.platformAddress || "",
          releaseSigner: escrow?.roles.releaseSigner || "",
          disputeResolver: escrow?.roles.disputeResolver || "",
          receiver: escrow?.roles.receiver || "",
        },
        trustline: {
          address: escrow?.trustline.address || "",
          decimals: escrow?.trustline.decimals || 10000000,
        },
        milestones: escrow?.milestones || [
          {
            description: "",
            status: "pending",
            evidence: "",
            approvedFlag: false,
          },
        ],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "escrow.milestones",
  });

  const onSubmit = async (payload: UpdateEscrowPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an UpdateEscrowResponse
       */
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/update-escrow-by-contract-id",
        method: "put",
        returnEscrowDataIsRequired: false,
      })) as UpdateEscrowResponse;

      /**
       * @Responses:
       * result.status === "SUCCESS"
       * - Escrow updated successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * result.status !== "SUCCESS"
       * - Show an error toast
       */
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
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, fields, append, remove, onSubmit };
};
