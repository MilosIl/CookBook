import { useRecipeStore } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, View } from 'react-native';

const VeganFilter = () => {
  const { showVeganOnly, toggleVeganFilter } = useRecipeStore();
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';

  return (
    <View className="w-32">
      <Pressable
        onPress={toggleVeganFilter}
        className={`flex-row items-center justify-center h-11 px-3 rounded-lg border-2 ${
          showVeganOnly && isDark
            ? 'bg-gray-800 border-gray-600'
            : 'bg-white border-gray-300'
        }`}
      >
        <MaterialCommunityIcons
          name="food-apple"
          size={24}
          color={showVeganOnly ? '#22c55e' : isDark ? '#9ca3af' : '#6b7280'}
        />
        <View
          className={`w-10 h-5 rounded-full ml-2 ${
            showVeganOnly && isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}
        >
          <View
            className={`w-4 h-4 rounded-full bg-white mt-0.5 ${
              showVeganOnly ? 'ml-5' : 'ml-0.5'
            }`}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default VeganFilter;
