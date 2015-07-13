var User = require('../models/glv_users');
var mail = require('../controllers/sendmail');
var session = require('express-session');

exports.getAllUsers = function(req, res) {
	var reply = {
			success : Boolean,
			msg : String
	}
	User.find({}, function(err, users){
		if(err){
			reply.success = false
			reply.msg = err
			
		}
		else{ 
			if(users){
				res.json(users);
			}
			else{
				reply.success = true
				reply.msg = "No Users"
				
			}
		}
		res.send(reply);
	});
};

exports.getUser = function(req, res) {
	User.findById(req.param("id"), function(err,user){
		if(err){
			reply.success = false
			reply.msg = err
			
			}
		else{
			if(user){
				res.json(user);
			}
			else{
				reply.success = true
				reply.msg = "No Corresponding User..!"
								
			}
		}
		res.send(reply);
	});
};

exports.editUser = function(req, res) {
	var reply = {
			success : Boolean,
			msg : String
	}
	User.findById(req.param("id"), function(err,user){
		if(err){
			reply.success = false
			reply.msg = err
			
		}
		else if(user){
			var pwd = user.generateHash(req.param("password"));
			user.firstName	= req.param(""),
			user.lastName	= req.param(""),
			user.mobile		= req.param(""),
			user.password 	= pwd,
			user.updated	= new Date()
			user.save(function(err){
				if(err){
					reply.success = false
					reply.msg = err
					
				}
				else{
					reply.success = true
					reply.msg = "Updated Succesfully"
					
				}
			})
		}
		else{
			reply.success = false
			reply.msg = "No Corresponding AdminUser..!"
			
			
		}
		res.send(reply);
	});
};

exports.deleteUser = function(req, res){
	User.findByIdAndRemove(req.param("id"), function(err,user){
		if(err){
			reply.success = false
			reply.msg = err
			
		}
		else if(user){
			reply.success = true
			reply.msg = "Deleted Succesfully..!"
			
			
		}
		else{
			reply.success = true
			reply.msg = "No Corresponding User..!"
			
			
		}
		res.send(reply);
	});
};

exports.postUserSignUp = function(req, res) {
	
	var reply = {
			success : Boolean,
			msg : String
	}
	
	User.findOne({$or:[{email : req.param("email")},{mobile : req.param("mobile")}]}, function(err, existingUser) {
		
		if(err) {
			reply.success = false
			reply.msg = err
			
		}
				
		else if(!existingUser){
			
			var user = new User();
			var pwd = user.generateHash(req.param("password"));
			user = new User({
				firstName	: req.param("firstname"),
				lastName	: req.param("lastname"),
				gender		: req.param("gender"),
				email		: req.param("email"),
				mobile		: req.param("mobile"),
				googlePlus	: req.param(""),
				twitter		: req.param(""),
				facebook	: req.param(""),
				password 	: pwd,
				isActive	: false,
				created	: new Date(),
				updated	: new Date()
			});
			
			user.save(user, function(err, result){
				if(err) {
					reply.success = false
					reply.msg = err
					
				}
			});
			var subject = 'Please Confirm Your Email Address'
			var msg = '<h3>Hello, </h3>'
				+'<p>Click the link below to complete your PropertiesGLV account registration.</p>'
				+'<p>'
				+'https://localhost:3000/'
				+'</p>'
				+'<p>Thanks for using PropertiesGLV!<br/>'
				+'The PropertiesGLV Team</p>'
			mail.sendMail(req, res, msg, subject);
			reply.success = true
			reply.msg = "Inserted Succesfully"
			
		}
		
		else if(existingUser) {
			reply.success = false
			reply.msg = "Existing Email or Phone"
			
				
		}
		
		res.send(reply);		
	});
	
};

exports.postUserSignIn = function(req, res) {
	User.findOne({email : req.param("email")}, function(err, user){
		
		var reply = {
				success : Boolean,
				msg : String
		}
		
		if(err){
			reply.success = false
			reply.msg = err
			
		}
		else if(user){
			if(user.verifyPassword(req.param("password"))){
				if(!user.isActive){
					reply.success = false
					reply.msg = "Inactive User. Contact Admin"
					
				} else{
					reply.success = true
					reply.msg = "Login Succesfully..!"
					session.name=user.firstName+" "+user.lastName;
					session.email=user.email;
					
					
				}
				
			} else{
				reply.success = false
				reply.msg = "Invalid Password..!"
				
			}
				
		} else{
			reply.success = false
			reply.msg = "Invalid UserName..!"
			
		}
		res.send(reply);
	});
};

exports.userActiveOrInactive = function(req, res){
	User.findById(req.param("id"), function(err, user){
		if(err){
			reply.success = false
			reply.msg = err
			
		}
		else if(user){
			if(user.isActive) user.isActive = false;
			else user.isActive  = true;
			user.save(function(err){
				if(err) {
					reply.success = false
					reply.msg = err
					
				} else{
					reply.success = true
					reply.msg = "Updated..!"
				}
			});
		} else{
			reply.success = true
			reply.msg = "No Corresponding User..!"
		}
		
		res.send(reply);
	});
};

exports.forgetPassword = function(req, res){
	User.findOne({email : req.param("email")}, function(err, user){
		if(err){
			reply.success = false
			reply.msg = err
			
		} else if(user){
			var name = user.firstName+" "+user.lastName
			var subject = name+', here is the link to reset your password'
			var msg = '<h3>Hello '+name+'</h3>'
				+'<p>You recently requested a password reset.</p>'
				+'<p>'
				+'To change your PropertyGLV password, click here or paste the following link into your browser: http://localhost:3000/in/resetPassword/'+user.email
				+'</p>'
				+'<p>Thanks for using PropertiesGLV!<br/>'
				+'The PropertiesGLV Team</p>'
			mail.sendMail(req, res, msg, subject);
			reply.success = true
			reply.msg = "Chek your Email"
		} else{
			reply.success = true
			reply.msg = "Not an Existing User"
								
		}
		res.send(reply);
	});
}

exports.resetPassword = function(req, res){
	User.findOne({email : req.param("email")}, function(err, user){
		if(err){
			reply.success = false
			reply.msg = err
			
		} else if(user){
			console.log(user)
			user.password = user.generateHash(req.param("password")),
			console.log(req.param("password"))
			user.updated	= new Date()
			user.save(function(err){
				if(err){
					reply.success = false
					reply.msg = err
					
				} else{
					reply.success = true
					reply.msg = "You've successfully changed your password."
								
				}
			})
		} else{
			reply.success = true
			reply.msg = "No Corresponding User..!"
		}
		res.send(reply);
	});
};