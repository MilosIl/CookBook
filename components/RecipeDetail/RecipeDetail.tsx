import { typeBadgeColors } from '@/components/RecipeCard/';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Recipe } from '@/store/recipe';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

type RecipeDetailProps = {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const RecipeDetail = ({
  recipe,
  isFavorite,
  onToggleFavorite,
}: RecipeDetailProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <ScrollView className="flex-1">
      <Image
        className="w-full h-64"
        source={
          imageError || !recipe.image
            ? require('@/assets/images/food.png')
            : { uri: recipe.image }
        }
        alt={recipe.name}
        onError={() => setImageError(true)}
      />

      <VStack className="gap-4 p-4">
        <HStack className="justify-between items-start">
          <Text className="flex-1 font-bold text-gray-900 text-2xl">
            {recipe.name}
          </Text>
          <VStack className="justify-between items-end gap-2">
            <Box
              className={`px-3 flex-col flex py-1 rounded-full ${typeBadgeColors[recipe.type]}`}
            >
              <Text className="font-semibold text-white text-sm capitalize">
                {recipe.type}
              </Text>
            </Box>
            <HStack className="items-center gap-2">
              {recipe.vegan ? (
                <>
                  <MaterialCommunityIcons
                    name="food-apple"
                    size={20}
                    color="green"
                  />
                  <Text className="font-medium text-green-600">Vegan</Text>
                </>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="food-drumstick"
                    size={20}
                    color="#B5652A"
                  />
                  <Text className="font-medium text-amber-700">Non-Vegan</Text>
                </>
              )}
            </HStack>
          </VStack>
        </HStack>

        <Text className="text-gray-600 text-base">{recipe.description}</Text>

        <HStack className="justify-between items-center py-2 border-gray-200 border-y">
          <HStack className="items-center gap-2">
            <AntDesign name="like" size={20} color="#f97316" />
            <Text className="font-medium text-gray-700">
              {recipe.likes} likes
            </Text>
          </HStack>

          <TouchableOpacity onPress={onToggleFavorite}>
            <HStack className="items-center gap-2">
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={20} color="gray" />
              )}
              <Text className="text-gray-700">Favorite</Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        {/* Ingredients */}
        <VStack className="gap-2">
          <Text className="font-bold text-gray-900 text-lg">Ingredients</Text>
          <VStack className="gap-1 bg-gray-50 p-3 rounded-lg">
            {recipe.ingredients?.map((ingredient, index) => (
              <HStack key={index} className="items-center gap-2">
                <View className="bg-orange-500 rounded-full w-2 h-2" />
                <Text className="text-gray-700">{ingredient}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>

        <VStack className="gap-2">
          <Text className="font-bold text-gray-900 text-lg">Preparation</Text>
          <Box className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-gray-700 leading-6">
              {recipe.preparation}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default RecipeDetail;
