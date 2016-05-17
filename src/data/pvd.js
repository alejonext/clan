import {Schema} from 'mongoose';
import phoneNumber from 'mongoose-intl-phone-number';
const URL_REG = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export const name = 'pvd';
export var schema = new Schema({
	public     : { type : Boolean, required : true, default : true },
	lugar      : { type : Schema.Types.ObjectId, ref: 'municipio', required : true  },
	subdominio : { type : String, required : true, unique : true, trim : true, index : true },
	nombre     : { type : String, required : true, unique : true, trim : true, index : true },
	contacto   : {
		direccion : { type : String, required : true, trim : true, index : true },
		nombre    : { type : String, trim : true, index : true },
	},
	status     : { type: Number, min: 0, max: 3, default : 0 },
	evidencias : {
		// ToDo como sera las evidencias!?
		texts : [ { type : Number } ],
		links : [ { type: String, lowercase: true, minlength: 5, match : URL_REG, trim: true } ],
		image : [ { type : Schema.Types.ObjectId } ],
	}
});

schema.virtual('URL').get(function () {
	return GLOBAL.CONFIG.server.app.api.replace('api', this.subdominio);
});

schema.virtual('isDonate').get(function () {
	return this.status === 1;
});

schema.virtual('isActive').get(function () {
	return this.status === 2;
});

schema.virtual('isDone').get(function () {
	return this.status === 3;
});

schema.plugin(phoneNumber, {
	phoneNumberField: 'contacto.telefono'
});
