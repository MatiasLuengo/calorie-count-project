import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParams = {
  Home: undefined;
  AddFood: undefined;
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParams,
  "AddFood"
>;
