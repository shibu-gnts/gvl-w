var userController = require('../controllers/userController');
var passport = require('passport');
var passportConf = require('../config/passport');
//var session = require('express-session');

module.exports = function(app, server){

//	app.use(session({ resave: true,
//		saveUninitialized: true,
//		secret:'somesecrettokenhere'}));
	
	app.post('/:cc/getAllUser', userController.getAllUsers);
	app.post('/:cc/getUser/:id', userController.getUser);
	app.post('/:cc/editUser/:id', userController.editUser);
	app.post('/:cc/deleteUser/:id', userController.deleteUser);
	app.post('/:cc/userSignUp', userController.postUserSignUp);
	app.post('/:cc/userSignIn', userController.postUserSignIn);
	app.post('/:cc/userActiveOrInactive', userController.userActiveOrInactive);
	app.post('/:cc/forgetPassword', userController.forgetPassword);
	app.post('/:cc/resetPassword/:email', userController.resetPassword);
	
	app.get('/:cc/userSignInFacebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
	app.get('/userSignInFacebook/callback',  passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
	res.redirect(req.session.returnTo || '/');
	});
	
	app.get('/:cc/userSignInGoogle', passport.authenticate('google', { scope: 'profile email' }));
	app.get('/userSignInGoogle/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	res.redirect(req.session.returnTo || '/');
	});

	app.get('/:cc/userSignInTwitter', passport.authenticate('twitter'));
	app.get('/userSignInTwitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
	res.redirect(req.session.returnTo || '/');
	});
	
	//User SigN Up Form 
	app.get('/:cc/userSignUp', function(req, res) {
		res.render('signup.html', {
		    title: 'Glv-SignUp',
		    message:""
			});
		});
	//User LogiN Form
	app.get('/:cc/userSignIn', function(req, res) {
		res.render('signin.html', {
		    title: 'Glv-Login Form',
		    message:""
			});
		});
}
