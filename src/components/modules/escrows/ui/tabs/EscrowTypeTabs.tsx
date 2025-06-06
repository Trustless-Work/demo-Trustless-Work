import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsContext } from "@/providers/tabs.provider";

export const EscrowTypeTabs = () => {
  const { activeEscrowType, setActiveEscrowType } = useTabsContext();

  return (
    <Tabs
      value={activeEscrowType}
      onValueChange={(val) =>
        setActiveEscrowType(val as "multi-release" | "single-release")
      }
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="multi-release">Multi-release</TabsTrigger>
        <TabsTrigger value="single-release">Single-release</TabsTrigger>
      </TabsList>
      <TabsContent value="multi-release">
        <h1>Multi-release</h1>
      </TabsContent>
      <TabsContent value="single-release">
        <h1>Single-release</h1>
      </TabsContent>
    </Tabs>
  );
};
