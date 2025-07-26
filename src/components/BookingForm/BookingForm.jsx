import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datapicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../Button/Button.jsx";
import css from "./BookingForm.module.css";

export default function BookingForm({ car }) {
  registerLocale("en-GB", enGB);
  // Початкові значення форми
  const initialValues = {
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  };

  // Сьогоднішня дата без часу — для обмеження вибору дати
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Схема валідації через Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Please indicate the booking date"),
  });

  // Обробник сабміту форми
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setTimeout(() => {
      toast.success(
        `Thank you, ${values.name}! You are successfully booking ${car.brand} ${
          car.model
        } on date ${values.bookingDate.toLocaleDateString()}.`
      );
      resetForm();
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={css.form}>
            <Field
              className={css.input}
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="off"
            />
            <ErrorMessage name="name" component="div" className={css.error} />

            <Field
              className={css.input}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <DatePicker
              selected={values.bookingDate}
              onChange={(date) => setFieldValue("bookingDate", date)}
              placeholderText="Booking date"
              minDate={today}
              dateFormat="yyyy-MM-dd"
              className={css.input}
              name="bookingDate"
              autoComplete="off"
              popperPlacement="bottom-start"
              locale="en-GB"
              formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3).toUpperCase()}
            />

            <ErrorMessage
              name="bookingDate"
              component="div"
              className={css.error}
            />

            <Field
              className={css.input}
              name="comment"
              as="textarea"
              placeholder="Comment"
              rows="6"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${css.button} ${css.buttonSubmit}`}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
