'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var app = (0, _express2.default)();
	app.locals.cache = _cdn.cache;
	app.locals.render = GLOBAL.CONFIG.render;
	app.locals.render.hash = new Buffer(process.env.npm_package_version, 'utf8').toString('hex');
	app.set('env', GLOBAL.CONFIG.server.status);
	app.set('view engine', 'pug');
	app.set('views', _path2.default.join(__dirname, '..', '..', 'view'));
	app.use('/template/:name([a-z]+)', function (req, res) {
		return res.render('template/' + req.params.name + '.pug');
	});
	app.use('/*', function (req, res) {
		return res.render('app.pug');
	});

	return app;
};

var _express = require('express'),
    _express2 = _interopRequireDefault(_express),
    _path = require('path'),
    _path2 = _interopRequireDefault(_path),
    _cdn = require('./cdn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }