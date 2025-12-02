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
        tabBarActiveTintColor: '#FF9900',
        tabBarInactiveTintColor: isDark ? '#999999' : '#7A7A7A',
        tabBarStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          borderTopColor: isDark ? '#2A2A2A' : '#E4E4E4',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#1A1A1A',
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
              color={focused ? '#FF9900' : color}
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
              color={focused ? '#FF9900' : color}
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
              color={focused ? '#FF9900' : color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
