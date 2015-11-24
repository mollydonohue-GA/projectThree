var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	access_token: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;