import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

export default function CarList({ cars }) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <li key={car.id} className={css.item}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
