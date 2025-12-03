import { recipeSchema } from '@/app/recipes/new';
import RecipeForm, { RecipeFormData } from '@/components/RecipeForm/RecipeForm';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { useTheme } from '@/store/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { X } from 'lucide-react-native';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Recipe } from '../RecipeCard';

interface EditModalProps {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditModal = ({ visible, recipe, onClose, onSuccess }: EditModalProps) => {
  const { isDark } = useTheme();

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

  useEffect(() => {
    if (recipe) {
      reset({
        name: recipe.name,
        description: recipe.description,
        image: recipe.image,
        type: recipe.type,
        vegan: recipe.vegan,
        ingredients: recipe.ingredients.join('\n'),
        preparation: recipe.preparation,
      });
    }
  }, [recipe, reset]);

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (!recipe) return;

    try {
      const ingredientsArray = data.ingredients
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      const updatedRecipe: Recipe = {
        ...recipe,
        name: data.name,
        description: data.description,
        image: data.image,
        type: data.type,
        vegan: data.vegan,
        ingredients: ingredientsArray,
        preparation: data.preparation,
      };

      const storedRecipesJson = await AsyncStorage.getItem('recipes');
      const storedRecipes: Recipe[] = storedRecipesJson
        ? JSON.parse(storedRecipesJson)
        : [];

      const recipeIndex = storedRecipes.findIndex((r) => r.id === recipe.id);
      if (recipeIndex !== -1) {
        storedRecipes[recipeIndex] = updatedRecipe;
        await AsyncStorage.setItem('recipes', JSON.stringify(storedRecipes));
      }

      Alert.alert('Success', 'Recipe updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            onSuccess?.();
          },
        },
      ]);
    } catch (error) {
      console.error('Error updating recipe:', error);
      Alert.alert('Error', 'Failed to update recipe. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView
        className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
      >
        <HStack className="justify-between items-center px-6 py-4 border-gray-200 border-b">
          <Heading
            size="xl"
            className={
              isDark ? 'text-typography-white' : 'text-typography-black'
            }
          >
            Edit Recipe
          </Heading>
          <Pressable onPress={onClose}>
            <X size={24} color={isDark ? '#ffffff' : '#1A1A1A'} />
          </Pressable>
        </HStack>

        <RecipeForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default EditModal;
