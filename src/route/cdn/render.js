import collapse from 'bundle-collapser/plugin';
import sass from 'node-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import async from 'async';
import envify from 'envify/custom';

import mime from 'mime';
import {spawn} from 'child_process';

const hexa = ( new Buffer(process.env.npm_package_version, 'utf8' ) ).toString('hex');
const time = 31104000;
const jss = /(css|swf|map|otf|eot|svg|ttf|woff|woff2)$/i;
const not = /(?:Gruntfile|gulpfile|conf|example|demo|support|specs|builder|bin|readme|src|test|scss|\.\.)/i;

/**
 * Contrustructor de CSS
 * @param  {String}       Lugar donde se ecuentra el codigo
 * @param  {String}       Lugar donde se implemara el codigo compliado
 * @param  {Function}     Funciona para recibir si existe algun problema
 * @return {Void}
 */
function renderCSS (scr, out, cb){
	sass.render({
		file : scr,
		noLineComments: !GLOBAL.CONFIG.render.compress.style,
		sourceMapContents : !GLOBAL.CONFIG.render.compress.style,
		sourceComments : !GLOBAL.CONFIG.render.compress.style,
		outputStyle: GLOBAL.CONFIG.render.compress.style ? 'compressed' : 'nested',
		includePaths : [
			path.join(__dirname, '..', '..' , '..', 'public', 'style', 'lib' ),
			path.join(__dirname, '..', '..' , '..', 'public', 'style', 'contrib' )
		]
	},  (err, result) => {
		if(err){
			return cb(err);
		}

		fs.writeFile(out, result.css.toString().replace(/\}/g, '} '), 'utf8', err => {
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
function renderJS (raw, js, cb) {
	var b = browserify({ 
		debug: !GLOBAL.CONFIG.render.compress.script
	});

	function writes (err, data) {
		if(err){
			return cb(err);
		}

		var rend = data.toString();
		if(GLOBAL.CONFIG.render.compress.script){
			rend = rend.replace(/\t|\n|(\s){2,}/gm, '');
		}

		fs.writeFile(js, rend, err => {
			cb(err || js);
		});
	}

	try{
		b.transform(babelify);
		b.transform(envify(_.extend({
			version : process.env.npm_package_version,
			hash : ( new Buffer(process.env.npm_package_version, 'utf8' ) ).toString('hex'),
			where : GLOBAL.CONFIG.render.compress.script ? 'n' : 'name',
		}, GLOBAL.CONFIG.server.key, GLOBAL.CONFIG.server.app, GLOBAL.CONFIG.render)));
		b.require(raw, {
			entry: true,
			basedir: path.join( __dirname, '..', '..' , '..', 'public', 'script'),
			detectGlobals : true
		});
		
		if( GLOBAL.CONFIG.render.compress.script ){
			b.plugin(collapse);
			b.transform({
				global: true,
				mangle : {
					toplevel : true
				},
				compress: {
					sequences : true,
					dead_code : true,
					unsafe  : true,
					conditionals : true,
					comparisons : true,
					evaluate : true,
					booleans : true,
					unused : true,
					hoist_funs : true,
					hoist_vars : true,
					if_return : true,
					join_vars : true,
					cascade : true,
					collapse_vars : true,
					negate_iife : true,
					pure_getters : true,
					keep_fargs : true,
					keep_fnames : true
				}
			}, 'uglifyify');
		}
		b.on('error', err => { console.log('Error: ' + err.message); });
		b.bundle(writes);
	}catch(e){
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
export function hash (req, res, next, valor ){
	
	next(valor === hexa ? null : new Error('Is not the version') );
}
/**
 * Probador de File
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @param  {String}    		String para probar
 * @return {Void}
 */
export function file (req, res, next, valor, name ){
	req.params[ name ] = ( new Buffer(req.params[ name ], 'hex' ) ).toString('utf8');
	next();
}

/**
 * Colocando cache
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
export function cache (req, res, next) {
	var cc = '';
	if(time){
		cc += 'max-age=' + time + ',';
	}
	res.setHeader('Expires', moment().add(time, 'ms').toString() );
	res.setHeader('Cache-Control', cc + 'no-transform' );
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
export function component (req, res, next){
	if ( _.isEmpty(req.params[0]) || !jss.test(req.params[0]) || not.test(req.params[0]) || not.test(req.params.file) ){
		return next(new Error('Not Found'));
	}
	async.map(process.mainModule.paths, (uis, otro) => {
		var file = path.join(uis, _.dasherize(req.params.file), req.params[0]);
		fs.exists(file, exist => {
			otro( exist ? file : null );
		});
	}, (err, results) => {
		if(err){
			return next(err);
		}
		var file;
		for (var i = results.length - 1; i >= 0; i--) {
			if(results[i]){
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
export function CSS (req, res, next){
	if ( not.test(req.params.file) ){
		return next(new Error('Not Found'));
	}
	var scssPath = path.join(__dirname, '..', '..' , '..', 'public', 'style', req.params.file + '.scss' );
	var cssPath = path.join(GLOBAL.CONFIG.server.temp, req.params.file + '.css' );

	async.parallel({
		scss (callback){
			fs.stat(scssPath, callback);
		},
		css (callback){
			fs.exists(cssPath, exist => {
				if(exist){
					return fs.stat(cssPath, callback);
				}
				callback();
			});
		}
	}, (err, reslt) => {
		if(err && _.isEmpty(reslt.scss) ){
			return next(err);
		}
		
		if ( _.isEmpty(reslt.css) || reslt.scss.mtime > reslt.css.mtime || req.start ){
			return renderCSS(scssPath, cssPath, next );
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
export function IMG (req, res, next){
	if ( /\.\./.test(req.params.file) ){
		return next(new Error('Not Found'));
	}
	var com = path.join(__dirname, '..', '..' , '..', 'public', 'image', req.params.file.split('-')[0] + '.' + req.params.img );
	
	fs.stat(com, (err, exists) => {
		if(err || !exists.isFile() ){
			return next(new Error('No exist file'));
		}
		res.header('Last-Modified', moment(exists.mtime).toString() );
		//  '-depth', 10, '-colors', 50,
		var convert = spawn('convert', [ com, '+dither', '-resize', req.params.file.split('-')[1], '-' ]);
		res.contentType( mime.lookup(com) );
		convert.stdout.pipe( res );
	});
}

/**
 * Contruye el JS
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
export function JS (req, res, next) {
	var InPath = path.join( __dirname, '..', '..' , '..', 'public', 'script', req.params.file + '.js' );
	var OutPath = path.join(GLOBAL.CONFIG.server.temp, req.params.file + '.js' );

	async.parallel({
		ins (callback){
			fs.stat(InPath, callback);
		},
		out (callback){
			fs.exists(OutPath, exist => {
				if(exist){
					return fs.stat(OutPath, callback);
				}
				callback();
			});
		}
	}, (err, reslt) => {
		if(err && _.isEmpty(reslt.ins) ){
			return next(err);
		}

		if ( _.isEmpty(reslt.out) || reslt.ins.mtime > reslt.out.mtime  || req.start){
			return renderJS(InPath, OutPath, next );
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
export function send (file, req, res, next) {
	if( file instanceof Error || !_.isString(file)){
		return next( file instanceof Error ? file : new Error(file.toString().replace(/error(\s)?:/i, '') ) );
	}

	fs.stat(file, (err, exists) => {
		if(err || !exists.isFile() ){
			return next( err || new Error('Not exist file ' + file));
		}
		res.header('Last-Modified', moment(exists.mtime).toString() );
		res.contentType( mime.lookup(file) );
		res.header('Content-Length', exists.size );
		var stream = fs.ReadStream( file );
		stream.setMaxListeners(0);
		//res.on('close', stream.destroy );
		stream.pipe( res );
	});
}

/**
 * Render de HTML
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
export function html (req, res) {
	res.render(req.params.file);
}