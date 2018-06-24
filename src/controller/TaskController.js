const { Task } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        limit: 10
      })

      res.send(tasks);
    } catch (err) {
      res.status(500).send({
        erro: err,
        mensagem: 'Erro ao listar'
      })
    }
  },

  async post(req, res) {
    try {
      const task = await Task.create(req.body);
      res.send(task);
    } catch (err) {
      res.status(500).send({
        erro: err,
        mensagem: 'Erro ao salvar'
      })
    }
  },

  async put(req, res) {
    try {
      const task = await Task.update(req.body, {
        where: {
          id: req.params.id
        }
      });

      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        erro: err,
        mensagem: 'Erro ao atualizar'
      });
    }
  },

  async delete(req, res) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id
        }
      });

      await task.destroy();

      res.send(task);
    } catch (err) {
      res.status(500).send({
        erro: err,
        mensagem: 'Erro ao remover'
      });
    }
  }
}