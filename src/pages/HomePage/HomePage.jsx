import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import css from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.text}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.content}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button
          className={clsx(css.button, css.fullWidth)}
          onClick={() => navigate("/catalog")}
        >
          View Catalog
        </Button>
      </div>
    </div>
  );
}
