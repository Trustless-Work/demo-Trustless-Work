"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FundEscrowForm } from "@/components/forms/fund-escrow-form";
import { ChangeMilestoneStatusForm } from "@/components/forms/change-milestone-status-form";
import { ChangeMilestoneFlagForm } from "@/components/forms/change-milestone-flag-form";
import { StartDisputeForm } from "@/components/forms/start-dispute-form";
import { ResolveDisputeForm } from "@/components/forms/resolve-dispute-form";
import { DistributeEarningsForm } from "@/components/forms/distribute-earnings-form";
import type { Escrow } from "@/@types/escrow.entity";

interface EscrowDashboardProps {
  escrow: Escrow;
}

export function EscrowDashboard({ escrow }: EscrowDashboardProps) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{escrow.title}</span>
            <Badge variant="outline">
              {escrow.contractId ? "Initialized" : "Pending"}
            </Badge>
          </CardTitle>
          <CardDescription>{escrow.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Contract ID</p>
              <p className="text-muted-foreground break-all">
                {escrow.contractId || "Not yet deployed"}
              </p>
            </div>
            <div>
              <p className="font-medium">Engagement ID</p>
              <p className="text-muted-foreground">{escrow.engagementId}</p>
            </div>
            <div>
              <p className="font-medium">Amount</p>
              <p className="text-muted-foreground">{escrow.amount}</p>
            </div>
            <div>
              <p className="font-medium">Platform Fee</p>
              <p className="text-muted-foreground">{escrow.platformFee}%</p>
            </div>
            <div>
              <p className="font-medium">Service Provider</p>
              <p className="text-muted-foreground truncate">
                {escrow.serviceProvider}
              </p>
            </div>
            <div>
              <p className="font-medium">Approver</p>
              <p className="text-muted-foreground truncate">
                {escrow.approver}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {escrow.milestones.map((milestone, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Milestone {index + 1}</p>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {milestone.status && (
                      <Badge
                        variant={
                          milestone.status === "approved"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    )}
                    {milestone.flag && (
                      <Badge variant="outline">Approved</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escrow Operations</CardTitle>
          <CardDescription>
            Perform operations on this escrow contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fund" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="fund">Fund</TabsTrigger>
              <TabsTrigger value="complete">Complete</TabsTrigger>
              <TabsTrigger value="approve">Approve</TabsTrigger>
              <TabsTrigger value="dispute">Dispute</TabsTrigger>
              <TabsTrigger value="resolve">Resolve</TabsTrigger>
              <TabsTrigger value="distribute">Distribute</TabsTrigger>
            </TabsList>
            <TabsContent value="fund" className="mt-4">
              <FundEscrowForm escrow={escrow} />
            </TabsContent>
            <TabsContent value="complete" className="mt-4">
              <ChangeMilestoneStatusForm escrow={escrow} />
            </TabsContent>
            <TabsContent value="approve" className="mt-4">
              <ChangeMilestoneFlagForm escrow={escrow} />
            </TabsContent>
            <TabsContent value="dispute" className="mt-4">
              <StartDisputeForm escrow={escrow} />
            </TabsContent>
            <TabsContent value="resolve" className="mt-4">
              <ResolveDisputeForm escrow={escrow} />
            </TabsContent>
            <TabsContent value="distribute" className="mt-4">
              <DistributeEarningsForm escrow={escrow} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
