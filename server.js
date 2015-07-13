
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , path = require('path');

var app = express();
var secrets = require('./config/secret');
var server = http.createServer(app)

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.methodOverride());
app.use(express.cookieParser("thissecretrocks"));
app.use(express.bodyParser());
//app.use(methodOverride());

app.use(cookieParser());
app.use(express.cookieParser(secrets.key));
app.use(express.session({ 
	resave: true,
	saveUninitialized: true,
	secret:secrets.key}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname));
app.use(function (req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
	res.header('Access-control-Allow-Headers', "Content-Types");
	next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongoose = require('mongoose');
var dbConnect = require('./config/dbConService.js');
mongoose.connect(dbConnect.url);

var adminUserController = require('./controllers/adminUserController');



app.get('/', function(req, res){
	var request = require('request');
	request('http://ipinfo.io/json', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	data = JSON.parse(body)
	        res.redirect('/'+data.country);
	     }
	})
})
app.get('/:cc', routes.index);
app.post('/getAllAdmin', adminUserController.getAllAdmin);
app.post('/getAdmin/:id', adminUserController.getAdmin);
app.post('/editAdmin/:id', adminUserController.editAdmin);
app.post('/deleteAdmin/:id', adminUserController.deleteAdmin);
app.post('/adminSignUp', adminUserController.postAdminUserSignUp);
app.post('/adminSignIn', adminUserController.postAdminUserSignIn);
app.post('/adminActiveOrInactive', adminUserController.adminActiveOrInactive);

require('./routes/userRoutes.js')(app, server);
require('./routes/stateRoutes.js')(app, server);
require('./routes/propertyRoutes.js')(app, server);



server.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
