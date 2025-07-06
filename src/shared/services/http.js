import axios from "axios";
import {authenticationInterceptor} from "../../authorization/services/authentication.interceptor.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API_BASE_URL', API_BASE_URL);

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
});

// Añadir token si ya está guardado en localStorage
const token = localStorage.getItem("token");
if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Add authentication interceptor
http.interceptors.request.use(authenticationInterceptor);

export default http;