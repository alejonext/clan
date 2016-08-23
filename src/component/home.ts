import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Drop } from '../service/dropbox';

@Component({
	moduleId: __filename,
	directives: [
		...ROUTER_DIRECTIVES,
	],
	template: require('../../view/home.pug')
})
export class Home {
	data: any = {};

	constructor(
		public box: Drop,
		private sanitizer: DomSanitizationService) {}

	ngOnInit() {
		this.data = this.box.getList('home');
		for (var i = this.data.length - 1; i >= 0; i--) {
			this.data[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.data[i]);
		}
	}
}