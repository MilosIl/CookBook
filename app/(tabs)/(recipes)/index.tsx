import RecipeList from '@/components/RecipeList';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useFavoriteRecipes } from '@/hooks/useRecipes';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/recipe';
import { useTheme } from '@/store/theme';
import { View } from 'react-native';

const FavoriteRecipes = () => {
  const { user } = useAuthStore();
  const { getFavoriteIds } = useRecipeStore();
  const { isDark } = useTheme();
  const favoriteRecipeIds = user ? getFavoriteIds(user.id) : [];
  const { data: favoriteRecipes, isLoading } =
    useFavoriteRecipes(favoriteRecipeIds);
  if (isLoading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      >
        <Spinner size="large" />
      </View>
    );
  }

  if (favoriteRecipeIds.length === 0) {
    return (
      <View
        className={`flex-1 justify-center items-center p-4 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      >
        <Text
          className={`text-lg text-center ${isDark ? 'text-typography-400' : 'text-typography-500'}`}
        >
          You have no favorite recipes.{'\n'}
          Add some recipes to your favorites!
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <VStack className="p-4">
        <Text className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {favoriteRecipes?.length}{' '}
          {favoriteRecipes?.length === 1 ? 'recipe' : 'recipes'}
        </Text>
      </VStack>
      <RecipeList recipes={favoriteRecipes} />
    </View>
  );
};

export default FavoriteRecipes;
