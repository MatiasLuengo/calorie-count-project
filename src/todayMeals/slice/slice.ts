import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../types";
import { isToday } from "date-fns";

const initialState = () => {
  try {
    const food = localStorage.getItem(
      process.env.EXPO_PUBLIC_FOOD_TODAY_KEY as string
    );
    return food
      ? JSON.parse(food).filter((meal: Meal) => meal.date && isToday(meal.date))
      : [];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const todayMealsSlice = createSlice({
  name: "todayMeals",
  initialState,
  reducers: {
    addNewTodayMeal: (state, action: PayloadAction<Meal>) => {
      return [...state, { ...action.payload }];
    },
    deleteTodayMeal: (state, action: PayloadAction<number>) => {
      return [
        ...state.filter((_: any, index: number) => index !== action.payload),
      ];
    },
  },
});

export const { addNewTodayMeal, deleteTodayMeal } = todayMealsSlice.actions;
export default todayMealsSlice.reducer;
