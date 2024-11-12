import React, { useState, useEffect } from 'react';
import Form from 'components/Form';
import { createSubcategory, getAllSubcategories, deleteSubcategory } from 'services/subcategoryService.js';
import { getAllSubcategoryGroups } from 'services/subcategoryGroupService.js';
import { getAllCategories } from 'services/categoryService.js';

function SubcategorySection() {
  const [name, setName] = useState('');
  const [subcategoryGroups, setSubcategoryGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Função para criar uma subcategoria
  const handleCreate = async (formEvent) => {
    formEvent.preventDefault();
    if (!selectedGroup || !selectedCategory) {
      alert('Por favor, selecione um grupo de subcategoria e uma categoria.');
      return;
    }
    const subcategoryData = { name, subcategory_group_id: selectedGroup, category_id: selectedCategory };
    try {
      await createSubcategory(subcategoryData);
      alert('Subcategoria cadastrada com sucesso!');
      fetchSubcategories();
      setName('');
      setSelectedGroup('');
      setSelectedCategory('');
      setIsFormVisible(false);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  // Funções para buscar dados
  const fetchSubcategories = async () => {
    try {
      const allSubcategories = await getAllSubcategories();
      setSubcategories(allSubcategories);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const fetchSubcategoryGroups = async () => {
    try {
      const allGroups = await getAllSubcategoryGroups();
      setSubcategoryGroups(allGroups);
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

  // Função para deletar uma subcategoria
  const handleDelete = async (id) => {
    try {
      await deleteSubcategory(id);
      alert('Subcategoria deletada com sucesso!');
      fetchSubcategories();
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchSubcategoryGroups();
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleBackClick = () => {
    setIsFormVisible(false);
  };

  // Campos do formulário
  const formFields = [
    {
      id: 'name',
      label: 'Nome da Subcategoria',
      type: 'text',
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
    {
      id: 'subcategoryGroup',
      label: 'Grupo de Subcategoria',
      type: 'select',
      options: subcategoryGroups.map(group => ({ id: group.id, name: group.name })),
      value: selectedGroup,
      onChange: (e) => setSelectedGroup(e.target.value),
      required: true,
    },
    {
      id: 'category',
      label: 'Categoria',
      type: 'select',
      options: categories.map(cat => ({ id: cat.id, name: cat.name })),
      value: selectedCategory,
      onChange: (e) => setSelectedCategory(e.target.value),
      required: true,
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!isFormVisible ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Subcategorias</h1>
          <button
            onClick={handleAddClick}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            + Adicionar Nova Subcategoria
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.map(subcategory => (
              <div
                key={subcategory.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{subcategory.name}</h2>
                <button
                  onClick={() => handleDelete(subcategory.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-600 text-center px-4">
            As subcategorias ajudam a detalhar ainda mais os grupos e categorias dos seus produtos, facilitando a organização e busca.
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

export default SubcategorySection;
