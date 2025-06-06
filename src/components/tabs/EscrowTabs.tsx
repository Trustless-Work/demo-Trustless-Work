import { StartDisputeForm } from "../modules/escrows/ui/forms/StartDisputeForm";
import { GetEscrowForm } from "../modules/escrows/ui/forms/GetEscrowForm";
import { FundEscrowForm } from "../modules/escrows/ui/forms/FundEscrowForm";
import { ChangeMilestoneStatusForm } from "../modules/escrows/ui/forms/ChangeMilestoneStatusForm";
import { ApproveMilestoneForm } from "../modules/escrows/ui/forms/ApproveMilestoneForm";
import { ReleaseFundsForm } from "../modules/escrows/ui/forms/ReleaseFundsForm";
import { ResolveDisputeForm } from "../modules/escrows/ui/forms/ResolveDisputeForm";
import { UpdateEscrowForm } from "../modules/escrows/ui/forms/UpdateEscrowForm";
import { EscrowCreatedSection } from "../modules/escrows/ui/sections/EscrowCreatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsContext } from "@/providers/tabs.provider";

export const EscrowTabs = () => {
  const { activeEscrowTab, setActiveEscrowTab } = useTabsContext();

  return (
    <Tabs
      value={activeEscrowTab}
      onValueChange={(val) => setActiveEscrowTab(val as any)}
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
        <TabsTrigger value="change-dispute-flag" className="flex-1">
          Start Dispute
        </TabsTrigger>
        <TabsTrigger value="resolve-dispute" className="flex-1">
          Resolve Dispute
        </TabsTrigger>
        <TabsTrigger value="release-funds" className="flex-1">
          Release Funds
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
            <TabsContent value="change-dispute-flag" className="mt-0">
              <StartDisputeForm />
            </TabsContent>
            <TabsContent value="resolve-dispute" className="mt-0">
              <ResolveDisputeForm />
            </TabsContent>
            <TabsContent value="release-funds" className="mt-0">
              <ReleaseFundsForm />
            </TabsContent>
            <TabsContent value="update-escrow" className="mt-0">
              <UpdateEscrowForm />
            </TabsContent>
          </div>
        </div>

        <EscrowCreatedSection />
      </div>
    </Tabs>
  );
};
