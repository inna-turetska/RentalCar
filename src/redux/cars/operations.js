import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    {
      brand = "",
      rentalPrice = "",
      minMileage = "",
      maxMileage = "",
      page = 1,
      limit = 12,
      append = false,
    } = {},
    thunkAPI
  ) => {
    // Формуємо params для axios запиту, додаємо тільки наявні фільтри
    try {
      const params = { page, limit };

      if (brand?.trim()) params.brand = brand;
      if (rentalPrice?.trim()) params.rentalPrice = rentalPrice;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      // Виконуємо GET запит до API
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );

      // Повертаємо об’єкт із даними та прапорцем append
      return {
        cars: response.data.cars,
        totalItems: response.data.totalCars,
        append,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
  
// деталі однієї машини за її id.
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
