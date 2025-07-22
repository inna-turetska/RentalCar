import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./HomePage.module.css";
import DescriptionApp from "../../components/DescriptionApp/DescriptionApp";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <PageTitle>Contacts App</PageTitle>
      <DescriptionApp />
    </div>
  );
}
