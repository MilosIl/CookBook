import SignupForm, { SignupFormData } from '@/components/SingupForm/SignupForm';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native';
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
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    signup(data.email, data.password, data.firstName, data.lastName);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>SignUpScreen</Text>
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
