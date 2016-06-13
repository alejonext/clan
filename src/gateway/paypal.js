import paypal from 'paypal-rest-sdk';
import _ from 'underscore';

const stats = {
	approved : 1,
	canceled : 2,
	created : 0,
	expired : 2,
	failed : 2, 
	mispaid : 0,
	pending : 0,
};

const payment = {
	'intent': 'sale',
	'redirect_urls': {
		'return_url': '',
		'cancel_url': ''
	},
	'payer': {
		'payment_method': 'paypal'
	},
	'transactions': []
};


export var name = 'paypal';
export var tax = 0.054;
export var more = 0.33;
export var icon = 'cc-paypal';

export function config() {
	paypal.configure({
		'mode': 'sandbox', //sandbox or live
		'client_id': GLOBAL.CONFIG.server.key.paypal.key,
		'client_secret': GLOBAL.CONFIG.server.key.paypal.secret
	});
}

export function get (params, callback) {
	var nowPay = _.clone( payment );
	nowPay.redirect_urls.return_url = params.success_url;
	nowPay.redirect_urls.cancel_url = params.cancel_url;

	nowPay.transactions.push({
		'amount': {
			'currency': 'USD',
			'total' : params.total
		},
		'description' : GLOBAL.CONFIG.server.description
	});

	paypal.payment.create( nowPay, (err, resp) => {
		if(err || _.isEmpty(resp)){
			return callback(err || new Error('No transacion'));
		}
		callback(err,{
			redirect : true,
			include : false,
			url : _.find( resp.links, num => num.rel === 'approval_url' ).href,
			uid : resp.id,
			system : 'paypal'
		});
	});
}

export function confirm (params, query, callback) {
	paypal.payment.execute( params.uuid, {
		payer_id : query.p
	}, {}, (err, resp) => {
		callback(err, _.isObject(resp) && !err ? {
			uuid	: resp.id,
			status	: stats[resp.state],
			confirm : resp.payer.payment_method,
			update  : new Date( resp.update_time ),
			system 	: module.exports.name,
			raw 	: resp
		} : null);
	});
}