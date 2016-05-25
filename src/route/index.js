import express from 'express';
import cdn from './cdn';
import api from './api';
import master from './master';
import bodyParser from 'body-parser';

/**
 * @return {Object}      Apiccion de express configurada
 */
export default function () {
	var app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(bodyParser.raw());

	app.use(GLOBAL.CONFIG.server.app.api, api());
	app.use(GLOBAL.CONFIG.server.app.cdn, cdn());
	app.use(master());

	return app;
}