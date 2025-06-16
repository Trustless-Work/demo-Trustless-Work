import { Badge } from "@/components/ui/badge";
import {
  SingleReleaseMilestone,
  MultiReleaseMilestone,
  SingleReleaseEscrow,
  MultiReleaseEscrow,
} from "@trustless-work/escrow/types";
import { AlertCircle, CheckCircle2, DollarSign, Handshake } from "lucide-react";
import { useTabsContext } from "@/providers/tabs.provider";

interface EscrowMilestonesSectionProps {
  escrow: SingleReleaseEscrow | MultiReleaseEscrow | null;
}

export const EscrowMilestonesSection = ({
  escrow,
}: EscrowMilestonesSectionProps) => {
  const { activeEscrowType } = useTabsContext();

  return (
    <div className="space-y-4">
      {escrow?.milestones.map(
        (
          milestone: SingleReleaseMilestone | MultiReleaseMilestone,
          index: number
        ) => (
          <div
            key={index}
            className="border rounded-lg p-4 transition-all
            "
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full uppercase">
                  <span className="font-medium text-sm">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium">Milestone {index + 1}</p>
                  <p className="text-muted-foreground text-sm">
                    {milestone.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <Badge
                    variant="outline"
                    className="text-muted-foreground text-sm"
                  >
                    <DollarSign className="h-3 w-3" />
                    {(milestone as MultiReleaseMilestone).amount}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-start flex-col gap-2">
                <div className="flex flex-row gap-2">
                  {milestone.status && (
                    <Badge
                      variant={
                        milestone.status === "approved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        milestone.status === "approved"
                          ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/70 uppercase"
                          : "uppercase"
                      }
                    >
                      {milestone.status === "approved" ? (
                        <>
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
                        </>
                      ) : (
                        milestone.status
                      )}
                    </Badge>
                  )}
                  {activeEscrowType === "single-release" ? (
                    // Single Release - Only show approved flag
                    (milestone as SingleReleaseMilestone).approved && (
                      <Badge
                        variant="secondary"
                        className="text-green-800 dark:text-green-200 uppercase"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
                      </Badge>
                    )
                  ) : (
                    // Multi Release - Show all flags
                    <>
                      {(milestone as MultiReleaseMilestone).flags?.approved && (
                        <Badge
                          variant="secondary"
                          className="text-green-800 dark:text-green-200 uppercase"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
                        </Badge>
                      )}
                      {(milestone as MultiReleaseMilestone).flags?.disputed && (
                        <Badge variant="destructive" className="uppercase">
                          <AlertCircle className="mr-1 h-3 w-3" /> Disputed
                        </Badge>
                      )}
                      {(milestone as MultiReleaseMilestone).flags?.released && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 hover:bg-green-200 uppercase"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Released
                        </Badge>
                      )}
                      {(milestone as MultiReleaseMilestone).flags?.resolved && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 hover:bg-green-200 uppercase"
                        >
                          <Handshake className="mr-1 h-3 w-3" /> Resolved
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {milestone.evidence && (
              <p className="text-muted-foreground text-sm mt-4 truncate">
                <span className="font-medium">Evidence:</span>{" "}
                {milestone.evidence}
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};
