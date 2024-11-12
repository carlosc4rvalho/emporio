import axios from 'axios';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/subcategory-groups/`;

export const createSubcategoryGroup = async (subcategoryGroupData) => {
  try {
    const response = await axios.post(API_URL, subcategoryGroupData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao criar grupo de subcategorias');
  }
};

export const getAllSubcategoryGroups = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar grupos de subcategorias');
  }
};

export const getSubcategoryGroupById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao buscar grupo de subcategorias');
  }
};

export const updateSubcategoryGroup = async (subcategoryGroupData) => {
  try {
    const response = await axios.put(API_URL, subcategoryGroupData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao atualizar grupo de subcategorias');
  }
};

export const deleteSubcategoryGroup = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao deletar grupo de subcategorias');
  }
};