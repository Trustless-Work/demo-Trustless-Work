"use client";

import type React from "react";

import { useState } from "react";
import { useApiContext } from "@/providers/api.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponseDisplay } from "@/components/response-display";

export function GetEscrowForm() {
  const { apiKey, baseUrl } = useApiContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    contractId: "",
    signer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url = new URL(`${baseUrl}/escrow/get-escrow-by-contract-id`);
      url.searchParams.append("contractId", formData.contractId);
      url.searchParams.append("signer", formData.signer);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get escrow");
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Fetching..." : "Get Escrow"}
        </Button>
      </form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
