
/**
 * New node file
 */

//var mongoose = require('mongoose');
//var dbConnect = require('../config/dbConService.js');
//mongoose.connect(dbConnect.url);
//var session = require('express-session');

var tamilnadu = require('../models/glv_tamilnadu');
var kerala = require('../models/glv_kerala');
//Its for BackEnd Process


/*exports.getAdmin = function(req, res) {
	AdminUser.findById(req.param("id"), function(err,admin){
		if(err) res.send(err);
		else{
			if(admin) res.json(admin);
			else res.send("No Corresponding AdminUser..!");
		}
	});
};
*/

exports.insertTN = function(req, res) {
	        var Coordinates = {
	        		latitude   :	req.param("lat"),
	        		longitude  :	req.param("lng")
	        }
	        
			var tn = new tamilnadu();
			tn = new tamilnadu({
				state_name		:	req.param("state_name"),
				year			:	req.param("year"),
				zone			:	req.param("zone"),
				SRO				:	req.param("SRO"),
				village			:	req.param("village"),
				revenue_district:	req.param("revenue_district"),
				taluk			:	req.param("taluk"),
				street_name		:	req.param("street_name"),
				glv_sqft		:	req.param("glv_sqft"),
				map				:	req.param("map"),
				survey_no		:	req.param("survey_no"),
				coordinates     :	Coordinates,
				classification  :   req.param("classification"),
				created		: req.param("created"),
				created_at	: new Date(),
				updated		: req.param("updated"),
				updated_at	: new Date(),
				isActive	: true
			});
			tn.save(tn, function(err, result){
				if(err) res.send(err);
			});
		res.send("Inserted Succesfully");
	};

	
	
	exports.insertKL = function(req, res) {
		var Coordinates = {
        		latitude   :	req.param("lat"),
        		longitude  :	req.param("lng")
        }
		var kl = new kerala();
		kl = new kerala({
			state_name		       :	req.param("state_name"),
			year			       :	req.param("year"),
			district		       :	req.param("district"),
			RDO				       :	req.param("RDO"),
			taluk			       :	req.param("taluk"),
			village			       :	req.param("village"),
			map				       :	req.param("map"),
			desam                  :	req.param("desam"),
			landtype               :    req.param("landtype"),
			survey_no		       :	req.param("survey_no"),
			subdivision_number     :	req.param("subdivision_number"),
			resurvey_no            :	req.param("resurvey_no"),
			Resubdivision_number   :	req.param("Resubdivision_number"),
			glv_fairvalue_acre	   :	req.param("glv_fairvalue_acre"),
			coordinates            :	Coordinates,
			created		           :    req.param("created"),
			created_at	           :    new Date(),
			updated		           :    req.param("updated"),
			updated_at	           :    new Date(),
			isActive	           :    true
		});
		kl.save(kl, function(err, result){
			if(err) res.send(err);
		});
	res.send("Inserted Succesfully");
};

		
exports.state_search = function(req, res) {
	
	if(req.params.state=="tamilnadu")
		{
		var query = tamilnadu.find();
		query.select('glv_sqft street_name village zone state_name coordinates.latitude coordinates.longitude');
		query.exec( function (err, state_name) {
		    if (err) res.send(err);
			else{
				if(state_name) res.send(state_name);
				else res.send("No Corresponding User..!");
			}
		});
	}
else if (req.params.state=="kerala")
{
	var query = kerala.find();
	query.select('glv_fairvalue_acre desam village district state_name coordinates.latitude coordinates.longitude');
	query.exec( function (err, state_name) {
	    if (err) res.send(err);
		else{
			if(state_name) res.send(state_name);
			else res.send("No Corresponding User..!");
		}
	});
}	
};
	
	/*tamilnadu.distinct('coordinates' , function(err, state_name){
				if(err) res.send(err);
				else{
					if(state_name) res.send(state_name);
					else res.send("No Corresponding User..!");
				}
			});
		}
	else if (req.params.state=="kerala")
	{
		kerala.distinct('coordinates' , function(err, state_name){
			if(err) res.send(err);
			else{
				if(state_name) res.json(state_name);
				else res.send("No Corresponding User..!");
			}
		});*/


exports.dist_search = function(req, res) {
	if(req.params.state=="tamilnadu")
		{
			tamilnadu.distinct('coordinates.latitude' , function(err, state_name){
				if(err) res.send(err);
				else{
					if(state_name) res.json(state_name);
					else res.send("No Corresponding User..!");
				}
			});
		}
	else if (req.params.state=="kerala")
	{
		kerala.find( function(err, state_name){
			if(err) res.send(err);
			else{
				if(state_name) res.json(state_name);
				else res.send("No Corresponding User..!");
			}
		});
	}
};