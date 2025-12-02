import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Recipe, typeBadgeColors } from './types';

interface RecipeCardViewProps {
  recipe: Recipe;
  isDark: boolean;
  isFavorite: boolean;
  isLiked: boolean;
  displayLikes: number;
  isOwnRecipe: boolean;
  imageError: boolean;
  isDeleting: boolean;
  isSharing: boolean;
  isHiding: boolean;
  scaleAnim: Animated.Value;
  onLike: () => void;
  onFavorite: () => void;
  onShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onHide: () => void;
  onImageError: () => void;
}

export const RecipeCardView = ({
  recipe,
  isDark,
  isFavorite,
  isLiked,
  displayLikes,
  isOwnRecipe,
  imageError,
  isDeleting,
  isSharing,
  isHiding,
  scaleAnim,
  onLike,
  onFavorite,
  onShare,
  onEdit,
  onDelete,
  onHide,
  onImageError,
}: RecipeCardViewProps) => {
  return (
    <Box
      id={recipe.id}
      className={`items-center m-2 gap-3 p-4 rounded-lg flex-1 ${isDark ? 'bg-background-800' : 'bg-primary-50'}`}
    >
      <Skeleton
        variant="rounded"
        className="rounded-lg w-full h-48"
        isLoaded={true}
      >
        <Image
          className="bg-cover rounded-lg w-full h-48"
          source={
            imageError || !recipe.image
              ? require('@/assets/images/food.png')
              : { uri: recipe.image }
          }
          alt={`food-image-${recipe.name}`}
          onError={onImageError}
        />
      </Skeleton>
      <VStack className="flex-1 gap-2 mt-4 w-full">
        <Text
          className={`font-black text-2xl ${isDark ? 'text-typography-black' : 'text-typography-white'}`}
        >
          {recipe.name}
        </Text>

        <Text
          className={`text-base ${isDark ? 'text-typography-200' : 'text-typography-700'}`}
        >
          {recipe.description}
        </Text>
        <VStack className="flex-row flex-wrap justify-between gap-4">
          <Text
            className={isDark ? 'text-typography-200' : 'text-typography-700'}
          >
            {recipe.vegan ? (
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
          <Box
            className={`px-2 py-1 rounded-full ${typeBadgeColors[recipe.type]}`}
          >
            <Text className="font-semibold text-white text-xs capitalize">
              {recipe.type}
            </Text>
          </Box>
          <HStack className="justify-between gap-10 w-full">
            <TouchableOpacity onPress={onLike}>
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
            <TouchableOpacity onPress={onFavorite}>
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

            {isOwnRecipe && (
              <>
                <TouchableOpacity onPress={onHide} disabled={isHiding}>
                  {isHiding ? (
                    <ActivityIndicator
                      size="small"
                      color={isDark ? '#999999' : '#4A4A4A'}
                    />
                  ) : (
                    <MaterialIcons
                      name="visibility-off"
                      size={24}
                      color={isDark ? '#999999' : '#4A4A4A'}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit}>
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color={isDark ? '#999999' : '#4A4A4A'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} disabled={isDeleting}>
                  {isDeleting ? (
                    <ActivityIndicator size="small" color="#FF3B30" />
                  ) : (
                    <MaterialIcons name="delete" size={24} color="#FF3B30" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} disabled={isSharing}>
                  {isSharing ? (
                    <ActivityIndicator
                      size="small"
                      color={isDark ? '#999999' : '#4A4A4A'}
                    />
                  ) : (
                    <MaterialIcons
                      name="share"
                      size={24}
                      color={isDark ? '#999999' : '#4A4A4A'}
                    />
                  )}
                </TouchableOpacity>
              </>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
