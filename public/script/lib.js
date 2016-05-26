
import angular from 'angular';
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
import config from './service/config';
import api from './service/api';
import contact from './controller/contact';
import donation from './controller/donation';
import home from './controller/home';
import app from './controller/app';
import landing from './controller/landing';
import height from './directive/height';
import bar from './directive/bar';

// Run
angular
	.module(process.env.hash, [
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
	.service(api[ process.env.where ], api)
	.controller(donation[ process.env.where ], donation)
	.controller(contact[ process.env.where ], contact)
	.controller(home[ process.env.where ], home)
	.controller(app[ process.env.where ], app)
	.controller(landing[ process.env.where ], landing)
	.directive(height[ process.env.where ], height)
	.directive(bar[ process.env.where ], bar)
	.config(config);