const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config/config')
const { sequelize } = require('./models')
const auth = require('./middleware/Auth')()
const ErrorHandler = require('./middleware/ErrorHandler')

const app = express()

var whitelist = [ 'http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3000' ]
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(auth.initialize())

require('./routes')(app)

app.use(ErrorHandler())

sequelize.sync(/* {force: true} */).then(() => {
  app.listen(config.port)
  console.log(`Servidor iniciado na porta ${config.port}`)
})
