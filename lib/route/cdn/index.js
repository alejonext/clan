'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cache = cache;

exports.default = function () {
	var app = (0, _express2.default)(),
	    isImg = ':img(jpg|gif|png|ico)';

	app.set('x-powered-by', false);
	//app.use(render.cache);
	app.param('file', render.file);
	app.param('hash', render.hash);

	app.all('/lib/:hash.:file/*', render.component, render.send); // Explorador de librerias
	app.all('/css/:hash.:file.css', render.CSS, render.send); // Renderizador de CSS
	app.all('/js/:hash.:file.js', render.JS, render.send); // Rendirizador de JavaScript
	app.all('/' + isImg + '/:hash.:file.' + isImg, render.IMG); // Rendirazador de Imagenes simples
	app.all('/html/:hash.:file.html', render.html); // Renderizador de HTML

	return app;
};

var _express = require('express'),
    _express2 = _interopRequireDefault(_express),
    _url = require('url'),
    _url2 = _interopRequireDefault(_url),
    _path = require('path'),
    _path2 = _interopRequireDefault(_path),
    _render = require('./render'),
    render = _interopRequireWildcard(_render),
    _underscore = require('underscore.string'),
    _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MES = /http(s)?\:/i;
/**
 * Contrustructor de direciones par archivos estaticos
 * @param  {String}  pat   Carpeta o archivo
 * @param  {Boolean} isLib Si pertenece a uan libreria
 * @return {String}        URL para hacer la peticion
 */
function cache(pat, isLib) {
	var SSL_CDN = GLOBAL.CONFIG.server.ssl ? 's' : '',
	    cdns = _url2.default.parse(GLOBAL.CONFIG.server.app.cdn),
	    types = _underscore2.default.strRightBack(pat, '.'),
	    has = new Buffer(process.env.npm_package_version, 'utf8').toString('hex');

	delete cdns.url;
	delete cdns.search;
	delete cdns.href;
	cdns.query = {
		v: process.env.npm_package_version
	};

	cdns.pathname += '/';

	if (types.length < 0) {
		return new Error('Not GLOBAL.path file');
	}
	if (isLib) {
		var encode = new Buffer(_underscore2.default.strLeft(pat, '/'), 'utf8');
		cdns.pathname += _path2.default.join('lib', has + '.' + encode.toString('hex'), _underscore2.default.strRight(pat, '/'));
		return _url2.default.format(cdns).replace(MES, 'http' + SSL_CDN + ':');
	} else {
		var paz = new Buffer(_underscore2.default.strLeft(pat, '.'), 'utf8').toString('hex');
		cdns.pathname += _path2.default.join(types, has + '.' + paz + '.' + types);
		return _url2.default.format(cdns).replace(MES, 'http' + SSL_CDN + ':');
	}
}

/**
 * @return {Object}      Apiccion de express configurada para emitir archivos estaticos
 */