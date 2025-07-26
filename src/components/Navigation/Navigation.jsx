import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFilters } from "../../redux/filters/slice";
import { setPage } from "../../redux/cars/slice";
import { fetchCars } from "../../redux/cars/operations";
import styles from "./Navigation.module.css";
import clsx from "clsx";
import logo from "../../img/RentalCar.png";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getLinkStyle = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };
  const handleCatalogClick = () => {
    dispatch(clearFilters());
    dispatch(setPage(1));
    dispatch(fetchCars({ page: 1, limit: 12 }));

    // Навигация только если не на catalog
    if (location.pathname !== "/catalog") {
      navigate("/catalog");
    }
  };
  return (
    <nav className={styles.header}>
      <img className={styles.logo} src={logo} alt="Логотип" />
      <ul className={styles.list}>
        <li>
          <NavLink className={getLinkStyle} to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            className={getLinkStyle}
            onClick={handleCatalogClick}
            to="/catalog"
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
