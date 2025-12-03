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
  is_public?: boolean;
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
  favoriteRecipeIds: Record<string, string[]>;
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
  toggleFavorite: (recipeId: string, userId: string) => void;
  isFavorite: (recipeId: string, userId: string) => boolean;
  getFavoriteIds: (userId: string) => string[];
  clearUserFavorites: (userId: string) => void;
};

type RecipeClientStore = RecipeClientState & RecipeClientActions;

export const useRecipeStore = create<RecipeClientStore>()(
  persist(
    (set, get) => ({
      selectedType: 'all',
      searchQuery: '',
      LikedIds: [],
      favoriteRecipeIds: {},
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

      toggleFavorite: (recipeId, userId) => {
        const state = get();
        const userFavorites = state.favoriteRecipeIds[userId] || [];
        const newUserFavorites = userFavorites.includes(recipeId)
          ? userFavorites.filter((id) => id !== recipeId)
          : [...userFavorites, recipeId];

        set({
          favoriteRecipeIds: {
            ...state.favoriteRecipeIds,
            [userId]: newUserFavorites,
          },
        });
      },

      isFavorite: (recipeId, userId) => {
        const userFavorites = get().favoriteRecipeIds[userId] || [];
        return userFavorites.includes(recipeId);
      },

      getFavoriteIds: (userId) => {
        return get().favoriteRecipeIds[userId] || [];
      },

      clearUserFavorites: (userId) => {
        const state = get();
        const { [userId]: _removed, ...rest } = state.favoriteRecipeIds;
        set({ favoriteRecipeIds: rest });
      },
    }),
    {
      name: 'recipe',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        favoriteRecipeIds: state.favoriteRecipeIds,
      }),
    }
  )
);

export default useRecipeStore;
