var mongoose = require('mongoose');
var ComplaintSchema = require('./complaint').schema;

var RestaurantSchema = new mongoose.Schema({
	name: String,
	foodType: String,
	phone: Number,
	urlRestaurant: String,
	urlMenu: String,
	urlOnline: String,
	crossStreet: String,
	position: {
		lat: Number,
		lng: Number
	}
	orderOnline: boolean,
	seating: boolean,



});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;