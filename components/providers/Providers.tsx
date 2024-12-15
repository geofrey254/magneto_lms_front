"use client";
import { createContext, useContext, useState } from "react";
import { Subject, Chapter } from "@/types/types";

interface AppContextProps {
  subjects: Subject[] | null;
  chapters: Chapter[] | null;
  filteredChapters: Chapter[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredChapters: Chapter[] = (chapters ?? []).filter((chap) => {
    const term = searchTerm.toLowerCase();
    return (
      chap.title.toLowerCase().includes(term) ||
      (chap.description?.toLowerCase().includes(term) ?? false) ||
      (chap.subject?.name?.toLowerCase().includes(term) ?? false) ||
      (chap.form?.name?.toLowerCase().includes(term) ?? false)
    );
  });

  return (
    <AppContext.Provider
      value={{
        subjects,
        chapters,
        filteredChapters,
        searchTerm,
        setSearchTerm,
      }}
    >
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
