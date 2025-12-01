import { Stack } from 'expo-router';

const RecipeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: 'Recipe Details',
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerShown: true,
          title: 'New Recipe',
          presentation: 'card',
        }}
      />
    </Stack>
  );
};

export default RecipeLayout;
