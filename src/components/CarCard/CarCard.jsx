import { Link } from "react-router-dom";
import css from "./CarCard.module.css";
import Button from "../Button/Button.jsx";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function CarCard({ car }) {
  // Відокремлюємо частину адреси без міста для відображення
  const shortAddress = car.address.split(", ").slice(1).join(", ");
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
        <FavoriteButton className={css.favoriteButton} carId={car.id} />
      </div>
      <div className={css.info}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <h3 className={css.price}>${car.rentalPrice}</h3>
        </div>
        <p className={css.details}>
          {shortAddress} | {car.rentalCompany} | {car.type} |{" "}
          {car.mileage.toLocaleString()} km
        </p>
        <Link to={`/catalog/${car.id}`}>
          <Button className={`${css.button} ${css.buttonFullWidth}`}>
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
}
