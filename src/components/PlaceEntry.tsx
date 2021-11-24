import React from "react";

import {
  faRedoAlt,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/PlaceEntry.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteCity,
  dummyCitiesWeatherSlice,
  updateWeatherInfoAsync,
} from "../app/citiesWeatherSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addMenuItems,
  dummyDropdownMenuSlice,
  IDropdownMenuStateEntry,
} from "../app/dropdownMenuSlice";

interface IPlaceEntryProps {
  placeId: string;
  placeName: string;
  placeWeather: string | null;
  placeWeatherIcon: string | null;
  errorFlag: boolean;
}

function PlaceEntry({
  placeId,
  placeName,
  placeWeather,
  placeWeatherIcon,
  errorFlag,
}: IPlaceEntryProps) {
  const dispatch = useAppDispatch();
  const menuItems: IDropdownMenuStateEntry[] = useAppSelector(
    (state) => state.dropdownMenuItems
  )[0];

  const handleRefreshClick = () => {
    dispatch(updateWeatherInfoAsync({ id: placeId, name: placeName }));
    const func = () => dispatch(dummyCitiesWeatherSlice({}));
    setTimeout(func, 5000);
  };

  const handleDeleteClick = () => {
    dispatch(deleteCity({ id: placeId }));
    dispatch(
      addMenuItems({
        menuItems: [{ label: placeName, value: placeId }, ...menuItems],
      })
    );

    const func = () => dispatch(dummyDropdownMenuSlice({}));
    setTimeout(func, 5000);
  };

  return (
    <div className="place-entry">
      <div className="place-name cell">{placeName}</div>
      {!errorFlag ? (
        <div className="place-weather-container">
          <div className="place-weather-icon">
            <img
              src={`http://openweathermap.org/img/w/${placeWeatherIcon}.png`}
              alt="weather icon"
            ></img>
          </div>
          <div className="place-weather-description cell">{placeWeather}</div>
        </div>
      ) : (
        <div className="error-container">
          <div className="error-icon cell">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="error-message cell">Unable to load data</div>
        </div>
      )}

      <div className="place-controls-container">
        <div className="refresh">
          <FontAwesomeIcon
            icon={faRedoAlt}
            onClick={handleRefreshClick}
            style={{ color: "6e6e6e", fontSize: "1.1rem" }}
          />
        </div>
        <div className="remove">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleDeleteClick}
            style={{ color: "6e6e6e", fontSize: "1.2rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlaceEntry;
