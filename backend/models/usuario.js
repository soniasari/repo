'use strict';
'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
  correo: DataTypes.STRING,
  password: DataTypes.STRING
  });
  Usuario.associate = (models) => {
  Usuario.hasMany(models.Tarea, { foreignKey: "userId" });
  };
   // Método para cifrar la contraseña antes de guardar
   Usuario.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  });
  return Usuario;
};
