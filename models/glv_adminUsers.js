/**
 * New node file
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var adminUserSchema = new Schema({
	name		:	String,
	type		:	String,
	username	:	String,
	password 	:	String,
	isActive	:	Boolean,
	created		:	String,
	created_at	:	Date,
	updated		:	String,
	updated_at	:	Date
	
});

adminUserSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminUserSchema.methods.verifyPassword = function(pwd) {
return bcrypt.compareSync(pwd, this.password);
};

module.exports = mongoose.model("AdminUser", adminUserSchema);