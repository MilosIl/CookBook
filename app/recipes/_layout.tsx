import { Stack } from 'expo-router';

const RecipeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: true, title: 'List of recipes' }}
      />
    </Stack>
  );
};

export default RecipeLayout;
