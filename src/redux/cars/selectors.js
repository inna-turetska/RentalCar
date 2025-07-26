export const selectCars = (state) => state.cars.items;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectIsError = (state) => state.cars.isError;
export const selectCurrentCar = (state) => state.cars.currentCar;
export const selectTotalItems = (state) => state.cars.totalItems;
export const selectPage = (state) => state.cars.page;
export const selectPerPage = (state) => state.cars.limit;
export const selectFavorites = (state) => state.cars.favorites;
