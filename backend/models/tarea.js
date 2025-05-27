'use strict';
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    fechavencimiento: DataTypes.DATE,
    userId: DataTypes.INTEGER
  });
    Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, { foreignKey: "userId" });
   };
   
  return Tarea;
 };