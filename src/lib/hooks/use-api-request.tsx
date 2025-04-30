"use client"

import { useState, useCallback } from "react"
import { useApi } from "./use-api"

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  params?: Record<string, string | string[]>
}

interface ApiRequestResult<T> {
  data: T | null
  error: string | null
  loading: boolean
  execute: (overrideOptions?: RequestOptions) => Promise<T>
}

/**
 * Generate a random contract ID for demo purposes
 */
function generateContractId() {
  return `CAZ6UQX7${Math.random().toString(36).substring(2, 10).toUpperCase()}`
}

/**
 * Generate a mock response based on the endpoint and request data
 */
function generateMockResponse(endpoint: string, options: RequestOptions) {
  // Simulate network delay
  const delay = Math.floor(Math.random() * 500) + 300

  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock responses based on endpoint
      if (endpoint.includes("initialize")) {
        resolve({
          status: "SUCCESS",
          contract_id: generateContractId(),
          escrow: {
            ...options.body,
            contractId: generateContractId(),
          },
          message: "Escrow initialized successfully",
        })
      } else if (endpoint.includes("fund")) {
        resolve({
          status: "SUCCESS",
          unsignedTransaction: `AAAAAgAAAAB${Math.random().toString(36).substring(2, 30)}`,
          message: "Escrow funded successfully. Please sign the transaction.",
        })
      } else if (endpoint.includes("get-escrow")) {
        resolve({
          status: "SUCCESS",
          escrow: {
            contractId: options.params?.contractId || generateContractId(),
            title: "Demo Escrow Contract",
            description: "This is a demo escrow contract for testing purposes",
            milestones: [
              { description: "Initial setup", status: "completed", flag: true },
              { description: "Development phase", status: "pending", flag: false },
              { description: "Final delivery", status: "pending", flag: false },
            ],
            amount: "1000",
            platformFee: "5",
            serviceProvider: "GSERVICE123456789",
            approver: "GAPPROVER123456789",
            disputeResolver: "GDISPUTE123456789",
            releaseSigner: "GRELEASE123456789",
            engagementId: "ENG12345",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          message: "Escrow retrieved successfully",
        })
      } else if (endpoint.includes("change-milestone")) {
        resolve({
          status: "SUCCESS",
          unsignedTransaction: `AAAAAgAAAAB${Math.random().toString(36).substring(2, 30)}`,
          message: "Milestone updated successfully. Please sign the transaction.",
        })
      } else if (endpoint.includes("dispute")) {
        resolve({
          status: "SUCCESS",
          unsignedTransaction: `AAAAAgAAAAB${Math.random().toString(36).substring(2, 30)}`,
          message: "Dispute action processed successfully. Please sign the transaction.",
        })
      } else if (endpoint.includes("distribute")) {
        resolve({
          status: "SUCCESS",
          unsignedTransaction: `AAAAAgAAAAB${Math.random().toString(36).substring(2, 30)}`,
          message: "Earnings distribution initiated. Please sign the transaction.",
        })
      } else if (endpoint.includes("trustline")) {
        resolve({
          status: "SUCCESS",
          unsignedTransaction: `AAAAAgAAAAB${Math.random().toString(36).substring(2, 30)}`,
          message: "Trustline set successfully. Please sign the transaction.",
        })
      } else if (endpoint.includes("balance")) {
        resolve({
          status: "SUCCESS",
          balances: [
            {
              contractId: "CAZ6UQX7ABCDEF",
              balance: "500",
              token: "XLM",
            },
            {
              contractId: "CAZ6UQX7GHIJKL",
              balance: "750",
              token: "XLM",
            },
          ],
          message: "Balances retrieved successfully",
        })
      } else {
        // Generic response for other endpoints
        resolve({
          status: "SUCCESS",
          data: options.body || {},
          message: "Operation completed successfully",
        })
      }
    }, delay)
  })
}

/**
 * Custom hook for making API requests to the Trustless Work API
 * In demo mode, it returns mock responses
 *
 * @param endpoint - The API endpoint to call
 * @param options - Request options including method, body, and URL parameters
 * @returns Object containing data, error, loading state, and execute function
 */
export function useApiRequest<T = any>(endpoint: string, options: RequestOptions = {}): ApiRequestResult<T> {
  const { apiKey, baseUrl } = useApi()
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const execute = useCallback(
    async (overrideOptions?: RequestOptions): Promise<T> => {
      // Combine default options with any override options
      const finalOptions = { ...options, ...overrideOptions }

      setLoading(true)
      setError(null)

      try {
        // In demo mode, generate mock responses
        const responseData = (await generateMockResponse(endpoint, finalOptions)) as T
        setData(responseData)
        return responseData
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [endpoint, options],
  )

  return { data, error, loading, execute }
}
