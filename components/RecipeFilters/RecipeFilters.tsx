import RecipeTypeSelect from '@/components/RecipeTypeSelect';
import SearchInput from '@/components/ThemedInput';
import VeganFilter from '@/components/VeganFilter';
import { useResolvedTheme } from '@/store/theme';
import { View } from 'react-native';

type RecipeFiltersProps = {
  searchQuery: string;
  selectedType: 'all' | 'breakfast' | 'lunch' | 'dinner';
  onSearchChange: (query: string) => void;
  onTypeChange: (type: 'all' | 'breakfast' | 'lunch' | 'dinner') => void;
};

const RecipeFilters = ({
  searchQuery,
  selectedType,
  onSearchChange,
  onTypeChange,
}: RecipeFiltersProps) => {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';

  return (
    <View className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <View className="mb-3 px-4">
        <SearchInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search recipes by name..."
        />
      </View>
      <View className="flex-row items-center gap-3 mb-4 px-4">
        <RecipeTypeSelect
          selectedType={selectedType}
          onTypeChange={onTypeChange}
        />
        <VeganFilter />
      </View>
    </View>
  );
};

export default RecipeFilters;
