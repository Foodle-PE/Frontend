import axios from 'axios';

const API_URL = 'http://localhost:5104/api/inventory';

const token = localStorage.getItem('token'); // o como lo guardes
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
export const getProducts = () => axios.get(API_URL, config);


export const addProduct = (product) => axios.post(API_URL, product, config);


export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`, config);