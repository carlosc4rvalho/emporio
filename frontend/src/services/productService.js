import axios from 'axios';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/products/`;

// Função para criar um novo produto
export const createProduct = async (productData, imageFiles) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('promotional_price', productData.promotional_price);
    formData.append('quantity', productData.quantity);
    formData.append('subcategory_ids', productData.subcategory_ids);

    // Adiciona as imagens ao FormData
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('files', imageFiles[i]);
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
};

// Função para obter todos os produtos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter produtos: ${error.message}`);
  }
};

// Função para obter um produto por ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter produto: ${error.message}`);
  }
};

// Função para atualizar um produto
export const updateProduct = async (id, productData, imageFiles) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('promotional_price', productData.promotional_price);
    formData.append('quantity', productData.quantity);
    formData.append('subcategory_ids', productData.subcategory_ids);
    formData.append('is_active', productData.is_active);

    // Adiciona as imagens ao FormData
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }
    }

    const response = await axios.put(`${API_URL}${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }
};

// Função para deletar um produto
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error.message}`);
  }
};
