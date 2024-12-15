export interface Class {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  title: string;
  description: string;
  slug: string;
  image?: string;
  form?: Class[];
  name: string;
}

export interface ChaptersProps {
  limit?: number; // Optional limit prop
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  slug: string;
  subject: Subject | null;
  class: Class | null;
}
