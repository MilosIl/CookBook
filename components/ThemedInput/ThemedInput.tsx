import { Input, InputField } from '@/components/ui/input';
import { useTheme } from '@/store/theme';
import { ComponentProps } from 'react';

type ThemedInputProps = {
  value: string | undefined;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: 'outline' | 'underlined' | 'rounded';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPassword?: boolean;
  className?: string;
} & Omit<
  ComponentProps<typeof InputField>,
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'className'
  | 'placeholderTextColor'
>;

const ThemedInput = ({
  value,
  onChangeText,
  placeholder = '',
  variant = 'outline',
  size = 'md',
  isPassword = false,
  className = '',
  ...inputFieldProps
}: ThemedInputProps) => {
  const { isDark } = useTheme();

  return (
    <Input
      variant={variant}
      size={size}
      className={`${isDark ? 'border-gray-600' : 'border-gray-300'} ${className}`}
    >
      <InputField
        placeholder={placeholder}
        value={value || ''}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        className={isDark ? 'text-gray-900' : 'text-white'}
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        {...inputFieldProps}
      />
    </Input>
  );
};

export default ThemedInput;

export const CustomInput = ThemedInput;
