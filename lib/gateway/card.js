'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.icon = exports.more = exports.tax = exports.name = undefined;
exports.config = config;
exports.get = get;
exports.confirm = confirm;

var _paypalRestSdk = require('paypal-rest-sdk'),
    _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk),
    _underscore = require('underscore'),
    _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stats = {
	approved: 1,
	canceled: 2,
	created: 0,
	expired: 2,
	failed: 2,
	mispaid: 0,
	pending: 0
},
    payment = {
	"intent": "sale",
	"payer": {
		"payment_method": "credit_card",
		"funding_instruments": [{
			"credit_card_token": {}
		}]
	},
	"transactions": []
};

var name = exports.name = 'card';
var tax = exports.tax = 0.054;
var more = exports.more = 0.33;
var icon = exports.icon = 'cc-paypal';

function config() {
	_paypalRestSdk2.default.configure({
		'mode': 'sandbox', //sandbox or live
		'client_id': GLOBAL.CONFIG.server.key.paypal.key,
		'client_secret': GLOBAL.CONFIG.server.key.paypal.secret
	});
}

function get(params, callback) {
	_paypalRestSdk2.default.credit_card.create(params.card, {}, function (err, card) {
		if (!_underscore2.default.isEmpty(card) || err) {
			return callback(err || new Error('Not a card'));
		}

		var nowPay = _underscore2.default.clone(payment);
		nowPay.redirect_urls.return_url = params.success_url;
		nowPay.redirect_urls.cancel_url = params.cancel_url;
		nowPay.payer.funding_instruments[0].credit_card_token.credit_card_id = card;

		nowPay.transactions.push({
			'amount': {
				'currency': 'USD',
				'total': params.total
			},
			'description': GLOBAL.CONFIG.server.description
		});

		_paypalRestSdk2.default.payment.create(nowPay, function (err, resp) {
			if (err || _underscore2.default.isEmpty(resp)) {
				return callback(err || new Error('No transacion'));
			}
			callback(err, {
				redirect: true,
				include: false,
				uid: resp.id,
				system: 'card'
			});
		});
	});
}

function confirm(params, query, callback) {
	_paypalRestSdk2.default.payment.execute(params.uuid, {
		payer_id: query.p
	}, {}, function (err, resp) {
		callback(err, _underscore2.default.isObject(resp) && !err ? {
			uuid: resp.id,
			status: stats[resp.state],
			confirm: resp.payer.payment_method,
			update: new Date(resp.update_time),
			system: module.exports.name,
			raw: resp
		} : null);
	});
}