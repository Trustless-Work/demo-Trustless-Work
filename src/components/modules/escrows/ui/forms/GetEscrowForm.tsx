"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/response-display";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useGetEscrowForm } from "../../hooks/get-escrow-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
export function GetEscrowForm() {
  const { form, loading, response, error, onSubmit } = useGetEscrowForm();
  const { escrow } = useEscrowContext();

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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Getting Escrow..." : "Get Escrow"}
        </Button>
      </form>

      <ResponseDisplay response={response} error={error} />
    </Form>
  );
}
