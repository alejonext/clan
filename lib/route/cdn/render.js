'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hash = hash;
exports.file = file;
exports.cache = cache;
exports.component = component;
exports.CSS = CSS;
exports.IMG = IMG;
exports.JS = JS;
exports.send = send;
exports.html = html;

var _plugin = require('bundle-collapser/plugin'),
    _plugin2 = _interopRequireDefault(_plugin),
    _nodeSass = require('node-sass'),
    _nodeSass2 = _interopRequireDefault(_nodeSass),
    _browserify = require('browserify'),
    _browserify2 = _interopRequireDefault(_browserify),
    _babelify = require('babelify'),
    _babelify2 = _interopRequireDefault(_babelify),
    _moment = require('moment'),
    _moment2 = _interopRequireDefault(_moment),
    _fs = require('fs'),
    _fs2 = _interopRequireDefault(_fs),
    _path = require('path'),
    _path2 = _interopRequireDefault(_path),
    _async = require('async'),
    _async2 = _interopRequireDefault(_async),
    _custom = require('envify/custom'),
    _custom2 = _interopRequireDefault(_custom),
    _mime = require('mime'),
    _mime2 = _interopRequireDefault(_mime),
    _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexa = new Buffer(process.env.npm_package_version, 'utf8').toString('hex'),
    time = 31104000,
    jss = /(css|swf|map|otf|eot|svg|ttf|woff|woff2)$/i,
    not = /(?:Gruntfile|gulpfile|conf|example|demo|support|specs|builder|bin|readme|src|test|scss|\.\.)/i;


/**
 * Contrustructor de CSS
 * @param  {String}       Lugar donde se ecuentra el codigo
 * @param  {String}       Lugar donde se implemara el codigo compliado
 * @param  {Function}     Funciona para recibir si existe algun problema
 * @return {Void}
 */
function renderCSS(scr, out, cb) {
	_nodeSass2.default.render({
		file: scr,
		noLineComments: !GLOBAL.CONFIG.render.compress.style,
		sourceMapContents: !GLOBAL.CONFIG.render.compress.style,
		sourceComments: !GLOBAL.CONFIG.render.compress.style,
		outputStyle: GLOBAL.CONFIG.render.compress.style ? 'compressed' : 'nested',
		includePaths: [_path2.default.join(__dirname, '..', '..', '..', 'public', 'style', 'lib'), _path2.default.join(__dirname, '..', '..', '..', 'public', 'style', 'contrib')]
	}, function (err, result) {
		if (err) {
			return cb(err);
		}

		_fs2.default.writeFile(out, result.css.toString().replace(/\}/g, '} '), 'utf8', function (err) {
			cb(err || out);
		});
	});
}

/**
 * Contrustructor SCRIPTS en Javascript
 * @param  {String}       Lugar donde se ecuentra el codigo
 * @param  {String}       Lugar donde se implemara el codigo compliado
 * @param  {Function}     Funciona para recibir si existe algun problema
 * @return {Void}
 */
function renderJS(raw, js, cb) {
	var b = (0, _browserify2.default)({
		debug: !GLOBAL.CONFIG.render.compress.script
	});

	function writes(err, data) {
		if (err) {
			return cb(err);
		}

		var rend = data.toString();
		if (GLOBAL.CONFIG.render.compress.script) {
			rend = rend.replace(/\t|\n|(\s){2,}/gm, '');
		}

		_fs2.default.writeFile(js, rend, function (err) {
			cb(err || js);
		});
	}

	try {
		b.transform(_babelify2.default);
		b.transform((0, _custom2.default)(_.extend({
			version: process.env.npm_package_version,
			hash: new Buffer(process.env.npm_package_version, 'utf8').toString('hex'),
			where: GLOBAL.CONFIG.render.compress.script ? 'n' : 'name'
		}, GLOBAL.CONFIG.server.key, GLOBAL.CONFIG.server.app, GLOBAL.CONFIG.render)));
		b.require(raw, {
			entry: true,
			basedir: _path2.default.join(__dirname, '..', '..', '..', 'public', 'script'),
			detectGlobals: true
		});

		if (GLOBAL.CONFIG.render.compress.script) {
			b.plugin(_plugin2.default);
			b.transform({
				global: true,
				mangle: {
					toplevel: true
				},
				compress: {
					sequences: true,
					dead_code: true,
					unsafe: true,
					conditionals: true,
					comparisons: true,
					evaluate: true,
					booleans: true,
					unused: true,
					hoist_funs: true,
					hoist_vars: true,
					if_return: true,
					join_vars: true,
					cascade: true,
					collapse_vars: true,
					negate_iife: true,
					pure_getters: true,
					keep_fargs: true,
					keep_fnames: true
				}
			}, 'uglifyify');
		}
		b.on('error', function (err) {
			console.log('Error: ' + err.message);
		});
		b.bundle(writes);
	} catch (e) {
		cb(e);
	}
}

/**
 * Probador de HASH
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @param  {String}    		String para probar
 * @return {Void}
 */
