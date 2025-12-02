import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

type ThemeState = {
  theme: Theme;
};

type ThemeActions = {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },

      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useResolvedTheme = () => {
  const { theme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  if (theme === 'system') {
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  }

  return theme;
};
