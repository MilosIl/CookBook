import { useResolvedTheme } from '@/store/theme';
import { Drawer } from 'expo-router/drawer';

function RecipesLayout() {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        },
        drawerActiveTintColor: '#f97316',
        drawerInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        headerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#111827',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="recipes"
        options={{
          drawerLabel: 'My Recipes',
          title: 'My Recipes',
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Favorites',
          title: 'Favorite recipes',
        }}
      />
    </Drawer>
  );
}
export default RecipesLayout;
