import styles from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import {
  changeNameFilter,
  changeNumberFilter,
} from "../../redux/filters/slice";

function SearchBox() {
  const dispatch = useDispatch();

  const onSearchName = (value) => {
    dispatch(changeNameFilter(value));
  };

  const onSearchNumber = (value) => {
    dispatch(changeNumberFilter(value));
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>Search contacts</p>
      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder="Search by name"
          type="text"
          name="text"
          onChange={(e) => onSearchName(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Search by number"
          type="text"
          name="number"
          onChange={(e) => onSearchNumber(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBox;
