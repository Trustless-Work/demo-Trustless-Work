"use client";

import type React from "react";

import { useState } from "react";
import { useApiContext } from "@/providers/api.provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ResponseDisplay } from "@/components/response-display";

export function SendTransactionForm() {
  const { apiKey, baseUrl } = useApiContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    signedXdr: "",
    returnEscrowDataIsRequired: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, returnEscrowDataIsRequired: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch(`${baseUrl}/helper/send-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send transaction");
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
          <Label htmlFor="signedXdr">Signed XDR</Label>
          <Textarea
            id="signedXdr"
            name="signedXdr"
            placeholder="AAAAAgAAAAB..."
            value={formData.signedXdr}
            onChange={handleChange}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="returnEscrowDataIsRequired">
              Return Escrow Data
            </Label>
            <Switch
              id="returnEscrowDataIsRequired"
              checked={formData.returnEscrowDataIsRequired}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Transaction"}
        </Button>
      </form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
