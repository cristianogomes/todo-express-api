const { Task } = require('../models')

module.exports = {
  async list (req, res) {
    const tasks = await Task.findAll({
      where: {
        id_user: req.user.id
      },
      limit: 50
    })

    return res.send(tasks)
  },

  async get (req, res) {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        id_user: req.user.id
      }
    })

    return res.send(task)
  },

  async post (req, res) {
    req.body.id_user = req.user.id
    const task = await Task.create(req.body)

    return res.send(task)
  },

  async put (req, res) {
    const countUpdate = await Task.update(req.body, {
      where: {
        id: req.params.id,
        id_user: req.user.id
      }
    })

    return res.send(countUpdate)
  },

  async delete (req, res) {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        id_user: req.user.id
      }
    })

    await task.destroy()

    return res.send(task)
  }
}
