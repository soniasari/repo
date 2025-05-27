import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styleForm.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/tareas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setError('Error al obtener tareas.');
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleDelete = async (taskId) => {
    console.log("Eliminando tarea con ID:", taskId);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`http://localhost:3000/tareas/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      setError('Error al eliminar la tarea.');
    }
  };

  return (
    <div>
      <h2>Mis Tareas</h2>

      <button onClick={() => navigate('/create-task')}>Crear Tarea</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length > 0 ? (
        <table className="center">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.titulo}</td>
                <td>{task.descripcion}</td>
                <td>{new Date(task.fechavencimiento).toLocaleDateString()}</td>
                <td>{task.estado}</td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes tareas pendientes.</p>
      )}
    </div>
  );
};

export default TaskManager;
