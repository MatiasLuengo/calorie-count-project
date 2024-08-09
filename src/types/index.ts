import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParams = {
  Home: undefined;
  AddFood: undefined;
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParams,
  "AddFood"
>;

export type AddFoodModalProps = {
  onClose: (shouldRefresh?: boolean) => void;
  visible: boolean;
};

export type Meal = {
  name: string;
  calories: string;
  portion: string;
};
