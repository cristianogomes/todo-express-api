const Joi = require('joi')
const validations = require('../validations')

module.exports = () => {
  return (req, res, next) => {
    const pathRequest = req.originalUrl
    const methodRequest = req.method.toLowerCase()

    const schemaValidation = validations.getSchema(pathRequest, methodRequest)

    if (schemaValidation) {
      Joi.validate(req.body, schemaValidation, (err) => {
        if (err) {
          res.status(404).send(err.details)
        } else {
          next()
        }
      })
    } else {
      next()
    }
  }
}
