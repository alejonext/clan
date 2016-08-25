import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import { Photos } from '../service/photos';
const CONFIG = require("../config.json");

const VEL = 5;

@Component({
	moduleId: __filename,
	selector: 'body',
	directives: [
		...ROUTER_DIRECTIVES,
	],
	providers: [ Photos, DomSanitizationService ],
	template: require('../../view/app.pug')
})
export class App implements OnInit {
	image: SafeResourceUrl;
	nums: number = 0;
	data = [];
	name: string;
	ins : any;
	error: any;
	big: number = 500;

	constructor(
		private box: Photos,
		private router: Router,
		private sanitizer: DomSanitizationService) {}

	ngOnInit(): void {
		this.router.events.subscribe(url => this.putUrl(url));
		this.box.getHeader()
			.then(photo => this.putPhotos(photo))
			.catch(error => console.log(error))
	}

	putUrl(data): void {
		this.big = data.url.length === 1 ? 500 : 47;
		this.isClick(this.data.length - 1);
	}

	putPhotos(data: string[] = []): void {
		this.data = data;
	}

	isClick(num: number): void {
		if(this.ins){
			clearInterval(this.ins);
			this.ins = null;
		}

		this.nums += num;
		var srx = this.data[ Math.abs(this.nums % this.data.length) ];
		this.image = `url(${srx})`;
		this.ins = setInterval( () => this.isClick(1), VEL * 1000);
	}

}