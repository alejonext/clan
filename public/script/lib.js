import angular from 'angular';

import 'ngsticky';
import 'angularjs-viewhead';
import 'moment';

import touch from 'angular-touch';
import sanitize from 'angular-sanitize';
import route from 'angular-route';
import resource from 'angular-resource';
import messages from 'angular-messages';
import animate from 'angular-animate';
import dialog from 'ng-dialog';
import ngMoment from 'angular-moment';
import angulartics from 'angulartics';
import analytics from 'angulartics-google-analytics';
import tagManager from 'angulartics-google-tag-manager';

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
		route,
		touch,
		sanitize,
		resource,
		messages,
		animate,
		dialog,
		ngMoment,
		angulartics,
		analytics,
		tagManager,
		'sticky',
		'viewhead',
		'ng'
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