function hash(req, res, next, valor) {
	next(valor === hexa ? null : new Error('Is not the version'));
}
/**
 * Probador de File
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @param  {String}    		String para probar
 * @return {Void}
 */
function file(req, res, next, valor, name) {
	req.params[name] = new Buffer(req.params[name], 'hex').toString('utf8');
	next();
}

/**
 * Colocando cache
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function cache(req, res, next) {
	var cc = '';
	if (time) {
		cc += 'max-age=' + time + ',';
	}
	res.setHeader('Expires', (0, _moment2.default)().add(time, 'ms').toString());
	res.setHeader('Cache-Control', cc + 'no-transform');
	res.setHeader('X-Cache', 'HIT');
	next();
}

/**
 * Probador de Componete
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function component(req, res, next) {
	if (_.isEmpty(req.params[0]) || !jss.test(req.params[0]) || not.test(req.params[0]) || not.test(req.params.file)) {
		return next(new Error('Not Found'));
	}
	_async2.default.map(process.mainModule.paths, function (uis, otro) {
		var file = _path2.default.join(uis, _.dasherize(req.params.file), req.params[0]);
		_fs2.default.exists(file, function (exist) {
			otro(exist ? file : null);
		});
	}, function (err, results) {
		if (err) {
			return next(err);
		}
		var file;
		for (var i = results.length - 1; i >= 0; i--) {
			if (results[i]) {
				file = results[i];
			}
		}

		next(file || new Error('No exist the file'));
	});
}

/**
 * Generador CSS
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function CSS(req, res, next) {
	if (not.test(req.params.file)) {
		return next(new Error('Not Found'));
	}
	var scssPath = _path2.default.join(__dirname, '..', '..', '..', 'public', 'style', req.params.file + '.scss'),
	    cssPath = _path2.default.join(GLOBAL.CONFIG.server.temp, req.params.file + '.css');


	_async2.default.parallel({
		scss: function scss(callback) {
			_fs2.default.stat(scssPath, callback);
		},
		css: function css(callback) {
			_fs2.default.exists(cssPath, function (exist) {
				if (exist) {
					return _fs2.default.stat(cssPath, callback);
				}
				callback();
			});
		}
	}, function (err, reslt) {
		if (err && _.isEmpty(reslt.scss)) {
			return next(err);
		}

		if (_.isEmpty(reslt.css) || reslt.scss.mtime > reslt.css.mtime || req.start) {
			return renderCSS(scssPath, cssPath, next);
		}

		next(cssPath);
	});
}

/**
 * Envia la imagen a su respectivo tamaña IMG
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function IMG(req, res, next) {
	if (/\.\./.test(req.params.file)) {
		return next(new Error('Not Found'));
	}
	var com = _path2.default.join(__dirname, '..', '..', '..', 'public', 'image', req.params.file.split('-')[0] + '.' + req.params.img);

	_fs2.default.stat(com, function (err, exists) {
		if (err || !exists.isFile()) {
			return next(new Error('No exist file'));
		}
		res.header('Last-Modified', (0, _moment2.default)(exists.mtime).toString());
		//  '-depth', 10, '-colors', 50,
		var convert = (0, _child_process.spawn)('convert', [com, '+dither', '-resize', req.params.file.split('-')[1], '-']);
		res.contentType(_mime2.default.lookup(com));
		convert.stdout.pipe(res);
	});
}

/**
 * Contruye el JS
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function JS(req, res, next) {
	var InPath = _path2.default.join(__dirname, '..', '..', '..', 'public', 'script', req.params.file + '.js'),
	    OutPath = _path2.default.join(GLOBAL.CONFIG.server.temp, req.params.file + '.js');


	_async2.default.parallel({
		ins: function ins(callback) {
			_fs2.default.stat(InPath, callback);
		},
		out: function out(callback) {
			_fs2.default.exists(OutPath, function (exist) {
				if (exist) {
					return _fs2.default.stat(OutPath, callback);
				}
				callback();
			});
		}
	}, function (err, reslt) {
		if (err && _.isEmpty(reslt.ins)) {
			return next(err);
		}

		if (_.isEmpty(reslt.out) || reslt.ins.mtime > reslt.out.mtime || req.start) {
			return renderJS(InPath, OutPath, next);
		}

		next(OutPath);
	});
}

/**
 * Envia archivos SEND
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function send(file, req, res, next) {
	if (file instanceof Error || !_.isString(file)) {
		return next(file instanceof Error ? file : new Error(file.toString().replace(/error(\s)?:/i, '')));
	}

	_fs2.default.stat(file, function (err, exists) {
		if (err || !exists.isFile()) {
			return next(err || new Error('Not exist file ' + file));
		}
		res.header('Last-Modified', (0, _moment2.default)(exists.mtime).toString());
		res.contentType(_mime2.default.lookup(file));
		res.header('Content-Length', exists.size);
		var stream = _fs2.default.ReadStream(file);
		stream.setMaxListeners(0);
		//res.on('close', stream.destroy );
		stream.pipe(res);
	});
}

/**
 * Render de HTML
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
function html(req, res) {
	res.render(req.params.file);
}