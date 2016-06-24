'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.schema = exports.name = undefined;

var _mongoose = require('mongoose'),
    _mongooseIntlPhoneNumber = require('mongoose-intl-phone-number'),
    _mongooseIntlPhoneNumber2 = _interopRequireDefault(_mongooseIntlPhoneNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMAIL_REG = /^[a-z|0-9]{1}[a-z|0-9|.|_|-]{1,32}@[a-z|0-9|-]{1,15}(.(ac|ad|ae(ro)?|af|ag|ai|al|am|an|ao|aq|ar|as(ia)?|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi(z)?|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca(t)?|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co(m|op)?|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu(s)?|fi|fj|fk|fm|fo|fr|ga(l)?|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in(fo|t)?|io|iq|ir|is|it|je|jm|jo(bs)?|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo(bi)?|mp|mq|mr|ms|mt|mu(seum)?|mv|mw|mx|my|mz|na(me)?|nc|ne(t)?|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|post|pr(o)?|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr(avel)?|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xxx|ye|yt|yu|za|zm|zw)){1,2}$/i,
    URL_REG = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    departamento = 'opening open closing closed'.split(' ');
var name = exports.name = 'municipio';
var schema = exports.schema = new _mongoose.Schema({
	public: { type: Boolean, required: true, default: true },
	departamento: { type: String, required: true, trim: true, index: true, enum: departamento, uppercase: true },
	municipio: { type: String, required: true, trim: true, index: true },
	alcalde: { type: String, required: true, unique: true, trim: true, index: true },
	direccion: { type: String, required: true, trim: true, index: true },
	email: [{ type: String, lowercase: true, minlength: 5, match: EMAIL_REG, trim: true }],
	web: { type: String, lowercase: true, minlength: 5, match: URL_REG, trim: true }
});

schema.virtual('nombre').get(function () {
	return this.departamento + ', ' + this.municipio;
});

schema.plugin(_mongooseIntlPhoneNumber2.default, {
	phoneNumberField: 'telefono'
});