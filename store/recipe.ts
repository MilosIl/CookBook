import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  vegan: boolean;
  likes: number;
  ingredients: string[];
  type: 'breakfast' | 'lunch' | 'dinner';
  preparation: string;
  user_id?: string;
  created_at?: string;
};

export type RecipeGroup = {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  recipe_ids: Recipe['id'][];
};

type RecipeClientState = {
  selectedType: 'all' | 'breakfast' | 'lunch' | 'dinner';
  searchQuery: string;
  LikedIds: string[];
  favoriteRecipeIds: string[];
  showVeganOnly: boolean;
};

type RecipeClientActions = {
  setSelectedType: (type: 'all' | 'breakfast' | 'lunch' | 'dinner') => void;
  setSearchQuery: (query: string) => void;
  toggleVeganFilter: () => void;
  setShowVeganOnly: (value: boolean) => void;

  addLike: (recipeId: string) => void;
  removeLike: (recipeId: string) => void;
  clearLikes: () => void;

  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
};

type RecipeClientStore = RecipeClientState & RecipeClientActions;

export const useRecipeStore = create<RecipeClientStore>()(
  persist(
    (set, get) => ({
      selectedType: 'all',
      searchQuery: '',
      LikedIds: [],
      favoriteRecipeIds: [],
      showVeganOnly: false,

      setSelectedType: (type) => set({ selectedType: type }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleVeganFilter: () =>
        set((state) => ({ showVeganOnly: !state.showVeganOnly })),
      setShowVeganOnly: (value) => set({ showVeganOnly: value }),

      addLike: (recipeId) =>
        set((state) => ({
          LikedIds: [...state.LikedIds, recipeId],
        })),

      removeLike: (recipeId) =>
        set((state) => ({
          LikedIds: state.LikedIds.filter((id) => id !== recipeId),
        })),

      clearLikes: () => set({ LikedIds: [] }),

      toggleFavorite: (recipeId) => {
        const state = get();
        const newFavorites = state.favoriteRecipeIds.includes(recipeId)
          ? state.favoriteRecipeIds.filter((id) => id !== recipeId)
          : [...state.favoriteRecipeIds, recipeId];

        set({ favoriteRecipeIds: newFavorites });
      },

      isFavorite: (recipeId) => get().favoriteRecipeIds.includes(recipeId),
    }),
    {
      name: 'recipe-storage',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        favoriteRecipeIds: state.favoriteRecipeIds,
      }),
    }
  )
);

export default useRecipeStore;
