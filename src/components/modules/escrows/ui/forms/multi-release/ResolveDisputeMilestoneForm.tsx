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
import { useResolveDisputeMilestoneForm } from "../../../hooks/multi-release/resolve-dispute-milestone-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import { ResponseDisplay } from "@/components/utils/response-display";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ResolveDisputeMilestoneForm() {
  const { form, loading, response, onSubmit } =
    useResolveDisputeMilestoneForm();
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
            name="disputeResolver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dispute Resolver Address</FormLabel>
                <FormControl>
                  <Input disabled placeholder="GDISPUTE...XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="milestoneIndex"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Milestone Index</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {escrow?.milestones.map((_, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          Milestone {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              name="receiverFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Funds</FormLabel>
                  <FormControl>
                    <Input placeholder="700" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resolving milestone..." : "Resolve Milestone"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}
