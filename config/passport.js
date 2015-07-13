
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/glv_users.js');
var mongoose = require('mongoose');

var secrets = require('../config/secret');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
	
	if (req.user) {
		
		User.findOne({$and:[{ email: profile._json.email },{ facebook: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ facebook: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							user.facebook = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile._json.email;
							user.isActive	= true,
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.facebook = profile.id;
						//user.tokens.push({ kind: 'facebook', accessToken: accessToken });
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile._json.email;
						//user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	} else{
		
		User.findOne({$and:[{ email: profile._json.email },{ facebook: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ facebook: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							user.facebook = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile._json.email;
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.facebook = profile.id;
						//user.tokens.push({ kind: 'facebook', accessToken: accessToken });
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile._json.email;
						//user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	}
}));



//Sign in with Twitter.
passport.use(new TwitterStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
	
	if (req.user) {
		
		User.findOne({$and:[{ email: profile.username + "@twitter.com" },{ twitter: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ twitter: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							//user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
							//user.profile.location = user.profile.location || profile._json.location;
							//user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
							user.twitter = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile.username + "@twitter.com";
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.twitter = profile.id;
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile.username + "@twitter.com";
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	} else{
		
		User.findOne({$and:[{ email: profile.username + "@twitter.com" },{ twitter: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ twitter: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							//user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
							//user.profile.location = user.profile.location || profile._json.location;
							//user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
							user.twitter = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile.username + "@twitter.com";
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.twitter = profile.id;
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile.username + "@twitter.com";
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	}
}));

/**
* Sign in with Google.
*/
passport.use(new GoogleStrategy(secrets.google, function(req, accessToken, refreshToken, profile, done) {
	
	if(req.user){
		
		User.findOne({$and:[{ email: profile.emails[0].value },{ google: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ google: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							//user.tokens.push({ kind: 'google', accessToken: accessToken });
							//user.profile.picture = profile._json.picture;
							user.googlePlus = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile.emails[0].value;
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.googlePlus = profile.id;
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile.emails[0].value;
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	} else{
		
		User.findOne({$and:[{ email: profile.emails[0].value },{ google: null }]}, function(err, existingEmailUser) {
			if(err){
				done(null, err);
			} else if(existingEmailUser){
				
				done(null, existingEmailUser);
			} else{
				
				User.findOne({ google: profile.id }, function(err, existingUser) {
					if(err){
						done(null, err);
					} else if(existingUser){
						
						User.findById(existingUser.id, function(err, user) {
							
							user.googlePlus = profile.id;
							user.firstName = user.firstName || profile.displayName;
							user.email= user.email || profile.emails[0].value;
							user.updated	= new Date()
							user.save(function(err,user) {
								done(err, user);
							});
						});
					} else{
						
						var user = new User();
						user.googlePlus = profile.id;
						user.firstName = user.firstName || profile.displayName;
						user.gender = user.gender || profile._json.gender;
						user.email= user.email || profile.emails[0].value;
						user.isActive	= true,
						user.created	= new Date(),
						user.updated	= new Date()
						user.save(function(err,user) {
							done(err, user);
							
						});
					}
				});
			}
		});
	}
}));



/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
	var provider = req.path.split('/').slice(-1)[0];
	if (_.find(req.user.tokens, { kind: provider })) {
		next();
	} else {
		res.redirect('/auth/' + provider);
	}
};