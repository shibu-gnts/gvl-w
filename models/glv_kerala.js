var mongoose = require("mongoose");
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var states = new Schema({
	state_name		     :	String,
	year			     :	String,
	district		     :	String,
	RDO				     :	String,
	taluk			     :	String,
	village              :	String,
	map 			     :	String,
	desam   		     :	String,
	landtype		     :	String,
	survey_no		     :	String,
	subdivision_number	 :	String,
	resurvey_no          :   String,
    Resubdivision_number :   String,
    glv_fairvalue_acre   :  String,
    coordinates		     :	{latitude:String,longitude:String},
	created			     :	Date,
	createdby		     :	String,
	updated			     :	Date,	
	updatedby		     :	String,
	isactive		     :	Number
});

states.plugin(textSearch);
states.index({ district : 'text', village : 'text' , street_name : 'text' });

module.exports = mongoose.model("GLV_KL", states);