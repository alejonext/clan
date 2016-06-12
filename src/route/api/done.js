import {Router} from 'express';

/**
 * @return {Object}      Router para generar donaciones
 */
export default function () {
	var router = Router();

	router
		.route('/')
		.post((req, res) => {
		let newDonation = new GLOBAL.db.model('donacion')(req.body.pay);
		newDonation.status = 1;
		newDonation.createPayment(req.body.card, error => {
			newDonation.save((error, data) => res.json({ error, data }));
		});
	});

	router
		.route('/certificate/:id')
		.get((req, res) => {
		GLOBAL.db
			.model('donacion')
			.find({ para : req.param.id }, (error, data) => next({ error, data }))
	});

	router
		.route('/:id')
		.all((req, res, next) => GLOBAL.db
			.model('donacion')
			.find({ para : req.param.id }, (error, data) => next({ error, data })))
		.get((data, req, res) => res.json(data))
		.put((data, req, res) => data.data.confirm(req.body, (error, rs) => res.json({ error, rs })));


	router
		.route(`/${GLOBAL.CONFIG.server.confirm}/:id/:name(cancel|confirm)`)
		.all((req, res, next) => GLOBAL.db
			.model('donacion')
			.find({ para : req.param.id }, (error, data) => next({ error, data })))
		.get((data, req, res) => {
			if(!data.data || data.error){
				return res.json(data);
			}

			if(req.params.name === 'confirm'){
				data.data.confrimPayment(req.query, error => {
					if(error){
						data.error = error; 	
					}

					res.json(data);
				});
			} else {
				data.data.remove( error => res.redirect('/'));
			}
		});

	return router;
}
