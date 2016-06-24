'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (uris) {
	var urs = null;
	if (typeof uris != 'string') {
		uris.auth = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
		urs = (0, _url.format)(uris);
	}

	_mongoose2.default.connect(urs || uris);
	_mongoose2.default.model(done.name, done.schema);
	_mongoose2.default.model(pvd.name, pvd.schema);
	_mongoose2.default.model(people.name, people.schema);
	_mongoose2.default.model(municipio.name, municipio.schema);

	return _mongoose2.default;
};

var _mongoose = require('mongoose'),
    _mongoose2 = _interopRequireDefault(_mongoose),
    _done = require('./done'),
    done = _interopRequireWildcard(_done),
    _municipio = require('./municipio'),
    municipio = _interopRequireWildcard(_municipio),
    _pvd = require('./pvd'),
    pvd = _interopRequireWildcard(_pvd),
    _people = require('./people'),
    people = _interopRequireWildcard(_people),
    _url = require('url');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }