const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware para proteger rutas
const autenticacion = (req, res, next) => {
  const token =  req.headers['authorization']?.split(' ')[1];  // Obtenemos el token desde el encabezado

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Se requiere un token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    req.user = user; // Asignamos el usuario al objeto req para que esté disponible en las rutas
    next();  // Continuamos con la ejecución del siguiente middleware o la ruta
  });
};

module.exports = autenticacion;