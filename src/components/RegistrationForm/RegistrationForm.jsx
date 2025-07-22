import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import styles from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required field"),
  email: Yup.string().email("Invalid email format").required("Required field"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required field"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="off">
        <label className={styles.label}>Username</label>
        <Field className={styles.input} type="text" name="name" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label className={styles.label}>Email </label>
        <Field className={styles.input} type="email" name="email" />
        <ErrorMessage name="email" component="div" className={styles.error} />

        <label className={styles.label}>Password </label>
        <Field className={styles.input} type="password" name="password" />
        <ErrorMessage
          name="password"
          component="div"
          className={styles.error}
        />

        <button className={styles.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
