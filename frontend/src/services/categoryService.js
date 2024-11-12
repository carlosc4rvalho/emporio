import axios from 'axios';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/categories/`;

// Função para criar uma nova categoria
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao criar categoria');
  }
};

// Função para buscar todas as categorias
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar categorias');
  }
};

// Função para buscar uma categoria por ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar categoria');
  }
};

// Função para atualizar uma categoria
export const updateCategory = async (categoryData) => {
  try {
    const response = await axios.put(API_URL, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao atualizar categoria');
  }
};

// Função para deletar uma categoria
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao deletar categoria');
  }
};