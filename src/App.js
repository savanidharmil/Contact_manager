import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import AddContacts from './components/Contacts/AddContacts/AddContacts';
import ContactList from './components/Contacts/ContactList/ContactList';
import EditContact from './components/Contacts/EditContact/EditContact';
import ViewContact from './components/Contacts/ViewContact/ViewContact';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Navigate to={'/contacts/list'} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContacts /> } />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
    </Routes>
    </>
  );
}

export default App;

