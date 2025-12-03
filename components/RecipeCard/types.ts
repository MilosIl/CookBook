export type RecipeType = 'breakfast' | 'lunch' | 'dinner';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  vegan: boolean;
  likes: number;
  ingredients: string[];
  type: RecipeType;
  preparation: string;
  favorite?: boolean;
  user_id?: string;
  is_public?: boolean;
};

export const typeBadgeColors = {
  breakfast: 'bg-yellow-500',
  lunch: 'bg-green-500',
  dinner: 'bg-orange-500',
};
