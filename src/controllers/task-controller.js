const { response } = require('express')
const TaskRepository = require('../repositories/task-repository')

class TaskController
{
  static index = async (request, response) => {
    const tasks = await TaskRepository.all()
    response.json(tasks)
  }

  static store = async (request, response) => {
    const name = request.body.name 
    const done = request.body.done

    if (name == '') {
      return response.status(400).json({ message: 'name obrigatório' })
    }
    if (done != 0 && done != 1) {
      return response.status(404).json({ message: 'done obrigatório com 0 ou 1' })
    }

    const task = await TaskRepository.save(name, done)
    response.status(201).json(task)
  }
}

module.exports = TaskController