import {Schema} from 'mongoose';
import * as gateway from '../gateway';

/**
 *	Status		Sig
 *		0 -> Espera
 *		1 -> Pago relaizado
 *		2 -> Error
 */

export const name = 'donacion';
export var schema = new Schema({
	public   : { type : Boolean, required : true, default : true },
	para     : { type : Schema.Types.ObjectId, ref: 'pvd', index : true },
	total    : { type : Number, min : 0, required : true },
	moneda   : { type : String, required : true, trim : true, index : true, enum: gateway.currency, uppercase: true },
	status   : { type : Number, Min: 0, Max: 2, default : 0 },
	// ToDo Montar sistema de donacion
	metodo   : { type : String, required : true, trim : true, index : true, enum: gateway.list }
});

schema.virtual('redirect').get(function () {
	return this.metodo === 'paypal' ;
});

schema.virtual('cancel_url').get(function () {
	return GLOBAL.CONFIG.servers.app.api + name + '/cancel/' + this._id.toString();
});

schema.virtual('success_url').get(function () {
	return GLOBAL.CONFIG.servers.app.api + name + '/' + this._id.toString();
});

schema.virtual('methodExec').get(function () {
	return gateway[this.metodo];
});

schema.method({
	createPayment (data, cb) {
		if(!this.methodExec){
			return cb(new Error('Not exist method'));
		}
		this.methodExec.config()
		let param = _.clone(this.toJSON());
		_.extend(param, data);
		this.methodExec.get(param, (err, data) => {
			if(err){
				return cb(err);
			}

			this.uuid = data.uid;
			cb(err, data);
		});
	},
	confrimPayment (query, cb) {
		if(!this.methodExec){
			return cb(new Error('Not exist method'));
		}
		this.methodExec.config()
		var param = _.clone(this.toJSON());
		this.methodExec.confirm(param, query, cb);
	}
});