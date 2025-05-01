import { formSchema } from "../schemas/update-escrow-form.schema";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApiContext } from "@/providers/api.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";

export const useUpdateEscrowForm = () => {
  const { apiKey, baseUrl } = useApiContext();
  const { escrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "",
      escrow: {
        title: escrow?.title || "",
        engagementId: escrow?.engagementId || "",
        description: escrow?.description || "",
        approver: escrow?.approver || "",
        serviceProvider: escrow?.serviceProvider || "",
        platformAddress: escrow?.platformAddress || "",
        amount: escrow?.amount || "",
        platformFee: escrow?.platformFee || "",
        milestones: escrow?.milestones?.length
          ? escrow.milestones.map((m) => ({
              ...m,
              status: m.status || "pending",
            }))
          : [{ description: "", status: "pending" }],
        releaseSigner: escrow?.releaseSigner || "",
        disputeResolver: escrow?.disputeResolver || "",
        receiver: escrow?.receiver || "",
        receiverMemo: escrow?.receiverMemo || 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "escrow.milestones",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        `${baseUrl}/escrow/update-escrow-by-contract-id`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to update escrow");
      setResponse(json);
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
