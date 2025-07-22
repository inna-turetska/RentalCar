import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getLinkStyle = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <nav className={styles.header}>
      <ul className={styles.list}>
        <li>
          <NavLink className={getLinkStyle} to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink className={getLinkStyle} to="/contacts">
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
