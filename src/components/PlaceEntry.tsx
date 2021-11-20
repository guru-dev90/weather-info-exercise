import React from "react";
import { faRedoAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import "../styles/PlaceEntry.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteCity,
  ICitiesWeatherStateEntry,
  updateWeatherInfoAsync,
} from "../app/citiesWeatherSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addMenuItems } from "../app/dropdownMenuSlice";

interface IPlaceEntryProps {
  placeName: string;
  placeId: string;
}

function PlaceEntry({ placeName, placeId }: IPlaceEntryProps) {
  const dispatch = useAppDispatch();
  const menuItems = useAppSelector((state) => state.dropdownMenuItems)[0];
  const weatherInfo: ICitiesWeatherStateEntry = useAppSelector(
    (state) => state.citiesWeatherList
  )[0];

  console.log(weatherInfo);

  const handleRefreshClick = () => {
    dispatch(updateWeatherInfoAsync({ name: placeName, id: placeId }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteCity({ id: placeId }));
    dispatch(
      addMenuItems({
        menuItems: [{ label: placeName, value: placeId }, ...menuItems],
      })
    );
  };

  return (
    <div className="place-entry">
      <div className="place-name cell">{placeName}</div>
      <div className="place-weather cell">{weatherInfo.weatherDescription}</div>
      <div className="place-controls-container">
        <div className="refresh">
          <FontAwesomeIcon icon={faRedoAlt} onClick={handleRefreshClick} />
        </div>
        <div className="remove">
          <FontAwesomeIcon icon={faTimes} onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
}

export default PlaceEntry;
