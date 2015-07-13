var mongoose = require("mongoose");
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var states = new Schema({
	state_name		:	String,
	year			:	String,
	zone			:	String,
	SRO				:	String,
	village			:	String,
	revenue_district:	String,
	taluk			:	String,
	street_name		:	String,
	glv_sqft		:	String,
	map				:	String,
	survey_no		:	String,
	coordinates		:	{latitude:String,longitude:String},
	classification  :   String,
	created			:	Date,
	createdby		:	String,
	updated			:	Date,	
	updatedby		:	String,
	isactive		:	Number
});

states.plugin(textSearch);
states.index({ zone : 'text', village : 'text' , street_name : 'text' });

module.exports = mongoose.model("GLV_TN", states);