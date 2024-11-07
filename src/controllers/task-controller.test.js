const TaskController = require('./task-controller')
const TaskRepository = require('../repositories/task-repository')

jest.mock('../repositories/task-repository')

describe('TaskController', () => {
  describe('index', () => {
    test('deve retorna a lista de tarefas', async () => {
      const tasks = [
        {id: 1, name: 'test', done: 0},
      ]

      TaskRepository.all.mockReturnValue(tasks)

      const request = {}
      const response = {
        json: jest.fn()
      }
      await TaskController.index(request, response)
      expect(response.json).toHaveBeenCalledWith(tasks)
    })
  })

  describe('store', () => {
    test('deve inserir uma tarefa', async () => {
      const request = {
        body: {
          name: 'test',
          done: 0
        }
      }
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const taskMock = {
        id: 1,
        name: 'test',
        done: 0
      }
      TaskRepository.save.mockReturnValue(taskMock)
      await TaskController.store(request, response)

      expect(response.status).toHaveBeenCalledWith(201)
      expect(response.json).toHaveBeenCalledWith(taskMock)
    })

    test('deve retornar erro de name obrigatório', async () => {
      const request = {
        body: {
          name: '',
          done: 0
        }
      }
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await TaskController.store(request, response)

      expect(response.status).toHaveBeenCalledWith(400)
      expect(response.json).toHaveBeenCalledWith({ message: 'name obrigatório' })
    })

    test('deve retornar erro de done obrigatório', async () => {
      const request = {
        body: {
          name: 'teste',
          done: null
        }
      }
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await TaskController.store(request, response)

      expect(response.status).toHaveBeenCalledWith(400)
      expect(response.json).toHaveBeenCalledWith({ message: 'done obrigatório com 0 ou 1' })
    })
  })
})