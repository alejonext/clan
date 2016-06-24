'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.currency = exports.list = exports.method = undefined;

var _paypal = require('./paypal'),
    paypal = _interopRequireWildcard(_paypal),
    _coinbase = require('./coinbase'),
    coinbase = _interopRequireWildcard(_coinbase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var method = exports.method = { paypal: paypal, coinbase: coinbase };
var list = exports.list = [];
var currency = exports.currency = 'USD BTC COP EUR'.split(' ');

for (var x in method) {
	list.push(method[x].name);
}