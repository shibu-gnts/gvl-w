/**
 * New node file
 */

//var mongoose = require('mongoose');
//var dbConnect = require('../config/dbConService.js');
//mongoose.connect(dbConnect.url);
//var session = require('express-session');

var AdminUser = require('../models/glv_adminUsers');
//Its for BackEnd Process

exports.getAllAdmin = function(req, res) {
	AdminUser.find({}, function(err, admins){
		if(err) res.send(err);
		else{ 
			if(admins) res.json(admins);
			else res.send("No AdminUsers");
		}
	});
};

exports.getAdmin = function(req, res) {
	AdminUser.findById(req.param("id"), function(err,admin){
		if(err) res.send(err);
		else{
			if(admin) res.json(admin);
			else res.send("No Corresponding AdminUser..!");
		}
	});
};

exports.editAdmin = function(req, res) {
	AdminUser.findById(req.param("id"), function(err,admin){
		if(err) res.send(err)
		else if(admin){
			var pwd = admin.generateHash(req.param("password"));
			admin.name = req.param("name");
			admin.type = req.param("type"); 
			admin.password =  pwd;
			admin.updated =  req.param("updated");
			admin.updated_at =  new Date();
			admin.save(function(err){
				if(err) res.send(err);
				else res.send("Updated Succesfully..!");
			})
		}
		else res.send("No Corresponding AdminUser..!");
	});
};

exports.deleteAdmin = function(req, res){
	AdminUser.findByIdAndRemove(req.param("id"), function(err,admin){
		if(err) res.send(err);
		else if(admin) res.send("Deleted Succesfully..!");
		else res.send("No Corresponding AdminUser..!");
	});
};

exports.postAdminUserSignUp = function(req, res) {
	
	AdminUser.findOne({ username: req.param("email") }, function(err, existingUsername) {
		if(err) return res.send(err);
		else if(existingUsername) return res.send("Email Already Exist..!");
		else {
			var admin = new AdminUser();
			var pwd = admin.generateHash(req.param("password"));
			admin = new AdminUser({
				name		: req.param("name"), 
				type		: req.param("type"), 
				username	: req.param("email"), 
				password	: pwd,
				isActive	: false,
				created		: req.param("created"),
				created_at	: new Date(),
				updated		: req.param("updated"),
				updated_at	: new Date()
			});
			admin.save(admin, function(err, result){
				if(err) res.send(err);
			});
		}
		res.send("Inserted Succesfully");
	});
};

exports.postAdminUserSignIn = function(req, res) {
	AdminUser.findOne({username : req.param("email")}, function(err, admin){
		if(err) res.send("error");
		else if(admin){
			if(admin.verifyPassword(req.param("password"))){
				if(!admin.isActive) res.send("Inactive User. Contact super Admin");
				else{
					console.log(admin.name);
					session.name=admin.name;
					session.type=admin.type;
					session.email=admin.username;
					res.send("Login Succesfully..!");
				}
				
			} else res.send("Invalid Password..!");
		} else res.send("Invalid UserName");
	});
};

exports.adminActiveOrInactive = function(req, res){
	AdminUser.findById(req.param("id"), function(err, admin){
		if(err) res.send(err);
		else if(admin){
			if(admin.isActive) admin.isActive = false;
			else admin.isActive  = true;
			admin.save(function(err){
				if(err) res.send(err)
			});
		}
		res.send("Updated");
	});
};
