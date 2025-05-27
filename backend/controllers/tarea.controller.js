const { Tarea } = require('../models');
exports.obtenerTareas = async (req, res) => {
 const tareas = await Tarea.findAll();
 res.json(tareas);
};
exports.crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, fechavencimiento } = req.body; // Obtener datos del cuerpo de la solicitud

  if (!titulo || !fechavencimiento ) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  try {
    // Crear una nueva tarea y asociarla con el usuario autenticado (req.user.id)
    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      estado,
      fechavencimiento,
      userId: req.user.id, // Asociamos la tarea con el usuario autenticado
    });

    res.status(201).json(nuevaTarea); // Enviar la nueva tarea como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error });
  }
};
exports.actualizarTarea = async (req, res) => {
    const atarea = await Tarea.findByPk(req.params.id); //
   if (!atarea) return res.status(404).json({ error: "Tarea no encontrada" }); // Si no existe, envía error
   await atarea.update(req.body);
   res.json(atarea); 
   };
   exports.eliminarTarea = async (req, res) => {
    const { id } = req.params;  // El id de la tarea que se obtiene de la URL

    // Verificar que id sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID de tarea no válido' });
    }

    try {
        // Buscar la tarea en la base de datos usando el id y el userId
        const tarea = await Tarea.findOne({
            where: { id: parseInt(id), userId: req.user.id },
        });

        // Si no se encuentra la tarea, devolver un error
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Eliminar la tarea
        await tarea.destroy();

        // Enviar mensaje de éxito
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar la tarea' });
    }
};
exports.obtenerTareaId = async (req, res) => {
    const otarea = await Tarea.findByPk(req.params.id); // Busca una tarea por su ID
    otarea ? res.json(otarea) : res.status(404).json({ error: "Tarea no encontrada" }); // Devuelve error si no existe
    };

    exports.obtenerTareasPorEstado = async (req, res) => {
      const { estado } = req.query; // Recibe el estado como parámetro de la consulta
      const userId = req.user.id; // Obtiene el id del usuario desde el JWT
    
      try {
        // Buscar las tareas del usuario filtrando por estado
        const tareas = await Tarea.findAll({
          where: { 
            userId, 
            estado 
          }
        });
    
        // Si no se encuentran tareas, enviar un mensaje
        if (tareas.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron tareas con ese estado' });
        }
    
        // Responder con las tareas encontradas
        res.json(tareas);
      } catch (error) {
        console.error('Error al obtener las tareas por estado:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las tareas' });
      }
    };
