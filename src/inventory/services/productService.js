import http from '../../shared/services/http.js';

const API_URL = 'http://localhost:5104/api/v1/inventory';

export const getProducts = () => http.get('/inventory');
export const addProduct = (product) => http.post('/inventory', product);