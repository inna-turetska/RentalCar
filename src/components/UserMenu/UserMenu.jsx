import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={styles.container}>
      <p className={styles.text}>Welcome, {user.name}</p>
      <button className={styles.button} type="button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
}
