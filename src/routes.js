const TaskController = require('./controller/TaskController');

module.exports = (app) => {
  app.get('/', TaskController.index);
  app.post('/', TaskController.post);
  app.put('/:id', TaskController.put);
  app.delete('/:id', TaskController.delete);
}