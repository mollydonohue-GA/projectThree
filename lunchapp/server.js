var dotenv = require('dotenv').load();
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var md5 = require('md5');
var cookieParser = require('cookie-parser');
var Yelp = require('yelp');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.listen( port );
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/lunchapp';
mongoose.connect(mongoUri);

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

// app.get('/', function(req, res)
// {
// 	res.send("bannanna");
// });

var arr = [];

app.get('/users/:food', function(req, res)
{
	yelp.search({ term: req.params.food, location: '10010' })
	.then(function (data) 
	{
	  // console.log(data);
	  arr.push(data);
	  res.send(data);
	})
	.catch(function (err) 
	{
	  console.error(err);
	  res.send(err);
	});

	// yelp.business('yelp-san-francisco')
	//   .then()
	//   .catch(console.error);

	// yelp.phoneSearch({ phone: '+15555555555' })
	//   .then(function(data)
	//   {
	//   	console.log(data);
	//   	res.send(data);
	//   })
	//   .catch(console.error);

	// yelp.business('yelp-new-york', function(err, data) 
	// {
	//   if (err)
	//   {
	//   	return console.log(error);
	//   } 
	//   else
	//   {
	//   	// console.log(data.length);
	//   	arr.push(data);
	//   	res.send(data);
	//   	// arr.push(data);
	//   	// res.send(arr);
	//   }
	  
	// });

});










