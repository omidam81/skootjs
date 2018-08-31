const express = require('express');
const app = express();

require('./startup/utiles')(app);
require('./startup/db')();
require('./startup/routes')(app);

module.exports = app;
