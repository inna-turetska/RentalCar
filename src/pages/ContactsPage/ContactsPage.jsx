import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsloading } from "../../redux/contacts/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function ContactPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsloading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
