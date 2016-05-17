import express from 'express';
export default function () {
	var app = express();
	var model = GLOBAL.db.model('pvd');

	app.get('/:id', (req, res) => {
		model
			.findById(req.param.id)
			.populate('lugar')
			.exec((error, data) => {
				res.json({
					error,
					data
				});
			});
	});

	app.post('/:id', (req, res) => {
		model.findByIdAndUpdate(req.param.id, req.body, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});
	app.delete('/:id', (req, res) => {
		model.findByIdAndRemove(req.param.id, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});
	
	app.all('/', (req, res) => {
		model.find(req.query).populate('lugar').exec((error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	return app;
}
