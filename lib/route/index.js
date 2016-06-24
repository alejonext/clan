'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var app = (0, _express2.default)();
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.text());
	app.use(_bodyParser2.default.raw());

	app.use(GLOBAL.CONFIG.server.app.api, (0, _api2.default)());
	app.use(GLOBAL.CONFIG.server.app.cdn, (0, _cdn2.default)());
	app.use((0, _master2.default)());

	return app;
};

var _express = require('express'),
    _express2 = _interopRequireDefault(_express),
    _cdn = require('./cdn'),
    _cdn2 = _interopRequireDefault(_cdn),
    _api = require('./api'),
    _api2 = _interopRequireDefault(_api),
    _master = require('./master'),
    _master2 = _interopRequireDefault(_master),
    _bodyParser = require('body-parser'),
    _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }