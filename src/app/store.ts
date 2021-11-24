import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import citiesWeatherListReducer, {
  persistCitiesMiddleware,
  reHydrateCitiesWeatherSlice,
} from "./citiesWeatherSlice";
import {
  persistMenuItemsMiddleware,
  reHydrateDropdownMenuSlice,
} from "./dropdownMenuSlice";
import dropdownMenuReducer from "./dropdownMenuSlice";

export const store = configureStore({
  reducer: {
    citiesWeatherList: citiesWeatherListReducer,
    dropdownMenuItems: dropdownMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistCitiesMiddleware,
      persistMenuItemsMiddleware
    ),
  preloadedState: {
    citiesWeatherList: reHydrateCitiesWeatherSlice(),
    dropdownMenuItems: reHydrateDropdownMenuSlice(),
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
