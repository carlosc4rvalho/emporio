import React, { useState, useEffect } from 'react';
import Form from 'components/Form';
import { createCategory, getAllCategories, deleteCategory } from 'services/categoryService';

function CategorySection() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const storeId = 1;

  const handleCreate = async (formEvent) => {
    formEvent.preventDefault();
    const categoryData = { name, store_id: storeId };
    try {
      await createCategory(categoryData);
      alert('Categoria cadastrada com sucesso!');
      fetchCategories();
      setName('');  // Limpar campo de input
      setIsFormVisible(false);  // Voltar para a lista de categorias
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      alert('Categoria deletada com sucesso!');
      fetchCategories();
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleBackClick = () => {
    setIsFormVisible(false);
  };

  // Dados para o componente Form
  const formFields = [
    {
      id: 'name',
      label: 'Nome da Categoria',
      type: 'text',
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!isFormVisible ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Categorias</h1>
          <p className="mt-6 text-gray-600 text-center px-4">
            Categorias bem definidas ajudam a organizar e destacar seus produtos,
            tornando a navegação mais fácil para os clientes e melhorando a gestão do estoque.
          </p>
          
          <button
            onClick={handleAddClick}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            + Adicionar Nova Categoria
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <div
                key={category.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <button
            onClick={handleBackClick}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Voltar
          </button>
          <Form
            fields={formFields}
            onSubmit={handleCreate}
            message=""
          />
        </div>
      )}
    </div>
  );
}

export default CategorySection;