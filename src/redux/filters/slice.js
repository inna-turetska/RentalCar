import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    number: "",
  },
  reducers: {
    changeNameFilter: (state, action) => {
      state.name = action.payload;
    },
    changeNumberFilter: (state, action) => {
      state.number = action.payload;
    },
  },
});
export const { changeNameFilter, changeNumberFilter } = slice.actions;
export default slice.reducer;
