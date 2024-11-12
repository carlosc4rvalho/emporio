import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function UserGreeting() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('Bom dia');

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await axios.get('/api/user');
    //     setUsername(response.data.username);
    //   } catch (error) {
    //     console.error('Erro ao buscar o nome do usuário:', error);
    //   }
    // };

    // fetchUser();

    const currentHour = new Date().getHours();
    if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else if (currentHour >= 18) {
      setGreeting('Boa noite');
    }
  }, []);

  return (
    <div>
      <h1 className='text-4xl font-medium my-4'>
        {greeting}, <span className='text-[#c4ac75]'>Nadir</span>
      </h1>
      <p className='text-gray-700'>
        Bem-vindo ao painel do Empório Maziero. Gerencie sua loja aqui.
      </p>
    </div>
  );
}

export default UserGreeting;