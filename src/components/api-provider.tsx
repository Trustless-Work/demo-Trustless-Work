"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type ApiContextType = {
  apiKey: string
  setApiKey: (key: string) => void
  baseUrl: string
  setBaseUrl: (url: string) => void
}

const ApiContext = createContext<ApiContextType>({
  apiKey: "",
  setApiKey: () => {},
  baseUrl: "https://api.trustlesswork.com",
  setBaseUrl: () => {},
})

export const useApiContext = () => useContext(ApiContext)

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState("")
  const [baseUrl, setBaseUrl] = useState("https://api.trustlesswork.com")

  useEffect(() => {
    const storedApiKey = localStorage.getItem("trustless-work-api-key")
    const storedBaseUrl = localStorage.getItem("trustless-work-base-url")

    if (storedApiKey) {
      setApiKey(storedApiKey)
    }

    if (storedBaseUrl) {
      setBaseUrl(storedBaseUrl)
    }
  }, [])

  const handleSetApiKey = (key: string) => {
    setApiKey(key)
    localStorage.setItem("trustless-work-api-key", key)
  }

  const handleSetBaseUrl = (url: string) => {
    setBaseUrl(url)
    localStorage.setItem("trustless-work-base-url", url)
  }

  return (
    <ApiContext.Provider
      value={{
        apiKey,
        setApiKey: handleSetApiKey,
        baseUrl,
        setBaseUrl: handleSetBaseUrl,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
