const TaskController = require('./controller/TaskController')

module.exports = (app) => {
  app.get('/task', TaskController.index)
  app.post('/task', TaskController.post)
  app.put('/task/:id', TaskController.put)
  app.delete('/task/:id', TaskController.delete)
}
