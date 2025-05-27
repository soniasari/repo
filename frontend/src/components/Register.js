import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate para la redirección
import { register } from '../services/authService'; // Función para el registro de usuarios

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para la navegación

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);  // Llamada a la función de registro
      navigate('/');  // Redirigir a login después del registro exitoso
    } catch (err) {
      setError('Error al registrar el usuario: ' + err.message);  // Mostrar error si algo falla
    }
  };

  return (
    <div>
      <h2>Registrate</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;