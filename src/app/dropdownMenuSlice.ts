import { createSlice } from "@reduxjs/toolkit";

export interface IDropdownMenuStateEntry {
  label: string;
  value: string;
}

export const dropdownMenuSlice = createSlice({
  name: "dropdownMenu",
  initialState: [],
  reducers: {
    addMenuItems: (state: IDropdownMenuStateEntry[], action) => {
      state.splice(0, state.length, action.payload.menuItems);
    },
  },
});

export const { addMenuItems } = dropdownMenuSlice.actions;

export default dropdownMenuSlice.reducer;
