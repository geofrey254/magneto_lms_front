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
  params: {
    slug: string;
  };
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
  form: Class | null;
  params: {
    slug: string;
  };
}

export interface Subscription {
  id: number;
  name: string;
  amount: number;
  description: string;
}
