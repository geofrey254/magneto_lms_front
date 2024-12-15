"use client";
import { createContext, useContext } from "react";
import { Subject, Chapter } from "@/types/types";

interface AppContextProps {
  subjects: Subject[] | null;
  chapters: Chapter[] | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  subjects,
  chapters,
  children,
}: Readonly<{
  subjects: Subject[] | null;
  chapters: Chapter[] | null;
  children: React.ReactNode;
}>) {
  return (
    <AppContext.Provider value={{ subjects, chapters }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
