var propertyController = require('../controllers/propertyController');

module.exports = function(app, server){
	
	app.post('/:cc/getCircleMarkers', propertyController.getCircleMarkers);
	app.post('/:cc/getPropertyList', propertyController.getPropertyList);
}