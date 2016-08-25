import { Component } from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Photos } from '../service/photos';

const CONFIG = require("../config.json");

@Component({
	moduleId: __filename,
	selector: '.all-100.justi',
	directives: [
		...ROUTER_DIRECTIVES,
	],
	template: require('../../view/home.pug'),
	providers: [ Photos, DomSanitizationService ]
})
export class Home {
	data = [];
	constructor(
		public box: Photos,
		private sanitizer: DomSanitizationService) {}

	ngOnInit() {
		let dt = this.box.getPath(CONFIG.home);
		for (var i = dt.length - 1; i >= 0; i--) {
			this.data.push(dt[i]);
		}
	}
}