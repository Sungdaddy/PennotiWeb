export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  colors: [string, string]; // Main two colors for the jar visual
  tagline: string;
  ingredients: string;
  nutrition: {
    energy: string;
    fat: string;
    carbs: string;
    protein: string;
    salt: string;
  };
  recipes?: {
    id: string;
    title: string;
    image: string;
    prepTime: string;
  }[];
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}