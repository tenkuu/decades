var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var reactRouter = require('./routes/react')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Locally we will serve that build/ directory here
// When app is deployed, GAE sets that variable to "production"
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, '/client/build')))
}

app.use('/', indexRouter);

// Catch-all for react routes
app.use('/*', reactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // TODO: only log for debugging
  console.log(`[DECADES] Server experienced an error...`)
  console.error(err)

  // send the error back
  res.status(err.status || 500);
  res.send('Something broke!')
});

module.exports = app;
