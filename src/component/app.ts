import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Drop } from '../service/dropbox';

const VEL = 5;

@Component({
	moduleId: __filename,
	selector: 'body',
	directives: [
		...ROUTER_DIRECTIVES,
	],
	template: require('../../view/app.pug')
})
export class App {
	nums: number = 0;
	data: any[] = [];
	name: string;
	image: string;
	ins : any;

	constructor(
		public box: Drop,
		private sanitizer: DomSanitizationService) {}

	ngOnInit() {
		this.data = this.box.getList('/principal');
		this.isClick(this.data.length - 1);
	}

	isClick(num: number){
		if(this.ins){
			clearInterval(this.ins);
			this.ins = null;
		}

		this.nums += num;
		var srx = this.data[ Math.abs(this.nums % this.data.length) ];
		this.image = `url(${this.sanitizer.bypassSecurityTrustResourceUrl(srx)})`;
		this.ins = setInterval( () => this.isClick(1), VEL * 1000);
	}

}