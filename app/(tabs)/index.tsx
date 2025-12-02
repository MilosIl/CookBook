import RecipeList from '@/components/RecipeList';
import RecipeTypeSelect from '@/components/RecipeTypeSelect';
import TopLikedRecipes from '@/components/TopLikedRecipes';
import VeganFilter from '@/components/VeganFilter';
import { Spinner } from '@/components/ui/spinner';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeStore } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { selectedType, setSelectedType, showVeganOnly } = useRecipeStore();
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const {
    data: recipes,
    isLoading,
    error,
  } = useRecipes(selectedType === 'all' ? undefined : selectedType);

  // Filter recipes based on vegan filter
  const filteredRecipes = useMemo(() => {
    if (!recipes) return recipes;
    if (!showVeganOnly) return recipes;
    return recipes.filter((recipe) => recipe.vegan);
  }, [recipes, showVeganOnly]);

  if (isLoading) {
    return (
      <SafeAreaView
        className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className={`w-full flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <Text className="text-red-500">Error loading recipes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 w-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <ScrollView>
        <View className={isDark ? 'bg-gray-900' : 'bg-white'}>
          <TopLikedRecipes />
          <View className="flex-row items-center gap-3 mb-4 px-4">
            <RecipeTypeSelect
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
            <VeganFilter />
          </View>
        </View>
        <RecipeList recipes={filteredRecipes} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
