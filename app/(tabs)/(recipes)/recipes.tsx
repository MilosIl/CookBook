import RecipeList from '@/components/RecipeList';
import { useLocalRecipes, useUserRecipes } from '@/hooks/useRecipes';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/store/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipesScreen = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const { user } = useAuthStore();
  const { data: dbRecipes = [] } = useUserRecipes(user?.id);
  const { data: localRecipes = [] } = useLocalRecipes();

  const myRecipes = useMemo(
    () => [...localRecipes, ...dbRecipes],
    [localRecipes, dbRecipes]
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {myRecipes.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text
            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            No recipes yet. Create your first one!
          </Text>
        </View>
      ) : (
        <RecipeList recipes={myRecipes} showHidden={true} />
      )}
      <TouchableOpacity
        onPress={() => router.push('/recipes/new')}
        className="bottom-6 left-6 absolute justify-center items-center bg-orange-500 active:bg-orange-600 shadow-lg rounded-full w-16 h-16"
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecipesScreen;
