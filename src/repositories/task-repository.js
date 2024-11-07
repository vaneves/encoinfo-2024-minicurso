const db = require('../database/db')

class TaskRepository
{
  static all = async () => {
    const tasks = db.prepare('SELECT * FROM tasks').all()
    return tasks
  }

  static save = async (name, done) => {
    const stament = db.prepare('INSERT INTO tasks (name, done) VALUES (?, ?)')
    const result = stament.run([ name, done ])

    return {
      id: result.lastInsertRowid,
      name: name,
      done: done
    }
  }
}

module.exports = TaskRepository