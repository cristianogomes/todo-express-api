const Joi = require('joi')
const pathToRegexp = require('path-to-regexp')

const validateTask = Joi.object().keys({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(255).required(),
  finished: Joi.boolean().required()
})

const schemas = {
  '/task': {
    'post': validateTask
  },

  '/task/:id': {
    'put': validateTask
  }
}

module.exports = {
  getSchema (path, method) {
    const key = Object.keys(schemas).filter(key => {
      return pathToRegexp(key).test(path)
    })

    if (key) {
      return schemas[key] && schemas[key][method]
    }
  }
}
