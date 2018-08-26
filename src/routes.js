const TaskController = require('./controller/TaskController')
const AuthController = require('./controller/AuthController')
const Auth = require('./middleware/Auth')()
const AsyncHandler = require('./middleware/AsyncHandler')
const JoiValidator = require('./middleware/JoiValidator')

module.exports = (app) => {
  app.use('/task', Auth.authenticate())
  app.use(JoiValidator())

  app.get('/task', AsyncHandler(TaskController.list))
  app.get('/task/:id', AsyncHandler(TaskController.get))
  app.post('/task', AsyncHandler(TaskController.post))
  app.put('/task/:id', AsyncHandler(TaskController.put))
  app.delete('/task/:id', AsyncHandler(TaskController.delete))

  app.post('/register', AsyncHandler(AuthController.register))
  app.post('/login', AsyncHandler(AuthController.login))
}
