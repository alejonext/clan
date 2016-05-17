import * as paypal from './paypal';
import * as coinbase from './coinbase';

export var method = { paypal, coinbase };
export var list = [];
export var currency = 'USD BTC COP EUR'.split(' ');

for (let x in method) {
	list.push(method[x].name);
}
