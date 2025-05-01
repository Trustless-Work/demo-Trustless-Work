"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { ResponseDisplay } from "@/components/response-display";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateEscrowForm } from "../../hooks/update-escrow-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";

export function UpdateEscrowForm() {
  const { form, loading, response, error, fields, append, remove, onSubmit } =
    useUpdateEscrowForm();
  const { escrow } = useEscrowContext();

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="escrow.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Escrow Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.engagementId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engagement ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ENG12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.receiverMemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Memo</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.platformFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Fee (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.approver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="escrow.serviceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.platformAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.releaseSigner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Signer Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.disputeResolver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispute Resolver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="escrow.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Escrow description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Milestones */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Milestones</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ description: "", status: "pending" })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Milestone
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`escrow.milestones.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Milestone {index + 1}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Milestone description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mt-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Escrow"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
