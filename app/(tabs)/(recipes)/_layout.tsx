import { useTheme } from '@/store/theme';
import { Drawer } from 'expo-router/drawer';

function RecipesLayout() {
  const { isDark } = useTheme();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
        },
        drawerActiveTintColor: '#FF9900',
        drawerInactiveTintColor: isDark ? '#999999' : '#7A7A7A',
        headerStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#1A1A1A',
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
