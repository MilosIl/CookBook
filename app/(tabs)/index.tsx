import RecipeCard, { Recipe } from '@/components/RecipeCard/RecipeCard';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeStore } from '@/store/recipe';
import { Link } from 'expo-router';
import { ChevronDownIcon } from 'lucide-react-native';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { selectedType, setSelectedType } = useRecipeStore();
  const {
    data: recipes,
    isLoading,
    error,
  } = useRecipes(selectedType === 'all' ? undefined : selectedType);

  const NoRecipes = () => {
    return (
      <View>
        <Text>No recipes found..</Text>
      </View>
    );
  };

  const RecipeItem = ({ item }: { item: Recipe }) => {
    return (
      <Link href={`/recipes/${item.id}`} key={item.id} className="my-4">
        <RecipeCard {...item} />
      </Link>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading recipes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 mx-auto">

      <View className="mb-4 px-4">
        <Text className="mb-2 font-bold text-lg">Filter by type:</Text>
        <Select
          selectedValue={selectedType}
          onValueChange={(value) =>
            setSelectedType(value as 'all' | 'breakfast' | 'lunch' | 'dinner')
          }
        >
          <SelectTrigger variant="outline" size="md" className="w-full">
            <SelectInput
              placeholder="Select recipe type"
              className="capitalize"
            />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="All Recipes" value="all" />
              <SelectItem label="Breakfast" value="breakfast" />
              <SelectItem label="Lunch" value="lunch" />
              <SelectItem label="Dinner" value="dinner" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>
      <FlatList
        data={recipes}
        renderItem={RecipeItem}
        ListEmptyComponent={NoRecipes}
        keyExtractor={(item: Recipe) => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
