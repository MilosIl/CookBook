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
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Link } from 'expo-router';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { Box } from '../ui/box';
import { Divider } from '../ui/divider';
import { Text } from '../ui/text';

export type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: () => void;
};

const LoginForm = ({ control, errors, onSubmit }: LoginFormProps) => {
  return (
    <View className="mx-auto mt-10 w-4/5">
      <VStack>
        <FormControl size="md" isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>email</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input size="md" variant="underlined">
                <InputField
                  type="text"
                  placeholder="email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
            )}
          />

          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500">
              {errors.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl size="md" isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input size="md" variant="underlined">
                <InputField
                  type="password"
                  placeholder="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
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
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500">
              {errors.password?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          className="self-center bg-yellow-400 mt-4 rounded-md min-w-[1/2]"
          size="md"
          variant="solid"
          onPress={onSubmit}
        >
          <ButtonText className="w-fit font-medium uppercase">Login</ButtonText>
        </Button>
      </VStack>
      <Divider className="my-10" />
      <VStack className="items-center gap-4">
        <Box>
          <Text className="text-gray-700">Dont have an account?</Text>
        </Box>
        <Button variant="outline">
          <Link href="/(auth)/signup">
            <Text className="text-gray-700">Sign up</Text>
          </Link>
        </Button>
      </VStack>
    </View>
  );
};

export default LoginForm;
