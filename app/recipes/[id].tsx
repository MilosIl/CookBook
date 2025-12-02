import RecipeDetail from '@/components/RecipeDetail';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useRecipe } from '@/hooks/useRecipes';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useRecipe(id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (error || !recipe) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-error-500">Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <RecipeDetail
        recipe={recipe}
        isFavorite={isFavorite}
        onToggleFavorite={handleFavorite}
      />
    </SafeAreaView>
  );
};

export default RecipeScreen;
