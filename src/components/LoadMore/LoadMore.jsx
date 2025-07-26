import css from "./LoadMore.module.css";
import Button from "../Button/Button.jsx";
export default function LoadMoreBtn({ onClick }) {
  return (
    <Button className={css.buttonLoad} onClick={onClick}>
      Load More
    </Button>
  );
}
