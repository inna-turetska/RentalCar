import styles from "./DescriptionApp.module.css";

export default function DescriptionApp() {
  return (
    <div>
      <p className={styles.description}>
        A simple app to manage your personal contacts. Create an account, save
        contacts, and find them quickly.
      </p>

      <section>
        <h2 className={styles.title}> Authentication</h2>
        <ul>
          <li>User registration</li>
          <li>Login/logout functionality</li>
          <li>Secure access to personal contacts</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.title}> Contact Management</h2>
        <ul>
          <li>Add new contacts (name, phone, email, etc.)</li>
          <li>Edit existing contacts</li>
          <li>Delete contacts</li>
          <li>Save contacts to a database</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.title}> Search</h2>
        <ul>
          <li>Real-time search by name or other fields</li>
          <li>Filter contact list dynamically</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>Developed by Inna Turetska | 2025</p>
      </footer>
    </div>
  );
}
