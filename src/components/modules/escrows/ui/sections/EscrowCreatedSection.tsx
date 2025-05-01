import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEscrowContext } from "@/providers/escrow.provider";
import { Milestone as MilestoneIcon, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EntityCard } from "../cards/EntityCard";
import { EscrowDetailsSection } from "./EscrowDetailsSection";
import { FinancialDetailsSection } from "./FinancialDetailsSection";
import { EscrowMilestonesSection } from "./EscrowMilestonesSection";
import { HeaderSection } from "./HeaderSection";

export const EscrowCreatedSection = () => {
  const { escrow } = useEscrowContext();
  const totalMilestones = escrow?.milestones.length || 0;
  const completedMilestones =
    escrow?.milestones.filter(
      (m) => m.status === "approved" || m.status === "completed" || m.flag
    ).length || 0;
  const progressPercentage =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader className="pb-2">
          <HeaderSection escrow={escrow} />
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium">Escrow Progress</span>
              <span className="text-muted-foreground">
                {completedMilestones} of {totalMilestones} Milestones
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <EscrowDetailsSection escrow={escrow} />

            <FinancialDetailsSection escrow={escrow} />
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EntityCard
              name="Service Provider"
              entity={escrow?.serviceProvider || ""}
              icon={<User size={20} />}
            />

            <EntityCard
              name="Approver"
              entity={escrow?.approver || ""}
              icon={<User size={20} />}
            />

            <EntityCard
              name="Receiver"
              entity={escrow?.receiver || ""}
              icon={<User size={20} />}
            />

            <EntityCard
              name="Platform"
              entity={escrow?.platformAddress || ""}
              icon={<User size={20} />}
            />

            <EntityCard
              name="Dispute Resolver"
              entity={escrow?.disputeResolver || ""}
              icon={<User size={20} />}
            />

            <EntityCard
              name="Release Signer"
              entity={escrow?.releaseSigner || ""}
              icon={<User size={20} />}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MilestoneIcon className="h-5 w-5 text-primary" />
            <CardTitle>Milestones</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <EscrowMilestonesSection escrow={escrow} />
        </CardContent>
      </Card>
    </div>
  );
};
