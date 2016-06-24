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
	"intent": "sale",
	"payer": {
		"payment_method": "credit_card",
		"funding_instruments": [{
			"credit_card_token": {}
		}]
	},
	"transactions": []
};


export var name = 'card';
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
	paypal.credit_card.create(params.card, {}, (err, card) => {
		if(!_.isEmpty(card) || err){
			return callback(err || new Error('Not a card'));
		}

		var nowPay = _.clone( payment );
		nowPay.redirect_urls.return_url = params.success_url;
		nowPay.redirect_urls.cancel_url = params.cancel_url;
		nowPay.payer.funding_instruments[0].credit_card_token.credit_card_id = card;
		
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
				uid : resp.id,
				system : 'card'
			});
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