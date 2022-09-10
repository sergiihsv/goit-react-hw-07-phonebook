import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { Container, TitlePhoneBook, TitleContacts } from './AppStyled';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../redux/filter';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from 'redux/contacts';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const dispatch = useDispatch();
  const filterContact = useSelector(state => state.filter.value);
 
  const {
    data: contacts,
    error,
    isFetching,
  } = useGetAllContactsQuery();
  const [createContact, isSuccess] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const showContacts = contacts && !isFetching;
  const errorMessage = 'Sorry , no data found.';

 const contactAntiDuplicator = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contactName => normalizedName === contactName.name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    if (contactAntiDuplicator(name)) {
      toast.error(`${name} is already in contacts`);
      return;
    } else {
      createContact({ name, number });
      if (isSuccess) {
        toast.success(`${name} successfully adding in the phone book`);
      }
    }
  };

  const onFilter = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };




  
  
    /* const onFilter = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };

    const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const filterContactsNew = contacts.filter(data =>
    data.name.toLowerCase().includes(filter.toLowerCase())
  );  */

  /*   const onformSubmit = ({ id, name, number }) => {
    const contact = { id, name, number };
    dispatch(saveContact(contact));
  };

  const onFilter = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const filterContactsNew = contacts.filter(data =>
    data.name.toLowerCase().includes(filter.toLowerCase())
  ); */

  return (
    <Container>
      <TitlePhoneBook>Phonebook</TitlePhoneBook>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <TitleContacts>Contacts</TitleContacts>
      <ContactFilter filterValue={filterContact} onChange={onFilter} />
     {/*  <ContactList
        contacts={contacts}
        filter={filter}
        onDelete={onDelete}
        filterContacts={filterContactsNew}
      /> */}
    </Container>
  );
};
