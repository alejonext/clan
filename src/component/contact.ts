import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Events } from '../service/event';

@Component({
	moduleId: __filename,
	template: require('../../view/contact.pug'),
	providers: [ Events ]
})
export class Contact {
	data = {};
	send: boolean = false;

	constructor(public box: Events) {}

	isSend(){
		this.send = true;
		this.box.isSend('contact', this.data);
	}

}