import ThemedInput from '@/components/ThemedInput';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuthStore } from '@/store/auth';
import { useTheme, useThemeStore } from '@/store/theme';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Moon, Sun, User, X } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Modal, Pressable, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: 'Phone number must contain only numbers (10-15 digits)',
    }),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

const SettingsScreen = () => {
  const router = useRouter();
  const { dbUser, updateDbUser, logout } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isDark } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileData>({
    defaultValues: {
      firstName: dbUser?.first_name || '',
      lastName: dbUser?.last_name || '',
      phoneNumber: dbUser?.phoneNumber || '',
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit: SubmitHandler<UpdateProfileData> = async (data) => {
    try {
      await updateDbUser(data.firstName, data.lastName, data.phoneNumber);
      setIsModalOpen(false);
      reset(data);
      Alert.alert('Success', 'Your profile has been updated successfully!', [
        { text: 'OK' },
      ]);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.', [
        { text: 'OK' },
      ]);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const handleEditProfile = () => {
    reset({
      firstName: dbUser?.first_name || '',
      lastName: dbUser?.last_name || '',
      phoneNumber: dbUser?.phoneNumber || '',
    });
    setIsModalOpen(true);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}
    >
      <View className="flex-1 p-6">
        <Heading
          size="2xl"
          className={`${isDark ? 'text-typography-white' : 'text-typography-black'} mb-8`}
        >
          Settings
        </Heading>

        <VStack space="2xl">
          <View
            className={`${isDark ? 'bg-background-800' : 'bg-primary-50'} rounded-xl p-6`}
          >
            <HStack className="justify-between items-center mb-4">
              <HStack className="items-center gap-3">
                <View className="justify-center items-center bg-primary-500 rounded-full w-12 h-12">
                  <User size={24} color="white" />
                </View>
                <VStack>
                  <Text
                    className={`font-bold ${isDark ? 'text-typography-white' : 'text-typography-black'} text-lg`}
                  >
                    {dbUser?.first_name} {dbUser?.last_name}
                  </Text>
                  <Text
                    className={`${isDark ? 'text-typography-400' : 'text-typography-600'} text-sm`}
                  >
                    {dbUser?.email}
                  </Text>
                  <Text
                    className={`${isDark ? 'text-typography-400' : 'text-typography-600'} text-sm`}
                  >
                    {dbUser?.phoneNumber || 'No phone number provided'}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
            <Pressable
              onPress={handleEditProfile}
              className="items-center bg-primary-500 active:bg-primary-600 mt-2 py-3 rounded-lg"
            >
              <Text className="font-semibold text-white">Edit Profile</Text>
            </Pressable>
          </View>

          <View
            className={`${isDark ? 'bg-background-800' : 'bg-backgroundAlt'} rounded-xl p-6`}
          >
            <HStack className="justify-between items-center">
              <HStack className="items-center gap-3">
                {isDark ? (
                  <Moon size={24} color="#f97316" />
                ) : (
                  <Sun size={24} color="#374151" />
                )}
                <VStack>
                  <Text
                    className={`font-semibold ${isDark ? 'text-typography-white' : 'text-typography-black'} text-base`}
                  >
                    Dark Mode
                  </Text>
                  <Text
                    className={` ${isDark ? 'text-typography-400' : 'text-typography-600'} text-sm`}
                  >
                    Toggle dark theme
                  </Text>
                </VStack>
              </HStack>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D1D5DB', true: '#F97316' }}
                thumbColor={isDark ? '#ffffff' : '#ffffff'}
              />
            </HStack>
          </View>

          <Pressable
            onPress={handleLogout}
            className="items-center bg-secondary-500 active:bg-secondary-600 mt-4 py-4 rounded-lg"
          >
            <Text className="font-bold text-white text-lg">Logout</Text>
          </Pressable>
        </VStack>

        <Modal
          visible={isModalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View
              className={`${isDark ? 'bg-background-800' : 'bg-background-light'} rounded-2xl w-11/12 p-6`}
            >
              <HStack className="justify-between items-center mb-4">
                <Heading
                  size="lg"
                  className={
                    isDark ? 'text-typography-white' : 'text-typography-black'
                  }
                >
                  Edit Profile
                </Heading>
                <Pressable onPress={() => setIsModalOpen(false)}>
                  <X size={24} color={isDark ? '#ffffff' : '#374151'} />
                </Pressable>
              </HStack>

              <VStack space="lg" className="mb-6">
                <View>
                  <Text
                    className={`font-medium ${isDark ? 'text-typography-300' : 'text-typography-700'} mb-2`}
                  >
                    First Name
                  </Text>
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ThemedInput
                        placeholder="Enter first name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        variant="underlined"
                        className={errors.firstName ? 'border-error-500' : ''}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <Text className="mt-1 text-error-500 text-sm">
                      {errors.firstName.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text
                    className={`font-medium ${isDark ? 'text-typography-300' : 'text-typography-700'} mb-2`}
                  >
                    Last Name
                  </Text>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ThemedInput
                        placeholder="Enter last name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        variant="underlined"
                        className={errors.lastName ? 'border-error-500' : ''}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <Text className="mt-1 text-error-500 text-sm">
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
                <View>
                  <Text
                    className={`font-medium ${isDark ? 'text-typography-300' : 'text-typography-700'} mb-2`}
                  >
                    Phone Number
                  </Text>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ThemedInput
                        placeholder="Enter phone number"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        variant="underlined"
                        className={errors.phoneNumber ? 'border-error-500' : ''}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <Text className="mt-1 text-error-500 text-sm">
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>
              </VStack>

              <HStack space="md" className="w-full">
                <Pressable
                  onPress={() => setIsModalOpen(false)}
                  className={`flex-1 py-3 border ${isDark ? 'border-typography-600 active:bg-background-800' : 'border-typography-300 active:bg-backgroundAlt'} rounded-lg items-center`}
                >
                  <Text
                    className={`${isDark ? 'text-typography-300' : 'text-typography-700'} font-semibold`}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="flex-1 items-center bg-primary-500 active:bg-primary-600 py-3 rounded-lg"
                >
                  <Text className="font-semibold text-white">Save</Text>
                </Pressable>
              </HStack>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
