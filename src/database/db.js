const Database = require('better-sqlite3')

const connectMemmory = () => {
  return new Database(':memmory:')
}

const connectDatabase = () => {
  return new Database('./banco.db')
}

const db = process.env.test 
    ? connectMemmory() 
    : connectDatabase()

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    done BOOLEAN
  )
`)

module.exports = db