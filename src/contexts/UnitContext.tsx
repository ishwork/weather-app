"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Unit = "c" | "f";

type UnitContextValue = {
  unit: Unit;
  toggle: () => void;
};

const UnitContext = createContext<UnitContextValue>({
  unit: "c",
  toggle: () => {},
});

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<Unit>("c");
  const toggle = () => setUnit((u) => (u === "c" ? "f" : "c"));

  return (
    <UnitContext.Provider value={{ unit, toggle }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);
