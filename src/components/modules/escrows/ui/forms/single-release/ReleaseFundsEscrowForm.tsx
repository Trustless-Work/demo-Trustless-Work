"use client";

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
import { useReleaseFundsEscrowForm } from "../../../hooks/single-release/release-funds-escrow-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import { ResponseDisplay } from "@/components/utils/response-display";

export function ReleaseFundsEscrowForm() {
  const { form, loading, response, onSubmit } = useReleaseFundsEscrowForm();
  const { escrow } = useEscrowContext();

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="releaseSigner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Signer Address</FormLabel>
                <FormControl>
                  <Input disabled placeholder="GSERVICE...XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Releasing..." : "Release Funds"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}
