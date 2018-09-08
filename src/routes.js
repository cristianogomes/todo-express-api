const TaskController = require('./controller/TaskController')
const AuthController = require('./controller/AuthController')
const Auth = require('./middleware/Auth')()
const AsyncHandler = require('./middleware/AsyncHandler')
const JoiValidator = require('./middleware/JoiValidator')

module.exports = (app) => {
  app.use('/api/task', Auth.authenticate())
  app.use(JoiValidator())

  app.get('/api/task', AsyncHandler(TaskController.list))
  app.get('/api/task/:id', AsyncHandler(TaskController.get))
  app.post('/api/task', AsyncHandler(TaskController.post))
  app.put('/api/task/:id', AsyncHandler(TaskController.put))
  app.delete('/api/task/:id', AsyncHandler(TaskController.delete))

  app.post('/api/register', AsyncHandler(AuthController.register))
  app.post('/api/login', AsyncHandler(AuthController.login))
}
