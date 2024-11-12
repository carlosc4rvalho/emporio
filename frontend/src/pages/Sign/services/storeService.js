import axios from 'axios';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/stores`;

export const createStore = async (storeData) => {
    try {
        const response = await axios.post(API_URL, storeData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Erro na conexão com o servidor.');
    }
};