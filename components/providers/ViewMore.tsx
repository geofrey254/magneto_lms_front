"use client";
import { createContext, useContext } from "react";

interface ViewMoreContextProps {
  limits: number;
}

const ViewMoreContext = createContext<ViewMoreContextProps | undefined>(
  undefined
);

export function ViewMoreWrapper({
  limits = 0,
  children,
}: Readonly<{
  limits?: number;
  children: React.ReactNode;
}>) {
  return (
    <ViewMoreContext.Provider
      value={{
        limits,
      }}
    >
      {children}
    </ViewMoreContext.Provider>
  );
}

export function useViewMoreContext() {
  const context = useContext(ViewMoreContext);
  if (!context) {
    throw new Error("ViewMoreContext must be used within an ViewMoreWrapper");
  }
  return context;
}
