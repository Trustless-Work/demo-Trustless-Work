"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetEscrowsByRoleForm } from "../../hooks/get-escrows-by-role-form.hook";
import { ResponseDisplay } from "@/components/utils/response-display";

export function GetEscrowsByRoleForm() {
  const { form, onSubmit, loading, response } = useGetEscrowsByRoleForm();

  return (
    <div className="w-full md:w-3/4">
      <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approver">Approver</SelectItem>
                    <SelectItem value="platform">Platform</SelectItem>
                    <SelectItem value="receiver">Receiver</SelectItem>
                    <SelectItem value="releaseSigner">
                      Release Signer
                    </SelectItem>
                    <SelectItem value="disputeResolver">
                      Dispute Resolver
                    </SelectItem>
                    <SelectItem value="serviceProvider">
                      Service Provider
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Address */}
          <FormField
            control={form.control}
            name="roleAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter wallet address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Optional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Filter by title" {...field} />
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
                        <Input
                          placeholder="Filter by engagement ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Minimum amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Maximum amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="page"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Page number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order By</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select order field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="createdAt">Created At</SelectItem>
                          <SelectItem value="updatedAt">Updated At</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Direction</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">Ascending</SelectItem>
                          <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="working">Working</SelectItem>
                          <SelectItem value="pendingRelease">
                            Pending Release
                          </SelectItem>
                          <SelectItem value="released">Released</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="inDispute">In Dispute</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escrow Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select escrow type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-release">
                            Single Release
                          </SelectItem>
                          <SelectItem value="multi-release">
                            Multi Release
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Fetching..." : "Get Escrows"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}
