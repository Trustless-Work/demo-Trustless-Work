"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ResponseDisplay } from "@/components/response-display";
import type { Escrow } from "@/@types/escrow.entity";

// Define the form schema with Zod
const milestoneSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

const formSchema = z.object({
  engagementId: z.string().min(1, "Engagement ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  approver: z.string().min(1, "Approver address is required"),
  serviceProvider: z.string().min(1, "Service Provider address is required"),
  platformAddress: z.string().min(1, "Platform address is required"),
  amount: z.string().min(1, "Amount is required"),
  platformFee: z.string().min(1, "Platform fee is required"),
  milestones: z
    .array(milestoneSchema)
    .min(1, "At least one milestone is required"),
  releaseSigner: z.string().min(1, "Release signer address is required"),
  disputeResolver: z.string().min(1, "Dispute resolver address is required"),
  issuer: z.string().min(1, "Issuer address is required"),
  token: z.string().min(1, "Token address is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface InitializeEscrowFormProps {
  onEscrowInitialized: (escrow: Escrow) => void;
}

export function InitializeEscrowForm({
  onEscrowInitialized,
}: InitializeEscrowFormProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engagementId: "",
      title: "",
      description: "",
      approver: "",
      serviceProvider: "",
      platformAddress: "",
      amount: "",
      platformFee: "",
      milestones: [{ description: "" }],
      releaseSigner: "",
      disputeResolver: "",
      issuer: "",
      token: "",
    },
  });

  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    form.setValue("milestones", [...currentMilestones, { description: "" }]);
  };

  const removeMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones");
    if (currentMilestones.length > 1) {
      form.setValue(
        "milestones",
        currentMilestones.filter((_, i) => i !== index)
      );
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch("/api/escrow/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to initialize escrow");
      }

      setResponse(result);

      // Create an escrow object from the form data and response
      const escrow: Escrow = {
        id: result.escrow?.id || "pending",
        contractId: result.contract_id || result.escrow?.contractId,
        ...data,
        user: "current-user", // This would normally come from authentication
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: data.milestones.map((m) => ({
          ...m,
          status: "pending",
          flag: false,
        })),
      };

      onEscrowInitialized(escrow);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="engagementId"
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
              name="title"
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
          </div>

          <FormField
            control={form.control}
            name="description"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="approver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GAPPROVER...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GSERVICE...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="platformAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GPLATFORM...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="platformFee"
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
            <FormField
              control={form.control}
              name="releaseSigner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Signer Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GREL...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="disputeResolver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispute Resolver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GDISPUTE...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GTOKEN...XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer Address</FormLabel>
                <FormControl>
                  <Input placeholder="GISSUER...XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Milestones</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMilestone}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Milestone
              </Button>
            </div>

            {form.watch("milestones").map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`milestones.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Milestone {index + 1} Description
                            </FormLabel>
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
                    {form.watch("milestones").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMilestone(index)}
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
            {loading ? "Initializing..." : "Initialize Escrow"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
