const Joi = require('joi')
const validations = require('../validations')
const { UnprocessableEntity } = require('rest-api-errors')

module.exports = () => {
  return (req, res, next) => {
    const pathRequest = req.originalUrl
    const methodRequest = req.method.toLowerCase()

    const schemaValidation = validations.getSchema(pathRequest, methodRequest)

    if (schemaValidation) {
      Joi.validate(req.body, schemaValidation, (err) => {
        if (err) {
          throw new UnprocessableEntity(null, err.details[0].message)
        }
      })
    }

    return next()
  }
}
