import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verifica si el token está presente en localStorage

  // Si no hay token, redirige a la página de login
  if (!token) {
    return <Navigate to="/login" />; // Redirige a la página de login si no hay token
  }

  // Si hay token, permite el acceso a la página protegida
  return children; // Muestra las rutas hijas (TaskManager)
};

export default PrivateRoute;