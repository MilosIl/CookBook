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
import { ChevronDownIcon } from 'lucide-react-native';
import { View } from 'react-native';

type RecipeType = 'all' | 'breakfast' | 'lunch' | 'dinner';

interface RecipeTypeSelectProps {
  selectedType: RecipeType;
  onTypeChange: (type: RecipeType) => void;
}

const RecipeTypeSelect = ({
  selectedType,
  onTypeChange,
}: RecipeTypeSelectProps) => {
  return (
    <View className="flex-1">
      <Select
        selectedValue={selectedType}
        onValueChange={(value) => onTypeChange(value as RecipeType)}
        className="w-fit"
      >
        <SelectTrigger size="md" className="w-full">
          <SelectInput
            placeholder="Select recipe type"
            className="capitalize"
          />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="All Recipes" value="all" />
            <SelectItem label="Breakfast" value="breakfast" />
            <SelectItem label="Lunch" value="lunch" />
            <SelectItem label="Dinner" value="dinner" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};

export default RecipeTypeSelect;
