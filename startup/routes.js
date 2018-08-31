const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const jobsRouter = require('../routes/job');
const siteMapRouter = require('../routes/site-map.js');
const createError = require('http-errors');

module.exports = function(app) {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/', jobsRouter);
  app.use('/view-jobs/', siteMapRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  console.error('!');
};
