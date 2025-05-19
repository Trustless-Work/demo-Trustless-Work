/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { useState, useCallback } from "react";

/**
 * Custom hook for managing form state with type safety
 *
 * @param initialState - The initial state of the form
 * @returns Form state and utility functions
 */
export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  // Handle input change for string values
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  // Handle select change
  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle switch change
  const handleSwitchChange = useCallback((name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  // Update multiple fields at once
  const updateFields = useCallback((fields: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    handleSelectChange,
    handleSwitchChange,
    resetForm,
    updateFields,
  };
}
