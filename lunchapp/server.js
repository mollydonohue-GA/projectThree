var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var md5 = require('md5')
var cookieParser = require('cookie-parser')
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser())
app.listen( port );
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/lunchapp';
mongoose.connect(mongoUri);

app.get('/', function( req, res ){
  res.send( "bannnaaaannnnaaaa");
});