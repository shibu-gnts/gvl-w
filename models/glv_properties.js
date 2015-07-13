var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var propertySchema = new Schema({
	prop_id				: Number,
	prop_photos			: Array,
	prop_type			: String,
	prop_rate			: Number,
	state_name			: String,
	street_name			: Array,
	hitcount			: Number,
	near_malls			: Array,
	near_schools		: Array,
	near_hospitals		: Array,
	near_pharmacies		: Array,
	near_bank_Atms		: Array,
	near_theaters		: Array,
	near_parks			: Array,
	near_restaurants	: Array,
	near_airports		: Array,
	near_busstations	: Array,
	near_railstations	: Array,
	near_clubs			: Array,
	near_dept_store		: Array,
	society_amenities	: Array,
	prop_status			: String,
	isactive			: Boolean,
	coordinates			:{
							latitude	: String,
							longitude	: String
						},
	created				: Date,
	createdby			: String,
	updated				: Date,
	updatedby			: String
});

module.exports = mongoose.model("glv_properties", propertySchema);