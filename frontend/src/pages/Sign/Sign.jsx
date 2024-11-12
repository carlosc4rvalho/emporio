import React, { useState } from 'react';
import Form from 'components/Form';
import { createStore } from './services/storeService';

function Sign() {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storeData = {
      name: name,
      cnpj: cnpj
    };

    try {
      await createStore(storeData);
      setMessage('Loja cadastrada com sucesso!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const fields = [
    {
      id: 'name',
      label: 'Nome da Loja',
      type: 'text',
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true
    },
    {
      id: 'cnpj',
      label: 'CNPJ',
      type: 'text',
      value: cnpj,
      onChange: (e) => setCnpj(e.target.value),
      required: true
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastrar Nova Loja</h1>
        <Form 
          fields={fields} 
          onSubmit={handleSubmit} 
          message={message} 
        />
      </div>
    </div>
  );
}

export default Sign;