import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectError, selectIsloading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/contacts/slice";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsloading);
 

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className={styles.container}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
