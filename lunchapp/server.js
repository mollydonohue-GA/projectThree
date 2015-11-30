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

// //////////////////Schnippers
// var schnippers = new Restaurant({
//   name: "Schnipper’s",
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

// ////////////////////////21 Berry Deli
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
//   phone: "(646) 918-7006",
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

// WokToWalk.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(WokToWalk.name + "created");
// })

// ///////////////// SWEET GREEN
// var sweetgreen = new Restaurant({
//   name: "Sweet Green",
//   foodType: "Salad",
//   phone: "(646) 449-8884",
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

// sweetgreen.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(sweetgreen.name + "created");
// })

// ///////////////// OXIDO
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

// })

// oxido.save(function(err)
// {
//     if(err) console.log(err);
//     console.log(oxido.name + "created");
// })


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


app.get('/users/email/:email', function(req, res){

  User.findOne({ 'email': req.params.email }, function(err, user){
    res.send(user);

  });
});

//KEEP USER LOGGED IN VIA COOKIE
app.post('/login/cookie', function(req, res) {
  console.log("server.js - /login/cookie");

  var id = req.body.id;

  User.findOne({ '_id': id }, function( err, user){

      res.send(user)

  });
});

app.get('/users/id/:id', function(req, res){

  console.log( "app.get(/users/id): " + req.params.id );

  User.findOne({ '_id': req.params.id }, function(err, user){
    res.send(user);

    console.log("user by id: " + user);
  });

});

///////////////////////////////////////
// RESTAURANT ROUTES //////////////////
///////////////////////////////////////

// GET ROUTE
app.get('/restaurants', function(req, res){

  if (req.cookies.loggedinId != undefined){

    console.log("server.js - get /restaurants - worked");

    Restaurant.find( function( err, restaurant){
      var arr = {};
      arr[restaurant[0].name] = restaurant[0].whosGoing;
      arr[restaurant[1].name] = restaurant[1].whosGoing;
      arr[restaurant[2].name] = restaurant[2].whosGoing;
      arr[restaurant[3].name] = restaurant[3].whosGoing;
      arr[restaurant[4].name] = restaurant[4].whosGoing;
      arr[restaurant[5].name] = restaurant[5].whosGoing;
      // console.log(arr);
      res.send([restaurant, arr]);

    });
  } else {

    res.send("NO STUFF FOR YOU")

  }
});

app.get('/restaurants/:id', function(req, res){

  User.findOne({ '_id': req.cookies.loggedinId }, function(err, user){

    Restaurant.findOneAndUpdate({ '_id': req.params.id}, { '$push': { 'whosGoing': " "+user.first_name+" "+user.last_name} }, function(err, rest){
      res.send([rest, user]);

    });
  });
});

app.put('/restaurants/clear', function(req,res){

  Restaurant.update({}, { $set: { whosGoing: [] }}, { multi: true }, function(err, affected){
    console.log('affected: ', affected);
    });
    res.send("whoGoing cleared")

});
