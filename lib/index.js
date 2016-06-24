'use strict';

var _underscore = require('underscore'),
    _underscore2 = _interopRequireDefault(_underscore),
    _konfig = require('konfig'),
    _konfig2 = _interopRequireDefault(_konfig),
    _route = require('./route'),
    _route2 = _interopRequireDefault(_route),
    _data = require('./data'),
    _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = './config';

process.env.OPENSHIFT_NODEJS_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
process.env.OPENSHIFT_NODEJS_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
GLOBAL._ = _underscore2.default;
GLOBAL.CONFIG = (0, _konfig2.default)({ path: path });
GLOBAL.db = (0, _data2.default)(GLOBAL.CONFIG.server.mongo);

(0, _route2.default)().listen(GLOBAL.CONFIG.server.port, GLOBAL.CONFIG.server.ip, function (error) {
	if (error) {
		console.error(error);
	}
});