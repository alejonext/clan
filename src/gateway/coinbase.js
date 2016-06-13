import api from 'coinbase-service';

const stats = {
	'completed' : 1,
	'pending' : 0,
	'create' : 0,
	'cancelled': 2,
	'expired' : 2,
	'mispaid' : 0
};

const payment = {
	'price_currency_iso': 'USD',
	'type': 'buy_now',
	'price_string': 0,
	'custom': '',
	'repeat' : false,
	'subscription': false,
	'success_url': '',
	'cancel_url' : '',
	'description': '',
	'auto_redirect': true,
	'auto_redirect_success': true,
	'auto_redirect_cancel': true,
};

var coinbase;

export var name = 'coinbase';
export var tax = 0.0001;
export var more = 0;
export var icon = 'bitcoin';

export function config () {
	coinbase = new api(GLOBAL.CONFIG.server.key.coinbase.key, GLOBAL.CONFIG.server.key.coinbase.secret);
}

// Recibir dinero
export function get (params, callback) {
	var nowPay = _.defaults( params, payment );

	nowPay.price_string = params.price;
	nowPay.name = params.title || 'Donacion'; // TODO MODIFICAR
	nowPay.description = GLOBAL.CONFIG.server.description;

	coinbase.button({
		button : nowPay
	}, ( err, resp ) => {
		callback(err, !_.isEmpty(resp) ? {
			redirect: false,
			include : false,
			iframe 	: true,
			url 	: 'https://www.coinbase.com/checkouts/' + resp.button.code + '/inline',
			uid		: resp.button.code,

			system 	: name,
			raw		: resp.button
		} : resp);
	});
}

// Confirmacion
export function confirm (params, query, callback) {
	coinbase.orders.get( params._id, (err, resp) => {
		callback(err, _.isObject(resp) && !err ? {
			uuid	: resp.order.id,
			status	: stats[resp.order.status],
			confirm : resp.order.transaction.confirmations,
			system 	: name,
			update  : new Date(),
			raw 	: resp
		} : null);
	});
}
