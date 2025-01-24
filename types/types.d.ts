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
  user: number;
  verified: boolean;
  plan: number;
  start_date: string;
  end_date: string;
}

export interface Lesson {
  title: string;
  description: string;
  lesson_content: string;
}

export interface PaymentHistory {
  id: number;
  user: string;
  amount_paid: number;
  reference_code: string;
  payment_date: string;
}

export interface Message {
  id: string; // Add the missing id property
  sender: "user" | "Magneto";
  text: string;
  timestamp?: Date; // Optional timestamp if needed
}
