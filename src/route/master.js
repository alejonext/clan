import express from 'express';
import path from 'path';
import {cache} from './cdn';

export default function () {
	var app = express(); 
	app.locals.cache = cache;
	app.locals.render = GLOBAL.CONFIG.render;
	app.set('env', GLOBAL.CONFIG.server.status);
	app.set('view engine', 'pug');
	app.set('views', path.join( __dirname, '..', '..',  'view'));
	app.use('/template/:name([a-z]+)', (req, res) => res.render( 'template/' + req.params.name + '.jade') );
	app.use('/*', (req, res) => res.render('app.jade') );

	return app;
}

