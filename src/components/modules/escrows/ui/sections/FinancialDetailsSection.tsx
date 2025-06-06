import { DollarSign, Landmark, Percent, PiggyBank } from "lucide-react";
import {
  SingleReleaseEscrow,
  MultiReleaseEscrow,
} from "@trustless-work/escrow/types";
import { useTabsContext } from "@/providers/tabs.provider";

interface FinancialDetailsSectionProps {
  escrow: SingleReleaseEscrow | MultiReleaseEscrow | null;
}

export const FinancialDetailsSection = ({
  escrow,
}: FinancialDetailsSectionProps) => {
  const { activeEscrowType } = useTabsContext();

  const getTotalAmount = () => {
    if (!escrow) return "0";
    if (activeEscrowType === "single-release") {
      return (escrow as SingleReleaseEscrow).amount;
    }
    return (escrow as MultiReleaseEscrow).milestones
      .reduce((sum, milestone) => sum + Number(milestone.amount), 0)
      .toString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Landmark className="h-4 w-4 text-primary" />
        Financial Information
      </h3>

      <div className="grid gap-3 text-sm">
        <div className="flex items-start gap-3">
          <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Total Amount</p>
            <p className="text-muted-foreground text-xs">{getTotalAmount()}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <PiggyBank className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Balance</p>
            <p className="text-muted-foreground text-xs">
              {escrow?.balance || "0"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Percent className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Platform Fee</p>
            <p className="text-muted-foreground text-xs">
              {escrow?.platformFee ? Number(escrow.platformFee) / 100 : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
