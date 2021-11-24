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
    dummyDropdownMenuSlice: (state: IDropdownMenuStateEntry[], action) => {
      //usefull to update the session storage with the last inserted object
    },
  },
});

/* MIDDLEWARE */
export const persistMenuItemsMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const menuItemsSliceState = store.getState().dropdownMenuItems;
    sessionStorage.setItem(
      "menuItemsSliceState",
      JSON.stringify(menuItemsSliceState)
    );

    return next(action);
  };
/*            */

export const reHydrateDropdownMenuSlice = () => {
  if (sessionStorage.getItem("menuItemsSliceState") !== null) {
    // @ts-ignore
    const stateStringyfied: string = sessionStorage.getItem(
      "menuItemsSliceState"
    );
    return JSON.parse(stateStringyfied); // re-hydrate the store
  }
};

export const { addMenuItems, dummyDropdownMenuSlice } =
  dropdownMenuSlice.actions;

export default dropdownMenuSlice.reducer;
