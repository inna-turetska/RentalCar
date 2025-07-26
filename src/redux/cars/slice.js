import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "../cars/operations";

// Початковий стан слайсу з усіма необхідними полями
const slice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    currentCar: null,
    isLoading: false,
    isError: false,
    page: 1,
    limit: 12,
    totalItems: 0,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    // Встановити поточну сторінку пагінації
    setPage(state, action) {
      state.page = action.payload;
    },
    // Очистити список машин і статуси
    clearCars: (state) => {
      state.items = [];
      state.isLoading = false;
      state.isError = false;
    },
    // Очистити деталі поточної машини
    clearCurrentCar: (state) => {
      state.currentCar = null;
    },
    // Переключити улюблений стан машини, збереження у localStorage
    toggleFavorite(state, action) {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      // Завантаження списку машин
      .addCase(fetchCars.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;

        // Якщо append false — очищаємо список, інакше залишаємо для додавання
        const append = action.meta.arg.append || false;
        if (!append) {
          state.items = [];
        }
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, totalItems, append } = action.payload;

        // Додаємо або замінюємо список машин
        if (append) {
          state.items = [...state.items, ...cars];
        } else {
          state.items = cars;
        }

        state.totalItems = totalItems;
        state.isLoading = false;
      })

      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Завантаження деталей однієї машини
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.currentCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCarById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearCars, clearCurrentCar, setPage, toggleFavorite } =
  slice.actions;
export default slice.reducer;
