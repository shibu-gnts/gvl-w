var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
	firstName	: String,
	lastName	: String,
	gender		: String,
	email		: String,
	mobile		: String,
	googlePlus	: String,
	twitter		: String,
	facebook	: String,
	password 	: String,
	isActive	: Boolean,
	login_time	: Date,
	logout_time	: Date,
	created		: Date,
	updated		: Date
	
});

userSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(pwd) {
return bcrypt.compareSync(pwd, this.password);
};

module.exports = mongoose.model("glv_users", userSchema);