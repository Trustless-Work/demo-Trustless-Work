"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { steps } from "@/components/modules/escrows/constants/initialize-steps.constant";
import { ResponseDisplay } from "@/components/utils/response-display";
import { InitializeMultiReleaseEscrowResponse } from "@trustless-work/escrow/types";
import { trustlinesOptions } from "@/components/modules/escrows/constants/trustline.constant";
import { formSchemaMultiRelease } from "../../../schemas/initialize-escrow-form.schema";

type FormValues = z.infer<typeof formSchemaMultiRelease>;

interface InitializeMultiEscrowFormProps {
  form: UseFormReturn<FormValues>;
  loading?: boolean;
  response: InitializeMultiReleaseEscrowResponse | null;
  currentStep: number;
  onSubmit: (data: FormValues) => Promise<void>;
  addMilestone: () => void;
  removeMilestone: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const InitializeMultiEscrowForm = ({
  form,
  loading,
  response,
  currentStep,
  onSubmit,
  addMilestone,
  removeMilestone,
  nextStep,
  prevStep,
}: InitializeMultiEscrowFormProps) => {
  const renderStep = () => {
    const currentStepData = steps[currentStep];

    return (
      <div className="w-full md:w-3/4">
        {/* Card wrapper - hidden on mobile, visible on desktop */}
        <Card className="hidden md:block w-full">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold">
              {currentStepData.title}
            </CardTitle>
            <FormDescription>{currentStepData.description}</FormDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="signer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Signer Address</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="GSIGN...XYZ"
                            {...field}
                          />
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escrow description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                      name="trustline.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trustline</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                const selectedOption = trustlinesOptions.find(
                                  (opt) => opt.value === value
                                );
                                if (selectedOption) {
                                  field.onChange(selectedOption.value);
                                }
                              }}
                              value={field.value || ""}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a trustline" />
                              </SelectTrigger>
                              <SelectContent>
                                {trustlinesOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="receiverMemo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receiver Memo</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              {...field}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="roles.approver"
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
                    name="roles.serviceProvider"
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
                    name="roles.platformAddress"
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
                    name="roles.releaseSigner"
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
                    name="roles.disputeResolver"
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
                    name="roles.receiver"
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
              )}

              {currentStep === 3 && (
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
                          <div className="flex-1 space-y-4">
                            <FormField
                              control={form.control}
                              name={`milestones.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Milestone {index + 1} - Description
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

                            <FormField
                              control={form.control}
                              name={`milestones.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Amount</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="1000"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                      }
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
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mobile content - visible on mobile, hidden on desktop */}
        <div className="block md:hidden w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
            <p className="text-muted-foreground">
              {currentStepData.description}
            </p>
          </div>
          <div className="space-y-4">
            {currentStep === 0 && (
              <>
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
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 gap-4">
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
                    name="trustline.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trustline</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              const selectedOption = trustlinesOptions.find(
                                (opt) => opt.value === value
                              );
                              if (selectedOption) {
                                field.onChange(selectedOption.value);
                              }
                            }}
                            value={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a trustline" />
                            </SelectTrigger>
                            <SelectContent>
                              {trustlinesOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverMemo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Memo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="roles.approver"
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
                  name="roles.serviceProvider"
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
                  name="roles.platformAddress"
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
                  name="roles.releaseSigner"
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
                  name="roles.disputeResolver"
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
                  name="roles.receiver"
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
            )}

            {currentStep === 3 && (
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
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`milestones.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Milestone {index + 1} - Description
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

                        <FormField
                          control={form.control}
                          name={`milestones.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="1000"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                  }
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between mb-8 w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center",
              index !== steps.length - 1 && "flex-1"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full flex flex-col items-center justify-center"
          >
            {renderStep()}
          </form>
        </Form>

        {/* Navigation Buttons - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row w-full max-w-4xl justify-between pt-4 sm:pt-6 gap-4 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              disabled={loading}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {loading ? "Initializing..." : "Initialize Escrow"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      <ResponseDisplay response={response} />
    </div>
  );
};
