import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useFavoriteRecipes } from '@/hooks/useRecipes';
import { useRecipeStore } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import { Link } from 'expo-router';
import { FlatList, View } from 'react-native';

const FavoriteRecipes = () => {
  const { favoriteRecipeIds } = useRecipeStore();
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const { data: favoriteRecipes, isLoading } =
    useFavoriteRecipes(favoriteRecipeIds);

  if (isLoading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <Spinner size="large" />
      </View>
    );
  }

  if (favoriteRecipeIds.length === 0) {
    return (
      <View
        className={`flex-1 justify-center items-center p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <Text
          className={`text-lg text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
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
          {favoriteRecipeIds.length}{' '}
          {favoriteRecipeIds.length === 1 ? 'recipe' : 'recipes'}
        </Text>
      </VStack>

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/recipes/${item.id}`} asChild>
            <HStack className="justify-center">
              <RecipeCard {...item} />
            </HStack>
          </Link>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoriteRecipes;
