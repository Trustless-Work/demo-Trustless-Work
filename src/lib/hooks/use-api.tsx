"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

// Define types for our API context
export interface ApiContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  clearCredentials: () => void;
  isAuthenticated: boolean;
}

// Create context with default values that include a demo API key
const ApiContext = createContext<ApiContextType>({
  apiKey: "demo-api-key-for-testing",
  setApiKey: () => {},
  baseUrl: "https://api.trustlesswork.com",
  setBaseUrl: () => {},
  clearCredentials: () => {},
  isAuthenticated: true, // Default to authenticated
});

// Custom hook for using the API context
export const useApi = () => useContext(ApiContext);

interface ApiProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps your app and makes the API context available
 * to any child component that calls useApi().
 */
export function ApiProvider({ children }: ApiProviderProps) {
  // Initialize with demo values
  const [apiKey, setApiKeyState] = useState("demo-api-key-for-testing");
  const [baseUrl, setBaseUrlState] = useState("https://api.trustlesswork.com");

  // Persist API key to localStorage
  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    localStorage.setItem("trustless-work-api-key", key);
  }, []);

  // Persist base URL to localStorage
  const setBaseUrl = useCallback((url: string) => {
    setBaseUrlState(url);
    localStorage.setItem("trustless-work-base-url", url);
  }, []);

  // Clear all credentials
  const clearCredentials = useCallback(() => {
    setApiKeyState("demo-api-key-for-testing"); // Reset to demo key instead of clearing
    localStorage.removeItem("trustless-work-api-key");
  }, []);

  // Always authenticated with demo key
  const isAuthenticated = true;

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      apiKey,
      setApiKey,
      baseUrl,
      setBaseUrl,
      clearCredentials,
      isAuthenticated,
    }),
    [apiKey, setApiKey, baseUrl, setBaseUrl, clearCredentials, isAuthenticated]
  );

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
