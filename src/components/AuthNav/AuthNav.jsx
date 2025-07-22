import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";
import clsx from "clsx";

export default function AuthNav() {
  const getLinkStyle = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };
  return (
    <div className={styles.list}>
      <NavLink className={getLinkStyle} to="/register">
        Register
      </NavLink>
      <NavLink className={getLinkStyle} to="/login">
        Log in
      </NavLink>
    </div>
  );
}
