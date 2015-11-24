<<<<<<< HEAD
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

});


// MODELS
var User = require('./models/user')
// var Restaurant = require('./models/restaurant')

///////////////////////////////////////
// USER ROUTES ////////////////////////
///////////////////////////////////////

// SIGN UP ( CREATE NEW USER )
app.post('/users', function(req, res) {

  password_hash = md5(req.body.password);

	var user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: password_hash
  });

  user.save(function(err) {
		if(err) {
			console.log(err);
		} else {

      res.cookie("loggedinId", user.id)

			res.send({
        id: user.id,
        username: user.username,

      });
		};
	});
});


//LOG IN OLD USER
app.post('/login', function(req, res) {
  console.log("server.js - /login");

  var email = req.body.email;
  var password = req.body.password;

  //MAYBE SWITCH TO USER ID!?!?!?!?!
  User.findOne({ 'email': email }, function( err, user){

    var request_password_hash = md5( password );

    if( user != null && request_password_hash == user.password){

        res.cookie("loggedinId", user.id)
        res.send("server.js - /login - logged in")

    } else {

      res.status = 403;
      res.send("server.js - /login - didn't login")

    }

  });

});

//LOG OUT

//NEED A LOG OUT ROUTE?!?!?!

///////////////////////////////////////
// RESTAURANT ROUTES //////////////////
///////////////////////////////////////

// GET ROUTE
app.get('/restaurants', function(req, res){

  if (req.cookies.loggedinId != undefined){

    res.send("STUFF")

  } else {

    res.send("NO STUFF FOR YOU")

  }

});
