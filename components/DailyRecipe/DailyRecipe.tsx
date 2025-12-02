import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { RecipeType, typeBadgeColors } from '../RecipeCard';
import { HStack } from '../ui/hstack';

const getRecipeTypeByTime = (): RecipeType => {
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 12) {
    return 'breakfast';
  } else if (hour >= 12 && hour < 20) {
    return 'lunch';
  } else {
    return 'dinner';
  }
};

type DailyRecipeCardProps = {
  recipe: Recipe;
  isDark: boolean;
};

const DailyRecipeCard = ({ recipe, isDark }: DailyRecipeCardProps) => {
  return (
    <>
      <Text
        className={`font-bold m-4 text-lg mb-2 self-start  ${isDark ? 'text-typography-600' : 'text-typography-800'}`}
      >
        Chef&apos;s recommendation
      </Text>
      <TouchableOpacity>
        <Box
          className={`items-center gap-3 m-4 p-4 rounded-lg ${isDark ? 'bg-background-800' : 'bg-primary-50'}`}
        >
          <Skeleton
            variant="rounded"
            className="rounded-lg w-full h-48"
            isLoaded={true}
          >
            <Image
              className="bg-cover rounded-lg w-full h-48"
              source={{
                uri: recipe.image,
              }}
              alt={`food-image-${recipe.name}`}
            />
          </Skeleton>
          <Link href={`/recipes/${recipe.id}`}>
            <VStack className="gap-2 mt-4 w-full">
              <Text
                className={`font-black text-2xl ${isDark ? 'text-typography-dark' : 'text-typography-white'}`}
              >
                {recipe.name}
              </Text>

              <Text
                className={`text-base ${isDark ? 'text-typography-200' : 'text-typography-700'}`}
              >
                {recipe.description}
              </Text>

              <HStack className="justify-between mt-2">
                <HStack className="items-center gap-2">
                  {recipe.vegan ? (
                    <MaterialCommunityIcons
                      name="food-apple"
                      size={24}
                      color="green"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="food-drumstick"
                      size={24}
                      color="#B5652A"
                    />
                  )}
                  <Text
                    className={
                      isDark ? 'text-typography-200' : 'text-typography-700'
                    }
                  >
                    {recipe.vegan ? 'Vegan' : 'Non-vegan'}
                  </Text>
                </HStack>
                <Box
                  className={`px-3 py-1 rounded-full ${typeBadgeColors[recipe.type]}`}
                >
                  <Text className="font-semibold text-white text-xs capitalize">
                    {recipe.type}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Link>
        </Box>
      </TouchableOpacity>
    </>
  );
};

const DailyRecipe = () => {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const recipeType = getRecipeTypeByTime();

  const { data: recipes, isLoading } = useRecipes(recipeType);

  const randomRecipe = useMemo(() => {
    if (!recipes || recipes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  }, [recipes]);

  if (isLoading) {
    return (
      <Box className="m-4 p-4 rounded-lg">
        <Skeleton variant="rounded" className="rounded-lg w-full h-48" />
        <VStack className="gap-2 mt-4">
          <Skeleton className="rounded w-3/4 h-6" />
          <Skeleton className="rounded w-full h-4" />
        </VStack>
      </Box>
    );
  }

  if (!randomRecipe) {
    return (
      <Box
        className={`m-4 p-4 rounded-lg ${isDark ? 'bg-background-800' : 'bg-primary-50'}`}
      >
        <Text
          className={isDark ? 'text-typography-white' : 'text-typography-black'}
        >
          No {recipeType} recipes available
        </Text>
      </Box>
    );
  }

  return <DailyRecipeCard recipe={randomRecipe} isDark={isDark} />;
};

export default DailyRecipe;
