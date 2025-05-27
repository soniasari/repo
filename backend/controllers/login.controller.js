const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Método para iniciar sesión
exports.loginUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscar al usuario por el email
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ message: 'El correo electrónico no existe.' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token JWT
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al intentar iniciar sesión.' });
  }
};