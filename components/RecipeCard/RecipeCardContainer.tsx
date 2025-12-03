import EditModal from '@/components/EditModal';
import useAnimation from '@/hooks/useAnimation';
import {
  useDeleteRecipe,
  useLikeRecipe,
  useShareRecipe,
  useUnlikeRecipe,
} from '@/hooks/useRecipes';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/recipe';
import { useTheme } from '@/store/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import { RecipeCardView } from './RecipeCardView';
import { Recipe } from './types';

interface RecipeCardContainerProps {
  recipe: Recipe;
}

export const RecipeCardContainer = ({ recipe }: RecipeCardContainerProps) => {
  const { toggleFavorite, isFavorite, LikedIds, addLike, removeLike } =
    useRecipeStore();
  const { user } = useAuthStore();
  const { isDark } = useTheme();
  const queryClient = useQueryClient();

  const likeMutation = useLikeRecipe();
  const unlikeMutation = useUnlikeRecipe();
  const shareMutation = useShareRecipe();
  const deleteMutation = useDeleteRecipe();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { scaleAnim, animateScale } = useAnimation();

  const isFavorited = user ? isFavorite(recipe.id, user.id) : false;
  const isLiked = LikedIds.includes(recipe.id);
  const displayLikes = recipe.likes;
  const isOwnRecipe = user?.id === recipe.user_id;

  const handleLike = async () => {
    if (!user) return;

    animateScale();

    if (isLiked) {
      removeLike(recipe.id);
      try {
        await unlikeMutation.mutateAsync({
          userId: user.id,
          recipeId: recipe.id,
        });
      } catch (error) {
        addLike(recipe.id);
        console.error('Failed to unlike:', error);
      }
    } else {
      addLike(recipe.id);
      try {
        await likeMutation.mutateAsync({
          userId: user.id,
          recipeId: recipe.id,
        });
      } catch (error) {
        removeLike(recipe.id);
        console.error('Failed to like:', error);
      }
    }
  };

  const handleFavorite = () => {
    if (user) {
      toggleFavorite(recipe.id, user.id);
    }
  };

  const handleShare = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to share recipes');
      return;
    }

    Alert.alert(
      'Share Recipe',
      'Do you want to make this recipe public? It will be visible to all users.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Share',
          onPress: async () => {
            setIsSharing(true);
            try {
              const recipeToShare = {
                name: recipe.name,
                description: recipe.description,
                image: recipe.image,
                vegan: recipe.vegan,
                likes: recipe.likes,
                ingredients: recipe.ingredients,
                type: recipe.type,
                preparation: recipe.preparation,
                user_id: user.id,
              };

              await shareMutation.mutateAsync(recipeToShare);

              const stored = await AsyncStorage.getItem('recipes');
              if (stored) {
                const recipes = JSON.parse(stored);
                const updatedRecipes = recipes.filter(
                  (r: Recipe) => r.id !== recipe.id
                );
                await AsyncStorage.setItem(
                  'recipes',
                  JSON.stringify(updatedRecipes)
                );
              }

              Alert.alert('Success', 'Recipe shared successfully!');
            } catch (error) {
              console.error('Failed to share recipe:', error);
              Alert.alert('Error', 'Failed to share recipe');
            } finally {
              setIsSharing(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            setIsDeleting(true);
            try {
              if (!recipe.user_id) {
                const stored = await AsyncStorage.getItem('recipes');
                if (stored) {
                  const recipes = JSON.parse(stored);
                  const updatedRecipes = recipes.filter(
                    (r: Recipe) => r.id !== recipe.id
                  );
                  await AsyncStorage.setItem(
                    'recipes',
                    JSON.stringify(updatedRecipes)
                  );
                  queryClient.invalidateQueries({
                    queryKey: ['recipes', 'local'],
                  });
                }
              } else {
                await deleteMutation.mutateAsync(recipe.id);
              }

              Alert.alert('Success', 'Recipe deleted successfully!');
            } catch (error) {
              console.error('Failed to delete recipe:', error);
              Alert.alert('Error', 'Failed to delete recipe');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <RecipeCardView
        recipe={recipe}
        isDark={isDark}
        isFavorite={isFavorited}
        isLiked={isLiked}
        displayLikes={displayLikes}
        isOwnRecipe={isOwnRecipe}
        imageError={imageError}
        isDeleting={isDeleting}
        isSharing={isSharing}
        scaleAnim={scaleAnim}
        onLike={handleLike}
        onFavorite={handleFavorite}
        onShare={handleShare}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageError={() => setImageError(true)}
      />
      <EditModal
        visible={isEditModalOpen}
        recipe={recipe}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['recipes', 'local'] });
        }}
      />
    </>
  );
};
