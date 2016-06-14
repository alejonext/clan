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
	email    : { type : String, trim : true },
	// ToDo Montar sistema de donacion
	metodo   : { type : String, required : true, trim : true, index : true, enum: gateway.list }
});

schema.virtual('redirect').get(function () {
	return this.metodo === 'paypal' ;
});

schema.virtual('cancel_url').get(function () {
	return `${GLOBAL.CONFIG.servers.app.api}/${name}/${GLOBAL.CONFIG.server.confirm}/${this._id.toString()}/confirm`;
});

schema.virtual('success_url').get(function () {
	return `${GLOBAL.CONFIG.servers.app.api}/${name}/${GLOBAL.CONFIG.server.confirm}/${this._id.toString()}/confirm`;
});

schema.virtual('certificate').get(function () {
	return `${name}/certificate/${this._id.toString()}`;
});

schema.virtual('methodExec').get(function () {
	return gateway[this.metodo];
});

schema.method({
	
/**
 * @param  {Object}		Elemeto para configurar el botn
 * @param  {Function}	Callback
 * @return {Void}
 */
	createPayment (ex, cb) {
		if(!this.methodExec){
			return cb(new Error('Not exist method'));
		}
		this.methodExec.config()
		let param = _.clone(this.toJSON());
		_.extend(param, ex);
		this.methodExec.get(param, (err, data) => {
			if(err){
				return cb(err);
			}
			this.uuid = data.uid;
			this.save((err, doc) => {
				let js = doc.toJSON();
				js.payment = data;
				cb(err, js);
			});
		});
	},

/**
 * @param  {Object}		Query de la URL
 * @param  {Function}	Callback
 * @return {Void}
 */
	confrimPayment (query, cb) {
		if(!this.methodExec){
			return cb(new Error('Not exist method'));
		}
		this.methodExec.config()
		var param = _.clone(this.toJSON());
		this.methodExec.confirm(param, query, cb);
	}
});