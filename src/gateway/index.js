
import * as paypal from './paypal';
import * as card from './card';

export var method = { paypal, coinbase, card };
export var list = [];
export var currency = 'USD BTC COP EUR'.split(' ');

for (let x in method) {
	list.push(method[x].name);
}
