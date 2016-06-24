'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var app = (0, _express2.default)(),
	    model = GLOBAL.db.model('pvd');


	app.get('/:id', function (req, res) {
		model.findById(req.param.id).populate('lugar').exec(function (error, data) {
			res.json({
				error: error,
				data: data
			});
		});
	});

	app.post('/:id', function (req, res) {
		model.findByIdAndUpdate(req.param.id, req.body, function (error, data) {
			res.json({
				error: error,
				data: data
			});
		});
	});
	app.delete('/:id', function (req, res) {
		model.findByIdAndRemove(req.param.id, function (error, data) {
			res.json({
				error: error,
				data: data
			});
		});
	});

	app.all('/', function (req, res) {
		model.find(req.query).populate('lugar').exec(function (error, data) {
			res.json({
				error: error,
				data: data
			});
		});
	});

	return app;
};

var _express = require('express'),
    _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }