"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FundEscrowForm } from "@/components/forms/fund-escrow-form"
import { GetEscrowForm } from "@/components/forms/get-escrow-form"
import { ResolveDisputeForm } from "@/components/forms/resolve-dispute-form"
import { ChangeMilestoneStatusForm } from "@/components/forms/change-milestone-status-form"
import { ChangeMilestoneFlagForm } from "@/components/forms/change-milestone-flag-form"
import { ChangeDisputeFlagForm } from "@/components/forms/change-dispute-flag-form"
import { DistributeEarningsForm } from "@/components/forms/distribute-earnings-form"
import { UpdateEscrowForm } from "@/components/forms/update-escrow-form"

export function EscrowEndpoints() {
  const [activeTab, setActiveTab] = useState("get-escrow")

  // Create a mock escrow for demo purposes
  const mockEscrow = {
    id: "demo-id",
    contractId: "CAZ6UQX7DEMO123",
    title: "Demo Escrow Contract",
    description: "This is a demo escrow contract for testing purposes",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    token: "XLM",
    milestones: [
      { description: "Initial setup", status: "completed", flag: true },
      { description: "Development phase", status: "pending", flag: false },
      { description: "Final delivery", status: "pending", flag: false },
    ],
    serviceProvider: "GSERVICE123456789",
    engagementId: "ENG12345",
    disputeResolver: "GDISPUTE123456789",
    amount: "1000",
    platformAddress: "GPLATFORM123456789",
    platformFee: "5",
    approver: "GAPPROVER123456789",
    releaseSigner: "GRELEASE123456789",
    user: "demo-user",
    issuer: "GISSUER123456789",
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-xl">Escrow Endpoints</CardTitle>
        <CardDescription>Manage escrow contracts, milestones, and funds</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex flex-wrap mb-4 gap-1">
            <TabsTrigger value="get-escrow" className="flex-1">
              Get Escrow
            </TabsTrigger>
            <TabsTrigger value="fund-escrow" className="flex-1">
              Fund Escrow
            </TabsTrigger>
            <TabsTrigger value="change-milestone-status" className="flex-1">
              Change Status
            </TabsTrigger>
            <TabsTrigger value="change-milestone-flag" className="flex-1">
              Approve Milestone
            </TabsTrigger>
            <TabsTrigger value="change-dispute-flag" className="flex-1">
              Start Dispute
            </TabsTrigger>
            <TabsTrigger value="resolve-dispute" className="flex-1">
              Resolve Dispute
            </TabsTrigger>
            <TabsTrigger value="distribute-earnings" className="flex-1">
              Distribute Funds
            </TabsTrigger>
            <TabsTrigger value="update-escrow" className="flex-1">
              Update Escrow
            </TabsTrigger>
          </TabsList>
          <div className="mt-2 pt-4 border-t">
            <TabsContent value="get-escrow" className="mt-0">
              <GetEscrowForm />
            </TabsContent>
            <TabsContent value="fund-escrow" className="mt-0">
              <FundEscrowForm escrow={mockEscrow} />
            </TabsContent>
            <TabsContent value="change-milestone-status" className="mt-0">
              <ChangeMilestoneStatusForm escrow={mockEscrow} />
            </TabsContent>
            <TabsContent value="change-milestone-flag" className="mt-0">
              <ChangeMilestoneFlagForm escrow={mockEscrow} />
            </TabsContent>
            <TabsContent value="change-dispute-flag" className="mt-0">
              <ChangeDisputeFlagForm />
            </TabsContent>
            <TabsContent value="resolve-dispute" className="mt-0">
              <ResolveDisputeForm escrow={mockEscrow} />
            </TabsContent>
            <TabsContent value="distribute-earnings" className="mt-0">
              <DistributeEarningsForm escrow={mockEscrow} />
            </TabsContent>
            <TabsContent value="update-escrow" className="mt-0">
              <UpdateEscrowForm />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
