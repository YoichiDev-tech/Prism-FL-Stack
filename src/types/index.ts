export interface Category {
  id: string;
  name: string;
}

export type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  pricing?: "Free" | "Freemium" | "Paid" | "Open Source";
  features?: string[];
  tags?: string[];
  logo?: string;
  likes?: number;
  isNew?: boolean;
  isTrending?: boolean;
  is_approved?: boolean;
};

export type NewTool = {
  name: string;
  category: string;
  description: string;
  link: string;
  pricing?: "Free" | "Freemium" | "Paid" | "Open Source";
  features?: string[];
  tags?: string[];
};
