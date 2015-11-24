var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
  	email: String,
  	password: String
});
var User = mongoose.model('user', userSchema);
module.exports = User;