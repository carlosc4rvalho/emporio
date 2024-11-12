import React, { useState, useEffect } from 'react';
import Form from 'components/Form';
import { createSubcategoryGroup, getAllSubcategoryGroups, deleteSubcategoryGroup } from 'services/subcategoryGroupService.js';

function SubcategoryGroupSection() {
  const [name, setName] = useState('');
  const [subcategoryGroups, setSubcategoryGroups] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const storeId = 1;

  const handleCreate = async (formEvent) => {
    formEvent.preventDefault();
    const subcategoryData = { name, store_id: storeId };
    try {
      await createSubcategoryGroup(subcategoryData);
      alert('Grupo de Subcategoria cadastrado com sucesso!');
      fetchSubcategoryGroups();
      setName('');  // Limpar campo de input
      setIsFormVisible(false);  // Voltar para a lista de grupos de subcategorias
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const fetchSubcategoryGroups = async () => {
    try {
      const allSubcategoryGroups = await getAllSubcategoryGroups();
      setSubcategoryGroups(allSubcategoryGroups);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubcategoryGroup(id);
      alert('Grupo de Subcategoria deletado com sucesso!');
      fetchSubcategoryGroups();
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchSubcategoryGroups();
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
      label: 'Nome do Grupo de Subcategoria',
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
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Grupos de Subcategorias</h1>
          <button
            onClick={handleAddClick}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            + Adicionar Novo Grupo de Subcategoria
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategoryGroups.map(group => (
              <div
                key={group.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
                <button
                  onClick={() => handleDelete(group.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-600 text-center px-4">
            Grupos de subcategorias ajudam a organizar seus produtos em categorias mais amplas, 
            facilitando a navegação e a gestão do seu estoque.
          </p>
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

export default SubcategoryGroupSection;