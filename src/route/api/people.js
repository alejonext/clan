import express from 'express';
/**
 * @return {Object}      Apiccion de express configurada Personas
 */
export default function () {
	var app = express();
	var model = GLOBAL.db.model('people');

	app.post('/', (req, res) => {
		var person = new model(req.body);
		person.save((error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	app.get(`/${GLOBAL.CONFIG.server.confirm}`, (req, res) => {
		model.find(req.query).exec((error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	return app;
}
