import * as moment from "moment";
//
import * as fs from "fs";

import { join } from "path";
import { tmpdir } from 'os';
import { lookup } from "mime";
import { spawn } from "child_process";

import * as _ from "underscore";

const async = require("async");
const sass = require("node-sass");

const COMPRESS = true;
const ROOT = join(__dirname, '..', '..', '..', 'public');
const TIME = 31104000;
const JSS = /(css|swf|map|otf|eot|svg|ttf|woff|woff2|js)$/i;
const NOT = /(?:Gruntfile|gulpfile|conf|example|demo|support|specs|builder|bin|readme|src|test|scss|\.\.)/i;

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
		noLineComments: !COMPRESS,
		sourceMapContents : !COMPRESS,
		sourceComments : !COMPRESS,
		outputStyle: COMPRESS ? 'compressed' : 'nested',
		includePaths : [
			join(ROOT, 'style', 'lib' ),
			join(ROOT, 'style', 'contrib' )
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
 * Colocando cache
 * @param  {Object}    		Objecto de request
 * @param  {Object}    		Objecto de responce
 * @param  {Function}    	Funcion para seguir el siguente paso
 * @return {Void}
 */
export function cache (req, res, next) {
	var cc = '';
	if(TIME){
		cc += 'max-age=' + TIME + ',';
	}
	res.setHeader('Expires', moment().add(TIME, 'ms').toString() );
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
	if ( _.isEmpty(req.params[0]) || !JSS.test(req.params[0]) || NOT.test(req.params[0]) || NOT.test(req.params.file)){
		return next(new Error('NOT Found'));
	}

	async.map(process.mainModule.paths, (uis, otro) => {
		var file = join(uis, _.dasherize(req.params.file), req.params[0]);
		fs.exists(file, found => {
			otro( found ? file : null );
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
	if ( NOT.test(req.params.file) ){
		return next(new Error('Not Found'));
	}
	var scssPath = join(ROOT, 'style', req.params.file + '.scss' );
	var cssPath = join(tmpdir(), req.params.file + '.css' );
	async.parallel({
		scss (callback){
			fs.stat(scssPath, callback);
		},
		css (callback){
			fs.exists(cssPath, found => {
				if(found){
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
	var com = join(ROOT, 'image', req.params.file.split('-')[0] + '.' + req.params.img );

	fs.stat(com, (err, found) => {
		if(err || !found.isFile() ){
			return next(new Error('No exist file'));
		}
		res.header('Last-Modified', moment(found.mtime).toString() );
		//  '-depth', 10, '-colors', 50,
		var convert = spawn('convert', [ com, '+dither', '-resize', req.params.file.split('-')[1], '-' ]);
		res.contentType( lookup(com) );
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
	if ( NOT.test(req.params.file) ){
		return next(new Error('Not Found'));
	}

	var InPath = join( ROOT, 'script', req.params.file + '.js' );
	next(InPath || new Error('No exist the file'));
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

	fs.stat(file, (err, found) => {
		if(err || !found.isFile() ){
			return next( err || new Error('Not exist file ' + file));
		}
		res.header('Last-Modified', moment(found.mtime).toString() );
		res.contentType( lookup(file) );
		res.header('Content-Length', found.size );
		var stream = fs.ReadStream( file );
		stream.setMaxListeners(0);
		//res.on('close', stream.destroy );
		stream.pipe( res );
	});
}
