import RecipeCard, { Recipe } from '@/components/RecipeCard/RecipeCard';
// import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
const RecipeScreen = ({ item }: { item: Recipe }) => {
  // const { id } = useLocalSearchParams();

  return (
    <View className="mx-auto">
      <RecipeCard {...item} />
    </View>
  );
};

export default RecipeScreen;
