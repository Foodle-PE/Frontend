import http from '../../shared/services/http.js';

export const getProducts = () => http.get('/inventory');
export const addProduct = (product) => http.post('/inventory', product);