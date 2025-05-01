"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResponseDisplay } from "@/components/response-display";
import type { Escrow } from "@/@types/escrow.entity";
import { useEscrowContext } from "@/providers/escrow.provider";

const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  disputeResolver: z.string().min(1, "Dispute resolver address is required"),
  approverFunds: z.string().min(1, "Approver funds is required"),
  serviceProviderFunds: z.string().min(1, "Service provider funds is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function ResolveDisputeForm() {
  const { escrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "CAZ6UQX7DEMO123",
      disputeResolver: escrow?.disputeResolver || "GDISPUTE123456789",
      approverFunds: "300",
      serviceProviderFunds: "700",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch("/api/escrow/resolve-dispute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to resolve dispute");
      }

      setResponse(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract ID</FormLabel>
                <FormControl>
                  <Input {...field} readOnly={!!escrow?.contractId} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disputeResolver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dispute Resolver Address</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="approverFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver Funds</FormLabel>
                  <FormControl>
                    <Input placeholder="300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceProviderFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider Funds</FormLabel>
                  <FormControl>
                    <Input placeholder="700" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resolving..." : "Resolve Dispute"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
