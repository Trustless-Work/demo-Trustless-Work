import { useState } from "react";
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";
import { GetEscrowFromIndexerByContractIdsParams } from "@trustless-work/escrow/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ResponseDisplay } from "@/components/utils/response-display";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "@/components/ui/form";
  import { useGetEscrowForm } from "../../hooks/get-escrow-form.hook";

export function GetEscrowsByContractIdsForm() {
  const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();
  const { form, loading, response, onSubmit } = useGetEscrowForm();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract / Escrow ID</FormLabel>
                <FormControl>
                  <Input placeholder="CAZ6UQX7..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
          control={form.control}
          name="signer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signer Address</FormLabel>
              <FormControl>
                <Input disabled placeholder="GSIGN...XYZ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Getting Escrows..." : "Get Escrows"}
        </Button>

        {result && (
          <div className="mt-4">
            <ResponseDisplay response={result} />
          </div>
        )}
      </form>
    </Form>
  );
}
