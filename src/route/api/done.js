import {Router} from 'express';
import {urlencoded, json, text, raw} from 'body-parser';

/**
 * @return {Object}      Router para generar donaciones
 */
export default function () {
	var router = Router();
	var model = GLOBAL.db.model('donacion');

	router.use(urlencoded({ extended: true }));
	router.use(json());
	router.use(text());
	router.use(raw());

	router
		.route('/')
		.post((req, res) => {
			console.log(req.body);
		let newDonation = new model(req.body.pay);
		newDonation.createPayment(req.body.card, (error, data) => res.json({ error, data }));
	});

	router
		.route('/certificate/:id')
		.get((req, res) => {
		model.find({ para : req.param.id }, (error, data) => next({ error, data }))
	});

	router
		.route('/:id')
		.all((req, res, next) => model.find({ para : req.param.id }, (error, data) => next({ error, data })))
		.get((data, req, res) => res.json(data))
		.put((data, req, res) => data.data.confirm(req.body, (error, rs) => res.json({ error, rs })));


	router
		.route(`/${GLOBAL.CONFIG.server.confirm}/:id/:name(cancel|confirm)`)
		.all((req, res, next) => model.find({ para : req.param.id }, (error, data) => next({ error, data })))
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
