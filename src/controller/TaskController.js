const { Task } = require('../models')

module.exports = {
  async list (req, res) {
    try {
      const tasks = await Task.findAll({
        where: {
          id_user: req.user.id
        },
        limit: 50
      })

      res.send(tasks)
    } catch (err) {
      res.status(500).send({
        mensagem: 'Erro ao listar'
      })
    }
  },

  async get (req, res) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id,
          id_user: req.user.id
        }
      })

      res.send(task)
    } catch (err) {
      res.status(500).send({
        mensagem: 'Erro ao recuperar'
      })
    }
  },

  async post (req, res) {
    try {
      req.body.id_user = req.user.id
      const task = await Task.create(req.body)

      res.send(task)
    } catch (err) {
      res.status(500).send({
        mensagem: 'Erro ao salvar'
      })
    }
  },

  async put (req, res) {
    try {
      const countUpdate = await Task.update(req.body, {
        where: {
          id: req.params.id,
          id_user: req.user.id
        }
      })

      res.send(countUpdate)
    } catch (err) {
      res.status(500).send({
        mensagem: 'Erro ao atualizar'
      })
    }
  },

  async delete (req, res) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id,
          id_user: req.user.id
        }
      })

      await task.destroy()

      res.send(task)
    } catch (err) {
      res.status(500).send({
        mensagem: 'Erro ao remover'
      })
    }
  }
}
