import * as moment from 'moment';
const Dropbox = require('dropbox');

const CONFIG = require("../../config.json");
const DROPBOX = 'www.dropbox.com';
const SHOW = 'dl.dropboxusercontent.com';

const dbx = new Dropbox({ accessToken: process.env.DROPBOX || CONFIG.dropbox });

export function all (req, res, next) {
	let photos = [];
	dbx
		.sharingGetSharedLinks()
		.then(data => {
			for (var i = data.links.length - 1; i >= 0; i--) {
				if(data.links[i].path && (!req.params.path || data.links[i].path.lastIndexOf(req.params.path) >= 0)){
					photos.push(data.links[i].url.replace(DROPBOX, SHOW));
				}
			}

			res.json({  photos });
		})
		.catch(error => res.json({error}));
}
