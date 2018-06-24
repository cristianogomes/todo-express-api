const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const { sequelize } = require('./models');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

require('./routes')(app);

sequelize.sync(/*{force: true}*/)
  .then(() => {
    app.listen(config.port);
    console.log(`Servidor iniciado na porta ${config.port}`);
  })