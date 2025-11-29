import RecipeCard, { Recipe } from '@/components/RecipeCard/RecipeCard';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import data from '../../recipe-data.json';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const NoRecipes = () => {
    return (
      <View>
        <Text>No recipes found..</Text>
      </View>
    );
  };

  const RecipeItem = ({ item }: { item: Recipe }) => {
    return (
      <Link href={`/recipes/[id]`} key={item.id} className="my-4">
        <RecipeCard {...item} />
      </Link>
    );
  };
  return (
    <SafeAreaView className="flex-1 mx-auto">
      <FlatList
        data={data}
        renderItem={RecipeItem}
        ListEmptyComponent={NoRecipes}
        keyExtractor={(item: Recipe) => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
