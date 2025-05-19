import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { formSchema } from "../schemas/change-milestone-status-form.schema";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow, Milestone } from "@/@types/escrows/escrow.entity";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { ChangeMilestoneStatusPayload } from "@/@types/escrows/escrow-payload.entity";

export const useChangeMilestoneStatusForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  const milestones = escrow?.milestones || [
    { description: "Initial setup", status: "pending" },
    { description: "Development phase", status: "pending" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      milestoneIndex: "",
      newStatus: "",
      evidence: "",
      serviceProvider: escrow?.roles.serviceProvider || "",
    },
  });

  const onSubmit = async (payload: ChangeMilestoneStatusPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an EscrowRequestResponse
       */
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/change-milestone-status",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

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
        const escrowUpdated: Escrow = {
          ...escrow!,
          milestones: escrow!.milestones.map((milestone: Milestone, index) =>
            index === Number(payload.milestoneIndex)
              ? {
                  ...milestone,
                  status: payload.newStatus,
                  evidence: payload.evidence || "",
                }
              : milestone,
          ),
        };

        setEscrow(escrowUpdated);

        toast.info(
          `Milestone index - ${payload.milestoneIndex} updated to ${payload.newStatus}`,
        );
        setResponse(result);
        form.reset();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, milestones, loading, response, onSubmit };
};
