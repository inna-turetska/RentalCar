import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/cars/slice";
import { selectFavorites } from "../../redux/cars/selectors";
import css from "./FavoriteButton.module.css";

export default function FavoriteButton({ carId, className = "" }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(carId);

  const handleClick = () => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <button
      className={`${css.button} ${className}`}
      onClick={handleClick}
      aria-label="Toggle favorite"
    >
      <svg className={css.icon} width="16" height="16">
        <use
          href={`/svg/sprite.svg#${
            isFavorite ? "icon-heart-filled" : "icon-heart"
          }`}
        />
      </svg>
    </button>
  );
}
