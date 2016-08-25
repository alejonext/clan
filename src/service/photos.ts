import { Injectable } from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
const CONFIG = require("../config.json");

@Injectable()
export class Photos {
	headers = [];
	photos = [];

	constructor(public http: Http) {}

	getPath (): Promise<string[]> {
		return this.http.get( 'http://' + CONFIG.api + '/photos/' + name )
			.toPromise()
			.then(res => res.json().photos as string[])
			.catch(this.handleError);
	}

	getHeader (): Promise<string[]>{
		return this.http.get( 'http://' + CONFIG.api + '/photos/' + CONFIG.header )
			.toPromise()
			.then(res => res.json().photos as string[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}