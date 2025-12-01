import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useLikeRecipe, useUnlikeRecipe } from '@/hooks/useRecipes';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/recipe';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Animated, TouchableOpacity } from 'react-native';
import { HStack } from '../ui/hstack';
import useAnimation from '@/hooks/useAnimation';

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
  const isFavorite = favoriteRecipeIds.includes(id);

  const likeMutation = useLikeRecipe();
  const unlikeMutation = useUnlikeRecipe();

  const isLiked = LikedIds.includes(id);
  const displayLikes = likes + (isLiked ? 1 : 0);

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
  return (
    <Box
      id={id}
      className="items-center gap-3 bg-orange-100 mt-4 p-4 rounded-lg w-3/4"
    >
      <Skeleton
        variant="rounded"
        className="rounded-lg w-fit h-48"
        isLoaded={true}
      >
        <Image
          className="bg-cover rounded-lg w-fit h-48"
          source={{
            uri: image,
          }}
          alt={`food-image-${name}`}
        />
      </Skeleton>
      <VStack className="gap-2 mt-4">
        <HStack className="justify-between items-center">
          <Text className="font-black text-gray-900 text-2xl">{name}</Text>
        </HStack>
        <Text className="text-gray-700 text-base">{description}</Text>
        <HStack className="justify-between mb-4">
          <Text className="p-0 text-gray-700 t">
            {vegan ? (
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
          </Text>
          <Box className={`px-2 py-1 rounded-full ${typeBadgeColors[type]}`}>
            <Text className="font-semibold text-white text-xs capitalize">
              {type}
            </Text>
          </Box>
        </HStack>
        <HStack className="justify-between items-center gap-10 mb-10">
          <TouchableOpacity onPress={handleLike}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <HStack className="items-center gap-1">
                <AntDesign
                  name="like"
                  size={24}
                  color={isLiked ? '#1E90FF' : 'black'}
                />
                <Text className="text-gray-700">{displayLikes}</Text>
              </HStack>
            </Animated.View>
          </TouchableOpacity>
          <HStack className="items-center gap-1">
            <Text className="text-gray-700">Favorit:</Text>
            <TouchableOpacity onPress={handleFavorite}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={20} color="black" />
              )}
            </TouchableOpacity>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
export default RecipeCard;
