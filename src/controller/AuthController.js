const jwt = require('jsonwebtoken')
const { Forbidden } = require('rest-api-errors')
const { User } = require('../models')
const config = require('../config/config')

const jwtSignUser = (user) => {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: config.expiresIn
  })
}

module.exports = {
  async register (req, res) {
    const user = await User.create(req.body)
    const userJson = user.toJSON()

    return res.send({
      user: userJson,
      token: jwtSignUser(userJson)
    })
  },

  async login (req, res) {
    const {email, password} = req.body

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user || !(await user.comparePassword(password))) {
      throw new Forbidden(null, 'Incorrect password or username')
    }

    const userJson = user.toJSON()

    return res.send({
      token: jwtSignUser(userJson)
    })
  }
}
