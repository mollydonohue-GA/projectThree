// DEPENDENCIES
var express = require('express');
    morgan = require('morgan');
    mongoose = require('mongoose');
    bodyParser = require('body-parser');
    md5 = require('md5');
    cookieParser = require('cookie-parser');
    // dotenv = require('dotenv').load();
    // Yelp = require('yelp');

var port = process.env.PORT || 3000;
var app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser());

// LISTENER
app.listen( port );

// DATABASE
mongoose.connect('mongodb://localhost/lunchapp');
// var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/lunchapp';
// mongoose.connect(mongoUri);

// YELP
// var yelp = new Yelp({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   token: process.env.TOKEN,
//   token_secret: process.env.TOKEN_SECRET
// });
//
// app.get('/users/:food', function(req, res)
// {
// 	yelp.search({ term: req.params.food, location: '10010' })
// 	.then(function (data)
// 	{
// 	  // console.log(data);
// 	  res.send(data);
// 	})
// 	.catch(function (err)
// 	{
// 	  console.error(err);
// 	  res.send(err);
// 	});
//
// });

// MODELS
var User = require('./models/user')
var Restaurant = require('./models/restaurant')

///////////////////////////////////////
// SEEDS //////////////////////////////
///////////////////////////////////////

///////////////// Wok to Walk
// var WokToWalk = new Restaurant({
//   name: "Wok to Walk",
//   foodType: "Asian Fusion",
//   phone: "646-918-7006",
//   urlRestaurant: "http://woktowalk.com/",
//   urlMenu: "http://woktowalk.com/our-menu/",
//   urlOnline: "http://woktowalk.com/union-square-east-order-line/",
//   crossStreet: "South Park Ave and 17th St",
//   position: {
//     lat: "40.736210",
//     lng: "73.988966"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
// });


// ///////////////// OXIDO
// WokToWalk.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(WokToWalk.name + " created");
// })

// var oxido = new Restaurant({
//   name: "Oxido",
//   foodType: "Mexican",
//   phone: "(212) 256-1072",
//   urlRestaurant: "http://www.oxido.nyc/",
//   urlMenu: "http://www.oxido.nyc/menu/",
//   urlOnline: "https://oxido.alohaorderonline.com/",
//   crossStreet: "23rd St and 5th Ave",
//   position: {
//     lat: "40.742085",
//     lng: "-73.989918"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []

// });

// oxido.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(oxido.name + " created");
// });

// var schnippers = new Restaurant({
//   name: "Schnipper’s Quality Kitchen",
//   foodType: "American",
//   phone: "(212) 233-1025",
//   urlRestaurant: "http://www.schnippers.com/",
//   urlMenu: "http://www.schnippers.com/menus/Schnippers_Menu_23rd_Madison_2015.pdf",
//   urlOnline: "https://www.schnipperstogo.com/store23/restaurant.php",
//   crossStreet: "23rd St & Madison Ave.",
//   position: {
//     lat: "40.740857",
//     lng: "-73.987458"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
// });

// schnippers.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(schnippers.name + " created");
// });

// var berryDeli = new Restaurant({
//   name: "21 Berry Deli Inc.",
//   foodType: "Deli",
//   phone: "(212) 353-8540",
//   urlRestaurant: "",
//   urlMenu: "",
//   urlOnline: "",
//   crossStreet: "Broadway & 21st St.",
//   position: {
//     lat: "40.739870",
//     lng: "-73.989318"
//   },
//   orderOnline: false,
//   seating: false,
//   whosGoing: []
// });

// berryDeli.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(berryDeli.name + "created");
// });


// ///////////////// Wok to Walk
// var WokToWalk = new Restaurant({
//   name: "Wok to Walk",
//   foodType: "Asian Fusion",
//   phone: "6469187006",
//   urlRestaurant: "http://woktowalk.com/",
//   urlMenu: "http://woktowalk.com/our-menu/",
//   urlOnline: "http://woktowalk.com/union-square-east-order-line/",
//   crossStreet: "South Park Ave and 17th St",
//   position: {
//     lat: "40.736210",
//     lng: "-73.988966"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
// })
//
// WokToWalk.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(WokToWalk.name + "created");
// })
//
// ///////////////// SWEET GREEN
// var sweetgreen = new Restaurant({
//   name: "Sweet Green",
//   foodType: "Salad",
//   phone: "6464498884",
//   urlRestaurant: "http://sweetgreen.com/",
//   urlMenu: "https://order.sweetgreen.com/nomad/menu",
//   urlOnline: "https://order.sweetgreen.com/nomad/menu",
//   crossStreet: "Broadway and 27th St",
//   position: {
//     lat: "40.745029",
//     lng: "-73.988622"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
// })
//
// sweetgreen.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(sweetgreen.name + "created");
// })
//
// ///////////////// OXIDO
// var oxido = new Restaurant({
//   name: "Oxido",
//   foodType: "Mexican",
//   phone: "2122561072",
//   urlRestaurant: "http://www.oxido.nyc/",
//   urlMenu: "http://www.oxido.nyc/menu/",
//   urlOnline: "https://oxido.alohaorderonline.com/",
//   crossStreet: "23rd St and 5th Ave",
//   position: {
//     lat: "40.742085",
//     lng: "-73.989918"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
//
// })
//
// oxido.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(oxido.name + "created");
// })
//

// ///////////////// INDIKITCH
// var indikitch = new Restaurant({
//   name: "Indikitch",
//   foodType: "Indian",
//   phone: "(646) 590-7152",
//   urlRestaurant: "http://indikitch.com/",
//   urlMenu: "http://indikitch.com/menu.html",
//   urlOnline: "https://www.indikitchtogo.com/store25/restaurant.php",
//   crossStreet: "23rd St and 5th Ave",
//   position: {
//     lat: "40.742352",
//     lng: "-73.990487"
//   },
//   orderOnline: true,
//   seating: true,
//   whosGoing: []
// });

// indikitch.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(indikitch.name + " created");
// });


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

app.get('/users/:email', function(req, res)
{
  User.findOne({ 'email': req.params.email }, function(err, user)
  {
    res.send(user);
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

    console.log("server.js - get /restaurants - worked");
    Restaurant.find( function( err, restaurant)
    {
      res.send(restaurant)
    });

  } else {

    res.send("NO STUFF FOR YOU")

  }

});

