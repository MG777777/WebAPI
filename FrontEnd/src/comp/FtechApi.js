import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import axios from 'axios';

function FtechApi() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPhonenumber, setEditedPhonenumber] = useState(''); 
  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://kontaktapp.azurewebsites.net/api/Contacts');
      setContacts(response.data);A
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }  
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://kontaktapp.azurewebsites.net/api/Contacts/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setEditedName(contact.name);
    setEditedPhonenumber(contact.phonenumber);
  };
  const handleSubmitEdit = async () => {
    try {
        
      await axios.put(`https://kontaktapp.azurewebsites.net/api/Contacts/${editingContact.id}`, 
      {
        id: editingContact.id,
        Name: editedName,
        Phonenumber: editedPhonenumber
      });
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };
  const handleCancelEdit = () => {
    setEditingContact(null);
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mb-5 bg-white rounded p-3 shadow-2xl border-solid border-2 border-purple-400">
        <ContactForm fetchContacts={fetchContacts} />
        <h1 className="subpixel-antialiased text-3xl font-bold underline mt-5 mb-5">Kontaktlista</h1>
        {loading ? (
          <p>Läser in...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : contacts.length === 0 ? (
          <p>Anslutning med API etablerad men inga kontakter hittades, Skapa en ny kontakt.</p>
        ) : (
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-[#fac354] text-gray-600 border border-gray-300 hidden lg:table-cell">Namn</th>
                <th className="p-3 font-bold uppercase bg-[#fac354] text-gray-600 border border-gray-300 hidden lg:table-cell">Telefonnummer</th>
                <th className="p-3 font-bold uppercase bg-[#fac354] text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="bg-white lg:hover:bg-[#fac354] flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    {editingContact === contact ? (
                      <input className="w-full rounded-md border border-[#0a0909] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#b31af4] focus:shadow-md" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    {editingContact === contact ? (
                      <input className="w-full rounded-md border border-[#0a0909] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#b31af4] focus:shadow-md" type="number" value={editedPhonenumber} onChange={(e) => setEditedPhonenumber(e.target.value)} />
                    ) : (
                      <label className="ml-5">{(
                      contact.phonenumber)}
                      </label>)}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    {editingContact === contact ? (
                      <>
                        <button className="hover:shadow-form rounded-md bg-[#29b234] py-2 px-2 text-base font-semibold text-white outline-none mr-1 ml-5" onClick={handleSubmitEdit}>Spara</button>
                        <button className="hover:shadow-form rounded-md bg-[#e2283e] py-2 px-2 text-base font-semibold text-white outline-none" onClick={handleCancelEdit}>Avbryta</button>
                      </>
                    ) : (
                      <>
                      <button className="hover:shadow-form rounded-md bg-[#29b234] py-2 px-2 text-base font-semibold text-white outline-none mr-1 ml-5" onClick={() => handleEdit(contact)}>Redigera</button>
                        <button className="hover:shadow-form rounded-md bg-[#e2283e] py-2 px-2 text-base font-semibold text-white outline-none" onClick={() => handleDelete(contact.id)}>Ta bort</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FtechApi;
