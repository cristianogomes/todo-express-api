const passport = require('passport')
const passportJwt = require('passport-jwt')
const { User } = require('../models')
const config = require('../config/config')
const ExtractJwt = passportJwt.ExtractJwt
const Strategy = passportJwt.Strategy

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    const user = User.findOne({
      where: {
        email: payload.email
      }
    })

    if (user) {
      return done(null, {id: user.id})
    }

    return done(new Error('User not found'), null)
  })

  passport.use(strategy)

  return {
    initialize () {
      return passport.initialize()
    },

    authenticate () {
      return passport.authenticate('jwt', config.jwtSession)
    }
  }
}
