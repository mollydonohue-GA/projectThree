var mongoose = require('mongoose');

var User = mongoose.model('User', UserSchema);
module.exports = User;
var userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
  	email: String,
  	password: String
});
var User = mongoose.model('user', userSchema);
module.exports = User;