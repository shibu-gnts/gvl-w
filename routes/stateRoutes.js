var stateController = require('../controllers/stateController');

module.exports = function(app){
	app.post('/:cc/tamilnadu', stateController.insertTN);
	app.post('/:cc/kerala', stateController.insertKL);
	app.get('/:cc/:state', stateController.state_search);
/*	app.get('/:cc/:state/:dist', stateController.dist_search);
	app.get('/:cc/:state/:dist/:taluk', stateController.taluk_search);
	app.get('/:cc/:state/:dist/:taluk/:street', stateController.street_search);
	app.get('/:cc/:state/:dist/:taluk/:street/:survey_no', stateController.survey_no_search);*/

	app.get('/map', function(req, res) {
		res.render('map.html', {
		    title: 'map',
		    message:""
			});
		
		});

}

