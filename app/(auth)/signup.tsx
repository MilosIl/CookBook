import SignupForm, { SignupFormData } from '@/components/SingupForm/SignupForm';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(1, { message: 'Email is required.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });
  const { signup } = useAuthStore();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignupFormData> = async ({
    email,
    password,
    firstName,
    lastName,
  }) => {
    await signup({
      email,
      password,
      firstName,
      lastName,
    });
    router.push('/(tabs)');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-red-50">
        <SignupForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUpScreen;
