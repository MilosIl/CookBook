import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import useAnimation from '@/hooks/useAnimation';
import {
  useLikeRecipe,
  useShareRecipe,
  useUnlikeRecipe,
} from '@/hooks/useRecipes';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Animated, TouchableOpacity } from 'react-native';
import { HStack } from '../ui/hstack';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  vegan: boolean;
  likes: number;
  ingredients: string[];
  type: RecipeType;
  preparation: string;
  favorite?: boolean;
};
export type RecipeType = 'breakfast' | 'lunch' | 'dinner';

export const typeBadgeColors = {
  breakfast: 'bg-yellow-500',
  lunch: 'bg-green-500',
  dinner: 'bg-orange-500',
};

function RecipeCard({
  description,
  id,
  likes,
  name,
  type,
  vegan,
  image,
}: Recipe) {
  const { favoriteRecipeIds, toggleFavorite, LikedIds, addLike, removeLike } =
    useRecipeStore();
  const { user } = useAuthStore();
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const isFavorite = favoriteRecipeIds.includes(id);

  const likeMutation = useLikeRecipe();
  const unlikeMutation = useUnlikeRecipe();
  const shareMutation = useShareRecipe();

  const isLiked = LikedIds.includes(id);
  const displayLikes = likes + (isLiked ? 1 : 0);

  const isLocalRecipe = id.startsWith('local_');

  const { scaleAnim, animateScale } = useAnimation();

  const handleLike = async () => {
    if (!user) return;

    animateScale();

    if (isLiked) {
      removeLike(id);
      try {
        await unlikeMutation.mutateAsync({ userId: user.id, recipeId: id });
      } catch (error) {
        addLike(id);
        console.error('Failed to unlike:', error);
      }
    } else {
      addLike(id);
      try {
        await likeMutation.mutateAsync({ userId: user.id, recipeId: id });
      } catch (error) {
        removeLike(id);
        console.error('Failed to like:', error);
      }
    }
  };

  const handleFavorite = () => {
    toggleFavorite(id);
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
            try {
              const stored = await AsyncStorage.getItem('recipes');
              if (!stored) return;

              const recipes = JSON.parse(stored);
              const recipe = recipes.find((r: Recipe) => r.id === id);

              if (!recipe) {
                Alert.alert('Error', 'Recipe not found');
                return;
              }

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

              const updatedRecipes = recipes.filter((r: Recipe) => r.id !== id);
              await AsyncStorage.setItem(
                'recipes',
                JSON.stringify(updatedRecipes)
              );

              Alert.alert('Success', 'Recipe shared successfully!');
            } catch (error) {
              console.error('Failed to share recipe:', error);
              Alert.alert('Error', 'Failed to share recipe');
            }
          },
        },
      ]
    );
  };
  return (
    <Box
      id={id}
      className={`items-center m-2 gap-3  p-4 rounded-lg flex-1   ${isDark ? 'bg-background-800' : 'bg-primary-50'}`}
    >
      <Skeleton
        variant="rounded"
        className="rounded-lg w-full h-48"
        isLoaded={true}
      >
        <Image
          className="bg-cover rounded-lg w-full h-48"
          source={{
            uri: image,
          }}
          alt={`food-image-${name}`}
        />
      </Skeleton>
      <VStack className="flex-1 gap-2 mt-4 w-full">
        <Text
          className={`font-black text-2xl ${isDark ? 'text-typography-black' : 'text-typography-white'}`}
        >
          {name}
        </Text>

        <Text
          className={`text-base ${isDark ? 'text-typography-200' : 'text-typography-700'}`}
        >
          {description}
        </Text>
        <VStack className="flex-row flex-wrap justify-between gap-4">
          <Text
            className={isDark ? 'text-typography-200' : 'text-typography-700'}
          >
            {vegan ? (
              <MaterialCommunityIcons
                name="food-apple"
                size={24}
                color="#2EAD4F"
              />
            ) : (
              <MaterialCommunityIcons
                name="food-drumstick"
                size={24}
                color="#FF9900"
              />
            )}
          </Text>
          <Box className={`px-2 py-1 rounded-full ${typeBadgeColors[type]}`}>
            <Text className="font-semibold text-white text-xs capitalize">
              {type}
            </Text>
          </Box>
          <HStack className="justify-between gap-10 w-full">
            <TouchableOpacity onPress={handleLike}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <HStack className="items-center gap-1">
                  <AntDesign
                    name="like"
                    size={24}
                    color={isLiked ? '#FF9900' : isDark ? '#999999' : '#4A4A4A'}
                  />
                  <Text
                    className={
                      isDark ? 'text-typography-200' : 'text-typography-700'
                    }
                  >
                    {displayLikes}
                  </Text>
                </HStack>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavorite}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color="#FF3B30" />
              ) : (
                <FontAwesome
                  name="heart-o"
                  size={20}
                  color={isDark ? '#999999' : '#4A4A4A'}
                />
              )}
            </TouchableOpacity>
            {isLocalRecipe && (
              <TouchableOpacity onPress={handleShare}>
                <MaterialIcons
                  name="share"
                  size={24}
                  color={isDark ? '#999999' : '#4A4A4A'}
                />
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
export default RecipeCard;
