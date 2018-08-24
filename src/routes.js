const TaskController = require('./controller/TaskController')
const AuthController = require('./controller/AuthController')
const Auth = require('./middleware/Auth')()

module.exports = (app) => {
  app.use('/task', Auth.authenticate())

  app.get('/task', TaskController.list)
  app.get('/task/:id', TaskController.get)
  app.post('/task', TaskController.post)
  app.put('/task/:id', TaskController.put)
  app.delete('/task/:id', TaskController.delete)

  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
}
