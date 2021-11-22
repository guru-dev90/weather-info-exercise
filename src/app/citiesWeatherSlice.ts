import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OW_APIKEY, OW_BASEURL } from "../data/config";

export interface ICitiesWeatherStateEntry {
  id: string;
  name: string;
  weatherDescription: string | null;
  weatherIcon: string | null;
  errorFlag: boolean;
}

export const getWeatherInfoAsync = createAsyncThunk(
  "weatherInfo/getAsync",
  async (args: { id: string; name: string }) => {
    const { id, name } = args;

    try {
      const resp = await fetch(
        `${OW_BASEURL}/weather?q=${name}&appid=${OW_APIKEY}`
      );
      if (resp.ok) {
        const weatherInfo = await resp.json();
        return { id, name, weatherInfo };
      }
    } catch (error: any) {
      return { id: id, name: name, weatherInfo: null };
    }
  }
);

export const updateWeatherInfoAsync = createAsyncThunk(
  "weatherInfo/updateAsync",
  async (args: { id: string; name: string }) => {
    const { id, name } = args;

    try {
      const resp = await fetch(
        `${OW_BASEURL}/weather?q=${name}&appid=${OW_APIKEY}`
      );
      if (resp.ok) {
        const weatherInfo = await resp.json();
        return { id, weatherInfo };
      }
    } catch (error: any) {
      return { id: id, weatherInfo: null };
    }
  }
);

export const citiesWeatherSlice = createSlice({
  name: "citiesWeather",
  initialState: [],
  reducers: {
    deleteCity: (state: ICitiesWeatherStateEntry[], action) => {
      const modifiedState = state.filter(
        (city) => city.id !== action.payload.id
      );
      state.splice(0, state.length, ...modifiedState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getWeatherInfoAsync.fulfilled,
      (state: ICitiesWeatherStateEntry[], action) => {
        const cityWeatherInfoEntry: ICitiesWeatherStateEntry = {
          id: action.payload ? action.payload.id : "",
          name: action.payload?.name ? action.payload.name : "", //<---------------
          weatherDescription: action.payload?.weatherInfo
            ? action.payload?.weatherInfo.weather[0].description
            : null,
          weatherIcon: action.payload?.weatherInfo
            ? action.payload?.weatherInfo.weather[0].icon
            : null,
          errorFlag: action.payload?.weatherInfo ? false : true,
        };

        state.push(cityWeatherInfoEntry);
      }
    );
    builder.addCase(
      updateWeatherInfoAsync.fulfilled,
      (state: ICitiesWeatherStateEntry[], action) => {
        const index = state.findIndex(
          (cityWeatherInfoEntry) =>
            cityWeatherInfoEntry.id === action.payload?.id
        );

        if (action.payload?.weatherInfo) {
          state[index].weatherIcon =
            action.payload?.weatherInfo.weather[0].icon;
          state[index].weatherDescription =
            action.payload?.weatherInfo.weather[0].description;
          state[index].errorFlag = false;
        } else {
          state[index].errorFlag = true;
          state[index].weatherDescription = null;
          state[index].weatherIcon = null;
        }
      }
    );
  },
});

export const { deleteCity } = citiesWeatherSlice.actions;

export default citiesWeatherSlice.reducer;
