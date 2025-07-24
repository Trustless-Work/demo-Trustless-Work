import { useState } from "react";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";
import { GetEscrowFromIndexerByContractIdsParams } from "@trustless-work/escrow/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ResponseDisplay } from "@/components/utils/response-display";

export function GetEscrowsByContractIdsForm() {
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

  const [contractIds, setContractIds] = useState<string>("");
  const [signer, setSigner] = useState<string>("");
  const [validateOnChain, setValidateOnChain] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: GetEscrowFromIndexerByContractIdsParams = {
      contractIds: contractIds.split(",").map((id) => id.trim()).filter(id => id.length > 0),
      signer,
      validateOnChain,
    };

    try {
      const escrows = await getEscrowByContractIds(payload);

      if (!escrows) {
        toast.error("No escrows found.");
        return;
      }

      toast.success("Escrows received!");
      setResult(escrows);
    } catch (error: unknown) {
      toast.error("Error fetching escrows.");
      console.error(error);
    }
  };

  return (
    <div className="w-full md:w-3/4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="contractIds" className="block text-sm font-medium mb-1">
            Contract IDs (comma separated)
          </Label>
          <Input
            id="contractIds"
            type="text"
            value={contractIds}
            onChange={(e) => setContractIds(e.target.value)}
            placeholder="0x123..., 0x456..."
            required
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="signer" className="block text-sm font-medium mb-1">
            Signer Address
          </Label>
          <Input
            id="signer"
            type="text"
            value={signer}
            onChange={(e) => setSigner(e.target.value)}
            placeholder="0x..."
            required
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-3 p-4 border rounded-md">
          <Checkbox
            id="validateOnChain"
            checked={validateOnChain}
            onCheckedChange={(value) => setValidateOnChain(Boolean(value))}
            className="h-4 w-4"
          />
          <div className="space-y-1">
            <Label htmlFor="validateOnChain" className="text-sm font-medium">
              Validate on-chain
            </Label>
            <p className="text-xs text-muted-foreground">
              Check this option to validate the data on-chain (slower)
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Get Escrows
        </Button>

        {result && (
          <div className="mt-4">
            <ResponseDisplay response={result} />
          </div>
        )}
      </form>
    </div>
  );
}
