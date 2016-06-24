'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.schema = exports.name = undefined;

var _mongoose = require('mongoose'),
    _mongooseIntlPhoneNumber = require('mongoose-intl-phone-number'),
    _mongooseIntlPhoneNumber2 = _interopRequireDefault(_mongooseIntlPhoneNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_REG = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

var name = exports.name = 'pvd';
var schema = exports.schema = new _mongoose.Schema({
	public: { type: Boolean, required: true, default: true },
	lugar: { type: _mongoose.Schema.Types.ObjectId, ref: 'municipio', required: true },
	subdominio: { type: String, required: true, unique: true, trim: true, index: true },
	nombre: { type: String, required: true, unique: true, trim: true, index: true },
	contacto: {
		direccion: { type: String, required: true, trim: true, index: true },
		nombre: { type: String, trim: true, index: true }
	},
	status: { type: Number, min: 0, max: 3, default: 0 },
	evidencias: {
		// ToDo como sera las evidencias!?
		texts: [{ type: Number }],
		links: [{ type: String, lowercase: true, minlength: 5, match: URL_REG, trim: true }],
		image: [{ type: _mongoose.Schema.Types.ObjectId }]
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

schema.plugin(_mongooseIntlPhoneNumber2.default, {
	phoneNumberField: 'contacto.telefono'
});