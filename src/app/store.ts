import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import citiesWeatherListReducer from "./citiesWeatherSlice";
import dropdownMenuReducer from "./dropdownMenuSlice";

export const store = configureStore({
  reducer: {
    citiesWeatherList: citiesWeatherListReducer,
    dropdownMenuItems: dropdownMenuReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
