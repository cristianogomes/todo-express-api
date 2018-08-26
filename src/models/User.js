const bcrypt = require('bcrypt')

const hashPassword = (user, options) => {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)

  user.setDataValue('password', hash)

  return hash
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Esse email já está sendo utilizado'
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  // User.associate = (models) => {
  //   models.User.hasMany(models.Task)
  // }

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password

    return values
  }

  return User
}
