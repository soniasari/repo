import axios from 'axios';

// URL de tu backend
const API_URL = 'http://localhost:3000/';  // Asegúrate de cambiar la URL a la correcta

// Función para hacer login
export const login = async (correo, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { correo, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Guardamos el token JWT en localStorage
    }
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.response.data.message);
  }
};

// Función para hacer registro
export const register = async (correo, password) => {
  try {
    const response = await axios.post(`${API_URL}usuario`, { correo, password});
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar usuario: ' + error.response.data.message);
  }
};