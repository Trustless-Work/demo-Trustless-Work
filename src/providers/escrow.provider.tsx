"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Escrow } from "@/@types/escrow.entity";

interface EscrowContextProps {
  escrow: Escrow | null;
  setEscrow: (escrow: Escrow) => void;
  resetEscrow: () => void;
}

const EscrowContext = createContext<EscrowContextProps | undefined>(undefined);

export const EscrowProvider = ({ children }: { children: ReactNode }) => {
  const [escrow, setEscrowState] = useState<Escrow | null>(null);

  const setEscrow = (newEscrow: Escrow) => {
    setEscrowState(newEscrow);
  };

  const resetEscrow = () => {
    setEscrowState(null);
  };

  return (
    <EscrowContext.Provider value={{ escrow, setEscrow, resetEscrow }}>
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrowContext = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error("useEscrowContext must be used within EscrowProvider");
  }
  return context;
};
