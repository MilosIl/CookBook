import RecipeForm, { RecipeFormData } from '@/components/RecipeForm/RecipeForm';
import { useAuthStore } from '@/store/auth';
import { Recipe } from '@/store/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string().min(1, { message: 'Recipe name is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
  image: z.string().url({ message: 'Please enter a valid image URL' }),
  type: z.enum(['breakfast', 'lunch', 'dinner'], {
    message: 'Please select a recipe type',
  }),
  vegan: z.boolean(),
  ingredients: z.string().min(10, { message: 'Please add some ingredients' }),
  preparation: z
    .string()
    .min(20, { message: 'Preparation steps must be at least 20 characters' }),
});

const NewRecipeScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipeFormData>({
    defaultValues: {
      name: '',
      description: '',
      image: '',
      type: 'lunch',
      vegan: false,
      ingredients: '',
      preparation: '',
    },
    resolver: zodResolver(recipeSchema),
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a recipe');
      return;
    }

    try {
      const ingredientsArray = data.ingredients
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      const newRecipe: Recipe = {
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        description: data.description,
        image: data.image,
        type: data.type,
        vegan: data.vegan,
        ingredients: ingredientsArray,
        preparation: data.preparation,
        user_id: user.id,
        likes: 0,
        is_public: false,
        created_at: new Date().toISOString(),
      };

      const storedRecipesJson = await AsyncStorage.getItem('recipes');
      const storedRecipes: Recipe[] = storedRecipesJson
        ? JSON.parse(storedRecipesJson)
        : [];
      storedRecipes.push(newRecipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(storedRecipes));

      Alert.alert(
        'Success',
        'Recipe saved locally! You can share it later to make it public.',
        [
          {
            text: 'OK',
            onPress: () => {
              reset();
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error creating recipe:', error);
      Alert.alert('Error', 'Failed to create recipe. Please try again.');
    }
  };

  return (
    <View className="flex-1">
      <RecipeForm
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={false}
      />
    </View>
  );
};

export default NewRecipeScreen;
