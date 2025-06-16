import { DisputeEscrowForm } from "../modules/escrows/ui/forms/single-release/DisputeEscrow";
import { GetEscrowForm } from "../modules/escrows/ui/forms/GetEscrowForm";
import { FundEscrowForm } from "../modules/escrows/ui/forms/FundEscrowForm";
import { ChangeMilestoneStatusForm } from "../modules/escrows/ui/forms/ChangeMilestoneStatusForm";
import { ApproveMilestoneForm } from "../modules/escrows/ui/forms/ApproveMilestoneForm";
import { ReleaseFundsEscrowForm } from "../modules/escrows/ui/forms/single-release/ReleaseFundsEscrowForm";
import { ResolveDisputeEscrowForm } from "../modules/escrows/ui/forms/single-release/ResolveDisputeEscrowForm";
import { ResolveDisputeMilestoneForm } from "../modules/escrows/ui/forms/multi-release/ResolveDisputeMilestoneForm";
import { UpdateSingleEscrowForm } from "../modules/escrows/ui/forms/single-release/UpdateSingleEscrowForm";
import { EscrowCreatedSection } from "../modules/escrows/ui/sections/EscrowCreatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EscrowTabs as EscrowTabsType,
  useTabsContext,
} from "@/providers/tabs.provider";
import { DisputeMilestoneForm } from "../modules/escrows/ui/forms/multi-release/DisputeMilestoneForm";
import { ReleaseFundsMilestoneForm } from "../modules/escrows/ui/forms/multi-release/ReleaseFundsMilestoneForm";
import { UpdateMultiEscrowForm } from "../modules/escrows/ui/forms/multi-release/UpdateMultiEscrowForm";

export const EscrowTabs = () => {
  const { activeEscrowTab, activeEscrowType, setActiveEscrowTab } =
    useTabsContext();

  return (
    <Tabs
      value={activeEscrowTab}
      onValueChange={(val) => setActiveEscrowTab(val as EscrowTabsType)}
      className="w-full"
    >
      <TabsList className="w-full flex flex-wrap mb-32 md:mb-4 gap-1">
        <TabsTrigger value="get-escrow" className="flex-1">
          Get Escrow
        </TabsTrigger>
        <TabsTrigger value="fund-escrow" className="flex-1">
          Fund Escrow
        </TabsTrigger>
        <TabsTrigger value="change-milestone-status" className="flex-1">
          Change Status
        </TabsTrigger>
        <TabsTrigger value="approve-milestone" className="flex-1">
          Approve Milestone
        </TabsTrigger>
        <TabsTrigger value="start-dispute" className="flex-1">
          {activeEscrowType === "single-release"
            ? "Dispute Escrow"
            : "Dispute Milestone"}
        </TabsTrigger>
        <TabsTrigger value="resolve-dispute" className="flex-1">
          {activeEscrowType === "single-release"
            ? "Resolve Dispute Escrow"
            : "Resolve Dispute Milestone"}
        </TabsTrigger>
        <TabsTrigger value="release-funds" className="flex-1">
          {activeEscrowType === "single-release"
            ? "Release Funds Escrow"
            : "Release Funds Milestone"}
        </TabsTrigger>
        <TabsTrigger value="update-escrow" className="flex-1">
          Update Escrow
        </TabsTrigger>
      </TabsList>
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="w-full md:w-3/4">
          <div className="mt-2 pt-4 border-t">
            <TabsContent value="get-escrow" className="mt-0">
              <GetEscrowForm />
            </TabsContent>
            <TabsContent value="fund-escrow" className="mt-0">
              <FundEscrowForm />
            </TabsContent>
            <TabsContent value="change-milestone-status" className="mt-0">
              <ChangeMilestoneStatusForm />
            </TabsContent>
            <TabsContent value="approve-milestone" className="mt-0">
              <ApproveMilestoneForm />
            </TabsContent>
            <TabsContent value="start-dispute" className="mt-0">
              {activeEscrowType === "single-release" ? (
                <DisputeEscrowForm />
              ) : (
                <DisputeMilestoneForm />
              )}
            </TabsContent>
            <TabsContent value="resolve-dispute" className="mt-0">
              {activeEscrowType === "single-release" ? (
                <ResolveDisputeEscrowForm />
              ) : (
                <ResolveDisputeMilestoneForm />
              )}
            </TabsContent>
            <TabsContent value="release-funds" className="mt-0">
              {activeEscrowType === "single-release" ? (
                <ReleaseFundsEscrowForm />
              ) : (
                <ReleaseFundsMilestoneForm />
              )}
            </TabsContent>
            <TabsContent value="update-escrow" className="mt-0">
              {activeEscrowType === "single-release" ? (
                <UpdateSingleEscrowForm />
              ) : (
                <UpdateMultiEscrowForm />
              )}
            </TabsContent>
          </div>
        </div>

        <EscrowCreatedSection />
      </div>
    </Tabs>
  );
};
