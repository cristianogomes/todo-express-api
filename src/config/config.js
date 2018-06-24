module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'task',
    user: process.env.DB_USER || 'task',
    password: process.env.DB_PASS || 'task',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './task.sqlite',
      operatorsAliases: false
    }
  }
}