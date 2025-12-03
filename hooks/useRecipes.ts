import { supabase } from '@/lib/supabase';
import { Recipe } from '@/store/recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (filters: string) => [...recipeKeys.lists(), { filters }] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
  userRecipes: (userId: string) => [...recipeKeys.all, 'user', userId] as const,
  localRecipes: () => [...recipeKeys.all, 'local'] as const,
  favoriteRecipes: (ids: string[]) =>
    [...recipeKeys.all, 'favorites', ids] as const,
  topLiked: () => [...recipeKeys.all, 'top-liked'] as const,
};

export function useRecipes(type?: 'breakfast' | 'lunch' | 'dinner') {
  return useQuery({
    queryKey: recipeKeys.list(type || 'all'),
    queryFn: async () => {
      let query = supabase
        .from('recipes')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Recipe[];
    },
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Recipe;
    },
    enabled: !!id,
  });
}

export function useUserRecipes(userId: string | undefined) {
  return useQuery({
    queryKey: recipeKeys.userRecipes(userId || ''),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Recipe[];
    },
    enabled: !!userId,
  });
}

export function useLocalRecipes() {
  return useQuery({
    queryKey: recipeKeys.localRecipes(),
    queryFn: async () => {
      try {
        const stored = await AsyncStorage.getItem('recipes');
        return stored ? (JSON.parse(stored) as Recipe[]) : [];
      } catch (error) {
        console.error('Error loading local recipes:', error);
        return [];
      }
    },
  });
}

export function useFavoriteRecipes(recipeIds: string[]) {
  return useQuery({
    queryKey: recipeKeys.favoriteRecipes(recipeIds),
    queryFn: async () => {
      if (recipeIds.length === 0) {
        return [];
      }

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .in('id', recipeIds);

      if (error) throw error;
      return data as Recipe[];
    },
    enabled: recipeIds.length > 0,
  });
}

export function useTopLikedRecipes(limit: number = 3) {
  return useQuery({
    queryKey: recipeKeys.topLiked(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_public', true)
        .order('likes', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Recipe[];
    },
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('recipes')
        .insert(recipe)
        .select()
        .single();

      if (error) throw error;
      return data as Recipe;
    },
    onSuccess: (newRecipe) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });

      if (newRecipe.user_id) {
        queryClient.invalidateQueries({
          queryKey: recipeKeys.userRecipes(newRecipe.user_id),
        });
      }
    },
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Recipe>;
    }) => {
      const { data, error } = await supabase
        .from('recipes')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0)
        throw new Error('Recipe not found or access denied');
      return data[0] as Recipe;
    },
    onSuccess: (updatedRecipe) => {
      queryClient.setQueryData(
        recipeKeys.detail(updatedRecipe.id),
        updatedRecipe
      );

      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('recipes').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.removeQueries({ queryKey: recipeKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

export function useShareRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('recipes')
        .insert({ ...recipe, is_public: true })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create recipe');
      return data as Recipe;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: recipeKeys.lists() });
      await queryClient.refetchQueries({ queryKey: recipeKeys.topLiked() });
      await queryClient.refetchQueries({ queryKey: recipeKeys.localRecipes() });
    },
  });
}

export function useLikeRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      recipeId,
    }: {
      userId: string;
      recipeId: string;
    }) => {
      const { data: recipe } = await supabase
        .from('recipes')
        .select('likes')
        .eq('id', recipeId)
        .single();

      if (!recipe) throw new Error('Recipe not found');

      const { error: updateError } = await supabase
        .from('recipes')
        .update({ likes: recipe.likes + 1 })
        .eq('id', recipeId);

      if (updateError) throw updateError;

      return { userId, recipeId };
    },
    onSuccess: ({ userId, recipeId }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(recipeId) });
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recipeKeys.topLiked() });
    },
  });
}

export function useUnlikeRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      recipeId,
    }: {
      userId: string;
      recipeId: string;
    }) => {
      const { data: recipe } = await supabase
        .from('recipes')
        .select('likes')
        .eq('id', recipeId)
        .single();

      if (!recipe) throw new Error('Recipe not found');

      const newLikes = Math.max(0, recipe.likes - 1);
      const { error: updateError } = await supabase
        .from('recipes')
        .update({ likes: newLikes })
        .eq('id', recipeId);

      if (updateError) throw updateError;

      return { userId, recipeId };
    },
    onSuccess: ({ userId, recipeId }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(recipeId) });
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recipeKeys.topLiked() });
    },
  });
}
