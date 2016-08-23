import { Injectable } from "@angular/core";
const Dropbox = require("dropbox");

@Injectable()
export class Drop {
	box = new Dropbox({ accessToken: 'YOUR_ACCESS_TOKEN_HERE' });
	url:string = 'https://dl.dropboxusercontent.com/s/';

	getList (path:string): Promise<any[]> {
		var list: string[] = [];
		return this.box.filesListFolder({
			path: path,
			recursive : true
		})
			.then(res => {
				console.log(res);
				return list;
			});
	}
}