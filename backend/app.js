const express = require('express');
const app = express();
const cors = require("cors");
const tareaRoutes = require('./routes/tarea.routes');
const usuarioRoutes = require('./routes/usuario.routes');
app.use(cors()); // Habilita CORS
app.use(express.json());
app.use('/', tareaRoutes);
app.use('/', usuarioRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
