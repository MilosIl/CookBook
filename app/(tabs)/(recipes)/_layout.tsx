import { Drawer } from 'expo-router/drawer';
function RecipesLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="recipes"
        options={{
          drawerLabel: 'Recipes',
          title: 'Recipes title',
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
