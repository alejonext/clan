import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Events } from '../service/event';

@Component({
	moduleId: __filename,
	template: require('../../view/evidencia.pug')
})
export class Evidencias {
	select: any;
	events: any[] = [];
	data: any;

	constructor(
		public es: Events) {}

	ngOnInit() {
		this.events = this.es.getFuture();
	}

	isSend(){
		this.events[this.select.num].send = true;
		var name = this.select.description.replace(' ', '-') + '-';
		name += this.select.id;
		this.es.isSend(name, this.data);
	}

	isSelect(num: number){
		this.select = this.events[num];
		this.select.num = num;
	}

	clear (){
		this.select = null;
	}

}