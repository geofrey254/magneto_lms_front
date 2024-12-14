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
}

export interface ChaptersProps {
  limit?: number; // Optional limit prop
}
