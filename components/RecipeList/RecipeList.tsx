import RecipeCard, { Recipe } from '@/components/RecipeCard/RecipeCard';
import { useResolvedTheme } from '@/store/theme';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

interface RecipeListProps {
  recipes: Recipe[] | undefined;
  ListHeaderComponent?: React.ReactElement;
}

const RecipeList = ({ recipes, ListHeaderComponent }: RecipeListProps) => {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';

  const NoRecipes = () => {
    return (
      <View>
        <Text
          className={isDark ? 'text-typography-400' : 'text-typography-600'}
        >
          No recipes found..
        </Text>
      </View>
    );
  };

  const RecipeItem = ({ item }: { item: Recipe }) => {
    return (
      <Link href={`/recipes/${item.id}`} key={item.id}>
        <RecipeCard {...item} />
      </Link>
    );
  };

  return (
    <FlatList
      data={recipes}
      renderItem={RecipeItem}
      ListEmptyComponent={NoRecipes}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item: Recipe) => item.id}
      className={isDark ? 'bg-background-dark' : 'bg-background-light'}
      contentContainerStyle={{
        backgroundColor: isDark ? '#121212' : '#FFFFFF',
      }}
    />
  );
};

export default RecipeList;
