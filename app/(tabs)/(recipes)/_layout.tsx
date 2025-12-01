import { Drawer } from 'expo-router/drawer';
function RecipesLayout() {
  return (
    <Drawer>
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
