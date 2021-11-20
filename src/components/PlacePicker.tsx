import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useState } from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
} from "react-select";
import citiesFromJson from "../data/cities.json";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getWeatherInfoAsync } from "../app/citiesWeatherSlice";
import { addMenuItems } from "../app/dropdownMenuSlice";

library.add(faSort);

const FaSortIcon = () => {
  return <FontAwesomeIcon icon="sort" />;
};

const DropdownIndicator = (
  props: JSX.IntrinsicAttributes &
    DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaSortIcon />
    </components.DropdownIndicator>
  );
};

function PlacePicker() {
  const [selection, setSelection] = useState<Number>(0); // serve per tornare a valore di default dopo selezione select
  const dispatch = useAppDispatch();

  useEffect(() => {
    const menuItems = citiesFromJson.map((elem) => ({
      label: elem.name,
      value: elem._id,
    }));
    dispatch(addMenuItems({ menuItems }));
  }, []);

  const customSelectStyles = {
    control: (styles: any) => ({
      // controlla stili del box select
      ...styles,
      border: "1px solid #6e6e6e",
      boxShadow: "none",
      width: "52vw",
      height: "50px",
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: "none",
    }),
    placeholder: (styles: any) => ({
      // controlla stili del selettore
      ...styles,
      fontSize: "0.8rem",
      color: "#6e6e6e",
      textAlign: "left",
    }),
    option: (styles: any) => ({
      // controlla stili del menù a tendina
      ...styles,
      fontSize: "0.8rem",
      color: "#383737",
      fontWeight: "bold",
    }),
  };

  const menuItems: any = useAppSelector((state) => state.dropdownMenuItems)[0];

  return (
    <Select
      placeholder={"Add a city.."}
      styles={customSelectStyles}
      components={{ DropdownIndicator }}
      options={menuItems}
      value={selection}
      onChange={(opt: any) => {
        if (opt) {
          setSelection(0);
          dispatch(getWeatherInfoAsync({ name: opt.label, id: opt.value }));

          const updatedMenuItems = menuItems.filter(
            (entry: any) => entry.value !== opt.value
          );
          dispatch(addMenuItems({ menuItems: updatedMenuItems }));
        }
      }}
    />
  );
}

export default PlacePicker;