"use client";
import { createContext, useContext } from "react";
import { Subject } from "@/types/types";

interface AppContextProps {
  subjects: Subject[] | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  subjects,
  children,
}: Readonly<{
  subjects: Subject[] | null;
  children: React.ReactNode;
}>) {
  return (
    <AppContext.Provider value={{ subjects }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
