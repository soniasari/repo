import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager'; // Asegúrate de tener el path correcto
import PrivateRoute from './components/PrivateRoute'; // Un componente que protege la ruta de las tareas
import TaskCreate from './components/TaskCreate';
const App = () => {
  return (
    <div>
      <h1>Bienvenido al Administrador de Tareas</h1>
      <Routes>  {/* Utilizamos Routes para definir las rutas */}
        <Route path="/" element={<Login />} />  {/* Ruta de Login */}
        <Route path="/register" element={<Register />} />  {/* Ruta de Registro */}
        <Route
          path="/tareas"
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          }
          />
       <Route path="/create-task" element={<TaskCreate />} />
      </Routes>
    </div>
  );
};

export default App;
