module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    finished: DataTypes.BOOLEAN
  })

  Task.associate = (models) => {
    models.Task.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        fieldName: 'id_user',
        allowNull: true
      }
    })
  }

  return Task
}
