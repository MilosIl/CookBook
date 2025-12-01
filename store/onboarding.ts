import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
};

type OnboardingActions = {
  completeOnboarding: () => void;
  checkOnboardingStatus: () => Promise<void>;
};

type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      isLoading: true,

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true, isLoading: false });
      },

      checkOnboardingStatus: async () => {
        try {
          const value = await AsyncStorage.getItem('onboarding');
          if (value !== null) {
            const parsed = JSON.parse(value);
            set({
              hasCompletedOnboarding: parsed.state.hasCompletedOnboarding,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'onboarding',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardingStore;
