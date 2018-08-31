const express = require('express');
const paginate = require('express-paginate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = function(app) {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'pug');
  app.use(paginate.middleware(10, 50));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
};
