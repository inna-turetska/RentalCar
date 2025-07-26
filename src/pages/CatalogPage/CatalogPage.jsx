import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import CarList from "../../components/CarList/CarList.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import LoadMore from "../../components/LoadMore/LoadMore.jsx";

import {
  selectIsLoading,
  selectIsError,
  selectCars,
  selectPage,
  selectPerPage,
  selectTotalItems,
} from "../../redux/cars/selectors";

import { selectFilters } from "../../redux/filters/selectors";

import { fetchCars } from "../../redux/cars/operations.js";
import { setPage } from "../../redux/cars/slice";
import { clearFilters } from "../../redux/filters/slice.js";

import { toast, ToastContainer } from "react-toastify";

import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();

  // Підписуємося на потрібні дані з Redux store
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalItems = useSelector(selectTotalItems);
  const filters = useSelector(selectFilters);

  // Локальний стан, щоб не показувати помилку "порожньо" одразу на старті
  const [hasSearched, setHasSearched] = useState(false);

  // Початкове завантаження даних + очистка фільтрів
  useEffect(() => {
    dispatch(clearFilters());
    dispatch(setPage(1));
    dispatch(fetchCars({ page: 1, limit: perPage }));
    setHasSearched(true);
  }, [dispatch, perPage]);

  // Обробник відправки фільтрів із компонента Filters
  const handleFilterSubmit = (filters) => {
    setHasSearched(true);
    dispatch(setPage(1));
    dispatch(fetchCars({ ...filters, page: 1, limit: perPage }));
  };

  // Завантаження наступної сторінки (пагінація "Load More")
  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(
      fetchCars({ ...filters, page: nextPage, limit: perPage, append: true })
    );
  };

  // Показуємо тост з помилкою, якщо є проблема із завантаженням
  useEffect(() => {
    if (isError) {
      toast.error("Error loading cars. Please try again.");
    }
  }, [isError]);

  // Якщо немає машин після завантаження та пошуку — повідомляємо користувача
  useEffect(() => {
    if (!isLoading && cars.length === 0 && !isError && hasSearched) {
      toast.error("No cars found matching your criteria");
    }
  }, [cars, isLoading, isError, hasSearched]);

  return (
    <div className={css.container}>
      <Filters onSubmit={handleFilterSubmit} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading cars</p>}

      <CarList cars={cars} />

      {isLoading && page > 1 && <p>Loading more...</p>}

      {!isLoading && cars.length < totalItems && (
        <LoadMore onClick={handleLoadMore} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
