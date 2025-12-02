import ThemedInput from '@/components/ThemedInput';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { Link } from 'expo-router';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { Box } from '../ui/box';
import { Divider } from '../ui/divider';
import { Text } from '../ui/text';

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupFormProps = {
  control: Control<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  onSubmit: () => void;
};

const SignupForm = ({ control, errors, onSubmit }: SignupFormProps) => {
  return (
    <View className="mx-auto mt-10 w-4/5">
      <VStack>
        <FormControl size="md" isInvalid={!!errors.firstName}>
          <FormControlLabel>
            <FormControlLabelText className="text-typography-black">
              First Name
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                placeholder="First name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                className="my-1"
              />
            )}
          />
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errors.firstName?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl size="md" isInvalid={!!errors.lastName}>
          <FormControlLabel>
            <FormControlLabelText className="text-typography-black">
              Last Name
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                placeholder="Last name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                className="my-1"
              />
            )}
          />
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errors.lastName?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl size="md" isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText className="text-typography-black">
              Email
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                className="my-1"
              />
            )}
          />
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errors.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl size="md" isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText className="text-typography-black">
              Password
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                isPassword
                className="my-1"
              />
            )}
          />
          <FormControlHelper>
            <FormControlHelperText>
              {errors.password?.message}
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errors.password?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl size="md" isInvalid={!!errors.confirmPassword}>
          <FormControlLabel>
            <FormControlLabelText className="text-typography-black">
              Confirm Password
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                isPassword
                className="my-1"
              />
            )}
          />
          <FormControlHelper>
            <FormControlHelperText>
              {errors.confirmPassword?.message}
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-error-500"
            />
            <FormControlErrorText className="text-error-500">
              {errors.confirmPassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          className="self-center bg-primary-500 mt-4 min-w-[1/2]"
          size="md"
          variant="outline"
          onPress={onSubmit}
        >
          <ButtonText className="font-medium text-black uppercase">
            Sign Up
          </ButtonText>
        </Button>
      </VStack>
      <Divider className="bg-primary-500 my-10" />
      <VStack className="items-center gap-4">
        <Box>
          <Text className="text-typography-700">Already have an account?</Text>
        </Box>
        <Button variant="outline">
          <Link href="/(auth)/login">
            <Text className="text-typography-700">Login</Text>
          </Link>
        </Button>
      </VStack>
    </View>
  );
};

export default SignupForm;
