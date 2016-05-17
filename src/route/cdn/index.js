import express from 'express';
import url from 'url';
import path from 'path';
import * as render from './render';
import string from 'underscore.string';

const MES = /http(s)?\:/i;
/**
 * Contrustructor de direciones par archivos estaticos
 * @param  {String}  pat   Carpeta o archivo
 * @param  {Boolean} isLib Si pertenece a uan libreria
 * @return {String}        URL para hacer la peticion
 */

export function cache ( pat, isLib){
	let SSL_CDN = GLOBAL.CONFIG.server.ssl ? 's' : '';
	let cdns = url.parse( GLOBAL.CONFIG.server.app.cdn );
	let types = string.strRightBack( pat, '.');
	let has = ( new Buffer(process.env.npm_package_version, 'utf8' ) ).toString('hex');
	delete cdns.url;
	delete cdns.search;
	delete cdns.href;
	cdns.query = {
		v : process.env.npm_package_version
	};

	cdns.pathname += '/';
	
	if( types.length < 0 ){
		return new Error('Not GLOBAL.path file');
	}
	if( isLib ){
		let encode = new Buffer( string.strLeft(pat, '/'), 'utf8' );
		cdns.pathname += path.join( 'lib', has  +'.'+ encode.toString('hex'), string.strRight(pat, '/') );
		return url.format(cdns).replace(MES, 'http' + SSL_CDN + ':');
	} else {
		let paz = ( new Buffer( string.strLeft(pat, '.'), 'utf8' ) ).toString('hex');
		cdns.pathname += path.join( types, has +'.'+ paz + '.' + types );
		return url.format(cdns).replace(MES, 'http' + SSL_CDN + ':');
	}
}

export default function () {
	var app = express();

	let isImg = ':img(jpg|gif|png|ico)';

	app.set('x-powered-by', false);
	//app.use(render.cache);
	app.param('file',	render.file );
	app.param('hash',	render.hash );

	app.all('/lib/:hash.:file/*',	render.component, render.send ); // Explorador de librerias
	app.all('/css/:hash.:file.css', render.CSS,	render.send );  // Renderizador de CSS
	app.all('/js/:hash.:file.js',	render.JS,	render.send ); // Rendirizador de JavaScript
	app.all(`/${isImg}/:hash.:file.${isImg}`,render.IMG ); // Rendirazador de Imagenes simples
	app.all('/html/:hash.:file.html',render.html ); // Renderizador de HTML
	
	return app;	
}
