import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations.js";

// Початковий стан слайсу фільтрів
const slice = createSlice({
  name: "filters",
  initialState: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    brands: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    // Оновлення фільтрів — об’єкт з новими значеннями зливаємо в стан
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    // Очистити всі фільтри (крім списку брендів і статусів)
    clearFilters: (state) => {
      state.brand = "";
      state.rentalPrice = "";
      state.minMileage = "";
      state.maxMileage = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setFilters, clearFilters } = slice.actions;
export default slice.reducer;
