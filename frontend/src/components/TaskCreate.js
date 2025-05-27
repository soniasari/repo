import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskCreate = () => {
  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Pendiente'); // Estado inicial "Pendiente"
  const [fechavencimiento, setFechavencimiento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado. Inicia sesión para crear una tarea.');
      return;
    }

    // Validación de los campos requeridos
    if (!titulo || !fechavencimiento) {
      setError('El título y la fecha de vencimiento son obligatorios.');
      return;
    }

    // Datos de la tarea a crear
    const taskData = {
      titulo,
      descripcion, // Este campo puede ser vacío
      estado, // Este campo también puede ser vacío (tendrá el valor predeterminado 'Pendiente')
      fechavencimiento
    };

    try {
      // Realizar la solicitud POST para crear la tarea
      const response = await axios.post('http://localhost:3000/tareas', taskData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en los encabezados
        },
      });

      // Si la tarea se crea correctamente, redirigir a la lista de tareas
      if (response.status === 201) {
        navigate('/tareas'); // Cambiar la ruta a '/tasks' después de crear la tarea
      } else {
        setError('Hubo un problema al crear la tarea.');
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);

      // Si la respuesta contiene un mensaje de error, mostramos ese mensaje
      if (error.response) {
        setError(error.response.data.message || 'Error desconocido al crear la tarea.');
      } else if (error.request) {
        setError('Error al comunicarse con el servidor.');
      } else {
        setError('Error desconocido.');
      }
    }
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar errores */}

      <form onSubmit={handleSubmit}>
        {/* Campo para el título */}
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        {/* Campo para la descripción (opcional) */}
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="estado">Estado</label>
          <input
            type ="text"
            id="estado"
            value="Pendiente"
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>

        {/* Campo para la fecha de vencimiento */}
        <div>
          <label htmlFor="fechavencimiento">Fecha de Vencimiento</label>
          <input
            type="date"
            id="fechavencimiento"
            value={fechavencimiento}
            onChange={(e) => setFechavencimiento(e.target.value)}
            required
          />
        </div>

        {/* Campo para el estado (opcional, si no se selecciona, será 'Pendiente') */}
        
        {/* Botón de submit */}
        <button type="submit">Crear Tarea</button> 
        </form>
    </div>
  );
};

export default TaskCreate;