// the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills'; // polyfills are moved to server.ts


// Angular 2 Universal
import {
	REQUEST_URL,
	ORIGIN_URL,
	NODE_LOCATION_PROVIDERS,
	NODE_HTTP_PROVIDERS,
	ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Application
import {App} from './component/app';
import {routes} from './route';

const CONFIG = require("./config.json");

export function ngApp(req, res) {
	let baseUrl = '/';
	let url = req.originalUrl || '/';

	let config: ExpressEngineConfig = {
		directives: [
			App
		],
		platformProviders: [
			{
				provide: ORIGIN_URL,
				useValue: 'http://' + CONFIG.www
			},
			{
				provide: APP_BASE_HREF,
				useValue: baseUrl
			},
		],
		providers: [
			{
				provide: REQUEST_URL,
				useValue: url
			},
			NODE_HTTP_PROVIDERS,
			provideRouter(routes),
			NODE_LOCATION_PROVIDERS
		],
		CONFIG,
		async: true,
		preboot: false // { appRoot: 'app' } // your top level app component selector
	};

	res.render('index.pug', config);
}