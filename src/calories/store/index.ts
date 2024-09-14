import { configureStore, type Middleware } from "@reduxjs/toolkit";
import mealsSlice from "../slice/slice";
import todayMealsSlice from "../../todayMeals/slice/slice";

const persistanceAsyncStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    const state = store.getState();
    localStorage.setItem(
      process.env.EXPO_PUBLIC_FOOD_KEY as string,
      JSON.stringify(state.meals)
    );
    localStorage.setItem(
      process.env.EXPO_PUBLIC_FOOD_TODAY_KEY as string,
      JSON.stringify(state.todayMeals)
    );
  };

export const store = configureStore({
  reducer: {
    meals: mealsSlice,
    todayMeals: todayMealsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceAsyncStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
