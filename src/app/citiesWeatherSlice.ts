import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OW_APIKEY, OW_BASEURL } from "../data/config";

export interface ICitiesWeatherStateEntry {
  id: string;
  name: string;
  weatherDescription: string;
}

export const getWeatherInfoAsync = createAsyncThunk(
  "weatherInfo/getAsync",
  async (args: { name: string; id: string }) => {
    const { name, id } = args;
    const resp = await fetch(
      `${OW_BASEURL}/weather?q=${name}&appid=${OW_APIKEY}`
    );
    if (resp.ok) {
      const weatherInfo = await resp.json();
      return { weatherInfo, name };
    }
  }
);

export const updateWeatherInfoAsync = createAsyncThunk(
  "weatherInfo/updateAsync",
  async (args: { name: string; id: string }) => {
    const { name, id } = args;
    const resp = await fetch(
      `${OW_BASEURL}/weather?q=${name}&appid=${OW_APIKEY}`
    );
    if (resp.ok) {
      const weatherInfo = await resp.json();
      return { weatherInfo, id };
    }
  }
);

export const citiesWeatherSlice = createSlice({
  name: "citiesWeather",
  initialState: [],
  reducers: {
    /*addCities: (state: ICitiesWeatherStateEntry[], action) => {
      const city = {
        label: action.payload.name,
        value: action.payload.id,
      };
      state.push(city);
    },*/
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
          id: action.payload?.weatherInfo.id,
          name: action.payload?.name ? action.payload.name : "", //<---------------
          weatherDescription:
            action.payload?.weatherInfo.weather[0].description,
        };
        state.push(cityWeatherInfoEntry);
      }
    );
    builder.addCase(
      updateWeatherInfoAsync.fulfilled,
      (state: ICitiesWeatherStateEntry[], action) => {
        const index = state.findIndex(
          (cityWeatherInfoEntry) =>
            cityWeatherInfoEntry.id === action.payload?.weatherInfo.id
        );
        console.log(state[index].weatherDescription);
        state[index].weatherDescription =
          action.payload?.weatherInfo.weather[0].description;
        console.log(state[index].weatherDescription);
      }
    );
  },
});

export const { deleteCity } = citiesWeatherSlice.actions;

export default citiesWeatherSlice.reducer;
