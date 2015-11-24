// DEPENDENCIES
var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser');

var port         = process.env.PORT || 3000;
var app          = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cookieParser());

// DATABASE
mongoose.connect('mongodb://localhost/lunchapp');

// LISTENER
app.listen(port);

// MODELS
var User = require('./models/user')
var Restaurant = require('./models/restaurant')

var WokToWalk = new Restaurant({
  name: "Wok to Walk",
  foodType: "Asian Fusion",
  phone: "646-918-7006",
  urlRestaurant: "http://woktowalk.com/",
  urlMenu: "http://woktowalk.com/our-menu/",
  urlOnline: "http://woktowalk.com/union-square-east-order-line/",
  crossStreet: "South Park Ave and 17th St",
  position: {
    lat: "40.736210",
    lng: "73.988966"
  }
  orderOnline: true,
  seating: true,
  whosGoing: []
})

WokToWalk.save(function(err)
{
    if(err) console.log(err);
    console.log(WokToWalk.name + "created");
})

var sweetgreen = new Restaurant({
  name: "sweetgreen",
  foodType: "salads",
  phone: "646-449-8884",
  urlRestaurant: "http://sweetgreen.com/",
  urlMenu: "https://order.sweetgreen.com/nomad/menu",
  urlOnline: "https://order.sweetgreen.com/nomad/menu",
  crossStreet: "Broadway and 27th St",
  position: {
    lat: "40.745029",
    lng: "73.988622"
  }
  orderOnline: true,
  seating: true,
  whosGoing: []
})

sweetgreen.save(function(err)
{
    if(err) console.log(err);
    console.log(sweetgreen.name + "created");
})

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

    res.send()

  } else {

    res.send("NO STUFF FOR YOU")

  }

});
