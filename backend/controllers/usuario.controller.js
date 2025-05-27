

const { Usuario, Tarea } = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.obtenerUsuarios = async (req, res) => {
    try {
        // Obtener todos los usuarios con sus tareas asociadas
        const ousuarios = await Usuario.findAll({
          include: [{
            model: Tarea,  // Incluimos el modelo Tarea
            required: false  // Esto asegura que los usuarios sin tareas también se incluyan (LEFT JOIN)
          }]
        });
    
        // Respondemos con los usuarios y sus tareas
        res.json(ousuarios);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios y tareas.' });
      }
    };
exports.crearUsuarios = async (req, res) => {
    const { correo, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { correo } });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
      }
  
      // Crear el nuevo usuario
      const nuevoUsuario = await Usuario.create({ correo, password });
  
      // Generar el token JWT
      const token = jwt.sign({ id: nuevoUsuario.id, correo: nuevoUsuario.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Responder con el token JWT
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al registrar el usuario.' });
    }
  };

  exports.obtenerUsuarioId = async (req, res) => {
    try {
      const usuarioId = req.params.id;
      const usuario = await Usuario.findOne({
        where: { id: usuarioId }, // Filtramos por el ID
        include: [{
          model: Tarea,  // Incluimos el modelo Tarea
          required: false  // Esto asegura que los usuarios sin tareas también se incluyan (LEFT JOIN)
        }]
      });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener el usuario y sus tareas.' });
    }
  };

