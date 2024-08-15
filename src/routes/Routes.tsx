import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home";
import AddFood from "../views/AddFood";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, title: "Contador de calorías" }}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{ headerShown: false, title: "Contador de calorías" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
