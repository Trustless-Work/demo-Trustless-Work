import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsContext } from "@/providers/tabs.provider";
import { DeployEndpoints } from "../modules/escrows/ui/endpoints/DeployEndpoints";
import { EscrowEndpoints } from "../modules/escrows/ui/endpoints/EscrowEndpoints";
import { HelperEndpoints } from "../modules/escrows/ui/endpoints/HelperEndpoints";

export const MainTabs = () => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <Tabs
      key={activeTab}
      value={activeTab}
      onValueChange={(val) =>
        setActiveTab(val as "deploy" | "escrow" | "helper")
      }
      className="w-full px-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="deploy">Deploy</TabsTrigger>
        <TabsTrigger value="escrow">Escrows</TabsTrigger>
        <TabsTrigger value="helper">Helpers</TabsTrigger>
      </TabsList>

      <div className="mt-4">
        <TabsContent value="deploy" className="mt-0">
          <DeployEndpoints />
        </TabsContent>
        <TabsContent value="escrow" className="mt-0">
          <EscrowEndpoints />
        </TabsContent>
        <TabsContent value="helper" className="mt-0">
          <HelperEndpoints />
        </TabsContent>
      </div>
    </Tabs>
  );
};
