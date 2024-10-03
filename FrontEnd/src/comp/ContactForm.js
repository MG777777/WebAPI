import axios from 'axios';
import React, { useState } from 'react';

function ContactForm({ fetchContacts }) {
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhonenumber(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phonenumber.trim()) {
      alert("Ange ett giltigt telefonnummer.");
      return;
    }
    try {
      const response = await axios.post('https://kontaktapp.azurewebsites.net/api/Contacts', {
        name,
        phonenumber
      });
      fetchContacts();
      setName('');
      setPhonenumber('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
    <div className="mx-auto w-full max-w-[550px]">
      <h1 className="subpixel-antialiased text-3xl font-bold underline mb-5">Kontaktformulär</h1>
      {(
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">Namn:</label>
            <input className="w-full rounded-md border border-[#0a0909] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#b31af4] focus:shadow-md" type="text" placeholder="namn och efternamn" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3 block text-base font-medium text-[#07074D]">
            <label>Telefonnummer:</label>
            <input className="w-full rounded-md border border-[#0a0909] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#b31af4] focus:shadow-md" type="text" placeholder="07XXXXXXXX" value={phonenumber} onChange={handlePhoneNumberChange} required />
          </div>
          <button type="submit" className="hover:shadow-form rounded-md bg-[#5155d2] py-3 px-8 text-base font-semibold text-white outline-none mb-5">Skapa ny kontakt</button>
        </form>
      )}
    </div>
    </div>
  );
}

export default ContactForm;
