import { useResolvedTheme } from '@/store/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#111827',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? '#f97316' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(recipes)"
        options={{
          title: 'My Recipes',
          tabBarIcon: ({ color, focused }) => (
            <Foundation
              name="book-bookmark"
              size={24}
              color={focused ? '#f97316' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons
              name="settings"
              size={24}
              color={focused ? '#f97316' : color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
