const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var contentType = require('content-type')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit:'1mb'})); 
//app.use(express.json({limit: '1mb'}));
/*var getRawBody = require('raw-body')

app.use(function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '3mb',
      //encoding: contentType.parse(req).parameters.charset,
      headers : ('Access-Control-Allow-Origin', '*'),
      headers :('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
      headers:('Access-Control-Allow-Headers', 'X-Requested-With,content-type'),
      headers:('Access-Control-Allow-Credentials', true)
    }, function (err, string) {
      if (err) return next(err)
      req.text = string
      next()
    })
  })*/
// settings
app.set('port', process.env.PORT || 6040);

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '../app/views'));
// middlewares
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//app.use(express.static(path.join(__dirname, '../static')))


module.exports = app;
