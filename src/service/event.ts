import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

const API = 'api.clandigital.org';

@Injectable()
export class Events {
	future = [];
	past = [];

	constructor(public http: Http) {
		this.http._defaultOptions.url = API;
	}

	getFuture (): Promise<any[]> {
		return this.http.get('/future').subscribe(res => this.future = res.json().event);
	}

	getPast (): Promise<any[]>{
		return this.http.get('/past').subscribe(res => this.past = res.json().event);
	}

	isSend(name:string, data ): Promise<any> {
		return this.http.post(API + 'sendata', { name, data })
			.subscribe(res => res.data);
	}

}