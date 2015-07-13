
var Properties = require('../models/glv_properties');
var geolib = require('geolib');

exports.getCircleMarkers = function(req, res) {
	
	var reply = {
			success : Boolean,
			msg : String
	}
	JSONObject prop = new JSONObject()
	var circleLat = req.param("lat")
	var circleLong = req.param("long")
	var circleRadi = req.param("radius")
	var searchKey = req.param("key")
	Properties.findOne({state_name : searchKey}, function(err, properties){
		if(err){
			reply.success = false
			reply.msg = err
			
		} else if(properties){
			for(var property in properties){
				var insideCircle = geolib.isPointInCircle(
						{	
							latitude: property.coordinates.latitude,
							longitude: property.coordinates.longitude
						},
					    {
							latitude: circleLat,
							longitude: circleLong
						},
					    circleRadi
					);
				if(insideCircle){
					prop.put(property);
				}
			}
			res.send(prop)
		} else{
			reply.success = true
			reply.msg = "No Properties"
			
		}
		res.send(replay)
	});
};

exports.getPropertyList = function(req, res) {
	var reply = {
			success : Boolean,
			msg : String
	}
	Properties.findOne({street_name : req.param("streetname")}, function(err, properties){
		if(err){
			reply.success = false
			reply.msg = err
			
			}
		else{
			if(user){
				res.json(properties);
			}
			else{
				reply.success = true
				reply.msg = "No Corresponding properties..!"
								
			}
		}
		res.send(reply);
	});
};