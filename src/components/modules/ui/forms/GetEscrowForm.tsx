"use client";

import { useState } from "react";
import { useApiContext } from "@/providers/api.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/response-display";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Asegúrate de tener estos componentes o adaptarlos

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod validation schema
const schema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer Address is required"),
});

export function GetEscrowForm() {
  const { apiKey, baseUrl } = useApiContext();
  const { walletAddress } = useWalletContext();
  const { escrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize react-hook-form with Zod validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url = new URL(`${baseUrl}/escrow/get-escrow-by-contract-id`);
      url.searchParams.append("contractId", formData.contractId);
      url.searchParams.append("signer", formData.signer);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get escrow");
      }

      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contractId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract / Escrow ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="CAZ6UQX7..."
                  {...field}
                  disabled={!!escrow?.contractId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Getting Escrow..." : "Get Escrow"}
        </Button>
      </form>

      <ResponseDisplay response={response} error={error} />
    </Form>
  );
}
