var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({

	name: String,
	foodType: String,
	phone: String,
	urlRestaurant: String,
	urlMenu: String,
	urlOnline: String,
	crossStreet: String,
	position: {
		lat: Number,
		lng: Number
	},
	orderOnline: Boolean,
	seating: Boolean,
	whosGoing: Array
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
