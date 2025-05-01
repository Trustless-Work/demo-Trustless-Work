import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeployEndpoints } from "@/components/modules/ui/endpoints/deploy-endpoints";
import { EscrowEndpoints } from "@/components/modules/ui/endpoints/escrow-endpoints";
import { HelperEndpoints } from "@/components/modules/ui/endpoints/helper-endpoints";
import { useTabsContext } from "@/providers/tabs.provider";

export const MainTabs = () => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <Tabs
      key={activeTab}
      value={activeTab}
      onValueChange={(val) =>
        setActiveTab(val as "deploy" | "escrow" | "helper")
      }
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="deploy" className="">
          Deploy
        </TabsTrigger>
        <TabsTrigger value="escrow" className="">
          Escrows
        </TabsTrigger>
        <TabsTrigger value="helper" className="">
          Helpers
        </TabsTrigger>
      </TabsList>
      <div className="p-6">
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
