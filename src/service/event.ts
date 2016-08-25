import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
const CONFIG = require("../config.json");

@Injectable()
export class Events {
	future = [];
	past = [];

	constructor(public http: Http) {}

	getFuture (): Promise<any[]> {
		return this.http.get('/future').subscribe((res: Response ) => this.future = res.json().event);
	}

	getPast (): Promise<any[]>{
		return this.http.get('/past').subscribe((res: Response ) =>  this.past = res.json().event);
	}

	isSend(name:string, data ): Promise<any> {
		return this.http.post(CONFIG.api + 'sendata', { name, data })
			.subscribe((res: Response ) => res.data);
	}

}