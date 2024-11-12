import React from 'react';

function Form({ fields, onSubmit, message }) {
  // Função para renderizar cada tipo de campo
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <select
              id={field.id}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {field.options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map(renderField)}
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cadastrar
      </button>
      {message && (
        <p className={`mt-4 text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default React.memo(Form);