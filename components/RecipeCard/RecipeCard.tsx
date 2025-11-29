import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { HStack } from '../ui/hstack';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  plates: number;
  vegan: boolean;
  likes: number;
  ingredients: string[];
  type: 'breakfast' | 'lunch' | 'dinner';
  preparation: string;
  favorite: boolean;
};

function RecipeCard({
  description,
  id,
  likes,
  name,
  plates,
  vegan,
  image,
  favorite,
}: Recipe) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isLiked, setIsLiked] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLiked(!isLiked);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Box
      id={id}
      className="items-center gap-3 bg-orange-100 mt-4 p-4 rounded-lg w-[290px] h-[400px]"
    >
      <Skeleton
        variant="rounded"
        className="rounded-lg w-64 h-44"
        isLoaded={false}
      >
        <Image
          className="rounded-lg w-64 h-44"
          source={{
            uri: image,
          }}
          alt={`food-image-${name}`}
        />
      </Skeleton>
      <VStack className="gap-2 mt-4">
        <Text className="font-black text-gray-900 text-2xl">{name}</Text>
        <Text className="text-gray-700 text-base">{description}</Text>
        <Text className="text-gray-700 text-sm">
          {vegan ? (
            <MaterialCommunityIcons name="food-apple" size={24} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="food-drumstick"
              size={24}
              color="#B5652A"
            />
          )}
        </Text>
        <Text className="py-4 text-gray-700 text-base">
          Plates:
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={20}
            color="black"
          />
          {plates}
        </Text>
        <HStack className="justify-between items-center gap-10 mb-10">
          <TouchableOpacity onPress={onPress}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Text className="text-gray-700">
                <AntDesign name="like" size={24} color="black" /> {likes}
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <Text className="flex-row justify-center items-center text-gray-700">
            Favorit:{' '}
            <TouchableOpacity onPress={handleFavorite}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={20} color="black" />
              )}
            </TouchableOpacity>
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
export default RecipeCard;
