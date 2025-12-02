import RecipeCard, { Recipe } from '@/components/RecipeCard/RecipeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopLikedRecipes } from '@/hooks/useRecipes';
import { useResolvedTheme } from '@/store/theme';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

const NUMBER_OF_TOP_RECIPES = 3;

const TopLikedRecipes = () => {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const { data: topRecipes, isLoading } = useTopLikedRecipes(
    NUMBER_OF_TOP_RECIPES
  );

  if (isLoading) {
    return (
      <View className={`px-4 mb-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <View className="gap-4">
          <Skeleton className="rounded-lg h-32" />
          <Skeleton className="rounded-lg h-32" />
          <Skeleton className="rounded-lg h-32" />
        </View>
      </View>
    );
  }

  if (!topRecipes || topRecipes.length === 0) {
    return null;
  }

  return (
    <View className={`px-4 mb-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Text
        className={`my-4 text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Top Liked Recipes
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {topRecipes.map((recipe: Recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <View className="w-72">
              <RecipeCard {...recipe} />
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopLikedRecipes;
