import styles from "./PageTitle.module.css";

export default function PageTitle({ children }) {
  return <h1 className={styles.heading}>{children}</h1>;
}
