"use client";
import { createContext, useContext, useState } from "react";
import { Subject, Chapter, Subscription } from "@/types/types";

interface AppContextProps {
  subjects: Subject[] | null;
  chapters: Chapter[] | null;
  subscriptions: Subscription[] | null;
  filteredChapters: Chapter[];
  latestChapters: Chapter[];
  searchTerm: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setTotalPages: (pages: number) => void;
  setChapters: (chapters: Chapter[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppWrapper({
  subjects,
  chapters: initialChapters,
  subscriptions,
  children,
  totalPages: initialTotalPages,
}: Readonly<{
  subjects: Subject[] | null;
  chapters: Chapter[] | null;
  subscriptions: Subscription[] | null;
  children: React.ReactNode;
  totalPages: number;
}>) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [chapters, setChapters] = useState<Chapter[] | null>(initialChapters);
  const filteredChapters: Chapter[] = (chapters ?? [])
    .filter((chap) => {
      const term = searchTerm.toLowerCase();
      return (
        chap.title.toLowerCase().includes(term) ||
        (chap.description?.toLowerCase().includes(term) ?? false) ||
        (chap.subject?.name?.toLowerCase().includes(term) ?? false) ||
        (chap.form?.name?.toLowerCase().includes(term) ?? false)
      );
    })
    .reverse();

  const latestChapters: Chapter[] = (chapters ?? []).slice(0, 9).reverse();

  return (
    <AppContext.Provider
      value={{
        subjects,
        chapters,
        subscriptions,
        filteredChapters,
        latestChapters,
        searchTerm,
        currentPage,
        setCurrentPage,
        totalPages,
        setSearchTerm,
        setTotalPages,
        setChapters,
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
