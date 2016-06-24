'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.icon = exports.more = exports.tax = exports.name = undefined;
exports.config = config;
exports.get = get;
exports.confirm = confirm;

var _coinbaseService = require('coinbase-service'),
    _coinbaseService2 = _interopRequireDefault(_coinbaseService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stats = {
	'completed': 1,
	'pending': 0,
	'create': 0,
	'cancelled': 2,
	'expired': 2,
	'mispaid': 0
},
    payment = {
	'price_currency_iso': 'USD',
	'type': 'buy_now',
	'price_string': 0,
	'custom': '',
	'repeat': false,
	'subscription': false,
	'success_url': '',
	'cancel_url': '',
	'description': '',
	'auto_redirect': true,
	'auto_redirect_success': true,
	'auto_redirect_cancel': true
},
    coinbase = void 0;

var name = exports.name = 'coinbase';
var tax = exports.tax = 0.0001;
var more = exports.more = 0;
var icon = exports.icon = 'bitcoin';

function config() {
	coinbase = new _coinbaseService2.default(GLOBAL.CONFIG.server.key.coinbase.key, GLOBAL.CONFIG.server.key.coinbase.secret);
}

// Recibir dinero
function get(params, callback) {
	var nowPay = _.defaults(params, payment);

	nowPay.price_string = params.price;
	nowPay.name = params.title || 'Donacion'; // TODO MODIFICAR
	nowPay.description = GLOBAL.CONFIG.server.description;

	coinbase.button({
		button: nowPay
	}, function (err, resp) {
		callback(err, !_.isEmpty(resp) ? {
			redirect: false,
			include: false,
			iframe: true,
			url: 'https://www.coinbase.com/checkouts/' + resp.button.code + '/inline',
			uid: resp.button.code,

			system: name,
			raw: resp.button
		} : resp);
	});
}

// Confirmacion
function confirm(params, query, callback) {
	coinbase.orders.get(params._id, function (err, resp) {
		callback(err, _.isObject(resp) && !err ? {
			uuid: resp.order.id,
			status: stats[resp.order.status],
			confirm: resp.order.transaction.confirmations,
			system: name,
			update: new Date(),
			raw: resp
		} : null);
	});
}