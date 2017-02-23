var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/service/:service/', function(req, res, next) {
  var path = './data/' + req.param('service') + '.json';
  var a = require(path);
  res.json(a);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(3000, function () {
  console.log('Flight Service api listening on port 3000!')
});

module.exports = app;
