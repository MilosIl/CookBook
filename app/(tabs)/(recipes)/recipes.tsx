import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const RecipesScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text>Screen mojih recepta</Text>

      <Pressable
        onPress={() => router.push('/recipes/new')}
        className="right-6 bottom-6 absolute justify-center items-center bg-orange-500 active:bg-orange-600 shadow-lg rounded-full w-16 h-16"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <AntDesign name="plus" size={28} color="white" />
      </Pressable>
    </View>
  );
};

export default RecipesScreen;
