import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";

const MY_KEY = "@MYFOOD:Key";
export default function useFoodStorage() {
  const handleSaveFood = async ({ name, calories, portion }: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(MY_KEY);
      if (currentSaveFood) {
        const currentSaveFoodParse = JSON.parse(currentSaveFood);
        currentSaveFoodParse.push({
          name,
          calories,
          portion,
        });

        await AsyncStorage.setItem(
          MY_KEY,
          JSON.stringify(currentSaveFoodParse)
        );
        return Promise.resolve();
      } else {
        await AsyncStorage.setItem(
          MY_KEY,
          JSON.stringify([
            {
              name,
              calories,
              portion,
            },
          ])
        );
        return Promise.resolve();
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleGetFood = async () => {
    try {
      const food = await AsyncStorage.getItem(MY_KEY);
      return food ? Promise.resolve(JSON.parse(food)) : [];
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
  };
}
