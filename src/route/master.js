import express from 'express';
import path from 'path';
import {cache} from './cdn';


/**
 * @return {Object}      Apiccion de express configurada para que solo envie un HTML
 */
export default function () {
	var app = express(); 
	app.locals.cache = cache;
	app.locals.render = GLOBAL.CONFIG.render;
	app.locals.render.hash = ( new Buffer(process.env.npm_package_version, 'utf8' ) ).toString('hex');
	app.set('env', GLOBAL.CONFIG.server.status);
	app.set('view engine', 'pug');
	app.set('views', path.join( __dirname, '..', '..',  'view'));
	app.use('/template/:name([a-z]+)', (req, res) => res.render( 'template/' + req.params.name + '.pug') );
	app.use('/*', (req, res) => res.render('app.pug') );

	return app;
}

