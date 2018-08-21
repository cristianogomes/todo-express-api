const TaskController = require('./controller/TaskController')
const AuthController = require('./controller/AuthController')
const Auth = require('./controller/Auth')()

module.exports = (app) => {
  app.get('/task', Auth.authenticate(), TaskController.index)
  app.post('/task', TaskController.post)
  app.put('/task/:id', TaskController.put)
  app.delete('/task/:id', TaskController.delete)

  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
}
