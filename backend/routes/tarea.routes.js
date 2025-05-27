const express = require('express');
const router = express.Router();
const { Tarea } = require('../models');
const { obtenerTareas, crearTarea, eliminarTarea, obtenerTareasPorEstado, editarTarea} = require('../controllers/tarea.controller');
const autenticacion = require('../middleware/autenticacion');
//router.get('/tareas', autenticacion, obtenerTareas);
router.post('/tareas', autenticacion,crearTarea);
//router.put('/tareas/:id', autenticacion, editarTarea);
router.delete('/tareas/:id', autenticacion, eliminarTarea);
router.get('/tareas/estado', autenticacion, obtenerTareasPorEstado);
// Obtener las tareas del usuario autenticado
router.get('/tareas', autenticacion, async (req, res) => {
    try {
      const tareitas = await Tarea.findAll({
        where: { userId: req.user.id },  // Asegúrate de que el userId se reciba desde el JWT
        attributes: ['id','titulo', 'descripcion', 'estado', 'fechavencimiento'] 
      });
      res.json(tareitas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tareas', error });
    }
  });
  


  // Controlador para editar tarea
  exports.editarTarea = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la tarea desde los parámetros
    const { titulo, descripcion, estado, fechavencimiento } = req.body; // Obtener los datos de la tarea desde el body
  
    try {
      // Buscar la tarea por ID y asegurarse de que pertenece al usuario autenticado
      const etarea = await Tarea.findOne({
        where: { id, userId: req.user.id }
      });
  
      // Si no se encuentra la tarea, devolver un error
      if (!etarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      // Verificar las reglas para cambiar el estado de la tarea
      if (etarea.estado === 'Completa') {
        return res.status(400).json({ error: 'No se puede modificar una tarea completada' });
      }
  
      // Regla: Solo se puede cambiar a "en progreso" si el estado actual es "pendiente"
      if (estado === 'en Progreso' && tarea.estado !== 'Pendiente') {
        return res.status(400).json({ error: 'Solo se puede marcar como "en progreso" si está en "pendiente"' });
      }
  
      // Regla: No se puede volver a "pendiente" desde "en progreso" o "completada"
      if (estado === 'Pendiente' && (tarea.estado === 'en Progreso' || tarea.estado === 'Completa')) {
        return res.status(400).json({ error: 'No se puede volver a "pendiente" desde "en progreso" o "completada"' });
      }
  
      // Actualizar los campos de la tarea
      etarea.titulo = titulo || tarea.titulo;
      etarea.descripcion = descripcion || tarea.descripcion;
      etarea.estado = estado || tarea.estado;
      etarea.fechavencimiento = fechavencimiento || tarea.fechavencimiento;
  
      // Guardar los cambios en la base de datos
      await etarea.save();
  
      // Enviar la tarea actualizada como respuesta
      res.json(etarea);
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      res.status(500).json({ error: 'Hubo un error al editar la tarea' });
    }
  };

  module.exports = router;
