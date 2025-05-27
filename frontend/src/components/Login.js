import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate para la redirección
import { login } from '../services/authService'; // Función que manejará la lógica del login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para la navegación

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);  // Llamada a la función de login
      if (data.token) {
        navigate('/tareas');  // Redirigir a la página principal después de login exitoso
      }
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);  // Mostrar error si algo falla
    }
  };

  return (
    <div>
      <h2>Inicia sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;