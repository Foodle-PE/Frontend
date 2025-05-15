import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/products';

export const getProducts = () => axios.get(API_URL);

export const addProduct = (product) => axios.post(API_URL, product);

export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
