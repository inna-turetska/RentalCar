import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required field"),
  number: Yup.string()
    .matches(/^[\d+\s()-]+$/, "Invalid phone number format")
    .required("Required field"),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name.trim(),
      number: values.number.trim(),
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        className={styles.form}
        autoComplete="off"
        className={styles.container}
      >
        <label className={styles.label}>Name</label>
        <Field className={styles.input} type="text" name="name" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label className={styles.label}>Number</label>
        <Field className={styles.input} type="text" name="number" />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
