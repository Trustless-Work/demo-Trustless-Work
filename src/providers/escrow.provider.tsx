"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Escrow } from "@/@types/escrow.entity";

interface EscrowContextType {
  escrow: Escrow | null;
  setEscrow: (escrow: Escrow) => void;
  clearEscrow: () => void;
  hasEscrow: boolean;
}

const EscrowContext = createContext<EscrowContextType>({
  escrow: null,
  setEscrow: () => {},
  clearEscrow: () => {},
  hasEscrow: false,
});

export const useEscrow = () => useContext(EscrowContext);

interface EscrowProviderProps {
  children: ReactNode;
}

export function EscrowProvider({ children }: EscrowProviderProps) {
  const [escrow, setEscrowState] = useState<Escrow | null>(null);

  const setEscrow = useCallback((newEscrow: Escrow) => {
    setEscrowState(newEscrow);
  }, []);

  const clearEscrow = useCallback(() => {
    setEscrowState(null);
  }, []);

  const hasEscrow = useMemo(() => escrow !== null, [escrow]);

  const value = useMemo(
    () => ({
      escrow,
      setEscrow,
      clearEscrow,
      hasEscrow,
    }),
    [escrow, setEscrow, clearEscrow, hasEscrow]
  );

  return (
    <EscrowContext.Provider value={value}>{children}</EscrowContext.Provider>
  );
}
