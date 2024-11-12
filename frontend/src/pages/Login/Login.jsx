import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica as credenciais
    if (email === 'emporiomaziero' && password === '10122021') {
      navigate('/admin'); // Redireciona para a rota /admin
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#6D0F59] overflow-hidden">
      <div className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md w-11/12">
        <h2 className="text-2xl font-bold text-center text-[#6D0F59]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuário</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D0F59]"
              placeholder="Digite seu usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D0F59]"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-[#6D0F59] rounded-md hover:opacity-75 focus:outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;