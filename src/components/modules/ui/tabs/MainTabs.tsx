import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeployEndpoints } from "@/components/endpoints/deploy-endpoints";
import { EscrowEndpoints } from "@/components/endpoints/escrow-endpoints";
import { HelperEndpoints } from "@/components/endpoints/helper-endpoints";
import { useState } from "react";

export const MainTabs = () => {
  const [activeTab, setActiveTab] = useState("deploy");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full px-4"
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
