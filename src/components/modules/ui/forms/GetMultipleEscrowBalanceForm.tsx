"use client";

import type React from "react";

import { useState } from "react";
import { useApiContext } from "@/providers/api.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { ResponseDisplay } from "@/components/response-display";

export function GetMultipleEscrowBalanceForm() {
  const { apiKey, baseUrl } = useApiContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [signer, setSigner] = useState("");
  const [addresses, setAddresses] = useState([""]);

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const handleRemoveAddress = (index: number) => {
    if (addresses.length > 1) {
      const newAddresses = [...addresses];
      newAddresses.splice(index, 1);
      setAddresses(newAddresses);
    }
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Filter out empty addresses
      const filteredAddresses = addresses.filter((addr) => addr.trim() !== "");

      if (filteredAddresses.length === 0) {
        throw new Error("At least one address is required");
      }

      const url = new URL(`${baseUrl}/helper/get-multiple-escrow-balance`);
      url.searchParams.append("signer", signer);

      // Add each address as a separate query parameter
      filteredAddresses.forEach((address) => {
        url.searchParams.append("addresses", address);
      });

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get escrow balances");
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
          <Label htmlFor="signer">Signer Address</Label>
          <Input
            id="signer"
            placeholder="GSIGN...XYZ"
            value={signer}
            onChange={(e) => setSigner(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Contract Addresses</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddAddress}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Address
            </Button>
          </div>

          {addresses.map((address, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Contract Address ${index + 1}`}
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                required
              />
              {addresses.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveAddress(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Fetching..." : "Get Balances"}
        </Button>
      </form>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
}
