import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";
import { isToday } from "date-fns";

const MY_KEY = "@MYFOOD:Key";
const MY_TODAY_FOOD_KEY = "@MYTODAYFOOD:Key";
export default function useFoodStorage() {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(storageKey);
      if (currentSaveFood) {
        const currentSaveFoodParse = JSON.parse(currentSaveFood);
        currentSaveFoodParse.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveFoodParse)
        );
        return Promise.resolve();
      } else {
        await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
        return Promise.resolve();
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ name, calories, portion }: Meal) => {
    try {
      const result = saveInfoToStorage(MY_KEY, { name, calories, portion });
      return Promise.resolve(result);
    } catch (error) {
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

  const handleSaveTodayFood = async ({ name, calories, portion }: Meal) => {
    try {
      const result = saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        name,
        calories,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodatFood = async () => {
    try {
      const food = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      return food
        ? Promise.resolve(
            JSON.parse(food).filter(
              (meal: Meal) => meal.date && isToday(meal.date)
            )
          )
        : [];
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async (index: number) => {
    try {
      const todayFood = await handleGetTodatFood();
      const filteredItem = todayFood?.filter(
        (item: Meal, itemIndex: number) => {
          return itemIndex !== index;
        }
      );
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredItem)
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodatFood,
    onDeleteTodatFood: handleRemoveTodayFood,
  };
}
