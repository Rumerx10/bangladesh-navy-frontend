import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./filterTypes";

const initialState: IInitialState = {
  sortBy: "",
};

const filteringSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.sortBy = "";
    },
  },
});

export const { setSortBy, clearFilters } = filteringSlice.actions;
export default filteringSlice.reducer;
