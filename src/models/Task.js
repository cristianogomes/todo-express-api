module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    concluido: DataTypes.BOOLEAN
  });

  return Task;
} 