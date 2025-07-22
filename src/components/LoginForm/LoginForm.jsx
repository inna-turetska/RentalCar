import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import styles from "./LoginForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
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
          Log in
        </button>
      </Form>
    </Formik>
  );
}
