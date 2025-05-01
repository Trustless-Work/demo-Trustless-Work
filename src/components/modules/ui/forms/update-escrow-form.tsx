"use client";

import type React from "react";

import { useState } from "react";
import { useApiContext } from "@/providers/api.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { ResponseDisplay } from "@/components/response-display";

type Milestone = {
  description: string;
  status: string;
};

export function UpdateEscrowForm() {
  const { apiKey, baseUrl } = useApiContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    signer: "",
    contractId: "",
    escrow: {
      signer: "",
      engagementId: "",
      title: "",
      description: "",
      approver: "",
      serviceProvider: "",
      platformAddress: "",
      amount: "",
      platformFee: "",
      milestones: [{ description: "", status: "pending" }] as Milestone[],
      disputeFlag: false,
      releaseFlag: false,
      resolvedFlag: false,
      releaseSigner: "",
      disputeResolver: "",
      receiver: "",
      receiverMemo: "",
      trustline: "",
      trustlineDecimals: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("escrow.")) {
      const escrowField = name.replace("escrow.", "");
      setFormData((prev) => ({
        ...prev,
        escrow: {
          ...prev.escrow,
          [escrowField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMilestones = [...formData.escrow.milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      escrow: {
        ...prev.escrow,
        milestones: updatedMilestones,
      },
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      escrow: {
        ...prev.escrow,
        milestones: [
          ...prev.escrow.milestones,
          { description: "", status: "pending" },
        ],
      },
    }));
  };

  const removeMilestone = (index: number) => {
    if (formData.escrow.milestones.length > 1) {
      const updatedMilestones = [...formData.escrow.milestones];
      updatedMilestones.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        escrow: {
          ...prev.escrow,
          milestones: updatedMilestones,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch(
        `${baseUrl}/escrow/update-escrow-by-contract-id`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update escrow");
      }

      setResponse(data);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signer">Signer Address</Label>
            <Input
              id="signer"
              name="signer"
              placeholder="GSIGN...XYZ"
              value={formData.signer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractId">Contract ID</Label>
            <Input
              id="contractId"
              name="contractId"
              placeholder="CAZ6UQX7..."
              value={formData.contractId}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="escrow.engagementId">Engagement ID</Label>
          <Input
            id="escrow.engagementId"
            name="escrow.engagementId"
            placeholder="ENG12345"
            value={formData.escrow.engagementId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escrow.title">Title</Label>
          <Input
            id="escrow.title"
            name="escrow.title"
            placeholder="Escrow Title"
            value={formData.escrow.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escrow.description">Description</Label>
          <Textarea
            id="escrow.description"
            name="escrow.description"
            placeholder="Escrow description"
            value={formData.escrow.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="escrow.approver">Approver Address</Label>
            <Input
              id="escrow.approver"
              name="escrow.approver"
              placeholder="GAPPROVER...XYZ"
              value={formData.escrow.approver}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="escrow.serviceProvider">
              Service Provider Address
            </Label>
            <Input
              id="escrow.serviceProvider"
              name="escrow.serviceProvider"
              placeholder="GSERVICE...XYZ"
              value={formData.escrow.serviceProvider}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Milestones</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMilestone}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Milestone
            </Button>
          </div>

          {formData.escrow.milestones.map((milestone, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-desc-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`milestone-desc-${index}`}
                        value={milestone.description}
                        onChange={(e) =>
                          handleMilestoneChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Milestone description"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-status-${index}`}>
                        Status
                      </Label>
                      <Input
                        id={`milestone-status-${index}`}
                        value={milestone.status}
                        onChange={(e) =>
                          handleMilestoneChange(index, "status", e.target.value)
                        }
                        placeholder="pending"
                        required
                      />
                    </div>
                  </div>
                  {formData.escrow.milestones.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMilestone(index)}
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

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
