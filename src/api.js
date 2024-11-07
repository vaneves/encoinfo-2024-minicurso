const express = require('express')
const api = express()
const TaskController = require('./controllers/task-controller')

api.use(express.json())

api.get('/hello', (req, res) => {
  res.send('hello, world!')
})

api.get('/tasks', TaskController.index)
api.post('/tasks', TaskController.store)

api.listen(3000, () => {
  console.log('Executando em localhost:3000')
})