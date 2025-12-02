import RecipeList from '@/components/RecipeList';
import { useUserRecipes } from '@/hooks/useRecipes';
import useAuthStore from '@/store/auth';
import { Recipe } from '@/store/recipe';
import { useResolvedTheme } from '@/store/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipesScreen = () => {
  const router = useRouter();
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const { user } = useAuthStore();
  const { data: dbRecipes } = useUserRecipes(user?.id);

  const loadRecipes = useCallback(async () => {
    const stored = await AsyncStorage.getItem('my_recipes');
    const localRecipes = stored ? JSON.parse(stored) : [];

    const allRecipes = [...localRecipes, ...(dbRecipes || [])];
    setMyRecipes(allRecipes);
  }, [dbRecipes]);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [loadRecipes])
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
        <RecipeList recipes={myRecipes} />
      )}
      <TouchableOpacity
        onPress={() => router.push('/recipes/new')}
        className="right-6 bottom-6 absolute justify-center items-center bg-orange-500 active:bg-orange-600 shadow-lg rounded-full w-16 h-16"
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecipesScreen;
