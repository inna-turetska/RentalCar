import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectIsError,
  selectIsLoading,
  selectCurrentCar,
} from "../../redux/cars/selectors.js";
import { fetchCarById } from "../../redux/cars/operations.js";

import CarDetails from "../../components/CarDetails/CarDetails.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";

import Loader from "../../components/Loading/Loading.jsx";
import { toast, ToastContainer } from "react-toastify";

import css from "./AutoDetailsPage.module.css";

export default function AutoDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Вибираємо з Redux потрібні стани
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  // Запит авто по id при монтуванні або зміні id
  useEffect(() => {
    if (!id) return;
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  // Показ повідомлення про помилку за допомогою toast
  useEffect(() => {
    if (isError) {
      toast.error("Error loading cars. Please try again.");
    }
  }, [isError]);

  // Показ лоадера під час завантаження
  if (isLoading) return <Loader />;

  // Показ повідомлення про помилку, якщо авто не знайдено
  if (isError || !car) return <p>Car not found</p>;

  return (
    <div className={css.container}>
      <div className={css.left}>
        <img
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
        <BookingForm car={car} />
      </div>
      <CarDetails car={car} />
    </div>
  );
}
