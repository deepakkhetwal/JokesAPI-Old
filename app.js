var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var jokes = require('./routes/jokes');
var feedbacks = require('./routes/feedback');
var admnReview = require('./routes/admn/review');
//mongoose.connect('mongodb://localhost/JokesDB');
//mongoose.connect('mongodb://nodejitsu:a9acd5b96ae4a21ddb4955da8774d0aa@troup.mongohq.com:10031/nodejitsudb7904070897'); mongohq
//mongolab below
mongoose.connect('mongodb://jokesapi_app:Remson!123@ds063869.mongolab.com:63869/heroku_app28755319');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
 });
app.options('*', function(req, res) {
    res.send(200);
});
app.get('/jokes', jokes.index);
app.post('/jokes/create', jokes.create);
app.delete('/jokes/delete', jokes.delete);
app.put('/jokes/update', jokes.update);
app.post('/jokes/postlikes', jokes.postLikes); 
app.get('/admn/review', admnReview.index);
app.put('/admn/review/update', admnReview.update);

app.post('/feedbacks/create', feedbacks.create);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
