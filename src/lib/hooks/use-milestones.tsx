"use client";

import { useState, useCallback } from "react";
import type { Milestone } from "@/@types/escrow.entity";

/**
 * Custom hook for managing milestones in escrow forms
 *
 * @param initialMilestones - Initial array of milestones
 * @returns Milestone state and utility functions
 */
export function useMilestones(
  initialMilestones: Milestone[] = [
    { description: "Initial milestone", status: "pending" },
  ]
) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);

  /**
   * Add a new milestone to the list
   */
  const addMilestone = useCallback(() => {
    setMilestones((prev) => [...prev, { description: "", status: "pending" }]);
  }, []);

  /**
   * Remove a milestone at the specified index
   */
  const removeMilestone = useCallback(
    (index: number) => {
      if (milestones.length > 1) {
        setMilestones((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [milestones.length]
  );

  /**
   * Update a specific field of a milestone at the given index
   */
  const updateMilestone = useCallback(
    (index: number, field: keyof Milestone, value: any) => {
      setMilestones((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  return {
    milestones,
    setMilestones,
    addMilestone,
    removeMilestone,
    updateMilestone,
  };
}
