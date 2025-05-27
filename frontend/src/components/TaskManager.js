import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Para hacer las solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Para redirigir al login si no hay token
import '../styles/styleForm.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegación

  // useEffect para obtener las tareas cuando se carga el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtenemos el token del localStorage
        if (!token) {
          navigate('/login'); // Si no hay token, redirigir al login
          return;
        }

        // Realizamos la solicitud GET a la API para obtener las tareas
        const response = await axios.get('http://localhost:3000/tareas', {
          headers: {
            Authorization: `Bearer ${token}`, // Pasamos el token en el header
          },
        });

        // Almacenamos las tareas en el estado
        setTasks(response.data);
      } catch (error) {
        // Si ocurre un error, lo mostramos en el estado
        console.error('Error al obtener tareas:', error);
        setError('Error al obtener tareas.'); // Mostramos un mensaje de error
      }
    };

    fetchTasks(); // Llamamos a la función para obtener las tareas cuando el componente se monte
  }, [navigate]);

  // Función para manejar la eliminación de una tarea
  const handleDelete = async (taskId) => {
    console.log("Eliminando tarea con ID:", taskId);
    try {
      const token = localStorage.getItem('token'); // Obtenemos el token del localStorage
      if (!token) {
        navigate('/login'); // Si no hay token, redirigir al login
        return;
      }

      // Realizamos la solicitud DELETE a la API para eliminar la tarea
      await axios.delete(`http://localhost:3000/tareas/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pasamos el token en el header
        },
      });

      // Eliminamos la tarea del estado para actualizar la interfaz
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      setError('Error al eliminar la tarea.');
    }
  };

  // Función para redirigir al formulario de crear tarea
  const handleSubmit = () => {
    navigate('/tareas'); // Redirige a la página  tarea
  };

  return (
    <div>
      <h2>Mis Tareas</h2>
      {/* Botón para crear una nueva tarea */}
      <button onClick={() => navigate('/create-task')}>Crear Tarea</button>

      {/* Si hay un error, mostrarlo */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Si hay tareas, las mostramos */}
      {tasks.length > 0 ? (
        <table className="center">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.titulo}</td> {/* Mostrar el título de la tarea */}
                <td>{task.descripcion}</td> {/* Mostrar la descripción de la tarea */}
                <td>{task.estado}</td> {/* Mostrar el estado de la tarea */}
                <td>{new Date(task.fechavencimiento).toLocaleDateString()}</td> {/* Mostrar la fecha de vencimiento */}
                
                <td>
                <button onClick={() => handleDelete(task.id)}>Eliminar</button>                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes tareas pendientes.</p> // Si no hay tareas, mostrar este mensaje
      )}
    </div>
  );
};

export default TaskManager;