import {Router} from 'express';

/**
 * @return {Object}      Router para generar donaciones
 */
export default function () {
	var router = Router();
	
	router.route('/').post((req, res) => {
		let newDonation = new GLOBAL.db.model('user')(req.body);
		newDonation.status = 1;
		newDonation.save((error, data) => {
			res.json({
				error,
				data
			});
		});
	}).get( (req, res) => {
		GLOBAL.db.model('user').find(req.query, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	router.get('/:id', (req, res) => {
		GLOBAL.db.model('user').find({
			para : req.param.id // PVD
		}, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	router.delete(`/${GLOBAL.CONFIG.server.confirm}/:id`, (req, res) => {
		GLOBAL.db.model('user').findByIdAndRemove(req.param.id, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	// ToDo Hacer el metodo de confirmacion
	router.all(`/${GLOBAL.CONFIG.server.confirm}/:id/confirm`, (req, res) => {
		GLOBAL.db.model('user').findByIdAndUpdate(req.param.id, req.body, (error, data) => {
			res.json({
				error,
				data
			});
		});
	});

	return router;
}
