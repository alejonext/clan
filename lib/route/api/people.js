'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var app = (0, _express2.default)(),
	    model = GLOBAL.db.model('people');


	app.post('/', function (req, res) {
		var person = new model(req.body);
		person.save(function (error, data) {
			res.json({
				error: error,
				data: data
			});
		});
	});

	app.get('/' + GLOBAL.CONFIG.server.confirm, function (req, res) {
		model.find(req.query).exec(function (error, data) {
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