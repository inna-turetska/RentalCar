import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import styles from "./Contact.module.css";

function Contact({ contact }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleUpdate = () => {
    if (!contact.id) {
      return;
    }
    const updatedContact = {
      name,
      number,
    };
    dispatch(
      updateContact({ contactId: contact.id, contactData: updatedContact })
    );

    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <p className={styles.p}>
          <svg
            className={styles.icon}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 332.64 64.58 C 313.18 43.57 286 32 256 32 c -30.16 0 -57.43 11.5 -76.8 32.38 c -19.58 21.11 -29.12 49.8 -26.88 80.78 C 156.76 206.28 203.27 256 256 256 s 99.16 -49.71 103.67 -110.82 c 2.27 -30.7 -7.33 -59.33 -27.03 -80.6 Z M 432 480 H 80 a 31 31 0 0 1 -24.2 -11.13 c -6.5 -7.77 -9.12 -18.38 -7.18 -29.11 C 57.06 392.94 83.4 353.61 124.8 326 c 36.78 -24.51 83.37 -38 131.2 -38 s 94.42 13.5 131.2 38 c 41.4 27.6 67.74 66.93 76.18 113.75 c 1.94 10.73 -0.68 21.34 -7.18 29.11 A 31 31 0 0 1 432 480 Z"></path>
          </svg>
          {isEditing ? (
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{contact.name}</span>
          )}
        </p>
        <p className={styles.p}>
          <svg
            className={styles.icon}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 164.9 24.6 c -7.7 -18.6 -28 -28.5 -47.4 -23.2 l -88 24 C 12.1 30.2 0 46 0 64 C 0 311.4 200.6 512 448 512 c 18 0 33.8 -12.1 38.6 -29.5 l 24 -88 c 5.3 -19.4 -4.6 -39.7 -23.2 -47.4 l -96 -40 c -16.3 -6.8 -35.2 -2.1 -46.3 11.6 L 304.7 368 C 234.3 334.7 177.3 277.7 144 207.3 L 193.3 167 c 13.7 -11.2 18.4 -30 11.6 -46.3 l -40 -96 Z"></path>
          </svg>
          {isEditing ? (
            <input
              className={styles.input}
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          ) : (
            <span>{contact.number}</span>
          )}
        </p>
      </div>
      <div className={styles.buttonGroup}>
        {isEditing ? (
          <button className={styles.button} onClick={handleUpdate}>
            Save
          </button>
        ) : (
          <button className={styles.button} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Contact;
