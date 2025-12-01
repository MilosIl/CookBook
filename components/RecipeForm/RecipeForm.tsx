import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { VStack } from '@/components/ui/vstack';
import { ChevronDownIcon } from 'lucide-react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '../ui/checkbox';
import { CheckIcon } from '../ui/icon';

export type RecipeFormData = {
  name: string;
  description: string;
  image: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  vegan: boolean;
  ingredients: string;
  preparation: string;
};

type RecipeFormProps = {
  control: Control<RecipeFormData>;
  errors: FieldErrors<RecipeFormData>;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

const RecipeForm = ({
  control,
  errors,
  onSubmit,
  isSubmitting,
}: RecipeFormProps) => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="mx-auto mt-6 pb-10 w-11/12">
        <VStack space="lg">
          <FormControl size="md" isInvalid={!!errors.name}>
            <FormControlLabel>
              <FormControlLabelText>Recipe Name</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="my-1" size="md">
                  <InputField
                    type="text"
                    placeholder="Enter recipe name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-green-100"
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
                {errors.name?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md" isInvalid={!!errors.description}>
            <FormControlLabel>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea className="my-1" size="md">
                  <TextareaInput
                    placeholder="Brief description of your recipe"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-green-100"
                  />
                </Textarea>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
                className="text-red-500"
              />
              <FormControlErrorText className="text-red-500">
                {errors.description?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md" isInvalid={!!errors.image}>
            <FormControlLabel>
              <FormControlLabelText>Image URL</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="my-1" size="md">
                  <InputField
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-green-100"
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
                {errors.image?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md" isInvalid={!!errors.type}>
            <FormControlLabel>
              <FormControlLabelText>Recipe Type</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger variant="outline" size="md" className="my-1">
                    <SelectInput
                      placeholder="Select type"
                      className="bg-green-100"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Breakfast" value="breakfast" />
                      <SelectItem label="Lunch" value="lunch" />
                      <SelectItem label="Dinner" value="dinner" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
                className="text-red-500"
              />
              <FormControlErrorText className="text-red-500">
                {errors.type?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md">
            <Controller
              control={control}
              name="vegan"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size="md"
                  isChecked={value}
                  onChange={onChange}
                  aria-label="Vegan"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>This recipe is vegan</CheckboxLabel>
                </Checkbox>
              )}
            />
          </FormControl>

          <FormControl size="md" isInvalid={!!errors.ingredients}>
            <FormControlLabel>
              <FormControlLabelText>Ingredients</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="ingredients"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea className="my-1 h-32" size="md">
                  <TextareaInput
                    placeholder="Enter each ingredient on a new line"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-green-100"
                    multiline
                    numberOfLines={6}
                  />
                </Textarea>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
                className="text-red-500"
              />
              <FormControlErrorText className="text-red-500">
                {errors.ingredients?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl size="md" isInvalid={!!errors.preparation}>
            <FormControlLabel>
              <FormControlLabelText>Preparation Steps</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="preparation"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea className="my-1 h-40" size="md">
                  <TextareaInput
                    placeholder="Describe the preparation steps"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-green-100"
                    multiline
                    numberOfLines={8}
                  />
                </Textarea>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
                className="text-red-500"
              />
              <FormControlErrorText className="text-red-500">
                {errors.preparation?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            className="self-center bg-orange-500 mt-4 w-full"
            size="lg"
            onPress={onSubmit}
            isDisabled={isSubmitting}
          >
            <ButtonText>
              {isSubmitting ? 'Creating...' : 'Create Recipe'}
            </ButtonText>
          </Button>
        </VStack>
      </View>
    </ScrollView>
  );
};

export default RecipeForm;
