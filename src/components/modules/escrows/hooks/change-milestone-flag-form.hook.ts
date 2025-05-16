import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/change-milestone-flag-form.schema";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow, Milestone } from "@/@types/escrow.entity";
import { EscrowRequestResponse } from "@/@types/escrow-response.entity";
import { ChangeMilestoneFlagPayload } from "@/@types/escrow-payload.entity";

export const useChangeMilestoneFlagForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  // Default milestones if escrow is undefined
  const milestones = escrow?.milestones || [
    { description: "Initial setup", status: "pending" },
    { description: "Development phase", status: "pending" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "CAZ6UQX7DEMO123",
      milestoneIndex: "",
      newFlag: true,
      approver: escrow?.roles.approver || "GAPPROVER123456789",
    },
  });

  const onSubmit = async (payload: ChangeMilestoneFlagPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/change-milestone-approved-flag",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          milestones: escrow!.milestones.map((milestone: Milestone, index) =>
            index === Number(payload.milestoneIndex)
              ? { ...milestone, approvedFlag: payload.newFlag }
              : milestone
          ),
        };

        setEscrow(escrowUpdated);

        toast.info(
          `Milestone index - ${payload.milestoneIndex} has been approved`
        );
        setResponse(result);
        form.reset();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, milestones, loading, response, onSubmit };
};
