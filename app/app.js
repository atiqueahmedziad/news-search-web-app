'use strict'

var express = require('express');
var cookieParser = require('cookie-parser')
var http = require('http')
var reload = require('reload');
var app = express();

app.set('port', process.env.PORT || 4000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'News Search App';

app.use(express.static('app/public'));
app.use(cookieParser());
app.use(require('./routes/index'));
app.use(require('./routes/search'));
app.use(require('./routes/api'));

var server = http.createServer(app);

reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README

  // Reload started, start web server
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})