
import 'angular';
import 'angular-touch';
import 'angular-sanitize';
import 'angular-route';
import 'angular-resource';
import 'angular-messages';
import 'angular-animate';
import 'angularjs-viewhead';
import 'ngsticky';
import 'ng-dialog';
import 'moment';
import 'angular-moment';
import 'angulartics';
import 'angulartics-google-analytics';
import 'angulartics-google-tag-manager';

// Thinks
import * as config from './service/config';
import * as api from './service/api';
import * as contact from './controller/contact';
import * as donation from './controller/donation';
import * as home from './controller/home';
import * as app from './controller/app';
import * as landing from './controller/landing';
import * as height from './directive/height';
import * as bar from './directive/bar';

// Run
angular
	.module(process.env.app, [
		'ng',
		'ngRoute',
		'viewhead',
		'ngAnimate',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngDialog',
		'sticky',
		'angularMoment',
		'angulartics',
		'angulartics.google.analytics',
		'angulartics.google.tagmanager'
	])
	.service(api.name, api.default)
	.controller(donation.name, donation.default)
	.controller(contact.name, contact.default)
	.controller(home.name, home.default)
	.controller(app.name, app.default)
	.controller(landing.name, landing.default)
	.directive(height.name, height.default)
	.directive(bar.name, bar.default)
	.config(config.default);