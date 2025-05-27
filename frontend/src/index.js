import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18 o superior
import './index.css';  // Si tienes estilos
import App from './App';  // El componente principal de la aplicación
import { BrowserRouter } from 'react-router-dom';  // Importar BrowserRouter de react-router-dom

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>  {/* Asegúrate de envolver todo en BrowserRouter */}
    <App />
  </BrowserRouter>
);