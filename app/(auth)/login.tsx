import LoginForm, { LoginFormData } from '@/components/LoginForm/LoginForm';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

const LoginScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      password: '',
      email: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuthStore();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data.email, data.password);
    router.push('/(tabs)');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LoginForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
