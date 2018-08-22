const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { User } = require('../models')
const config = require('../config/config')

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    const user = await User.findOne({
      where: {
        email: payload.email,
        password: payload.password
      }
    })

    if (user) {
      return done(null, {id: user.id})
    }

    return done(null)
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
