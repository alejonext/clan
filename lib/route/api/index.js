'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var app = (0, _express2.default)();

	app.use('/donation', (0, _done2.default)());
	app.use('/people', (0, _people2.default)());
	app.use('/pvd', (0, _pvd2.default)());

	return app;
};

var _express = require('express'),
    _express2 = _interopRequireDefault(_express),
    _done = require('./done'),
    _done2 = _interopRequireDefault(_done),
    _pvd = require('./pvd'),
    _pvd2 = _interopRequireDefault(_pvd),
    _people = require('./people'),
    _people2 = _interopRequireDefault(_people);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }