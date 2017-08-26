var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var fs = require('fs');
var pg = require('pg');

app.enable('trust proxy');
app.use(cors());
app.use(morgan('dev'));
//app.use(morgan('dev', {stream : fs.createWriteStream(__dirname + '/../access.log', {flags: 'a'})}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


var routes = require('./routes')(app, pg);

app.use(function(req,res) {
  res.status(403).json({ error: 4, info: 'Bad method.'});
})
.listen(6969, 'localhost');

console.log('TUA API running on port 6969');
