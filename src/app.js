const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config')
const { sequelize } = require('./models')
const Auth = require('./middleware/Auth')()
const ErrorHandler = require('./middleware/ErrorHandler')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(Auth.initialize())

require('./routes')(app)

app.use(ErrorHandler())

sequelize.sync(/* {force: true} */).then(() => {
  app.listen(config.port)
  console.log(`Servidor iniciado na porta ${config.port}`)
})
