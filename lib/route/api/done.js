'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var router = (0, _express.Router)(),
	    model = GLOBAL.db.model('donacion');


	router.use((0, _bodyParser.urlencoded)({ extended: true }));
	router.use((0, _bodyParser.json)());
	router.use((0, _bodyParser.text)());
	router.use((0, _bodyParser.raw)());

	router.route('/').post(function (req, res) {
		console.log(req.body);
		var newDonation = new model(req.body.pay);
		newDonation.createPayment(req.body.card, function (error, data) {
			return res.json({ error: error, data: data });
		});
	});

	router.route('/certificate/:id').get(function (req, res) {
		model.find({ para: req.param.id }, function (error, data) {
			return next({ error: error, data: data });
		});
	});

	router.route('/:id').all(function (req, res, next) {
		return model.find({ para: req.param.id }, function (error, data) {
			return next({ error: error, data: data });
		});
	}).get(function (data, req, res) {
		return res.json(data);
	}).put(function (data, req, res) {
		return data.data.confirm(req.body, function (error, rs) {
			return res.json({ error: error, rs: rs });
		});
	});

	router.route('/' + GLOBAL.CONFIG.server.confirm + '/:id/:name(cancel|confirm)').all(function (req, res, next) {
		return model.find({ para: req.param.id }, function (error, data) {
			return next({ error: error, data: data });
		});
	}).get(function (data, req, res) {
		if (!data.data || data.error) {
			return res.json(data);
		}

		if (req.params.name === 'confirm') {
			data.data.confrimPayment(req.query, function (error) {
				if (error) {
					data.error = error;
				}

				res.json(data);
			});
		} else {
			data.data.remove(function (error) {
				return res.redirect('/');
			});
		}
	});

	return router;
};

var _express = require('express'),
    _bodyParser = require('body-parser');