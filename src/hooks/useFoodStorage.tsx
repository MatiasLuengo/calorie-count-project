/* import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";
import { isToday } from "date-fns";

const MY_KEY = "@MYFOOD:Key";
const MY_TODAY_FOOD_KEY = "@MYTODAYFOOD:Key";
export default function useFoodStorage() {
  const saveInfoToStorage = (storageKey: string, meal: Meal) => {
    try {
      const currentSaveFood = localStorage.getItem(storageKey);
      if (currentSaveFood) {
        const currentSaveFoodParse = JSON.parse(currentSaveFood);
        currentSaveFoodParse.push(meal);

        localStorage.setItem(storageKey, JSON.stringify(currentSaveFoodParse));
        return Promise.resolve();
      } else {
        localStorage.setItem(storageKey, JSON.stringify([meal]));
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

  const handleGetFood = () => {
    try {
      const food = localStorage.getItem(MY_KEY);
      return food ? JSON.parse(food) : [];
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = ({ name, calories, portion, date }: Meal) => {
    try {
      const result = saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        name,
        calories,
        portion,
        date,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const handleGetTodatFood = () => {
    try {
      const food = localStorage.getItem(MY_TODAY_FOOD_KEY);
      return food
        ? JSON.parse(food).filter(
            (meal: Meal) => meal.date && isToday(meal.date)
          )
        : [];
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleRemoveTodayFood = (index: number) => {
    try {
      const todayFood = handleGetTodatFood();
      const filteredItem = todayFood?.filter(
        (item: Meal, itemIndex: number) => {
          return itemIndex !== index;
        }
      );
      localStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filteredItem));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleDeleteFood = (index: number) => {
    try {
      const food = handleGetFood();
      const filteredItem = food?.filter((item: Meal, itemIndex: number) => {
        return itemIndex !== index;
      });
      localStorage.setItem(MY_KEY, JSON.stringify(filteredItem));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
    onDeleteFood: handleDeleteFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodatFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
}
 */
