import { useOnboardingStore } from '@/store/onboarding';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoardingScreen = () => {
  const router = useRouter();
  const { completeOnboarding } = useOnboardingStore();

  const handleComplete = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const DotComponent = ({ selected }: { selected: boolean }) => {
    return (
      <View
        style={{
          width: selected ? 12 : 8,
          height: selected ? 12 : 8,
          marginHorizontal: 6,
          borderRadius: 5,
          backgroundColor: selected ? '#000' : '#ccc',
        }}
      />
    );
  };
  const DoneComponent = ({ ...props }) => {
    return (
      <TouchableOpacity {...props} style={{ marginRight: 10 }}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-300">
      <Onboarding
        onSkip={handleComplete}
        onDone={handleComplete}
        DoneButtonComponent={DoneComponent}
        DotComponent={DotComponent}
        pages={[
          {
            backgroundColor: '#fdba74',
            image: <Image src="uri" alt="image-1" />,
            title: 'Welcome to the CookBook',
            subtitle: 'Your assistant for delicious recipes!',
          },
          {
            backgroundColor: '#fdba74',
            image: <Image src="uri" alt="image-2" />,
            title: 'Discover new recipes',
            subtitle: 'Browse a variety of recipes tailored to your taste!',
          },
          {
            backgroundColor: '#fdba74',
            image: <Image src="uri" alt="image-3" />,
            title: 'With CookBook you can easily manage your recipes',
            subtitle: 'Add, edit, and delete your favorite recipes on the go!',
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
