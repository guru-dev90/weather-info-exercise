import React from "react";
import PlaceEntry from "./PlaceEntry";
import "../styles/PlaceList.css";
import { useAppSelector } from "../app/hooks";
import { ICitiesWeatherStateEntry } from "../app/citiesWeatherSlice";

function PlaceList() {
  const citiesWeatherList = useAppSelector<ICitiesWeatherStateEntry[]>(
    (state) => state.citiesWeatherList
  );
  return (
    <div className="main-container">
      <div className="entry-container">
        {citiesWeatherList.map((city) => {
          return (
            <PlaceEntry key={city.id} placeName={city.name} placeId={city.id} />
          );
        })}
      </div>
    </div>
  );
}

export default PlaceList;
