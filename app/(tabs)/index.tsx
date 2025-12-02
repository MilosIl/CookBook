import DailyRecipe from '@/components/DailyRecipe/DailyRecipe';
import RecipeFilters from '@/components/RecipeFilters';
import RecipeList from '@/components/RecipeList';
import TopLikedRecipes from '@/components/TopLikedRecipes';
import { Spinner } from '@/components/ui/spinner';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeStore } from '@/store/recipe';
import { useTheme } from '@/store/theme';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {
    selectedType,
    setSelectedType,
    showVeganOnly,
    searchQuery,
    setSearchQuery,
  } = useRecipeStore();
  const { isDark } = useTheme();
  const {
    data: recipes,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useRecipes(selectedType === 'all' ? undefined : selectedType);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return recipes;

    let filtered = recipes;

    if (showVeganOnly) {
      filtered = filtered.filter((recipe) => recipe.vegan);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [recipes, showVeganOnly, searchQuery]);

  if (isLoading) {
    return (
      <SafeAreaView
        className={`flex-1 justify-center items-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      >
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className={`w-full flex-1 justify-center items-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      >
        <Text className="text-error-500">Error loading recipes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 w-full ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
    >
      <RecipeList
        recipes={filteredRecipes}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListHeaderComponent={
          <View
            className={isDark ? 'bg-background-dark' : 'bg-background-light'}
          >
            <DailyRecipe />
            <TopLikedRecipes />
            <RecipeFilters
              searchQuery={searchQuery}
              selectedType={selectedType}
              onSearchChange={setSearchQuery}
              onTypeChange={setSelectedType}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
