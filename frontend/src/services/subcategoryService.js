import axios from 'axios';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/subcategories/`;

export const createSubcategory = async (subcategoryData) => {
  try {
    const response = await axios.post(API_URL, subcategoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao criar subcategoria');
  }
};

export const getAllSubcategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar subcategorias');
  }
};

export const getSubcategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar subcategoria');
  }
};

export const updateSubcategory = async (subcategoryData) => {
  try {
    const response = await axios.put(API_URL, subcategoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao atualizar subcategoria');
  }
};

export const deleteSubcategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao deletar subcategoria');
  }
};