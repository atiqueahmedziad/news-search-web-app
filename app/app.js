'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const reload = require('reload');
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'News Search App';

app.use(express.static('app/public'));
app.use(cookieParser());
app.use(require('./routes/index'));
app.use(require('./routes/search'));
app.use(require('./routes/api'));

const server = http.createServer(app);

reload(app).then(reloadReturned => {
  // reloadReturned is documented in the reload library documentation
  server.listen(app.get('port'), () => {
    console.log('Web server listening on port ' + app.get('port'))
  });
}).catch(error => {
  console.error('Reload could not start, could not start server/sample app', error);
});