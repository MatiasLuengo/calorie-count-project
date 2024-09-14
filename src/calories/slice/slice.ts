import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../types";

const DEFAULT_STATE = [
  {
    name: "Espaguetis a la Boloñesa",
    calories: "450",
    portion: "1 plato",
  },
  {
    name: "Ensalada de Pollo a la Parrilla",
    calories: "320",
    portion: "1 tazón",
  },
  {
    name: "Salteado de Verduras",
    calories: "250",
    portion: "1 porción",
  },
  {
    name: "Hamburguesa con Queso",
    calories: "550",
    portion: "1 hamburguesa",
  },
];

const initialState: () => Meal[] = () => {
  const persistedState = localStorage.getItem(
    process.env.EXPO_PUBLIC_FOOD_KEY as string
  );
  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return (
    localStorage.setItem(
      process.env.EXPO_PUBLIC_FOOD_KEY as string,
      JSON.stringify(DEFAULT_STATE)
    ),
    DEFAULT_STATE
  );
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addNewMeal: (state, action: PayloadAction<Meal>) => {
      return [...state, { ...action.payload }];
    },
    searchMeal: (state, action: PayloadAction<string>) => {
      return state.filter((meal) => meal.name.includes(action.payload));
    },
    deleteMeal: (state, action: PayloadAction<number>) => {
      return [
        ...state.filter((_: any, index: number) => index !== action.payload),
      ];
    },
  },
});

export const { addNewMeal, searchMeal, deleteMeal } = mealsSlice.actions;
export default mealsSlice.reducer;
