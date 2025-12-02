import RecipeCard, { Recipe } from '@/components/RecipeCard/';
import { useTheme } from '@/store/theme';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

interface RecipeListProps {
  recipes: Recipe[] | undefined;
  ListHeaderComponent?: React.ReactElement;
  showHidden?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const RecipeList = ({
  recipes,
  ListHeaderComponent,
  showHidden = false,
  onRefresh,
  refreshing = false,
}: RecipeListProps) => {
  const { isDark } = useTheme();

  const visibleRecipes = showHidden
    ? recipes
    : recipes?.filter((recipe) => recipe.is_public !== false);

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
        <RecipeCard recipe={item} />
      </Link>
    );
  };

  return (
    <FlatList
      data={visibleRecipes}
      renderItem={RecipeItem}
      ListEmptyComponent={NoRecipes}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item: Recipe) => item.id}
      className={isDark ? 'bg-background-dark' : 'bg-background-light'}
      contentContainerStyle={{
        backgroundColor: isDark ? '#121212' : '#FFFFFF',
      }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default RecipeList;
